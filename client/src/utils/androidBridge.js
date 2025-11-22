// Android WebView Bridge
// This provides a safe interface to communicate with native Android code

class AndroidBridge {
    constructor() {
        this.isAndroid = typeof window.Android !== 'undefined';
    }

    // Check if running in Android WebView
    isAndroidWebView() {
        return this.isAndroid;
    }

    // Show native Android toast message
    showToast(message) {
        if (this.isAndroid && window.Android.showToast) {
            try {
                window.Android.showToast(message);
            } catch (error) {
                console.warn('Android showToast failed:', error);
            }
        }
    }

    // Trigger device vibration
    vibrate(duration = 100) {
        if (this.isAndroid && window.Android.vibrate) {
            try {
                window.Android.vibrate(duration);
            } catch (error) {
                console.warn('Android vibrate failed:', error);
            }
        }
    }

    // Save data to native storage
    saveToNative(key, value) {
        if (this.isAndroid && window.Android.saveData) {
            try {
                window.Android.saveData(key, JSON.stringify(value));
            } catch (error) {
                console.warn('Android saveData failed:', error);
            }
        }
    }

    // Get data from native storage
    getFromNative(key) {
        if (this.isAndroid && window.Android.getData) {
            try {
                const data = window.Android.getData(key);
                return data ? JSON.parse(data) : null;
            } catch (error) {
                console.warn('Android getData failed:', error);
                return null;
            }
        }
        return null;
    }

    // Send notification through native Android
    showNotification(title, message) {
        if (this.isAndroid && window.Android.showNotification) {
            try {
                window.Android.showNotification(title, message);
            } catch (error) {
                console.warn('Android showNotification failed:', error);
            }
        }
    }

    // Request permission (camera, location, etc.)
    requestPermission(permission) {
        if (this.isAndroid && window.Android.requestPermission) {
            try {
                return window.Android.requestPermission(permission);
            } catch (error) {
                console.warn('Android requestPermission failed:', error);
                return false;
            }
        }
        return false;
    }
}

export default new AndroidBridge();
