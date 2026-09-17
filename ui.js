// WebDE sample application UI.
// This file is intended to be loaded by an app or copied into an app's HTML.

const demo = sys.newApp(
  "Hello WebDE",
  `
    <h1>Hello from ui.js!</h1>
    <p>This window was registered with <code>sys.newApp()</code>.</p>
    <button id="ram">Check RAM</button>
    <button id="full">Fullscreen</button>
    <button id="close">Close</button>
  `,
  false, // borderless
  false, // fullscreen
  "hello"
);

app.open(demo);

// Because the HTML is mounted into the WebDE window, this example finds
// controls globally after opening the app.
document.getElementById("ram")?.addEventListener("click", () => {
  alert(`RAM left: ${sys.ramLeft()} digits (${sys.ramLeft(true)})`);
});

document.getElementById("full")?.addEventListener("click", () => {
  app.fullscreen("hello");
});

document.getElementById("close")?.addEventListener("click", () => {
  app.close("hello");
});
