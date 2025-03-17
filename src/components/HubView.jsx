import React, { useEffect, useRef } from 'react';
import OpenSeadragon from 'openseadragon';

const HubView = () => {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (viewerRef.current) {
      const viewer = OpenSeadragon({
        id: 'hub-viewer',
        prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
        tileSources: {
          Image: {
            xmlns: 'http://schemas.microsoft.com/deepzoom/2008',
            Url: '/dzi/img_files/', // Path to your DZI files
            Format: 'jpeg', // Change to 'jpg' if your WSI is in JPG format
            Overlap: '1',
            TileSize: '256',
            Size: {
              Width: '1076', // Replace with actual width of your WSI
              Height: '535', // Replace with actual height of your WSI
            },
          },
        },
        showNavigator: false,
        showNavigationControl: false,
        showZoomControl: false,
        showHomeControl: false,
        showFullPageControl: false,
        showRotationControl: false,
      });

      // Log viewer initialization
      console.log('Hub Viewer Initialized');

      // Cleanup on unmount
      return () => {
        viewer.destroy();
      };
    }
  }, []);

  return <div id="hub-viewer" ref={viewerRef} className="w-full h-[200px]"></div>;
};

export default HubView;