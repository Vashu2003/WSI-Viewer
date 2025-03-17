import React, { useEffect, useRef } from 'react';
import OpenSeadragon from 'openseadragon';

const WSIViewer = ({ detectionResults }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (viewerRef.current) {
      const viewer = OpenSeadragon({
        id: 'wsi-viewer',
        prefixUrl: 'https://openseadragon.github.io/openseadragon/images/',
        tileSources: {
          Image: {
            xmlns: 'http://schemas.microsoft.com/deepzoom/2008',
            Url: '/dzi/img_files/',
            Format: 'jpeg',
            Overlap: '1',
            TileSize: '256',
            Size: {
              Width: '1076',
              Height: '535',
            },
          },
        },
        showNavigator: true,
        navigatorPosition: 'BOTTOM_RIGHT',
        defaultZoomLevel: 1,
        minZoomLevel: 0,
        maxZoomLevel: 10,
        visibilityRatio: 0.5,
        constrainDuringPan: true,
        showRotationControl: true,
        animationTime: 0.5,
        blendTime: 0.5,
        springStiffness: 6.5,
        imageLoaderLimit: 4,
        maxImageCacheCount: 200,
        immediateRender: false,
        wrapHorizontal: false,
        wrapVertical: false,
        minZoomImageRatio: 0.8,
        maxZoomPixelRatio: 2,
      });

      viewer.addHandler('open', () => {
        if (!detectionResults || detectionResults.length === 0) {
          return;
        }

        const imageWidth = viewer.source.dimensions.x;
        const imageHeight = viewer.source.dimensions.y;
        const viewportBounds = viewer.viewport.getBounds();

        viewer.clearOverlays();

        const validDetections = detectionResults.filter((box) => {
          const [xMin, yMin, xMax, yMax] = box;
          
          if (xMax <= xMin || yMax <= yMin) {
            return false;
          }
          
          const width = xMax - xMin;
          const height = yMax - yMin;
          
          if (width < 5 || height < 5 || width > imageWidth * 0.1 || height > imageHeight * 0.1) {
            return false;
          }
          
          if (xMin < 0 || yMin < 0 || xMax > imageWidth || yMax > imageHeight) {
            return false;
          }
          
          return true;
        });

        validDetections.forEach((box) => {
          const [xMin, yMin, xMax, yMax] = box;

          const scaledXMin = xMin / 1;
          const scaledYMin = yMin / 2;
          const scaledXMax = xMax / 1;
          const scaledYMax = yMax / 2;

          const normalizedX = scaledXMin / imageWidth;
          const normalizedY = scaledYMin / imageHeight;
          const normalizedWidth = (scaledXMax - scaledXMin) / imageWidth;
          const normalizedHeight = (scaledYMax - scaledYMin) / imageHeight;

          const rect = new OpenSeadragon.Rect(
            normalizedX,
            normalizedY,
            normalizedWidth,
            normalizedHeight
          );

          const overlayElement = document.createElement('div');
          overlayElement.className = 'bounding-box';
          overlayElement.style.border = '2px solid red';
          overlayElement.style.backgroundColor = 'transparent';
          overlayElement.style.position = 'absolute';
          overlayElement.style.pointerEvents = 'none';
          overlayElement.style.zIndex = '1000';
          overlayElement.style.boxSizing = 'border-box';
          overlayElement.style.overflow = 'hidden';

          viewer.addOverlay({
            element: overlayElement,
            location: rect,
            placement: OpenSeadragon.Placement.TOP_LEFT,
            rotationMode: OpenSeadragon.OverlayRotationMode.NO_ROTATION,
            checkResize: false
          });
        });

        viewer.forceRedraw();
      });

      return () => {
        viewer.destroy();
      };
    }
  }, [detectionResults]);

  return (
    <div 
      id="wsi-viewer" 
      ref={viewerRef} 
      className="w-full h-[600px]"
      style={{ position: 'relative' }}
    />
  );
};

export default WSIViewer;