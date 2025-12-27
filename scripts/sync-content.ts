
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });
dotenv.config();

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const DATA_DIR = path.join(process.cwd(), 'data');
const PUBLIC_CMS_DIR = path.join(process.cwd(), 'public', 'cms');

if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
  console.error('Error: AIRTABLE_API_KEY or AIRTABLE_BASE_ID not found in environment variables.');
  process.exit(1);
}

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(PUBLIC_CMS_DIR)) fs.mkdirSync(PUBLIC_CMS_DIR, { recursive: true });

async function downloadImage(url: string, id: string, filename: string): Promise<string> {
  try {
    const ext = path.extname(filename) || '.jpg';
    const safeFilename = `${id}${ext}`; // Use ID as filename to avoid collisions/spaces
    const localPath = path.join(PUBLIC_CMS_DIR, safeFilename);
    const publicPath = `/cms/${safeFilename}`;

    if (fs.existsSync(localPath)) {
      // Optional: Check if we want to overwrite or skip
      // For now, let's skip if it exists to speed up builds, 
      // but you might want to force update if URLs change.
      // console.log(`Image already exists: ${safeFilename}`);
      return publicPath;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);

    const arrayBuffer = await response.arrayBuffer();
    fs.writeFileSync(localPath, Buffer.from(arrayBuffer));
    console.log(`Downloaded: ${safeFilename}`);
    return publicPath;
  } catch (error) {
    console.error(`Error downloading image ${url}:`, error);
    return '/placeholder.svg'; // Fallback
  }
}

async function fetchAllRecords(tableName: string) {
  let allRecords: any[] = [];
  let offset = null;

  do {
    const url: string = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableName}${offset ? `?offset=${offset}` : ''}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` }
    });

    if (!response.ok) throw new Error(`Failed to fetch ${tableName}: ${response.statusText}`);

    const data: any = await response.json();
    allRecords = [...allRecords, ...data.records];
    offset = data.offset;
  } while (offset);

  return allRecords;
}

// Transform functions (similar to lib/airtable.ts but optimized for local storage)
async function processGear(records: any[]) {
  const processed = await Promise.all(records.map(async (record: any) => {
    const fields = record.fields;
    
    // Process main image
    let imagePath = '/gear/placeholder.jpg';
    if (fields.images && Array.isArray(fields.images) && fields.images.length > 0) {
      imagePath = await downloadImage(fields.images[0].url, `${record.id}-main`, fields.images[0].filename);
    } else if (fields.image) {
      if (Array.isArray(fields.image) && fields.image.length > 0) {
        imagePath = await downloadImage(fields.image[0].url, `${record.id}-main`, fields.image[0].filename);
      } else if (typeof fields.image === 'string') {
        // Legacy string URL - might point to external, try to download valid URL or keep as is?
        // Assuming it's an Airtable URL, download it.
        if (fields.image.startsWith('http')) {
             imagePath = await downloadImage(fields.image, `${record.id}-main`, 'image.jpg');
        } else {
             imagePath = fields.image;
        }
      }
    }

    // Process gallery images including the main one
    let galleryImages: any[] = [];
    if (fields.images && Array.isArray(fields.images)) {
        galleryImages = await Promise.all(fields.images.map(async (img: any, index: number) => ({
            url: await downloadImage(img.url, `${record.id}-${index}`, img.filename),
            filename: img.filename,
            width: img.width,
            height: img.height
        })));
    } else if (fields.image && Array.isArray(fields.image)) {
        galleryImages = await Promise.all(fields.image.map(async (img: any, index: number) => ({
            url: await downloadImage(img.url, `${record.id}-${index}`, img.filename),
            filename: img.filename,
            width: img.width,
            height: img.height
        })));
    } else {
        // Ensure at least the main image is in the gallery if available
        galleryImages = [{ url: imagePath }];
    }

    // Parse messy JSON fields
    let bookedDates = [];
    try {
        if (fields.bookedDates) {
            bookedDates = typeof fields.bookedDates === 'string' && fields.bookedDates.startsWith('[') 
                ? JSON.parse(fields.bookedDates) 
                : (typeof fields.bookedDates === 'string' ? fields.bookedDates.split(',') : []);
        }
    } catch (e) {}

    let specs = {};
    try { 
        if (fields.specs && typeof fields.specs === 'string') specs = JSON.parse(fields.specs);
        else if (fields.specs) specs = fields.specs;
    } catch (e) {}

    return {
      id: record.id,
      name: fields.name,
      category: Array.isArray(fields.category) ? fields.category[0] : fields.category,
      pricePerDay: fields.pricePerDay || 0,
      pricePerWeek: fields.pricePerWeek || 0,
      description: fields.description || "",
      specs,
      image: imagePath,
      images: galleryImages, // Now contains local paths
      available: fields.available ?? true,
      featured: fields.featured ?? false,
      bookedDates,
      whatsIncluded: fields.whatsIncluded || [], // Simplify logic for script
      totalRentals: fields.totalRentals || 0,
      // lastRentedAt: fields.lastRentedAt // Optional
    };
  }));

  return processed;
}

async function processCategories(records: any[]) {
    return Promise.all(records.map(async (record: any) => {
        const fields = record.fields;
        let imagePath = undefined;
        
        if (fields.image) {
             if (Array.isArray(fields.image) && fields.image[0]?.url) {
                 imagePath = await downloadImage(fields.image[0].url, `cat-${record.id}`, fields.image[0].filename);
             } else if (typeof fields.image === 'string' && fields.image.startsWith('http')) {
                 imagePath = await downloadImage(fields.image, `cat-${record.id}`, 'image.jpg');
             }
        }

        return {
            id: record.id, // Keep the Airtable ID to link with Gear Category field
            name: fields.name,
            icon: fields.icon,
            image: imagePath
        };
    }));
}

async function main() {
  console.log('🔄 Starting Content Sync...');
  
  try {
    // 1. Fetch Categories
    console.log('📦 Fetching Categories...');
    const categoriesRaw = await fetchAllRecords('Categories');
    const categoriesProcessed = await processCategories(categoriesRaw);
    fs.writeFileSync(path.join(DATA_DIR, 'categories.json'), JSON.stringify(categoriesProcessed, null, 2));
    console.log(`✅ Saved ${categoriesProcessed.length} categories.`);

    // 2. Fetch Gear
    console.log('🎥 Fetching Gear...');
    const gearRaw = await fetchAllRecords('Gear');
    const gearProcessed = await processGear(gearRaw);
    fs.writeFileSync(path.join(DATA_DIR, 'gear.json'), JSON.stringify(gearProcessed, null, 2));
    console.log(`✅ Saved ${gearProcessed.length} gear items.`);

    console.log('🎉 Sync Complete!');
  } catch (error) {
    console.error('❌ Sync Failed:', error);
    process.exit(1);
  }
}

main();
