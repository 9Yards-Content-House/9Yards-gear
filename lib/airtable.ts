// Airtable Integration for 9Yards Gear
// This module handles all communication with Airtable API

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY!;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID!;
const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;

// ============ Type Definitions ============

export type GearCategory = {
  id: string;
  name: string;
  icon: string;
  image?: string;
};

export type GearSpecs = {
  [key: string]: string | undefined;
};

export type GearImage = {
  url: string;
  filename?: string;
  width?: number;
  height?: number;
};

export type GearItem = {
  id: string;
  name: string;
  category: string;
  pricePerDay: number;
  pricePerWeek: number;
  description: string;
  specs: GearSpecs;
  image: string; // Primary image URL (first from images array)
  images: GearImage[]; // All images array
  available: boolean;
  featured: boolean;
  bookedDates: string[];
  whatsIncluded: string[]; // Per-item included accessories
  totalRentals: number;
  totalRevenue: number;
  lastRentedAt?: string;
  brand?: string;
};

export type BookingItem = {
  gearId: string;
  gearName: string;
  quantity: number;
  pricePerDay: number;
};

export type Booking = {
  id: string;
  airtableRecordId?: string;
  booking_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  gear_items: BookingItem[];
  start_date: string;
  end_date: string;
  total_amount: number;
  deposit_amount: number;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  payment_reference?: string;
  notes?: string;
  pickup_time?: string;
  return_time?: string;
  created_at: string;
  updated_at?: string;
};

export type Review = {
  id: string;
  airtableRecordId?: string;
  review_id: string;
  gear_id: string;
  booking_id?: string;
  user_email: string;
  user_name: string;
  rating: number;
  title: string;
  comment: string;
  photos?: GearImage[];
  verified: boolean;
  status: "pending" | "approved" | "rejected";
  helpful_count: number;
  created_at: string;
};

export type Customer = {
  id: string;
  airtableRecordId?: string;
  customer_id: string;
  email: string;
  phone: string;
  name: string;
  first_booking?: string;
  last_booking?: string;
  total_bookings: number;
  total_spent: number;
  favorite_categories: string[];
  notes?: string;
  status: "active" | "vip" | "flagged";
};

// ============ Airtable Record Types ============

type AirtableRecord<T> = {
  id: string;
  createdTime: string;
  fields: T;
};

type AirtableResponse<T> = {
  records: AirtableRecord<T>[];
  offset?: string;
};

type AirtableCategoryFields = {
  id: string;
  name: string;
  icon: string;
  image?: { url: string; filename?: string }[] | string;
};

type AirtableGearFields = {
  id: string;
  name: string;
  category: string | string[];
  pricePerDay: number;
  pricePerWeek: number;
  description: string;
  specs: string;
  image:
    | { url: string; filename?: string; width?: number; height?: number }[]
    | string;
  images?: {
    url: string;
    filename?: string;
    width?: number;
    height?: number;
  }[];
  available: boolean;
  featured: boolean;
  bookedDates?: string;
  whatsIncluded?: string;
  totalRentals?: number;
  totalRevenue?: number;
  lastRentedAt?: string;
  brand?: string;
};


type AirtableBookingFields = {
  booking_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  gear_items: string;
  start_date: string;
  end_date: string;
  total_amount: number;
  deposit_amount?: number;
  status: string;
  payment_reference?: string;
  notes?: string;
  pickup_time?: string;
  return_time?: string;
};

type AirtableReviewFields = {
  review_id: string;
  gear_id: string;
  booking_id?: string;
  user_email: string;
  user_name: string;
  rating: number;
  title: string;
  comment: string;
  photos?: { url: string; filename?: string }[];
  verified?: boolean;
  status: string;
  helpful_count: number;
};

type AirtableCustomerFields = {
  customer_id: string;
  email: string;
  phone: string;
  name: string;
  total_bookings?: number;
  total_spent?: number;
  favorite_categories?: string;
  notes?: string;
  status?: string;
};

// ============ Fetch Helper ============

async function fetchAirtable<T>(
  tableName: string,
  options: {
    filterByFormula?: string;
    sort?: { field: string; direction: "asc" | "desc" }[];
  } = {}
): Promise<AirtableRecord<T>[]> {
  const params = new URLSearchParams();

  if (options.filterByFormula) {
    params.append("filterByFormula", options.filterByFormula);
  }

  if (options.sort) {
    options.sort.forEach((s, i) => {
      params.append(`sort[${i}][field]`, s.field);
      params.append(`sort[${i}][direction]`, s.direction);
    });
  }

  const url = `${AIRTABLE_API_URL}/${encodeURIComponent(
    tableName
  )}?${params.toString()}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: process.env.NODE_ENV === "production" ? 60 : 0 },
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Airtable API error:", error);
    throw new Error(`Airtable API error: ${response.status}`);
  }

  const data: AirtableResponse<T> = await response.json();

  let allRecords = data.records;
  let offset = data.offset;

  while (offset) {
    const nextUrl = `${url}&offset=${offset}`;
    const nextResponse = await fetch(nextUrl, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    const nextData: AirtableResponse<T> = await nextResponse.json();
    allRecords = [...allRecords, ...nextData.records];
    offset = nextData.offset;
  }

  return allRecords;
}

async function createAirtableRecord<T>(
  tableName: string,
  fields: Partial<T>
): Promise<AirtableRecord<T>> {
  const response = await fetch(
    `${AIRTABLE_API_URL}/${encodeURIComponent(tableName)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("Airtable create error:", error);
    throw new Error(`Airtable create error: ${response.status}`);
  }

  return response.json();
}

async function updateAirtableRecord<T>(
  tableName: string,
  recordId: string,
  fields: Partial<T>
): Promise<AirtableRecord<T>> {
  const response = await fetch(
    `${AIRTABLE_API_URL}/${encodeURIComponent(tableName)}/${recordId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    console.error("Airtable update error:", error);
    throw new Error(`Airtable update error: ${response.status}`);
  }

  return response.json();
}

// ============ Transform Functions ============

function transformGearRecord(
  record: AirtableRecord<AirtableGearFields>
): GearItem {
  const fields = record.fields;

  let specs: GearSpecs = {};
  try {
    if (fields.specs) {
      specs = JSON.parse(fields.specs);
    }
  } catch {
    console.warn(`Failed to parse specs for gear ${fields.id}`);
  }

  let bookedDates: string[] = [];
  try {
    if (fields.bookedDates) {
      if (fields.bookedDates.startsWith("[")) {
        bookedDates = JSON.parse(fields.bookedDates);
      } else {
        bookedDates = fields.bookedDates
          .split(",")
          .map((d) => d.trim())
          .filter(Boolean);
      }
    }
  } catch {
    console.warn(`Failed to parse bookedDates for gear ${fields.id}`);
  }

  let whatsIncluded: string[] = [];
  try {
    if (fields.whatsIncluded) {
      if (fields.whatsIncluded.startsWith("[")) {
        whatsIncluded = JSON.parse(fields.whatsIncluded);
      } else {
        whatsIncluded = fields.whatsIncluded
          .split(",")
          .map((d) => d.trim())
          .filter(Boolean);
      }
    }
  } catch {
    console.warn(`Failed to parse whatsIncluded for gear ${fields.id}`);
  }

  // Handle images array
  let images: GearImage[] = [];
  let primaryImage = "/gear/placeholder.jpg";

  // First check the new 'images' field (multiple attachments)
  if (
    fields.images &&
    Array.isArray(fields.images) &&
    fields.images.length > 0
  ) {
    images = fields.images.map((img) => ({
      url: img.url,
      filename: img.filename,
      width: img.width,
      height: img.height,
    }));
    primaryImage = images[0].url;
  }
  // Fall back to legacy 'image' field
  else if (fields.image) {
    if (Array.isArray(fields.image) && fields.image.length > 0) {
      images = fields.image.map((img) => ({
        url: img.url,
        filename: img.filename,
        width: img.width,
        height: img.height,
      }));
      primaryImage = images[0].url;
    } else if (typeof fields.image === "string") {
      primaryImage = fields.image;
      images = [{ url: fields.image }];
    }
  }

  const category = Array.isArray(fields.category)
    ? fields.category[0]
    : fields.category;

  return {
    id: fields.id,
    name: fields.name,
    category: category || "",
    brand: fields.brand, // Extracted brand property
    pricePerDay: fields.pricePerDay || 0,
    pricePerWeek: fields.pricePerWeek || 0,
    description: fields.description || "",
    specs,
    image: primaryImage,
    images,
    available: fields.available ?? true,
    featured: fields.featured ?? false,
    bookedDates,
    whatsIncluded,
    totalRentals: fields.totalRentals || 0,
    totalRevenue: fields.totalRevenue || 0,
    lastRentedAt: fields.lastRentedAt,
  };
}

function transformCategoryRecord(
  record: AirtableRecord<AirtableCategoryFields>
): GearCategory {
  const fields = record.fields;
  
  // Handle category image
  let image = undefined;
  if (fields.image) {
    if (Array.isArray(fields.image) && fields.image[0]?.url) {
      image = fields.image[0].url;
    } else if (typeof fields.image === "string") {
      image = fields.image;
    }
  }

  return {
    id: fields.id,
    name: fields.name,
    icon: fields.icon,
    image,
  };
}

function transformBookingRecord(
  record: AirtableRecord<AirtableBookingFields>
): Booking {
  const fields = record.fields;

  let gearItems: BookingItem[] = [];
  try {
    if (fields.gear_items) {
      gearItems = JSON.parse(fields.gear_items);
    }
  } catch {
    console.warn(`Failed to parse gear_items for booking ${fields.booking_id}`);
  }

  return {
    id: fields.booking_id,
    airtableRecordId: record.id,
    booking_id: fields.booking_id,
    customer_name: fields.customer_name,
    customer_email: fields.customer_email,
    customer_phone: fields.customer_phone,
    gear_items: gearItems,
    start_date: fields.start_date,
    end_date: fields.end_date,
    total_amount: fields.total_amount || 0,
    deposit_amount: fields.deposit_amount || 0,
    status: (fields.status as Booking["status"]) || "pending",
    payment_reference: fields.payment_reference,
    notes: fields.notes,
    pickup_time: fields.pickup_time,
    return_time: fields.return_time,
    created_at: record.createdTime,
    updated_at: record.createdTime,
  };
}

function transformReviewRecord(
  record: AirtableRecord<AirtableReviewFields>
): Review {
  const fields = record.fields;

  let photos: GearImage[] = [];
  if (fields.photos && Array.isArray(fields.photos)) {
    photos = fields.photos.map((p) => ({ url: p.url, filename: p.filename }));
  }

  return {
    id: fields.review_id,
    airtableRecordId: record.id,
    review_id: fields.review_id,
    gear_id: fields.gear_id,
    booking_id: fields.booking_id,
    user_email: fields.user_email,
    user_name: fields.user_name,
    rating: fields.rating,
    title: fields.title,
    comment: fields.comment,
    photos,
    verified: fields.verified ?? false,
    status: (fields.status as Review["status"]) || "pending",
    helpful_count: fields.helpful_count || 0,
    created_at: record.createdTime,
  };
}

function transformCustomerRecord(
  record: AirtableRecord<AirtableCustomerFields>
): Customer {
  const fields = record.fields;

  let favoriteCategories: string[] = [];
  try {
    if (fields.favorite_categories) {
      if (fields.favorite_categories.startsWith("[")) {
        favoriteCategories = JSON.parse(fields.favorite_categories);
      } else {
        favoriteCategories = fields.favorite_categories
          .split(",")
          .map((d) => d.trim())
          .filter(Boolean);
      }
    }
  } catch {
    console.warn(
      `Failed to parse favorite_categories for customer ${fields.customer_id}`
    );
  }

  return {
    id: fields.customer_id,
    airtableRecordId: record.id,
    customer_id: fields.customer_id,
    email: fields.email,
    phone: fields.phone,
    name: fields.name,
    first_booking: record.createdTime,
    last_booking: undefined,
    total_bookings: fields.total_bookings || 0,
    total_spent: fields.total_spent || 0,
    favorite_categories: favoriteCategories,
    notes: fields.notes,
    status: (fields.status as Customer["status"]) || "active",
  };
}

// ============ Gear Functions ============

export async function getAllGear(): Promise<GearItem[]> {
  try {
    const records = await fetchAirtable<AirtableGearFields>("Gear", {
      sort: [{ field: "name", direction: "asc" }],
    });
    return records.map(transformGearRecord);
  } catch (error) {
    console.error("Error fetching gear from Airtable:", error);
    return [];
  }
}

export async function getGearById(id: string): Promise<GearItem | undefined> {
  try {
    const records = await fetchAirtable<AirtableGearFields>("Gear", {
      filterByFormula: `{id} = "${id}"`,
    });
    if (records.length === 0) return undefined;
    return transformGearRecord(records[0]);
  } catch (error) {
    console.error(`Error fetching gear ${id} from Airtable:`, error);
    return undefined;
  }
}

export async function getGearByCategory(
  categoryId: string
): Promise<GearItem[]> {
  try {
    const records = await fetchAirtable<AirtableGearFields>("Gear", {
      filterByFormula: `{category} = "${categoryId}"`,
      sort: [{ field: "name", direction: "asc" }],
    });
    return records.map(transformGearRecord);
  } catch (error) {
    console.error(`Error fetching gear for category ${categoryId}:`, error);
    return [];
  }
}

export async function getFeaturedGear(): Promise<GearItem[]> {
  try {
    const records = await fetchAirtable<AirtableGearFields>("Gear", {
      filterByFormula: `{featured} = TRUE()`,
    });
    return records.map(transformGearRecord);
  } catch (error) {
    console.error("Error fetching featured gear:", error);
    return [];
  }
}

export async function getAvailableGear(): Promise<GearItem[]> {
  try {
    const records = await fetchAirtable<AirtableGearFields>("Gear", {
      filterByFormula: `{available} = TRUE()`,
      sort: [{ field: "name", direction: "asc" }],
    });
    return records.map(transformGearRecord);
  } catch (error) {
    console.error("Error fetching available gear:", error);
    return [];
  }
}

export async function searchGear(query: string): Promise<GearItem[]> {
  try {
    const records = await fetchAirtable<AirtableGearFields>("Gear", {
      filterByFormula: `OR(FIND(LOWER("${query}"), LOWER({name})), FIND(LOWER("${query}"), LOWER({description})))`,
    });
    return records.map(transformGearRecord);
  } catch (error) {
    console.error("Error searching gear:", error);
    return [];
  }
}

export async function getRelatedGear(
  currentId: string,
  category: string,
  limit = 4
): Promise<GearItem[]> {
  try {
    const records = await fetchAirtable<AirtableGearFields>("Gear", {
      filterByFormula: `AND({category} = "${category}", {id} != "${currentId}")`,
    });
    return records.slice(0, limit).map(transformGearRecord);
  } catch (error) {
    console.error("Error fetching related gear:", error);
    return [];
  }
}

export async function updateGearBookedDates(
  gearId: string,
  bookedDates: string[]
): Promise<boolean> {
  try {
    const records = await fetchAirtable<AirtableGearFields>("Gear", {
      filterByFormula: `{id} = "${gearId}"`,
    });

    if (records.length === 0) {
      console.error(`Gear ${gearId} not found`);
      return false;
    }

    await updateAirtableRecord("Gear", records[0].id, {
      bookedDates: JSON.stringify(bookedDates),
    });

    return true;
  } catch (error) {
    console.error("Error updating gear booked dates:", error);
    return false;
  }
}

export async function updateGearAvailability(
  gearId: string,
  available: boolean
): Promise<boolean> {
  try {
    const records = await fetchAirtable<AirtableGearFields>("Gear", {
      filterByFormula: `{id} = "${gearId}"`,
    });

    if (records.length === 0) {
      console.error(`Gear ${gearId} not found`);
      return false;
    }

    await updateAirtableRecord("Gear", records[0].id, { available });
    return true;
  } catch (error) {
    console.error("Error updating gear availability:", error);
    return false;
  }
}

export async function updateGearRentalStats(
  gearId: string,
  amount: number,
  action: "confirmed" | "completed"
): Promise<boolean> {
  try {
    const records = await fetchAirtable<AirtableGearFields>("Gear", {
      filterByFormula: `{id} = "${gearId}"`,
    });

    if (records.length === 0) {
      console.error(`Gear ${gearId} not found`);
      return false;
    }

    const gear = records[0];
    const updates: Partial<AirtableGearFields> = {};

    if (action === "confirmed") {
      // Increment rental count when payment confirmed
      updates.totalRentals = (gear.fields.totalRentals || 0) + 1;
      updates.totalRevenue = (gear.fields.totalRevenue || 0) + amount;
    }

    if (action === "completed") {
      // Update last rented date when gear returned
      updates.lastRentedAt = new Date().toISOString().split("T")[0];
    }

    await updateAirtableRecord("Gear", gear.id, updates);
    return true;
  } catch (error) {
    console.error("Error updating gear rental stats:", error);
    return false;
  }
}

// ============ Category Functions ============

export async function getAllCategories(): Promise<GearCategory[]> {
  try {
    const records = await fetchAirtable<AirtableCategoryFields>("Categories", {
      sort: [{ field: "name", direction: "asc" }],
    });
    return records.map(transformCategoryRecord);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getCategoryById(
  id: string
): Promise<GearCategory | undefined> {
  try {
    const records = await fetchAirtable<AirtableCategoryFields>("Categories", {
      filterByFormula: `{id} = "${id}"`,
    });
    if (records.length === 0) return undefined;
    return transformCategoryRecord(records[0]);
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    return undefined;
  }
}

// ============ Booking Functions ============

export async function createBooking(
  booking: Omit<
    Booking,
    "id" | "airtableRecordId" | "created_at" | "updated_at"
  >
): Promise<Booking | null> {
  try {
    const record = await createAirtableRecord<AirtableBookingFields>(
      "Bookings",
      {
        booking_id: booking.booking_id,
        customer_name: booking.customer_name,
        customer_email: booking.customer_email,
        customer_phone: booking.customer_phone,
        gear_items: JSON.stringify(booking.gear_items),
        start_date: booking.start_date,
        end_date: booking.end_date,
        total_amount: booking.total_amount,
        deposit_amount: booking.deposit_amount,
        status: booking.status,
        payment_reference: booking.payment_reference,
        notes: booking.notes,
        pickup_time: booking.pickup_time,
        return_time: booking.return_time,
      }
    );
    return transformBookingRecord(record);
  } catch (error) {
    console.error("Error creating booking:", error);
    return null;
  }
}

export async function getBookingById(
  bookingId: string
): Promise<Booking | undefined> {
  try {
    const records = await fetchAirtable<AirtableBookingFields>("Bookings", {
      filterByFormula: `{booking_id} = "${bookingId}"`,
    });
    if (records.length === 0) return undefined;
    return transformBookingRecord(records[0]);
  } catch (error) {
    console.error(`Error fetching booking ${bookingId}:`, error);
    return undefined;
  }
}

export async function getBookingsByEmail(email: string): Promise<Booking[]> {
  try {
    const records = await fetchAirtable<AirtableBookingFields>("Bookings", {
      filterByFormula: `{customer_email} = "${email}"`,
      sort: [{ field: "start_date", direction: "desc" }],
    });
    return records.map(transformBookingRecord);
  } catch (error) {
    console.error(`Error fetching bookings for ${email}:`, error);
    return [];
  }
}

export async function getBookingsByStatus(
  status: Booking["status"]
): Promise<Booking[]> {
  try {
    const records = await fetchAirtable<AirtableBookingFields>("Bookings", {
      filterByFormula: `{status} = "${status}"`,
      sort: [{ field: "start_date", direction: "asc" }],
    });
    return records.map(transformBookingRecord);
  } catch (error) {
    console.error(`Error fetching ${status} bookings:`, error);
    return [];
  }
}

export async function getAllBookingsFromAirtable(): Promise<Booking[]> {
  try {
    const records = await fetchAirtable<AirtableBookingFields>("Bookings", {
      sort: [{ field: "start_date", direction: "desc" }],
    });
    return records.map(transformBookingRecord);
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    return [];
  }
}

export async function updateBookingStatus(
  bookingId: string,
  status: Booking["status"],
  updates?: Partial<Pick<Booking, "payment_reference" | "notes">>
): Promise<Booking | null> {
  try {
    const records = await fetchAirtable<AirtableBookingFields>("Bookings", {
      filterByFormula: `{booking_id} = "${bookingId}"`,
    });

    if (records.length === 0) {
      console.error(`Booking ${bookingId} not found`);
      return null;
    }

    const updateFields: Partial<AirtableBookingFields> = { status };
    if (updates?.payment_reference)
      updateFields.payment_reference = updates.payment_reference;
    if (updates?.notes) updateFields.notes = updates.notes;

    const updated = await updateAirtableRecord<AirtableBookingFields>(
      "Bookings",
      records[0].id,
      updateFields
    );

    // Update gear rental stats based on status change
    const booking = transformBookingRecord(records[0]);
    if (status === "confirmed") {
      for (const item of booking.gear_items) {
        await updateGearRentalStats(
          item.gearId,
          item.pricePerDay * item.quantity,
          "confirmed"
        );
      }
    } else if (status === "completed") {
      for (const item of booking.gear_items) {
        await updateGearRentalStats(item.gearId, 0, "completed");
      }
    }

    return transformBookingRecord(updated);
  } catch (error) {
    console.error("Error updating booking status:", error);
    return null;
  }
}

// ============ Review Functions ============

export async function verifyReviewEligibility(
  email: string,
  gearId: string
): Promise<{ eligible: boolean; bookingId?: string }> {
  try {
    // Check if user has a completed booking containing this gear
    const records = await fetchAirtable<AirtableBookingFields>("Bookings", {
      filterByFormula: `AND({customer_email} = "${email}", {status} = "completed")`,
    });

    for (const record of records) {
      const booking = transformBookingRecord(record);
      const hasGear = booking.gear_items.some((item) => item.gearId === gearId);
      if (hasGear) {
        return { eligible: true, bookingId: booking.booking_id };
      }
    }

    return { eligible: false };
  } catch (error) {
    console.error("Error verifying review eligibility:", error);
    return { eligible: false };
  }
}

export async function submitReview(
  review: Omit<
    Review,
    | "id"
    | "airtableRecordId"
    | "created_at"
    | "helpful_count"
    | "status"
    | "verified"
    | "review_id"
  >
): Promise<Review | null> {
  try {
    // Verify eligibility first
    const eligibility = await verifyReviewEligibility(
      review.user_email,
      review.gear_id
    );

    const reviewId = `rev_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const record = await createAirtableRecord<AirtableReviewFields>("Reviews", {
      review_id: reviewId,
      gear_id: review.gear_id,
      booking_id: eligibility.bookingId || review.booking_id,
      user_email: review.user_email,
      user_name: review.user_name,
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      verified: eligibility.eligible,
      status: "pending",
      helpful_count: 0,
    });

    return transformReviewRecord(record);
  } catch (error) {
    console.error("Error submitting review:", error);
    return null;
  }
}

export async function getGearReviews(gearId: string): Promise<Review[]> {
  try {
    const records = await fetchAirtable<AirtableReviewFields>("Reviews", {
      filterByFormula: `AND({gear_id} = "${gearId}", {status} = "approved")`,
      sort: [{ field: "helpful_count", direction: "desc" }],
    });
    return records.map(transformReviewRecord);
  } catch (error) {
    console.error(`Error fetching reviews for gear ${gearId}:`, error);
    return [];
  }
}

export async function getAllReviewsFromAirtable(
  status?: Review["status"]
): Promise<Review[]> {
  try {
    const filterFormula = status ? `{status} = "${status}"` : "";
    const records = await fetchAirtable<AirtableReviewFields>("Reviews", {
      filterByFormula: filterFormula || undefined,
    });
    return records.map(transformReviewRecord);
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    return [];
  }
}

export async function updateReviewStatus(
  reviewId: string,
  status: Review["status"]
): Promise<boolean> {
  try {
    const records = await fetchAirtable<AirtableReviewFields>("Reviews", {
      filterByFormula: `{review_id} = "${reviewId}"`,
    });

    if (records.length === 0) {
      console.error(`Review ${reviewId} not found`);
      return false;
    }

    await updateAirtableRecord("Reviews", records[0].id, { status });
    return true;
  } catch (error) {
    console.error("Error updating review status:", error);
    return false;
  }
}

export async function incrementReviewHelpful(
  reviewId: string
): Promise<boolean> {
  try {
    const records = await fetchAirtable<AirtableReviewFields>("Reviews", {
      filterByFormula: `{review_id} = "${reviewId}"`,
    });

    if (records.length === 0) return false;

    const currentCount = records[0].fields.helpful_count || 0;
    await updateAirtableRecord("Reviews", records[0].id, {
      helpful_count: currentCount + 1,
    });
    return true;
  } catch (error) {
    console.error("Error incrementing review helpful:", error);
    return false;
  }
}

// ============ Customer Functions ============

export async function getOrCreateCustomer(
  email: string,
  phone: string,
  name: string
): Promise<Customer | null> {
  try {
    // Check if customer exists
    const records = await fetchAirtable<AirtableCustomerFields>("Customers", {
      filterByFormula: `{email} = "${email}"`,
    });

    if (records.length > 0) {
      return transformCustomerRecord(records[0]);
    }

    // Create new customer
    const customerId = `cust_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const record = await createAirtableRecord<AirtableCustomerFields>(
      "Customers",
      {
        customer_id: customerId,
        email,
        phone,
        name,
        total_bookings: 0,
        total_spent: 0,
        status: "active",
      }
    );

    return transformCustomerRecord(record);
  } catch (error) {
    console.error("Error getting/creating customer:", error);
    return null;
  }
}

export async function getCustomerByEmail(
  email: string
): Promise<Customer | undefined> {
  try {
    const records = await fetchAirtable<AirtableCustomerFields>("Customers", {
      filterByFormula: `{email} = "${email}"`,
    });
    if (records.length === 0) return undefined;
    return transformCustomerRecord(records[0]);
  } catch (error) {
    console.error(`Error fetching customer ${email}:`, error);
    return undefined;
  }
}

export async function updateCustomerStats(
  email: string,
  bookingAmount: number,
  category?: string
): Promise<boolean> {
  try {
    const records = await fetchAirtable<AirtableCustomerFields>("Customers", {
      filterByFormula: `{email} = "${email}"`,
    });

    if (records.length === 0) return false;

    const customer = records[0];
    const currentBookings = customer.fields.total_bookings || 0;
    const currentSpent = customer.fields.total_spent || 0;

    let favoriteCategories: string[] = [];
    try {
      if (customer.fields.favorite_categories) {
        favoriteCategories = JSON.parse(customer.fields.favorite_categories);
      }
    } catch {
      favoriteCategories = [];
    }

    if (category && !favoriteCategories.includes(category)) {
      favoriteCategories.push(category);
    }

    await updateAirtableRecord("Customers", customer.id, {
      total_bookings: currentBookings + 1,
      total_spent: currentSpent + bookingAmount,
      favorite_categories: JSON.stringify(favoriteCategories),
    });

    return true;
  } catch (error) {
    console.error("Error updating customer stats:", error);
    return false;
  }
}

export async function getAllCustomersFromAirtable(): Promise<Customer[]> {
  try {
    const records = await fetchAirtable<AirtableCustomerFields>("Customers", {
      sort: [{ field: "total_spent", direction: "desc" }],
    });
    return records.map(transformCustomerRecord);
  } catch (error) {
    console.error("Error fetching all customers:", error);
    return [];
  }
}

// ============ Analytics Functions ============

export async function getTopRentedGear(limit = 10): Promise<GearItem[]> {
  try {
    const records = await fetchAirtable<AirtableGearFields>("Gear", {
      sort: [{ field: "totalRentals", direction: "desc" }],
    });
    return records.slice(0, limit).map(transformGearRecord);
  } catch (error) {
    console.error("Error fetching top rented gear:", error);
    return [];
  }
}

export async function getRevenueByGear(): Promise<
  { gear: GearItem; revenue: number }[]
> {
  try {
    const records = await fetchAirtable<AirtableGearFields>("Gear", {
      sort: [{ field: "totalRevenue", direction: "desc" }],
    });
    return records.map((r) => ({
      gear: transformGearRecord(r),
      revenue: r.fields.totalRevenue || 0,
    }));
  } catch (error) {
    console.error("Error fetching revenue by gear:", error);
    return [];
  }
}

// ============ Utility Functions ============

export function formatPrice(amount: number): string {
  return `UGX ${amount.toLocaleString()}`
}
