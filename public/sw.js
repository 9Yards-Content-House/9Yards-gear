// Service Worker for 9Yards Gear PWA - Production Optimized v3
const CACHE_NAME = '9yards-gear-v3'
const OFFLINE_URL = '/offline.html'
const STATIC_CACHE = '9yards-static-v3'
const DYNAMIC_CACHE = '9yards-dynamic-v3'
const IMAGE_CACHE = '9yards-images-v3'

// Critical assets to precache on install
const PRECACHE_ASSETS = [
  '/',
  '/inventory/',
  '/offline.html',
  '/manifest.json',
  '/favicon.ico',
  '/logo.png',
]

// Cache duration settings (in seconds)
const CACHE_DURATIONS = {
  static: 31536000,  // 1 year for static assets
  dynamic: 86400,    // 1 day for dynamic content
  images: 604800,    // 1 week for images
}

// Install event - precache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, STATIC_CACHE, DYNAMIC_CACHE, IMAGE_CACHE]
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => !currentCaches.includes(name))
            .map((name) => caches.delete(name))
        )
      })
      .then(() => self.clients.claim())
  )
})

// Helper: Check if request is for an image
function isImageRequest(request) {
  const url = new URL(request.url)
  return /\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$/i.test(url.pathname)
}

// Helper: Check if request is for static asset
function isStaticAsset(request) {
  const url = new URL(request.url)
  return url.pathname.startsWith('/_next/static/') ||
         url.pathname.startsWith('/fonts/') ||
         /\.(js|css|woff|woff2)$/i.test(url.pathname)
}

// Helper: Check if request is for API
function isApiRequest(request) {
  const url = new URL(request.url)
  return url.pathname.startsWith('/api/')
}

// Helper: Check if request is a navigation request
function isNavigationRequest(request) {
  return request.mode === 'navigate'
}

// Strategy: Cache First (for static assets)
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request)
  if (cachedResponse) {
    return cachedResponse
  }
  
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    return new Response('Network error', { status: 408 })
  }
}

// Strategy: Stale While Revalidate (for images and dynamic content)
async function staleWhileRevalidate(request, cacheName) {
  const cachedResponse = await caches.match(request)
  
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        const cache = caches.open(cacheName)
        cache.then((c) => c.put(request, networkResponse.clone()))
      }
      return networkResponse
    })
    .catch(() => cachedResponse)
  
  return cachedResponse || fetchPromise
}

// Strategy: Network First (for navigation and API)
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return offline page for navigation requests
    if (isNavigationRequest(request)) {
      return caches.match(OFFLINE_URL)
    }
    
    return new Response('Offline', { status: 503 })
  }
}

// Main fetch handler
self.addEventListener('fetch', (event) => {
  const { request } = event
  
  // Skip non-GET requests
  if (request.method !== 'GET') return
  
  // Skip external requests
  if (!request.url.startsWith(self.location.origin)) return
  
  // Skip chrome-extension and other protocols
  if (!request.url.startsWith('http')) return
  
  // Route to appropriate strategy
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE))
  } else if (isImageRequest(request)) {
    event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE))
  } else if (isApiRequest(request)) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE))
  } else if (isNavigationRequest(request)) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE))
  } else {
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE))
  }
})

// Background sync for offline bookings
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-bookings') {
    event.waitUntil(syncPendingBookings())
  }
})

async function syncPendingBookings() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE)
    const requests = await cache.keys()
    const bookingRequests = requests.filter(req => req.url.includes('booking'))
    
    for (const request of bookingRequests) {
      try {
        const response = await fetch(request.clone())
        if (response.ok) {
          await cache.delete(request)
          notifyClients({ type: 'BOOKING_SYNCED', url: request.url })
        }
      } catch (error) {
        console.error('Failed to sync booking:', error)
      }
    }
  } catch (error) {
    console.error('Sync bookings failed:', error)
  }
}

// Helper: Notify all clients
function notifyClients(message) {
  self.clients.matchAll({ type: 'window' }).then((clients) => {
    clients.forEach((client) => client.postMessage(message))
  })
}

// Push notification handler
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {}
  const options = {
    body: data.body || 'New notification from 9Yards Gear',
    icon: '/favicon/android-chrome-192x192.png',
    badge: '/favicon/favicon-32x32.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/' }
  }
  
  event.waitUntil(
    self.registration.showNotification(data.title || '9Yards Gear', options)
  )
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data?.url || '/'
  
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clients) => {
        const existingClient = clients.find((c) => c.url === url && 'focus' in c)
        if (existingClient) {
          return existingClient.focus()
        }
        return self.clients.openWindow(url)
      })
  )
})

// Message handler
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data?.type === 'PRECACHE_URLS') {
    event.waitUntil(
      caches.open(STATIC_CACHE).then((cache) => cache.addAll(event.data.urls))
    )
  }
  
  if (event.data?.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((names) => Promise.all(names.map((n) => caches.delete(n))))
    )
  }
})
