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

Every normal window can be dragged by its title bar and has a Wingdings close button.

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

## ui.js

`ui.js` is an actual sample program loaded automatically by `index.html`:

```html
<script src="ui.js"></script>
```

The important part is that `index.html` defines `window.app` and `window.sys` **before** loading `ui.js`. This means `ui.js` can immediately call `sys.newApp()` and `app.open()`.

The sample creates an app with ID `hello`, opens it, and adds buttons demonstrating RAM, fullscreen, and closing. There is **no separate hard-coded demo app** in `index.html`.

To make your own program, replace the contents of `ui.js` or create another JavaScript file and load it after the WebDE runtime:

```html
<script src="my-ui.js"></script>
```

Then use the global APIs:

```js
const id = sys.newApp("My Program", "<h1>Hello!</h1>", false, false, "my-program");
app.open(id);
```

## Running

Open `index.html` in a browser or deploy the repository with GitHub Pages. `index.html` boots the WebDE runtime first and then executes `ui.js` as the sample program.
