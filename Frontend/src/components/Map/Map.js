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

import _ from "lodash";
import * as geoUrl from "./vietnam.json";

const COLOR_RANGE = [
  "#8896B5"

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
    {
      id: 2,
      state: "Cao Bằng",
      value: getRandomInt()
    },
    {
      id: 3,
      state: "Lào Cai",
      value: getRandomInt()
    },
    {
      id: 4,
      state: "Lai Châu",
      value: getRandomInt()
    },
    {
      id: 5,
      state: "Bắc Kạn",
      value: getRandomInt()
    },
    {
      id: 6,
      state: "Tuyên Quang",
      value: getRandomInt()
    },
    {
      id: 7,
      state: "Lạng Sơn",
      value: getRandomInt()
    },
    {
      id: 8,
      state: "Yên Bái",
      value: getRandomInt()
    },
    {
      id: 9,
      state: "Điện Biên",
      value: getRandomInt()
    },
    {
      id: 10,
      state: "Thái Nguyên",
      value: getRandomInt()
    },
    {
      id: 11,
      state: "Bắc Giang",
      value: getRandomInt()
    },
    {
      id: 12,
      state: "Vĩnh Phúc",
      value: getRandomInt()
    },
    {
      id: 13,
      state: "Phú Thọ",
      value: getRandomInt()
    },
    {
      id: 14,
      state: "Quảng Ninh",
      value: getRandomInt()
    },
    {
      id: 15,
      state: "Sơn La",
      value: getRandomInt()
    },
    {
      id: 16,
      state: "Bắc Ninh",
      value: getRandomInt()
    },
    {
      id: 17,
      state: "Hà Nội",
      value: 251
    },
    {
      id: 18,
      state: "Hải Dương",
      value: getRandomInt()
    },
    {
      id: 19,
      state: "Hưng Yên",
      value: getRandomInt()
    },
    {
      id: 20,
      state: "Hải Phòng",
      value: getRandomInt()
    },
    {
      id: 21,
      state: "Hoà Bình",
      value: getRandomInt()
    },
    {
      id: 22,
      state: "Hà Nam",
      value: getRandomInt()
    },
    {
      id: 23,
      state: "Thái Bình",
      value: getRandomInt()
    },
    {
      id: 24,
      state: "Nam Định",
      value: getRandomInt()
    },
    {
      id: 25,
      state: "Ninh Bình",
      value: getRandomInt()
    },
    {
      id: 26,
      state: "Thanh Hóa",
      value: getRandomInt()
    },
    {
      id: 28,
      state: "Nghệ An",
      value: getRandomInt()
    },
    {
      id: 29,
      state: "Hà Tĩnh",
      value: getRandomInt()
    },
    {
      id: 30,
      state: "Quảng Bình",
      value: getRandomInt()
    },
    {
      id: 31,
      state: "Quảng Trị",
      value: getRandomInt()
    },
    {
      id: 32,
      state: "Thừa Thiên Huế",
      value: getRandomInt()
    },
    {
      id: 33,
      state: "Đà Nẵng",
      value: getRandomInt()
    },
    {
      id: 34,
      state: "Quảng Nam",
      value: getRandomInt()
    },
    {
      id: 35,
      state: "Quảng Ngãi",
      value: getRandomInt()
    },
    {
      id: 36,
      state: "Kon Tum",
      value: getRandomInt()
    },
    {
      id: 37,
      state: "Bình Định",
      value: getRandomInt()
    },
    {
      id: 38,
      state: "Gia Lai",
      value: getRandomInt()
    },
    {
      id: 39,
      state: "Phú Yên",
      value: getRandomInt()
    },
    {
      id: 40,
      state: "Đắk Lắk",
      value: getRandomInt()
    },
    {
      id: 41,
      state: "Khánh Hòa",
      value: getRandomInt()
    },
    {
      id: 42,
      state: "Đắk Nông",
      value: getRandomInt()
    },
    {
      id: 43,
      state: "Bình Phước",
      value: getRandomInt()
    },
    {
      id: 44,
      state: "Lâm Đồng",
      value: getRandomInt()
    },
    {
      id: 45,
      state: "Ninh Thuận",
      value: getRandomInt()
    },
    {
      id: 46,
      state: "Tây Ninh",
      value: getRandomInt()
    },
    {
      id: 47,
      state: "Bình Dương",
      value: getRandomInt()
    },
    {
      id: 48,
      state: "Bình Thuận",
      value: getRandomInt()
    },
    {
      id: 49,
      state: "Đồng Nai",
      value: getRandomInt()
    },
    {
      id: 50,
      state: "Hồ Chí Minh",
      value: getRandomInt()
    },
    {
      id: 51,
      state: "Long An",
      value: getRandomInt()
    },
    {
      id: 52,
      state: "Bà Rịa - Vũng Tàu",
      value: getRandomInt()
    },
    {
      id: 53,
      state: "Đồng Tháp",
      value: getRandomInt()
    },
    {
      id: 54,
      state: "An Giang",
      value: getRandomInt()
    },
    {
      id: 55,
      state: "Tiền Giang",
      value: getRandomInt()
    },
    {
      id: 56,
      state: "Bến Tre",
      value: getRandomInt()
    },
    {
      id: 57,
      state: "Cần Thơ",
      value: getRandomInt()
    },
    {
      id: 58,
      state: "Vĩnh Long",
      value: getRandomInt()
    },
    {
      id: 59,
      state: "Kiên Giang",
      value: getRandomInt()
    },
    {
      id: 60,
      state: "Trà Vinh",
      value: getRandomInt()
    },
    {
      id: 61,
      state: "Hậu Giang",
      value: getRandomInt()
    },
    {
      id: 62,
      state: "Sóc Trăng",
      value: getRandomInt()
    },
    {
      id: 63,
      state: "Bạc Liêu",
      value: 512
    },
    {
      id: 64,
      state: "Cà Mau",
      value: getRandomInt()
    }
  ];
};
const customTexts = {
  "Hà Giang": {
    text: "Custom text for Hà Giang",
    link: "/ha-giang"
  },
  "Cao Bằng": {
    text: "Custom text for Cao Bằng",
    link: "/cao-bang"
  },
  "Hà Nội": {
    text: 'Dải đất nay là Hà Nội có dân cư từ vài ngàn năm trước nhưng cái tên gọi Hà Nội thì chỉ có từ năm 1831. Nguyên là từ năm 1010, vua Lý Thái Tổ dời đô ra thành Ðại La, đổi gọi thành này là kinh đô Thăng Long.<br> <img src= "https://nguoikesu.com/images/wiki/nha-nguyen/f3ddf4ba5ac21a0f1ab37de7ccf99789.jpg" width="500" height="400" /> </br>Kinh đô ngày ấy ứng với quận Hoàn Kiếm và một phần của hai quận Ðống Ða, Hai Bà Trưng ngày nay. Sau đó địa giới Thăng Long dần mở rộng và tới cuối thế kỷ 18 thì tương ứng với năm quận nội thành bây giờ. Năm 1802, nhà Nguyễn lên ngôi dời đô về Huế, Thăng Long không còn là Kinh đô nữa và ít lâu sau bị đổi gọi là phủ Hoài Ðức. <br/> <br/>Năm 1831, có một cuộc cải cách hành chính lớn: xoá bỏ các trấn, thành lập các tỉnh. Từ đó ra đời tỉnh Hà Nội. Sở dĩ có tên gọi này vì tỉnh mới nằm trong (nội) hai con sông (hà) là sông Hồng và sông Ðáy, gồm có 4 phủ, 15 huyện. Tỉnh lỵ đặt tại thành Thăng Long cũ, do vậy Thăng Long được gọi là tỉnh thành Hà Nội rồi nói gọn lại là Hà Nội',

    links: ["/video-details/2", "/video-details/3"],
    images: ["/LogoSuViet.jpg"]
  },

};
const MapCustom = memo(() => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const [data, setData] = useState(getHeatMapData());
  const [customText, setCustomText] = useState("");
  const [customLinks, setCustomLinks] = useState("");
  const [customImages, setCustomImages] = useState("");
  const linkLabels = {
    "/video-details/2": "Tầm nhìn của Bác Hồ về chiến dịch Điện Biên Phủ trên không",
    "/another-link": "Custom Label 2",
    "/cao-bang": "Custom Label 3",
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
      fill: "#3A5182",
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

  const handleClick = (geo, current = {}) => {
    const { NAME_1 } = geo.properties;
    setSelectedState(current);
    const countryInfo = customTexts[current.state] || {};
    const { text = "", links = [], images = [] } = countryInfo;
    setCustomText(text);
    setCustomLinks(links);
    setCustomImages(images);
  };

  const onChangeButtonClick = () => {
    setData(getHeatMapData());
    setSelectedState(null);
    setCustomText("");
  };
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <ComposableMap
            height={1000}
            projectionConfig={{
              scale: 3550,
              center: [107, 16]
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
                          ? "#3A5182"
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

        <div style={{ flex: 2 }}>
          {selectedState && (
            <div>
              <Card style={{ backgroundColor: '#FFFFFF' }}>
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
              </Card>

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

export default function Map() {
  return (
    <Card style={{ backgroundColor: '#F5F5F5' }}>
      <MapCustom />
    </Card>
  )
}
