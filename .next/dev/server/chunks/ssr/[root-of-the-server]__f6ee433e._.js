module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/error.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/error.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/loading.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/loading.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/not-found.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/not-found.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/gear/[id]/loading.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/gear/[id]/loading.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/gear/[id]/not-found.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/gear/[id]/not-found.tsx [app-rsc] (ecmascript)"));
}),
"[project]/components/ui/badge.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-rsc] (ecmascript)");
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cva"])('inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden', {
    variants: {
        variant: {
            default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
            secondary: 'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
            destructive: 'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground'
        }
    },
    defaultVariants: {
        variant: 'default'
    }
});
function Badge({ className, variant, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Slot"] : 'span';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "badge",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/badge.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/components/gear/gear-image-gallery.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "GearImageGallery",
    ()=>GearImageGallery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const GearImageGallery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call GearImageGallery() from the server but GearImageGallery is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/gear/gear-image-gallery.tsx <module evaluation>", "GearImageGallery");
}),
"[project]/components/gear/gear-image-gallery.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "GearImageGallery",
    ()=>GearImageGallery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const GearImageGallery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call GearImageGallery() from the server but GearImageGallery is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/gear/gear-image-gallery.tsx", "GearImageGallery");
}),
"[project]/components/gear/gear-image-gallery.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$gear$2f$gear$2d$image$2d$gallery$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/gear/gear-image-gallery.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$gear$2f$gear$2d$image$2d$gallery$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/gear/gear-image-gallery.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$gear$2f$gear$2d$image$2d$gallery$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/gear/synced-booking-section.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "SyncedBookingSection",
    ()=>SyncedBookingSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const SyncedBookingSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SyncedBookingSection() from the server but SyncedBookingSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/gear/synced-booking-section.tsx <module evaluation>", "SyncedBookingSection");
}),
"[project]/components/gear/synced-booking-section.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "SyncedBookingSection",
    ()=>SyncedBookingSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const SyncedBookingSection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call SyncedBookingSection() from the server but SyncedBookingSection is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/gear/synced-booking-section.tsx", "SyncedBookingSection");
}),
"[project]/components/gear/synced-booking-section.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$gear$2f$synced$2d$booking$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/gear/synced-booking-section.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$gear$2f$synced$2d$booking$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/gear/synced-booking-section.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$gear$2f$synced$2d$booking$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/data/gear.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"categories\":[{\"id\":\"cameras\",\"name\":\"Cameras\",\"icon\":\"Camera\"},{\"id\":\"lenses\",\"name\":\"Lenses\",\"icon\":\"Aperture\"},{\"id\":\"lighting\",\"name\":\"Lighting\",\"icon\":\"Lightbulb\"},{\"id\":\"audio\",\"name\":\"Audio Equipment\",\"icon\":\"Mic\"},{\"id\":\"drones\",\"name\":\"Drones & Motion\",\"icon\":\"Plane\"},{\"id\":\"grip\",\"name\":\"Grip & Support\",\"icon\":\"Move\"},{\"id\":\"accessories\",\"name\":\"Accessories\",\"icon\":\"Package\"}],\"gear\":[{\"id\":\"cam001\",\"name\":\"Canon EOS R5 Camera Body\",\"category\":\"cameras\",\"pricePerDay\":150000,\"pricePerWeek\":750000,\"description\":\"Professional full-frame mirrorless camera with 8K video capability, perfect for high-end film and commercial productions.\",\"specs\":{\"resolution\":\"45MP Full Frame\",\"video\":\"8K RAW, 4K 120fps\",\"autofocus\":\"Dual Pixel CMOS AF II\",\"storage\":\"CFexpress + SD UHS-II\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":true,\"bookedDates\":[\"2025-12-15\",\"2025-12-16\",\"2025-12-20\",\"2025-12-21\",\"2025-12-22\"]},{\"id\":\"cam002\",\"name\":\"Sony FX6 Cinema Camera\",\"category\":\"cameras\",\"pricePerDay\":200000,\"pricePerWeek\":1000000,\"description\":\"Compact full-frame cinema camera with outstanding low-light performance and professional video features.\",\"specs\":{\"resolution\":\"10.2MP Full Frame\",\"video\":\"4K 120fps, S-Cinetone\",\"autofocus\":\"Fast Hybrid AF\",\"storage\":\"CFexpress Type A\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":true,\"bookedDates\":[\"2025-12-18\",\"2025-12-19\"]},{\"id\":\"cam003\",\"name\":\"Blackmagic URSA Mini Pro 12K\",\"category\":\"cameras\",\"pricePerDay\":250000,\"pricePerWeek\":1250000,\"description\":\"Revolutionary 12K digital film camera with incredible dynamic range for the most demanding productions.\",\"specs\":{\"resolution\":\"12K Super 35\",\"video\":\"12K 60fps, BRAW\",\"dynamicRange\":\"14 stops\",\"storage\":\"CFast 2.0\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":false,\"bookedDates\":[]},{\"id\":\"cam004\",\"name\":\"RED Komodo 6K\",\"category\":\"cameras\",\"pricePerDay\":300000,\"pricePerWeek\":1500000,\"description\":\"Compact cinema camera with stunning 6K image quality and RED's legendary color science.\",\"specs\":{\"resolution\":\"6K Super 35\",\"video\":\"6K 40fps, REDCODE RAW\",\"dynamicRange\":\"16+ stops\",\"storage\":\"CFast 2.0\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":false,\"featured\":true,\"bookedDates\":[\"2025-12-14\",\"2025-12-15\",\"2025-12-16\",\"2025-12-17\"]},{\"id\":\"lens001\",\"name\":\"Canon RF 24-70mm f/2.8L IS USM\",\"category\":\"lenses\",\"pricePerDay\":50000,\"pricePerWeek\":250000,\"description\":\"Professional standard zoom lens with exceptional sharpness and image stabilization.\",\"specs\":{\"focalLength\":\"24-70mm\",\"aperture\":\"f/2.8\",\"mount\":\"Canon RF\",\"stabilization\":\"5-stop IS\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":true,\"bookedDates\":[]},{\"id\":\"lens002\",\"name\":\"Sigma 18-35mm f/1.8 Art\",\"category\":\"lenses\",\"pricePerDay\":40000,\"pricePerWeek\":200000,\"description\":\"World's first f/1.8 constant aperture zoom lens, perfect for low-light filming.\",\"specs\":{\"focalLength\":\"18-35mm\",\"aperture\":\"f/1.8\",\"mount\":\"Canon EF / Sony E\",\"elements\":\"17 elements in 12 groups\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":false,\"bookedDates\":[\"2025-12-20\"]},{\"id\":\"lens003\",\"name\":\"Canon CN-E 50mm T1.3 L F\",\"category\":\"lenses\",\"pricePerDay\":80000,\"pricePerWeek\":400000,\"description\":\"Cinema prime lens with beautiful bokeh and professional build quality.\",\"specs\":{\"focalLength\":\"50mm\",\"aperture\":\"T1.3\",\"mount\":\"Canon EF Cinema\",\"coverage\":\"Super 35mm\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":true,\"bookedDates\":[]},{\"id\":\"lens004\",\"name\":\"Sony FE 70-200mm f/2.8 GM OSS II\",\"category\":\"lenses\",\"pricePerDay\":60000,\"pricePerWeek\":300000,\"description\":\"Premium telephoto zoom with exceptional sharpness and fast autofocus.\",\"specs\":{\"focalLength\":\"70-200mm\",\"aperture\":\"f/2.8\",\"mount\":\"Sony E\",\"stabilization\":\"Optical SteadyShot\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":false,\"bookedDates\":[]},{\"id\":\"light001\",\"name\":\"Aputure 600d Pro LED\",\"category\":\"lighting\",\"pricePerDay\":80000,\"pricePerWeek\":400000,\"description\":\"Daylight-balanced LED fixture with incredible output, perfect for key lighting on film sets.\",\"specs\":{\"output\":\"600W LED\",\"colorTemp\":\"5600K Daylight\",\"cri\":\"96+ CRI\",\"control\":\"Sidus Link App\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":true,\"bookedDates\":[\"2025-12-16\",\"2025-12-17\"]},{\"id\":\"light002\",\"name\":\"Aputure 300x Bi-Color LED\",\"category\":\"lighting\",\"pricePerDay\":60000,\"pricePerWeek\":300000,\"description\":\"Versatile bi-color LED with variable color temperature for any lighting situation.\",\"specs\":{\"output\":\"300W LED\",\"colorTemp\":\"2700K-6500K\",\"cri\":\"95+ CRI\",\"control\":\"Sidus Link App\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":false,\"bookedDates\":[]},{\"id\":\"light003\",\"name\":\"Nanlite Forza 500 II\",\"category\":\"lighting\",\"pricePerDay\":70000,\"pricePerWeek\":350000,\"description\":\"High-output daylight LED spotlight with excellent color accuracy.\",\"specs\":{\"output\":\"500W LED\",\"colorTemp\":\"5600K\",\"cri\":\"98 CRI\",\"beam\":\"15° to 45°\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":false,\"bookedDates\":[]},{\"id\":\"light004\",\"name\":\"ARRI SkyPanel S60-C\",\"category\":\"lighting\",\"pricePerDay\":120000,\"pricePerWeek\":600000,\"description\":\"Industry-standard soft light panel with full RGB+W color control.\",\"specs\":{\"output\":\"Soft LED Panel\",\"colorTemp\":\"2800K-10000K + RGB\",\"cri\":\"95+ CRI\",\"dimming\":\"0-100%\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":true,\"bookedDates\":[]},{\"id\":\"audio001\",\"name\":\"Sennheiser MKH 416 Shotgun Mic\",\"category\":\"audio\",\"pricePerDay\":30000,\"pricePerWeek\":150000,\"description\":\"Industry-standard shotgun microphone for professional dialogue recording.\",\"specs\":{\"type\":\"Shotgun Condenser\",\"pattern\":\"Super-Cardioid\",\"frequency\":\"40Hz - 20kHz\",\"sensitivity\":\"25 mV/Pa\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":true,\"bookedDates\":[]},{\"id\":\"audio002\",\"name\":\"Sound Devices MixPre-6 II\",\"category\":\"audio\",\"pricePerDay\":50000,\"pricePerWeek\":250000,\"description\":\"Compact 6-channel audio recorder with exceptional preamps and 32-bit float recording.\",\"specs\":{\"channels\":\"6 Input / 8 Track\",\"bitDepth\":\"32-bit Float\",\"preamps\":\"Kashmir Preamps\",\"timecode\":\"Built-in\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":false,\"bookedDates\":[]},{\"id\":\"audio003\",\"name\":\"Rode NTG5 Shotgun Microphone\",\"category\":\"audio\",\"pricePerDay\":25000,\"pricePerWeek\":125000,\"description\":\"Lightweight broadcast-grade shotgun mic with natural sound and RF immunity.\",\"specs\":{\"type\":\"Shotgun Condenser\",\"pattern\":\"Super-Cardioid\",\"frequency\":\"20Hz - 20kHz\",\"weight\":\"76g\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":false,\"bookedDates\":[]},{\"id\":\"audio004\",\"name\":\"Sennheiser EW 100 G4 Wireless Lav Kit\",\"category\":\"audio\",\"pricePerDay\":40000,\"pricePerWeek\":200000,\"description\":\"Professional wireless lavalier system for interviews and dialogue.\",\"specs\":{\"type\":\"Wireless Lavalier\",\"range\":\"100m Line of Sight\",\"frequency\":\"UHF\",\"battery\":\"8 hours\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":true,\"bookedDates\":[\"2025-12-18\"]},{\"id\":\"drone001\",\"name\":\"DJI Inspire 3\",\"category\":\"drones\",\"pricePerDay\":300000,\"pricePerWeek\":1500000,\"description\":\"Professional cinema drone with full-frame camera and 8K video capability.\",\"specs\":{\"camera\":\"Full-Frame 8K\",\"flightTime\":\"28 minutes\",\"transmission\":\"O3 Pro 15km\",\"gimbal\":\"3-Axis Stabilization\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":true,\"bookedDates\":[]},{\"id\":\"drone002\",\"name\":\"DJI Mavic 3 Pro Cine\",\"category\":\"drones\",\"pricePerDay\":150000,\"pricePerWeek\":750000,\"description\":\"Versatile drone with triple camera system and Apple ProRes recording.\",\"specs\":{\"camera\":\"4/3 CMOS + Dual Tele\",\"flightTime\":\"43 minutes\",\"video\":\"5.1K 50fps ProRes\",\"storage\":\"1TB SSD\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":false,\"bookedDates\":[\"2025-12-22\",\"2025-12-23\"]},{\"id\":\"drone003\",\"name\":\"DJI RS 3 Pro Gimbal\",\"category\":\"drones\",\"pricePerDay\":50000,\"pricePerWeek\":250000,\"description\":\"Professional 3-axis gimbal stabilizer for cinema cameras up to 4.5kg.\",\"specs\":{\"payload\":\"4.5kg\",\"runtime\":\"12 hours\",\"modes\":\"Multiple Shooting Modes\",\"control\":\"LiDAR Focus\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":true,\"bookedDates\":[]},{\"id\":\"grip001\",\"name\":\"Sachtler Ace XL Tripod System\",\"category\":\"grip\",\"pricePerDay\":40000,\"pricePerWeek\":200000,\"description\":\"Professional fluid head tripod with smooth pan and tilt for cinema cameras.\",\"specs\":{\"payload\":\"8kg\",\"height\":\"66-170cm\",\"head\":\"Fluid Video Head\",\"legs\":\"Carbon Fiber\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":false,\"bookedDates\":[]},{\"id\":\"grip002\",\"name\":\"Matthews C-Stand Kit\",\"category\":\"grip\",\"pricePerDay\":15000,\"pricePerWeek\":75000,\"description\":\"Industry-standard C-stand with grip head and arm for lighting and rigging.\",\"specs\":{\"height\":\"Up to 3.3m\",\"base\":\"Turtle Base\",\"arm\":\"40\\\" Grip Arm\",\"head\":\"2.5\\\" Grip Head\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":false,\"bookedDates\":[]},{\"id\":\"grip003\",\"name\":\"Proaim 12ft Jib Crane\",\"category\":\"grip\",\"pricePerDay\":100000,\"pricePerWeek\":500000,\"description\":\"Professional camera jib for sweeping crane shots and dynamic movements.\",\"specs\":{\"reach\":\"12 feet\",\"payload\":\"15kg\",\"material\":\"Aluminum\",\"pan\":\"360° Rotation\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":true,\"bookedDates\":[]},{\"id\":\"acc001\",\"name\":\"SmallHD Cine 7 Monitor\",\"category\":\"accessories\",\"pricePerDay\":60000,\"pricePerWeek\":300000,\"description\":\"Professional 7-inch touchscreen monitor with 1800 nits brightness.\",\"specs\":{\"size\":\"7 inch\",\"resolution\":\"1920x1200\",\"brightness\":\"1800 nits\",\"features\":\"LUTs, Waveform, Focus\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":true,\"bookedDates\":[]},{\"id\":\"acc002\",\"name\":\"YoloBox Pro Streaming Encoder\",\"category\":\"accessories\",\"pricePerDay\":80000,\"pricePerWeek\":400000,\"description\":\"All-in-one live streaming encoder with multi-camera switching.\",\"specs\":{\"inputs\":\"4x HDMI\",\"streaming\":\"Multi-Platform\",\"display\":\"8\\\" Touchscreen\",\"recording\":\"Internal SSD\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":false,\"bookedDates\":[]},{\"id\":\"acc003\",\"name\":\"V-Mount Battery Kit (4x 150Wh)\",\"category\":\"accessories\",\"pricePerDay\":30000,\"pricePerWeek\":150000,\"description\":\"Professional V-mount battery kit with 4 batteries and dual charger.\",\"specs\":{\"capacity\":\"4x 150Wh\",\"output\":\"D-Tap + USB\",\"charger\":\"Dual Bay\",\"runtime\":\"4+ hours each\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":false,\"bookedDates\":[]},{\"id\":\"acc004\",\"name\":\"iPad Pro 12.9\\\" with Directors Kit\",\"category\":\"accessories\",\"pricePerDay\":50000,\"pricePerWeek\":250000,\"description\":\"iPad Pro with monitoring apps, wireless video receiver, and mounting hardware.\",\"specs\":{\"display\":\"12.9\\\" Liquid Retina XDR\",\"apps\":\"Directors Monitor Apps\",\"receiver\":\"Wireless Video\",\"mount\":\"Articulating Arm\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":true,\"bookedDates\":[]},{\"id\":\"acc005\",\"name\":\"Savage Seamless Paper Backdrop Kit\",\"category\":\"accessories\",\"pricePerDay\":25000,\"pricePerWeek\":125000,\"description\":\"Professional backdrop system with multiple color options and stands.\",\"specs\":{\"width\":\"2.7m\",\"colors\":\"White, Black, Gray, Green\",\"stands\":\"Heavy Duty\",\"crossbar\":\"Telescoping\"},\"image\":\"/placeholder.svg?height=400&width=600\",\"available\":true,\"featured\":false,\"bookedDates\":[]}]}"));}),
"[project]/lib/gear-data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatPrice",
    ()=>formatPrice,
    "getAllCategories",
    ()=>getAllCategories,
    "getAllGear",
    ()=>getAllGear,
    "getAvailableGear",
    ()=>getAvailableGear,
    "getCategoryById",
    ()=>getCategoryById,
    "getFeaturedGear",
    ()=>getFeaturedGear,
    "getGearByCategory",
    ()=>getGearByCategory,
    "getGearById",
    ()=>getGearById,
    "getRelatedGear",
    ()=>getRelatedGear
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$gear$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/data/gear.json (json)");
;
function getAllGear() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$gear$2e$json__$28$json$29$__["default"].gear;
}
function getGearById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$gear$2e$json__$28$json$29$__["default"].gear.find((item)=>item.id === id);
}
function getGearByCategory(categoryId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$gear$2e$json__$28$json$29$__["default"].gear.filter((item)=>item.category === categoryId);
}
function getFeaturedGear() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$gear$2e$json__$28$json$29$__["default"].gear.filter((item)=>item.featured);
}
function getAvailableGear() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$gear$2e$json__$28$json$29$__["default"].gear.filter((item)=>item.available);
}
function getAllCategories() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$gear$2e$json__$28$json$29$__["default"].categories;
}
function getCategoryById(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$gear$2e$json__$28$json$29$__["default"].categories.find((cat)=>cat.id === id);
}
function formatPrice(price) {
    return new Intl.NumberFormat("en-UG", {
        style: "currency",
        currency: "UGX",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}
function getRelatedGear(currentId, category, limit = 4) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$gear$2e$json__$28$json$29$__["default"].gear.filter((item)=>item.id !== currentId && item.category === category).slice(0, limit);
}
}),
"[project]/components/gear/gear-card.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "GearCard",
    ()=>GearCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const GearCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call GearCard() from the server but GearCard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/gear/gear-card.tsx <module evaluation>", "GearCard");
}),
"[project]/components/gear/gear-card.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "GearCard",
    ()=>GearCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const GearCard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call GearCard() from the server but GearCard is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/components/gear/gear-card.tsx", "GearCard");
}),
"[project]/components/gear/gear-card.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$gear$2f$gear$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/components/gear/gear-card.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$gear$2f$gear$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/components/gear/gear-card.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$gear$2f$gear$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/components/gear/related-gear.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RelatedGear",
    ()=>RelatedGear
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gear$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/gear-data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$gear$2f$gear$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/gear/gear-card.tsx [app-rsc] (ecmascript)");
;
;
;
function RelatedGear({ currentId, category }) {
    const relatedItems = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gear$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getRelatedGear"])(currentId, category, 3);
    if (relatedItems.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "mt-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold text-foreground mb-6",
                children: "Related Equipment"
            }, void 0, false, {
                fileName: "[project]/components/gear/related-gear.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
                children: relatedItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$gear$2f$gear$2d$card$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GearCard"], {
                        item: item
                    }, item.id, false, {
                        fileName: "[project]/components/gear/related-gear.tsx",
                        lineNumber: 19,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/components/gear/related-gear.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/gear/related-gear.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/gear/[id]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>GearDetailPage,
    "generateMetadata",
    ()=>generateMetadata,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-rsc] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-rsc] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-rsc] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/header.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/layout/footer.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$gear$2f$gear$2d$image$2d$gallery$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/gear/gear-image-gallery.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$gear$2f$synced$2d$booking$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/gear/synced-booking-section.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$gear$2f$related$2d$gear$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/gear/related-gear.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gear$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/gear-data.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
async function generateStaticParams() {
    const allGear = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gear$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getAllGear"])();
    return allGear.map((item)=>({
            id: item.id
        }));
}
async function generateMetadata({ params }) {
    const { id } = await params;
    const item = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gear$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getGearById"])(id);
    if (!item) {
        return {
            title: "Equipment Not Found | 9Yards Gear"
        };
    }
    return {
        title: `${item.name} | 9Yards Gear`,
        description: item.description
    };
}
async function GearDetailPage({ params }) {
    const { id } = await params;
    const item = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gear$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getGearById"])(id);
    if (!item) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    const category = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gear$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategoryById"])(item.category);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$header$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Header"], {}, void 0, false, {
                fileName: "[project]/app/gear/[id]/page.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "min-h-screen pt-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-7xl px-4 py-8 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "flex items-center gap-2 text-sm mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/inventory",
                                    className: "text-muted-foreground hover:text-foreground transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                            className: "inline h-4 w-4 mr-1"
                                        }, void 0, false, {
                                            fileName: "[project]/app/gear/[id]/page.tsx",
                                            lineNumber: 58,
                                            columnNumber: 15
                                        }, this),
                                        "Back to Inventory"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/gear/[id]/page.tsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-muted-foreground",
                                    children: "/"
                                }, void 0, false, {
                                    fileName: "[project]/app/gear/[id]/page.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this),
                                category && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                            href: `/inventory?category=${category.id}`,
                                            className: "text-muted-foreground hover:text-foreground transition-colors",
                                            children: category.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/gear/[id]/page.tsx",
                                            lineNumber: 64,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-muted-foreground",
                                            children: "/"
                                        }, void 0, false, {
                                            fileName: "[project]/app/gear/[id]/page.tsx",
                                            lineNumber: 70,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-foreground",
                                    children: item.name
                                }, void 0, false, {
                                    fileName: "[project]/app/gear/[id]/page.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/gear/[id]/page.tsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$gear$2f$gear$2d$image$2d$gallery$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GearImageGallery"], {
                                            image: item.image,
                                            name: item.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/gear/[id]/page.tsx",
                                            lineNumber: 79,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-card border border-border rounded-xl p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-lg font-semibold text-foreground mb-4",
                                                    children: "Specifications"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/gear/[id]/page.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                                    children: Object.entries(item.specs).map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                                    className: "text-sm text-muted-foreground capitalize",
                                                                    children: key.replace(/([A-Z])/g, " $1")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/gear/[id]/page.tsx",
                                                                    lineNumber: 87,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                                    className: "text-foreground font-medium",
                                                                    children: value
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/gear/[id]/page.tsx",
                                                                    lineNumber: 88,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, key, true, {
                                                            fileName: "[project]/app/gear/[id]/page.tsx",
                                                            lineNumber: 86,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/gear/[id]/page.tsx",
                                                    lineNumber: 84,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/gear/[id]/page.tsx",
                                            lineNumber: 82,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/gear/[id]/page.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start justify-between gap-4 mb-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-wrap items-center gap-2",
                                                            children: [
                                                                category && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Badge"], {
                                                                    variant: "secondary",
                                                                    children: category.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/gear/[id]/page.tsx",
                                                                    lineNumber: 101,
                                                                    columnNumber: 34
                                                                }, this),
                                                                item.featured && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Badge"], {
                                                                    className: "bg-primary text-primary-foreground",
                                                                    children: "Featured"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/gear/[id]/page.tsx",
                                                                    lineNumber: 102,
                                                                    columnNumber: 39
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/gear/[id]/page.tsx",
                                                            lineNumber: 100,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Badge"], {
                                                            variant: item.available ? "outline" : "destructive",
                                                            className: item.available ? "border-green-500 text-green-500" : "",
                                                            children: item.available ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                        className: "h-3 w-3 mr-1"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/gear/[id]/page.tsx",
                                                                        lineNumber: 110,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    "Available"
                                                                ]
                                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                        className: "h-3 w-3 mr-1"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/gear/[id]/page.tsx",
                                                                        lineNumber: 115,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    "Currently Booked"
                                                                ]
                                                            }, void 0, true)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/gear/[id]/page.tsx",
                                                            lineNumber: 104,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/gear/[id]/page.tsx",
                                                    lineNumber: 99,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "text-2xl sm:text-3xl font-bold text-foreground mb-2",
                                                    children: item.name
                                                }, void 0, false, {
                                                    fileName: "[project]/app/gear/[id]/page.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-muted-foreground",
                                                    children: item.description
                                                }, void 0, false, {
                                                    fileName: "[project]/app/gear/[id]/page.tsx",
                                                    lineNumber: 122,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/gear/[id]/page.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-card border border-border rounded-xl p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-sm font-medium text-muted-foreground mb-3",
                                                    children: "Rental Pricing"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/gear/[id]/page.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-baseline gap-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-3xl font-bold text-primary",
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gear$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatPrice"])(item.pricePerDay)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/gear/[id]/page.tsx",
                                                                    lineNumber: 130,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-muted-foreground ml-1",
                                                                    children: "/day"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/gear/[id]/page.tsx",
                                                                    lineNumber: 131,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/gear/[id]/page.tsx",
                                                            lineNumber: 129,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm text-muted-foreground",
                                                            children: [
                                                                "or ",
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$gear$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["formatPrice"])(item.pricePerWeek),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "ml-1",
                                                                    children: "/week"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/gear/[id]/page.tsx",
                                                                    lineNumber: 135,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/gear/[id]/page.tsx",
                                                            lineNumber: 133,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/gear/[id]/page.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-primary mt-2",
                                                    children: "Book 7+ days and get 2 days free!"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/gear/[id]/page.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/gear/[id]/page.tsx",
                                            lineNumber: 126,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$gear$2f$synced$2d$booking$2d$section$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SyncedBookingSection"], {
                                            item: item
                                        }, void 0, false, {
                                            fileName: "[project]/app/gear/[id]/page.tsx",
                                            lineNumber: 141,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/gear/[id]/page.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/gear/[id]/page.tsx",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$gear$2f$related$2d$gear$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["RelatedGear"], {
                            currentId: item.id,
                            category: item.category
                        }, void 0, false, {
                            fileName: "[project]/app/gear/[id]/page.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/gear/[id]/page.tsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/gear/[id]/page.tsx",
                lineNumber: 53,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$layout$2f$footer$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                fileName: "[project]/app/gear/[id]/page.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
}),
"[project]/app/gear/[id]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/gear/[id]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f6ee433e._.js.map