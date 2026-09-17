# WebDE

a desktop environment... for the web..? 🤨

## WebDE API

WebDE provides a tiny browser-based desktop runtime with a **1,000-character RAM** called `memory`. Apps are registered with `sys.newApp()` and are then controlled through the `app` API.

### Creating an app

```js
const id = sys.newApp("My App", "<h1>App.</h1>");
app.open(id);
```

`sys.newApp(title, html, bordlerless?, fullscreen?, id)` creates an app and returns its ID. The `bordlerless` spelling is intentional because it is part of the current API.

If an ID is supplied, it can later be passed to `app.open(id)`, `app.close(id)`, and the other window-management functions. If no ID is supplied, WebDE generates one.

### App controls

```js
app.open(id);          // Show an app
app.close(id);         // Close and remove an app
app.fullscreen(id);    // Make an app fill the desktop
app.borderless(id);    // Remove the title bar/border
app.windowed(id);      // Leave fullscreen mode
app.border(id);        // Restore the title bar/border
```

### System controls

```js
sys.reboot(reason, timebeforereboot);
sys.newApp(title, html, bordlerless?, fullscreen?, id);
sys.ramLeft();
sys.ramLeft(true);
```

`sys.reboot()` reloads the WebDE page after the specified delay in milliseconds.

`sys.ramLeft(false)` returns the number of RAM characters remaining. `sys.ramLeft(true)` returns the remaining RAM as a percentage.

## The 1,000-character RAM

All registered app HTML is represented in the `memory` variable. WebDE initializes it with 1,000 backslashes:

```js
let memory = "\\".repeat(1000);
```

For example, an app containing:

```html
<h1>App.</h1>
```

uses those characters at the current memory position, with the rest of the RAM remaining as backslashes.

Memory is **circular**. When new app data reaches the end of the 1,000-character RAM, writing wraps around to position `0` and starts overwriting the oldest memory. Because of this, creating more app data than the RAM can hold intentionally behaves like a tiny circular memory buffer. Humanity has reinvented overwriting a buffer and called it an operating system. 🫠

## Sample UI

`ui.js` contains a small example that creates an app with `sys.newApp()`, opens it with `app.open()`, and demonstrates RAM, fullscreen, and closing controls.

## Running

Open `index.html` in a browser. The page creates a demo app automatically and exposes the APIs globally as `app`, `sys`, and `WebDE`.
