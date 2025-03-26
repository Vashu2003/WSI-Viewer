# WSI Viewer Application

A modern, interactive Whole Slide Image (WSI) viewer application built with React and OpenSeadragon. This application allows medical professionals to view and analyze whole slide images with detection overlays, making it easier to identify and analyze various cell types in blood smears.

## Features

- 🔍 Interactive WSI viewing with zoom, pan, and navigation controls
- 📊 Detection results table with cell type statistics
- 🎯 Bounding box overlays for detected cells
- ⚡ Real-time date and time display
- 🎨 Modern, minimal UI design
- ⌨️ Keyboard shortcuts for quick actions
- 📱 Responsive layout
- 🖨️ Report generation capabilities
- 💾 Export and sharing functionality

## Tech Stack

- React
- OpenSeadragon
- TailwindCSS
- JavaScript (ES6+)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wsi-viewer
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

## Project Structure

```
src/
├── components/
│   ├── WSIViewer.jsx       # Main viewer component
│   └── DetectionTable.jsx  # Detection results table
├── data/
│   └── output.json        # Sample detection results
├── App.jsx                # Root component
└── index.js              # Entry point
```

## Usage

### Keyboard Shortcuts

- `Ctrl + T`: Toggle detection table
- `Ctrl + R`: Generate report
- `Ctrl + P`: Print view

### Viewer Controls

- Zoom In/Out buttons
- Home button to reset view
- Navigation thumbnail
- Detection table toggle
- Report generation

### Detection Table

The detection table shows statistics for:
- RBC (Red Blood Cells)
- WBC (White Blood Cells)
- Platelets

Each section displays:
- Cell type counts
- Percentage distribution
- Color-coded rows for easy identification

## Configuration

### OpenSeadragon Settings

The viewer can be configured by modifying the options in `WSIViewer.jsx`:

```javascript
const viewer = OpenSeadragon({
  // Viewer settings
  defaultZoomLevel: 0,
  minZoomLevel: 0,
  maxZoomLevel: 10,
  
  // Performance settings
  imageLoaderLimit: 4,
  maxImageCacheCount: 200,
  
  // ... other settings
});
```

### Detection Overlay Styling

Modify the overlay appearance in the `addDetectionOverlay` function:

```javascript
Object.assign(overlayElement.style, {
  border: "2px solid blue",
  backgroundColor: "transparent",
  // ... other styles
});
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenSeadragon for the powerful viewing capabilities
- TailwindCSS for the modern UI components
- React team for the excellent framework

## Support

For support, please open an issue in the repository or contact the development team.
