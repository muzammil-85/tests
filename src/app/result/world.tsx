import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const worldMapUrl = '/worldmads.json'; // Ensure this path is correct and accessible

interface CountryData {
  cntry_id: number;
  cntry_name: string;
  iso_a3: string;
  upload_count: number;
}

const WorldMap = () => {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [countryData, setCountryData] = useState<CountryData[]>([]);

  useEffect(() => {
    // Fetch country data from the API
    fetch('https://api-staging.greencleanearth.org/api/v1/common/countryMapData')
      .then(response => response.json())
      .then(data => setCountryData(data.countryData))
      .catch(error => console.error('Error fetching country data:', error));
  }, []);

  const handleClick = (iso_a3: string) => {
    const country = countryData.find(country =>
      country.iso_a3 === iso_a3
    );
    if (country) {
      setSelectedCountry(country);
    } else {
      console.log("Country not found");
    }
  };

  const handleOverlayClose = () => {
    setSelectedCountry(null); // Clear the selected country
  };

  return (
    <div style={{ textAlign: 'center', padding: '10px' }}>
      <h1 className='mb-1 text-primary text-2xl font-bold'>World Details</h1> {/* Reduced bottom margin */}
      <div className='mt-0'> {/* Removed top margin */}
        <ComposableMap
          projectionConfig={{
            scale: 120,  // Adjust scale to zoom in/out
            center: [0, 20], // Approximate center of the world, adjust as needed
          }}
          width={800}
          height={260}  // Adjust height to fit the whole map
          style={{ maxWidth: '100%', height: 'auto' }}
          className="map"
        >
          <Geographies geography={worldMapUrl}>
            {({ geographies }) =>
              geographies.map((geo, i) => (
                <Geography
                  key={i}
                  geography={geo}
                  fill="#D0E0F0"
                  stroke="#000"
                  strokeWidth={0.5}
                  onClick={() => {
                    console.log('Geo Properties:', geo.properties);  // Inspect the properties
                    handleClick(geo.properties.iso_a3 || geo.properties.adm0_a3 || geo.properties.su_a3 || geo.properties.brk_a3);
                  }}
                  style={{
                    default: {
                      outline: 'none',
                    },
                    hover: {
                      fill: '#F53',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                    },
                    pressed: {
                      outline: 'none',
                    },
                  }}
                />
              ))
            }
          </Geographies>
        </ComposableMap>
      </div>
      
      {selectedCountry && (
        <div className="overlay">
          <h3>{selectedCountry.cntry_name}</h3>
          <p>Upload Count: {selectedCountry.upload_count}</p> {/* Display upload count */}
          <button className="btn btn-secondary" onClick={handleOverlayClose}>
            Close
          </button>
        </div>
      )}

      <style jsx>{`
        .overlay {
          z-index: 10;
          max-width: 400px;
          width: 80%;
          text-align: center;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }

        @media (max-width: 768px) {
          .map {
            width: 100% !important;
            height: 200px !important;
          }
          .overlay {
            position: static;
            margin-top: 20px;
            transform: none;
            margin-left:0;
            margin-right:0;
            width: 100% !important;
          }
        }

        @media (min-width: 769px) {
          .map {
            width: 800px !important;
            height: 260px !important;
          }
          .overlay {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </div>
  );
};

export default WorldMap;
