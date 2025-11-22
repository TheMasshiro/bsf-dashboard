# 🚀 Quick Start Guide - Android WebView

## 📋 Prerequisites
- Node.js installed
- Android Studio (for building APK)
- WebSocket server running

---

## ⚡ Quick Setup (5 Steps)

### 1️⃣ Configure WebSocket Server
```bash
cd client
cp .env.example .env
nano .env
```

Edit `.env`:
```env
VITE_WS_URL=ws://YOUR_SERVER_IP:8080
```

### 2️⃣ Build the App
```bash
npm install
npm run build
```

### 3️⃣ Copy to Android Project
```bash
# Copy dist/* to your Android project
cp -r dist/* /path/to/android/app/src/main/assets/
```

### 4️⃣ Android Code Setup

**Add to `MainActivity.kt`:**
```kotlin
webView.settings.apply {
    javaScriptEnabled = true
    domStorageEnabled = true
}

webView.addJavascriptInterface(AndroidBridge(), "Android")
webView.loadUrl("file:///android_asset/index.html")

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
        vibrator.vibrate(VibrationEffect.createOneShot(duration, VibrationEffect.DEFAULT_AMPLITUDE))
    }
}
```

**Add to `AndroidManifest.xml`:**
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.VIBRATE" />
```

### 5️⃣ Build & Run
```bash
# In Android Studio
Build > Build Bundle(s) / APK(s) > Build APK
```

---

## 🎮 Usage

### WebSocket Messages

**Your server should send:**
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

**App sends back:**
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

---

## 🧪 Testing

### Test in Browser:
```bash
npm run dev
# Open http://localhost:5173
```

### Test on Phone:
```bash
npm run dev
# Open http://YOUR_PC_IP:5173 on phone
```

### Debug Android WebView:
1. Connect phone via USB
2. Open Chrome: `chrome://inspect`
3. Click "Inspect" on your app
4. See all console logs!

---

## ✅ What Works Out of the Box

- 🟢 Real-time WebSocket connection
- 🟢 Auto-reconnection when connection drops
- 🟢 Offline mode with cached data
- 🟢 Connection status indicator
- 🟢 Actuator control with haptic feedback
- 🟢 Data persistence (settings, actuator states)
- 🟢 Lifecycle management (pause/resume)
- 🟢 Mobile-optimized UI
- 🟢 Android native features (toast, vibration)

---

## 🐛 Troubleshooting

**Can't connect to WebSocket?**
- Check server is running
- Verify IP address in `.env`
- Check firewall allows connections
- Make sure using `ws://` not `wss://` for local testing

**Android bridge not working?**
- Ensure `javaScriptEnabled = true`
- Check JavaScript interface is added
- Verify permissions in AndroidManifest.xml

**App not updating?**
- Clear app data
- Rebuild: `npm run build`
- Re-copy to Android assets
- Clean build in Android Studio

**No vibration?**
- Add VIBRATE permission
- Check device settings allow vibration

---

## 📚 Full Documentation

- **WEBVIEW_FEATURES.md** - Complete feature list
- **ANDROID_INTEGRATION.md** - Detailed Android setup
- **README.md** - General project info

---

## 🎯 Tips

1. **Development:** Use `ws://localhost:8080`
2. **Production:** Use `wss://your-domain.com` (secure WebSocket)
3. **Battery:** App auto-pauses WebSocket in background
4. **Debugging:** Always use Chrome DevTools for Android debugging
5. **Updates:** Just rebuild and copy to Android assets

---

## 📞 Server Requirements

Your WebSocket server must:
1. Accept connections on configured port (default: 8080)
2. Send sensor data in JSON format (see above)
3. Receive actuator commands in JSON format
4. Handle reconnections gracefully

**Example Node.js Server:**
```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');
    
    // Send sensor data every 5 seconds
    const interval = setInterval(() => {
        ws.send(JSON.stringify({
            type: 'sensor_data',
            payload: {
                temperature: 20 + Math.random() * 10,
                humidity: 60 + Math.random() * 20,
                moisture: 70 + Math.random() * 10,
                light: 800 + Math.random() * 200
            }
        }));
    }, 5000);
    
    // Handle actuator commands
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        if (data.type === 'actuator_command') {
            console.log('Actuator:', data.payload);
            // Control your hardware here
        }
    });
    
    ws.on('close', () => {
        clearInterval(interval);
        console.log('Client disconnected');
    });
});
```

---

**You're all set! Build and deploy! 🎉**
