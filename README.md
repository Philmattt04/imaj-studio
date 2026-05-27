# Imaj Studio

A browser-based image creation app. Design images with text, shapes, and AI-generated backgrounds, then export or share them directly.

**Live:** https://imaj.gwoupbousol.org

---

## Features

- **Canvas editor** — add text, rectangles, circles, triangles, lines, and images as individual layers
- **Background options** — solid color, linear/radial gradient, or image upload (cover, contain, stretch)
- **AI image generation** — describe a scene and generate an image via Pollinations AI; place it on the canvas or use it as a background
- **Export** — download as PNG (transparent background) or JPEG, with quality and scale controls
- **Share** — copy to clipboard, open WhatsApp, Telegram, or email; native OS share sheet on supported browsers
- **Image history** — opt-in export history stored in localStorage (up to 8 recent images)
- **Zoom** — zoom in/out or fit the canvas to the viewport; Ctrl+scroll supported
- **Keyboard shortcuts** — Delete to remove a selected element, Ctrl+D to duplicate, arrow keys to nudge

---

## How to Use

### 1. Set up your canvas
Pick a preset size (Instagram square, Twitter header, 16:9 HD, etc.) or type custom dimensions in the toolbar. Presets are also available in the **Setup** tab of the right panel.

### 2. Set a background
Open the **BG** tab and choose:
- **Color** — pick from swatches or enter a hex value
- **Gradient** — linear or radial, with adjustable angle
- **Image** — upload a file and choose how it fills the canvas

### 3. Add elements
Use the toolbar at the top to add Text, Rect, Circle, Triangle, Line, or Image layers. Each element can be selected on the canvas to edit its properties in the right panel (color, font, size, opacity, rotation, shadow, etc.).

Layers are listed in the **Layers** panel at the bottom of the sidebar. Click a layer to select it, toggle its visibility, or delete it.

### 4. Generate with AI
Click **AI Generate** in the toolbar (or open the **AI** tab). Write a prompt, pick a style and background mood, optionally add text to the image, then click **Generate Image**. Once generated you can add it to the canvas, set it as the background, download it, or share it.

### 5. Export
- **Download** — exports the image. If "Transparent bg" is on (default), the canvas background is stripped and the file is saved as PNG. Otherwise it exports as JPEG.
- **Share** — opens a share sheet with options: copy to clipboard, WhatsApp, Telegram, Email, or the device's native share dialog.
- **Filename** — set a name in the header or the Export tab; both fields stay in sync.

On **mobile**, floating **Export** and **Share** buttons appear above the bottom panel so you can export without opening any menus.

---

## Project Structure

```
imaj-studio/
├── index.html   # App shell and all UI markup
├── style.css    # All styles (desktop + mobile responsive)
├── app.js       # All application logic (Fabric.js, AI, export, history)
└── server/      # Optional Express server (not required for the static app)
    ├── index.js
    └── package.json
```

The app is entirely client-side — no build step required. Open `index.html` in a browser or serve the folder with any static file server.

---

## Dependencies

- [Fabric.js 5.3](https://fabricjs.com/) — canvas manipulation (loaded via CDN)
- [Pollinations AI](https://pollinations.ai/) — free, no-key AI image generation
- Google Fonts — Lato, Montserrat, Oswald, Playfair Display, Roboto

---

## Deployment

The live app is hosted on AWS S3 + CloudFront under the `gwoupbousol.org` domain.

To update the deployment, upload `index.html`, `style.css`, and `app.js` to the S3 bucket, then invalidate the CloudFront distribution.
