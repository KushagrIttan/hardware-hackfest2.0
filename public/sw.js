// Service Worker for performance optimization and caching
const CACHE_NAME = 'hardware-hackfest-v1';
const STATIC_CACHE_URLS = [
  '/',
  '/schedule',
  '/manifest.json',
  '/favicon.ico',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip analytics requests
  if (event.request.url.includes('/api/analytics')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
          .then((fetchResponse) => {
            // Don't cache non-successful responses
            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
              return fetchResponse;
            }

            // Clone the response for caching
            const responseToCache = fetchResponse.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                // Only cache certain types of requests
                if (shouldCache(event.request)) {
                  cache.put(event.request, responseToCache);
                }
              });

            return fetchResponse;
          });
      })
      .catch(() => {
        // Fallback for offline scenarios
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      })
  );
});

// Helper function to determine if a request should be cached
function shouldCache(request) {
  const url = new URL(request.url);
  
  // Cache static assets
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/)) {
    return true;
  }
  
  // Cache HTML pages
  if (request.destination === 'document') {
    return true;
  }
  
  return false;
}

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'PERFORMANCE_MEASURE') {
    // Handle performance measurements from the main thread
    const { name, startTime, duration } = event.data;
    
    // Log performance data (in production, send to analytics)
    console.log(`SW Performance: ${name} took ${duration}ms`);
  }
});

// Background sync for analytics data
self.addEventListener('sync', (event) => {
  if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalyticsData());
  }
});

async function syncAnalyticsData() {
  try {
    // Get stored analytics data from IndexedDB or localStorage
    const storedData = await getStoredAnalyticsData();
    
    if (storedData && storedData.length > 0) {
      // Send to analytics endpoint
      await fetch('/api/analytics/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ events: storedData }),
      });
      
      // Clear stored data after successful send
      await clearStoredAnalyticsData();
    }
  } catch (error) {
    console.warn('Failed to sync analytics data:', error);
  }
}

async function getStoredAnalyticsData() {
  // Placeholder - implement IndexedDB or localStorage retrieval
  return [];
}

async function clearStoredAnalyticsData() {
  // Placeholder - implement data clearing
}

// Push notification handling (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      data: data.data,
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});