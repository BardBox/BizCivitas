// Service Worker registration and management utilities
// Enhanced with offline capabilities and background sync

export interface ServiceWorkerConfig {
  swUrl?: string;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onOffline?: () => void;
  onOnline?: () => void;
}

export interface InstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

class ServiceWorkerManager {
  private swRegistration: ServiceWorkerRegistration | null = null;
  private installPrompt: InstallPromptEvent | null = null;
  private config: ServiceWorkerConfig;

  constructor(config: ServiceWorkerConfig = {}) {
    this.config = {
      swUrl: '/sw.js',
      ...config
    };
  }

  // Register service worker
  async register(): Promise<ServiceWorkerRegistration | null> {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      console.log('Service Worker not supported');
      return null;
    }

    try {
      const registration = await navigator.serviceWorker.register(this.config.swUrl!);
      this.swRegistration = registration;

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.config.onUpdate?.(registration);
            } else if (newWorker.state === 'activated') {
              this.config.onSuccess?.(registration);
            }
          });
        }
      });

      // Set up background sync
      this.setupBackgroundSync();

      // Set up online/offline detection
      this.setupNetworkDetection();

      // Set up PWA install prompt
      this.setupInstallPrompt();

      console.log('Service Worker registered successfully');
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }

  // Unregister service worker
  async unregister(): Promise<boolean> {
    if (this.swRegistration) {
      const result = await this.swRegistration.unregister();
      this.swRegistration = null;
      return result;
    }
    return false;
  }

  // Update service worker
  async update(): Promise<void> {
    if (this.swRegistration) {
      await this.swRegistration.update();
    }
  }

  // Setup background sync for forms
  private setupBackgroundSync(): void {
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      // Register sync event when form is submitted offline
      window.addEventListener('offline', () => {
        this.registerBackgroundSync('contact-form-sync');
      });
    }
  }

  // Register background sync
  private async registerBackgroundSync(tag: string): Promise<void> {
    try {
      if (this.swRegistration && 'sync' in this.swRegistration) {
        await (this.swRegistration as any).sync.register(tag);
        console.log(`Background sync registered: ${tag}`);
      }
    } catch (error) {
      console.error('Background sync registration failed:', error);
    }
  }

  // Setup network detection
  private setupNetworkDetection(): void {
    const updateOnlineStatus = () => {
      if (navigator.onLine) {
        this.config.onOnline?.();
        document.body.classList.remove('offline');
        document.body.classList.add('online');
      } else {
        this.config.onOffline?.();
        document.body.classList.remove('online');
        document.body.classList.add('offline');
      }
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Initial status
    updateOnlineStatus();
  }

  // Setup PWA install prompt
  private setupInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.installPrompt = e as InstallPromptEvent;
      this.showInstallButton();
    });

    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      this.hideInstallButton();
      this.installPrompt = null;
    });
  }

  // Show install button
  private showInstallButton(): void {
    const installButton = document.getElementById('pwa-install-button');
    if (installButton) {
      installButton.style.display = 'block';
    }
  }

  // Hide install button
  private hideInstallButton(): void {
    const installButton = document.getElementById('pwa-install-button');
    if (installButton) {
      installButton.style.display = 'none';
    }
  }

  // Trigger PWA install
  async installPWA(): Promise<boolean> {
    if (!this.installPrompt) {
      return false;
    }

    try {
      await this.installPrompt.prompt();
      const choiceResult = await this.installPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted PWA install');
        return true;
      } else {
        console.log('User dismissed PWA install');
        return false;
      }
    } catch (error) {
      console.error('PWA install failed:', error);
      return false;
    } finally {
      this.installPrompt = null;
    }
  }

  // Check if PWA is installed
  isPWAInstalled(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone ||
           document.referrer.includes('android-app://');
  }

  // Store form data for offline sync
  async storeFormData(formData: any): Promise<void> {
    try {
      const db = await this.openIndexedDB();
      const transaction = db.transaction(['pendingForms'], 'readwrite');
      const store = transaction.objectStore('pendingForms');
      
      await store.add({
        data: formData,
        timestamp: new Date().toISOString()
      });

      console.log('Form data stored for offline sync');
    } catch (error) {
      console.error('Failed to store form data:', error);
    }
  }

  // Open IndexedDB
  private openIndexedDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('BizCivitasDB', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('pendingForms')) {
          db.createObjectStore('pendingForms', { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  }

  // Push notification subscription
  async subscribeToPushNotifications(): Promise<PushSubscription | null> {
    if (!this.swRegistration || !('PushManager' in window)) {
      console.log('Push notifications not supported');
      return null;
    }

    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.log('Push notification permission denied');
        return null;
      }

      // You'll need to generate VAPID keys for production
      const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!vapidPublicKey) {
        console.log('VAPID public key not configured');
        return null;
      }

      const subscription = await this.swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(vapidPublicKey)
      });

      console.log('Push notification subscription created');
      return subscription;
    } catch (error) {
      console.error('Push notification subscription failed:', error);
      return null;
    }
  }

  // Convert VAPID key
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}

// Create singleton instance
export const swManager = new ServiceWorkerManager({
  onUpdate: (registration) => {
    console.log('New service worker available');
    // Show update notification to user
    if (confirm('New version available! Reload to update?')) {
      window.location.reload();
    }
  },
  onSuccess: (registration) => {
    console.log('Service worker active');
  },
  onOffline: () => {
    console.log('App is offline');
    // Show offline notification
  },
  onOnline: () => {
    console.log('App is online');
    // Hide offline notification
  }
});

// Auto-register service worker in production
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
  swManager.register();
}

export default ServiceWorkerManager;
