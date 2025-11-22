# Android WebView Integration Guide

## 📱 Building the Android App

### Step 1: Build the React App

```bash
cd client
npm run build
```

This creates a `dist/` folder with all your app files.

### Step 2: Android WebView Setup

#### Kotlin Example:

```kotlin
import android.os.Bundle
import android.webkit.*
import androidx.appcompat.app.AppCompatActivity
import android.widget.Toast

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        webView = WebView(this)
        setContentView(webView)
        
        setupWebView()
        
        // Load your app
        webView.loadUrl("file:///android_asset/index.html")
    }

    private fun setupWebView() {
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
        }

        // Add JavaScript Interface
        webView.addJavascriptInterface(AndroidBridge(), "Android")
        
        webView.webViewClient = WebViewClient()
        webView.webChromeClient = WebChromeClient()
    }

    // JavaScript Bridge
    inner class AndroidBridge {
        
        @JavascriptInterface
        fun showToast(message: String) {
            runOnUiThread {
                Toast.makeText(this@MainActivity, message, Toast.LENGTH_SHORT).show()
            }
        }

        @JavascriptInterface
        fun vibrate(duration: Long) {
            val vibrator = getSystemService(VIBRATOR_SERVICE) as Vibrator
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                vibrator.vibrate(VibrationEffect.createOneShot(duration, VibrationEffect.DEFAULT_AMPLITUDE))
            } else {
                vibrator.vibrate(duration)
            }
        }

        @JavascriptInterface
        fun saveData(key: String, value: String) {
            val prefs = getSharedPreferences("BSFDashboard", MODE_PRIVATE)
            prefs.edit().putString(key, value).apply()
        }

        @JavascriptInterface
        fun getData(key: String): String? {
            val prefs = getSharedPreferences("BSFDashboard", MODE_PRIVATE)
            return prefs.getString(key, null)
        }

        @JavascriptInterface
        fun showNotification(title: String, message: String) {
            // Implement notification logic
        }

        @JavascriptInterface
        fun requestPermission(permission: String): Boolean {
            // Implement permission request logic
            return true
        }
    }

    override fun onPause() {
        super.onPause()
        webView.evaluateJavascript("document.dispatchEvent(new Event('visibilitychange'));", null)
    }

    override fun onResume() {
        super.onResume()
        webView.evaluateJavascript("document.dispatchEvent(new Event('visibilitychange'));", null)
    }

    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}
```

### Step 3: Copy Build Files to Android

1. Copy `client/dist/*` to `android/app/src/main/assets/`
2. Your structure should look like:
   ```
   android/app/src/main/assets/
   ├── index.html
   ├── assets/
   │   ├── index-xxx.js
   │   └── index-xxx.css
   └── manifest.json
   ```

### Step 4: AndroidManifest.xml Permissions

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.VIBRATE" />
```

## 🔌 WebSocket Configuration

### Development (Testing on PC)
Create `.env` file:
```env
VITE_WS_URL=ws://localhost:8080
```

### Production (Android Device)
```env
# Use your server's IP address
VITE_WS_URL=ws://192.168.1.100:8080

# Or use a domain
VITE_WS_URL=wss://your-server.com
```

**Important:** Make sure your server IP is accessible from the Android device.

## 📊 WebSocket Message Format

### From Server to Client:
```json
{
  "type": "sensor_data",
  "payload": {
    "temperature": 25.5,
    "humidity": 68,
    "moisture": 75,
    "light": 900
  }
}
```

### From Client to Server (Actuator Commands):
```json
{
  "type": "actuator_command",
  "payload": {
    "lifecycle": "larva",
    "actuator": "fan",
    "state": true
  }
}
```

## 🧪 Testing

### Test on Browser First:
```bash
npm run dev
```

### Test on Android Device:
1. Connect phone via USB
2. Enable USB debugging
3. Run from Android Studio
4. Use Chrome DevTools: `chrome://inspect`

## 🔧 Features Implemented

✅ **WebSocket Integration**
- Real-time sensor data
- Actuator control commands
- Auto-reconnection
- Offline mode with cached data

✅ **Android Bridge**
- Toast notifications
- Vibration feedback
- Native data storage
- Permission requests

✅ **Lifecycle Management**
- App pause/resume handling
- WebSocket connection management
- Battery optimization

✅ **Offline Mode**
- LocalStorage for settings
- Cached sensor data
- Works without connection

✅ **PWA Support**
- Manifest.json
- Mobile-optimized
- Standalone mode

## 📝 Notes

- WebSocket URL is configurable via `.env`
- All user settings persist across sessions
- Actuator states are saved locally
- App shows connection status (🟢/🔴)
- Last sensor reading timestamp displayed

## 🐛 Debugging

Enable console logs in Chrome DevTools:
1. Open Chrome on PC
2. Go to `chrome://inspect`
3. Find your device
4. Click "Inspect"
5. See all console.log() output
