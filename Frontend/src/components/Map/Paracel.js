// import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
// import React from "react";
// import './Map.css';

// const Map = () => {

//   return (
//     <div className="map-container3">
//       <MapContainer center={[51.505, -0.09]} zoom={22} scrollWheelZoom={false}>
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=b65a5ada90fc4657b7f590ccbcf01128"
//         />
//         <Marker position={[51.505, -0.09]}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </MapContainer>
//     </div>
//   );
// }

// export default Map;


import React, { useState, memo } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import './Map.css';

import _ from "lodash";
import * as geoUrl from "./paracel.json";

import backgroundImage from './map.jpg';


const COLOR_RANGE = [
  "#c3e2f3",
  "#f5dbca",
  "#cbcb89",


];

const DEFAULT_COLOR = "#EEE";

const getRandomInt = () => {
  return Math.floor(Math.random() * 100);
};

const getHeatMapData = () => {
  return [
    {
      id: 1,
      state: "Hà Giang",
      value: getRandomInt()
    },
   
  ];
};
const customTexts = {
  "Hà Nam": {
    text: "Nằm về phía ",
    images: ["https://www.aseantraveller.net/source/img_news/815.jpg"]
  },
 

};
const Paracel = memo(() => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const [data, setData] = useState(getHeatMapData());
  const [customText, setCustomText] = useState("");
  const [customLinks, setCustomLinks] = useState("");
  const [customImages, setCustomImages] = useState("");
  const linkLabels = {
    "/video-details/76": "Lăng Chủ tịch Hồ Chí Minh",
    // Add custom labels for other links...
  };


  const geographyStyle = {
    default: {
      outline: "none"
    },
    hover: {
      fill: "#ccc",
      transition: "all 250ms",
      outline: "none"
    },
    pressed: {
      outline: "none"
    },
    selected: {
      fill: "#FFC701",
      outline: "none"
    }
  };

  const colorScale = scaleQuantile()
    .domain(data.map((d) => d.value))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current) => {
    if (current) {
      setTooltipContent(current.state);
    }
  };


  const onMouseLeave = () => {
    setTooltipContent("");
  };

  // const onChangeButtonClick = () => {
  //   setData(getHeatMapData());
  // };
  const [mapClicked, setMapClicked] = useState(false);
  const handleClick = (geo, current = {}) => {
    const { NAME_1 } = geo.properties;
    setSelectedState(current);
    const countryInfo = customTexts[current.state] || {};
    const { text = "", links = [], images = [] } = countryInfo;
    setCustomText(text);
    setCustomLinks(links);
    setCustomImages(images);
    setMapClicked(true);
  };
  const [mapScale, setMapScale] = useState(3300);
 

  return (
    <div>
      <div style={{ height: "100vh", display: "flex" }}>
        {!mapClicked ? (
          <div className='map' style={{ flex: 1,display: "flex", margin: 'auto' , width: '300px', height: '1000px', overflow:'auto' }}>
            <ComposableMap
              style={{ width: '2000px', height: '3000px' }}
              projectionConfig={{
                scale: mapScale,
                center: [107, 16],
              }}
              projection="geoMercator"
              data-tip=""
            >
              <Geographies geography={geoUrl}  >
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const current = data.find(
                      (s) => s.state === geo.properties.NAME_1
                    );
                    return (
                      <Geography
                        data-tooltip-id="my-tooltip"
                        key={geo.rsmKey}
                        geography={geo}
                        fill={
                          selectedState && selectedState.state === current?.state
                            ? "#FFC701"
                            : current
                              ? colorScale(current.value)
                              : DEFAULT_COLOR
                        }
                        onMouseEnter={() => onMouseEnter(geo, current)}
                        onMouseLeave={onMouseLeave}
                        onClick={() => handleClick(geo, current)}
                        style={geographyStyle}

                      />
                    );
                  })
                }
              </Geographies>
              {/* Add Marker for Hanoi */}
              <Marker coordinates={[105.784817, 20.8011]} fill="#FF0000">
                {/* <circle r={4} /> */}
                <text
                  textAnchor="middle"
                  y={-10}
                  style={{ fontFamily: "system-ui", fontSize: "15px" }}
                >
                  ★
                </text>
              </Marker>
            </ComposableMap>
          </div>
        ) : ( 
          <div className='map-animation' style={{ flex: 1 }}>
            <ComposableMap
              height={1000}
              projectionConfig={{
                scale: 3550,
                center: [107, 16],
              }}
              projection="geoMercator"
              data-tip=""
            >
              
              <Geographies geography={geoUrl}  >
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const current = data.find(
                      (s) => s.state === geo.properties.NAME_1
                    );
                    return (
                      
                      <Geography
                        data-tooltip-id="my-tooltip"
                        key={geo.rsmKey}
                        geography={geo}
                        fill={
                          selectedState && selectedState.state === current?.state
                            ? "#FFC701"
                            : current
                              ? colorScale(current.value)
                              : DEFAULT_COLOR
                        }
                        onMouseEnter={() => onMouseEnter(geo, current)}
                        onMouseLeave={onMouseLeave}
                        onClick={() => handleClick(geo, current)}
                        style={geographyStyle}

                      />
                    );
                  })
                }
              </Geographies>
              {/* Add Marker for Hanoi */}
              <Marker coordinates={[105.784817, 20.8011]} fill="#FF0000">
                {/* <circle r={4} /> */}
                <text
                  textAnchor="middle"
                  y={-10}
                  style={{ fontFamily: "system-ui", fontSize: "15px" }}
                >
                  ★
                </text>
              </Marker>
              
            </ComposableMap>
          </div>
          
        )}
        <div style={{ flex: mapClicked ? 2 : 0 }}>

          {selectedState && (
            <div className="mapcontent">

                <h2>{selectedState.state}</h2>

                <p>
                  {Array.isArray(customImages) && (
                    customImages.map((image, index) => (
                      <img key={index}
                        src={image}
                        alt={`Country Image ${index + 1}`}
                        style={{ width: "300px", height: "150px" }} />
                    ))
                  )}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: customText
                    }}
                  ></p>


                  {Array.isArray(customLinks) &&
                    customLinks.map((link, index) => (
                      <p key={index}>
                        <Link to={link} className="custom-link">
                          {linkLabels[link] || `Link ${index + 1}`}
                        </Link>
                      </p>
                    ))}


                </p>


            </div>
          )}
          {/* <p>Content: {selectedState.content}</p> */}
        </div>

      </div>
      <Tooltip id="my-tooltip">
        <div>
          {tooltipContent}
        </div>
      </Tooltip>
    </div>
  );
});

export default Paracel
