/**
 * Service Worker registration and management utilities
 */

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

export function registerServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL || '', window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl);
        navigator.serviceWorker.ready.then(() => {
          console.log('Service worker is ready for offline use.');
        });
      } else {
        registerValidServiceWorker(swUrl);
      }
    });
  }
}

function registerValidServiceWorker(swUrl: string): void {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('Service Worker registered successfully:', registration);
      
      // Listen for updates
      registration.addEventListener('updatefound', () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        
        installingWorker.addEventListener('statechange', () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('New content is available; please refresh.');
              // Optionally show a notification to the user
              showUpdateNotification();
            } else {
              console.log('Content is cached for offline use.');
            }
          }
        });
      });
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

function checkValidServiceWorker(swUrl: string): void {
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidServiceWorker(swUrl);
      }
    })
    .catch(() => {
      console.log('No internet connection found. App is running in offline mode.');
    });
}

function showUpdateNotification(): void {
  // Create a simple notification for app updates
  const notification = document.createElement('div');
  notification.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: hsl(0 0% 12%);
      border: 1px solid hsl(180 100% 50%);
      color: hsl(0 0% 98%);
      padding: 16px;
      border-radius: 8px;
      z-index: 10000;
      font-family: 'Space Mono', monospace;
      font-size: 14px;
      max-width: 300px;
      box-shadow: 0 0 20px hsl(180 100% 50% / 0.3);
    ">
      <div style="margin-bottom: 8px; color: hsl(180 100% 50%);">
        🔄 Update Available
      </div>
      <div style="margin-bottom: 12px; font-size: 12px; opacity: 0.8;">
        A new version of the app is available. Refresh to update.
      </div>
      <button onclick="window.location.reload()" style="
        background: hsl(180 100% 50%);
        color: hsl(0 0% 8%);
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-family: 'Space Mono', monospace;
        font-size: 12px;
        margin-right: 8px;
      ">
        Refresh
      </button>
      <button onclick="this.parentElement.parentElement.remove()" style="
        background: transparent;
        color: hsl(0 0% 60%);
        border: 1px solid hsl(0 0% 40%);
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-family: 'Space Mono', monospace;
        font-size: 12px;
      ">
        Later
      </button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.parentElement.removeChild(notification);
    }
  }, 10000);
}

export function unregisterServiceWorker(): void {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

// Performance measurement utilities for service worker communication
export function measurePerformance(name: string, fn: () => void | Promise<void>): void {
  const startTime = performance.now();
  
  const finish = () => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    // Send to service worker for logging
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'PERFORMANCE_MEASURE',
        name,
        startTime,
        duration,
      });
    }
  };
  
  try {
    const result = fn();
    if (result instanceof Promise) {
      result.finally(finish);
    } else {
      finish();
    }
  } catch (error) {
    finish();
    throw error;
  }
}

// Background sync for analytics
export function scheduleAnalyticsSync(): void {
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    navigator.serviceWorker.ready.then((registration) => {
      // Type assertion for sync API which may not be in TypeScript definitions
      const syncRegistration = registration as any;
      if (syncRegistration.sync) {
        return syncRegistration.sync.register('analytics-sync');
      }
    }).catch((error) => {
      console.warn('Background sync not supported:', error);
    });
  }
}