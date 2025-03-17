import React, { useEffect, useState } from 'react';
import WSIViewer from './components/WSIViewer';
import HubView from './components/HubView';
import output from './data/output.json';

function App() {
  const [data, setData] = useState(null);
  const [inferenceResults, setInferenceResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Use the imported JSON file directly instead of fetch
        setData(output);

        // Check if we have inference_results in the data
        if (output.inference_results) {
          // Replace single quotes with double quotes for property names and string values
          let fixedInferenceResults = output.inference_results
            .trim()
            .replace(/'/g, '"') // Replace all single quotes with double quotes
            .replace(/,\s*}/g, '}') // Remove trailing commas in objects
            .replace(/,\s*]/g, ']') // Remove trailing commas in arrays
            .replace(/None/g, 'null')
            .replace(/True/g, 'true')
            .replace(/False/g, 'false') + '}';

          console.log("First 100 chars of fixed string:", fixedInferenceResults.substring(0, 100));

          // Parse the fixed inference string
          try {
            const inferenceObj = JSON.parse(fixedInferenceResults);
            console.log("Successfully parsed inference results");
            setInferenceResults(inferenceObj);

            // Log the first few detection results to check coordinates
            if (inferenceObj.output && inferenceObj.output.detection_results) {
              console.log("Sample detection results:", inferenceObj.output.detection_results.slice(0, 5));
              
              // Calculate the average box size to see what might be appropriate
              const detections = inferenceObj.output.detection_results;
              if (detections && detections.length > 0) {
                let totalWidth = 0;
                let totalHeight = 0;
                detections.forEach(box => {
                  const [xMin, yMin, xMax, yMax] = box;
                  totalWidth += (xMax - xMin);
                  totalHeight += (yMax - yMin);
                });
                const avgWidth = totalWidth / detections.length;
                const avgHeight = totalHeight / detections.length;
                console.log("Average box size:", { width: avgWidth, height: avgHeight });
              }
            }
          } catch (error) {
            console.error('Failed to parse inference_results:', error);
            
            // Get the error position
            const errorPosition = error.message.match(/position (\d+)/)?.[1];
            if (errorPosition) {
              const pos = parseInt(errorPosition);
              const start = Math.max(0, pos - 50);
              const end = Math.min(fixedInferenceResults.length, pos + 50);
              const context = fixedInferenceResults.substring(start, end);
              
              console.log('Error position:', pos);
              console.log('Context before error:', fixedInferenceResults.substring(start, pos));
              console.log('Context after error:', fixedInferenceResults.substring(pos, end));
              console.log('Full string length:', fixedInferenceResults.length);
            }
            
            return <div>Error parsing inference results. Check the console for details.</div>;
          }
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Extract detection_results
  const detectionResults = inferenceResults?.output?.detection_results || [];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Panel */}
      <div className="w-1/5 bg-white p-4 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800">Findings</h3>
        {/* Findings will go here */}
      </div>

      {/* Main Viewer */}
      <div className="w-3/5 bg-gray-50 p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Whole Slide Image Viewer</h2>
        {loading ? (
          <div className="flex items-center justify-center h-[600px]">
            <p>Loading data...</p>
          </div>
        ) : (
          <WSIViewer detectionResults={detectionResults} />
        )}
      </div>

      {/* Hub View */}
      <div className="w-1/5 bg-white p-4 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Hub View</h3>
        <HubView />
      </div>
    </div>
  );
}

export default App;