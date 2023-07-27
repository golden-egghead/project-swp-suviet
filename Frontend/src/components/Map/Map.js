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


import React, { useRef, useState, memo } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import './Map.css';

// import _ from "lodash";
import * as geoUrl from "./vietnam.json";

import backgroundImage from './map.jpg';
import Paracel from "./Paracel";


const COLOR_RANGE = [
  "#FABEA6",
  "#FFF6B1",
  "#B7D99C",
  "#A397C7",
  "#8A7837",
  "#F08B00",
  "#3CDCF2",
  "#13BDA2"


];

const DEFAULT_COLOR = "#EEE";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};
const graphColoring = (adjacencyMatrix, colorRange) => {
  const numCountries = adjacencyMatrix.length;
  const countryColors = new Array(numCountries).fill(DEFAULT_COLOR);

  const isSafeColor = (countryIndex, color) => {
    for (let i = 0; i < numCountries; i++) {
      if (adjacencyMatrix[countryIndex][i] && countryColors[i] === color) {
        return false;
      }
    }
    return true;
  };

  const colorCountry = (countryIndex) => {
    for (let color of colorRange) {
      if (isSafeColor(countryIndex, color)) {
        return color;
      }
    }
    return DEFAULT_COLOR;
  };

  for (let i = 0; i < numCountries; i++) {
    countryColors[i] = colorCountry(i);
  }

  return countryColors;
};

const getHeatMapData = () => {

  const data = [
    {
      id: 1,
      state: "Hà Giang",
      value: getRandomInt(100)
    },
    {
      id: 2,
      state: "Cao Bằng",
      value: getRandomInt(100)
    },
    {
      id: 3,
      state: "Lào Cai",
      value: getRandomInt(100)
    },
    {
      id: 4,
      state: "Lai Châu",
      value: getRandomInt(100)
    },
    {
      id: 5,
      state: "Bắc Kạn",
      value: getRandomInt(100)
    },
    {
      id: 6,
      state: "Tuyên Quang",
      value: getRandomInt(100)
    },
    {
      id: 7,
      state: "Lạng Sơn",
      value: getRandomInt(100)
    },
    {
      id: 8,
      state: "Yên Bái",
      value: getRandomInt(100)
    },
    {
      id: 9,
      state: "Điện Biên",
      value: getRandomInt(100)
    },
    {
      id: 10,
      state: "Thái Nguyên",
      value: getRandomInt(100)
    },
    {
      id: 11,
      state: "Bắc Giang",
      value: getRandomInt(100)
    },
    {
      id: 12,
      state: "Vĩnh Phúc",
      value: getRandomInt(100)
    },
    {
      id: 13,
      state: "Phú Thọ",
      value: getRandomInt(100)
    },
    {
      id: 14,
      state: "Quảng Ninh",
      value: getRandomInt(100)
    },
    {
      id: 15,
      state: "Sơn La",
      value: getRandomInt(100)
    },
    {
      id: 16,
      state: "Bắc Ninh",
      value: getRandomInt(100)
    },
    {
      id: 17,
      state: "Hà Nội",
      value: 251
    },
    {
      id: 18,
      state: "Hải Dương",
      value: getRandomInt(100)
    },
    {
      id: 19,
      state: "Hưng Yên",
      value: getRandomInt(100)
    },
    {
      id: 20,
      state: "Hải Phòng",
      value: getRandomInt(100)
    },
    {
      id: 21,
      state: "Hoà Bình",
      value: getRandomInt(100)
    },
    {
      id: 22,
      state: "Hà Nam",
      value: getRandomInt(100)
    },
    {
      id: 23,
      state: "Thái Bình",
      value: getRandomInt(100)
    },
    {
      id: 24,
      state: "Nam Định",
      value: getRandomInt(100)
    },
    {
      id: 25,
      state: "Ninh Bình",
      value: getRandomInt(100)
    },
    {
      id: 26,
      state: "Thanh Hóa",
      value: getRandomInt(100)
    },
    {
      id: 28,
      state: "Nghệ An",
      value: getRandomInt(100)
    },
    {
      id: 29,
      state: "Hà Tĩnh",
      value: getRandomInt(100)
    },
    {
      id: 30,
      state: "Quảng Bình",
      value: getRandomInt(100)
    },
    {
      id: 31,
      state: "Quảng Trị",
      value: getRandomInt(100)
    },
    {
      id: 32,
      state: "Thừa Thiên Huế",
      value: getRandomInt(100)
    },
    {
      id: 33,
      state: "Đà Nẵng",
      value: getRandomInt(100)
    },
    {
      id: 34,
      state: "Quảng Nam",
      value: getRandomInt(100)
    },
    {
      id: 35,
      state: "Quảng Ngãi",
      value: getRandomInt(100)
    },
    {
      id: 36,
      state: "Kon Tum",
      value: getRandomInt(100)
    },
    {
      id: 37,
      state: "Bình Định",
      value: getRandomInt(100)
    },
    {
      id: 38,
      state: "Gia Lai",
      value: getRandomInt(100)
    },
    {
      id: 39,
      state: "Phú Yên",
      value: getRandomInt(100)
    },
    {
      id: 40,
      state: "Đắk Lắk",
      value: getRandomInt(100)
    },
    {
      id: 41,
      state: "Khánh Hòa",
      value: getRandomInt(100)
    },
    {
      id: 42,
      state: "Đắk Nông",
      value: getRandomInt(100)
    },
    {
      id: 43,
      state: "Bình Phước",
      value: getRandomInt(100)
    },
    {
      id: 44,
      state: "Lâm Đồng",
      value: getRandomInt(100)
    },
    {
      id: 45,
      state: "Ninh Thuận",
      value: getRandomInt(100)
    },
    {
      id: 46,
      state: "Tây Ninh",
      value: getRandomInt(100)
    },
    {
      id: 47,
      state: "Bình Dương",
      value: getRandomInt(100)
    },
    {
      id: 48,
      state: "Bình Thuận",
      value: getRandomInt(100)
    },
    {
      id: 49,
      state: "Đồng Nai",
      value: getRandomInt(100)
    },
    {
      id: 50,
      state: "Hồ Chí Minh",
      value: getRandomInt(100)
    },
    {
      id: 51,
      state: "Long An",
      value: getRandomInt(100)
    },
    {
      id: 52,
      state: "Bà Rịa - Vũng Tàu",
      value: getRandomInt(100)
    },
    {
      id: 53,
      state: "Đồng Tháp",
      value: getRandomInt(100)
    },
    {
      id: 54,
      state: "An Giang",
      value: getRandomInt(100)
    },
    {
      id: 55,
      state: "Tiền Giang",
      value: getRandomInt(100)
    },
    {
      id: 56,
      state: "Bến Tre",
      value: getRandomInt(100)
    },
    {
      id: 57,
      state: "Cần Thơ",
      value: getRandomInt(100)
    },
    {
      id: 58,
      state: "Vĩnh Long",
      value: getRandomInt(100)
    },
    {
      id: 59,
      state: "Kiên Giang",
      value: getRandomInt(100)
    },
    {
      id: 60,
      state: "Trà Vinh",
      value: getRandomInt(100)
    },
    {
      id: 61,
      state: "Hậu Giang",
      value: getRandomInt(100)
    },
    {
      id: 62,
      state: "Sóc Trăng",
      value: getRandomInt(100)
    },
    {
      id: 63,
      state: "Bạc Liêu",
      value: 512
    },
    {
      id: 64,
      state: "Cà Mau",
      value: getRandomInt(100)
    }
  ];
  const adjacencyMatrix = [
    [0, 1, 1, 0, 0, 0], // Country 1 is adjacent to Country 2 and Country 3
    [1, 0, 0, 1, 0, 0], // Country 2 is adjacent to Country 1 and Country 4
    [1, 0, 0, 0, 1, 0], // Country 3 is adjacent to Country 1 and Country 5
    [0, 1, 0, 0, 0, 1], // Country 4 is adjacent to Country 2 and Country 6
    [0, 0, 1, 0, 0, 0], // Country 5 is adjacent to Country 3
    [0, 1, 0, 1, 0, 0],  // Country 6 is adjacent to Country 4
  ];

  const colorRange = COLOR_RANGE.slice(); // Create a copy of the color range to avoid modifying the original array

  const countryColors = graphColoring(adjacencyMatrix, colorRange);

  // Assign colors to the countries
  data.forEach((country, index) => {
    country.color = countryColors[index];
  });

  return data;
}

const customTexts = {
  "Hà Nam": {
    text: "Nằm về phía Tây Nam châu thổ sông Hồng, cách trung tâm Hà Nội chừng 65km, tỉnh Hà Nam là cửa ngõ phía Nam của thủ đô – Đông giáp các tỉnh Hưng Yên và Thái Bình, Nam giáp các tỉnh Nam Định và Ninh Bình, Tây giáp tỉnh Hòa Bình và Bắc giáp Hà Nội. Hà Nam có diện tích 823,1km² với dân số 785.057 người theo thống kê 1-4-2009.",
    images: ["https://www.aseantraveller.net/source/img_news/815.jpg"],
    videos: [
      "https://www.youtube.com/embed/VL8rleuaUlU",
    ],
  },
  "Thái Bình": {
    text: "<p> Thái Bình là một tỉnh thuộc vùng đồng bằng sông Hồng, nằm ở phía đông bắc của miền Bắc Việt Nam. Tỉnh Thái Bình giáp biển Đông về phía đông, giáp tỉnh Nam Định về phía nam, tỉnh Hưng Yên và tỉnh Hải Dương về phía đông nam, tỉnh Hải Phòng về phía đông bắc và Thành phố Hải Phòng cách tỉnh Thái Bình khoảng 50 km.<br>Tọa độ địa lý của tỉnh Thái Bình:<br><br>- Vĩ độ: từ khoảng 20 độ 23 phút đến 20 độ 39 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 106 độ 08 phút đến 106 độ 35 phút kinh độ Đông.</p>",
    images: ["https://www.kynghidongduong.vn/userfiles/images/tour-nuoc-ngoai/nam-ninh-que-lam/thai-binh-co-tran-sung-ta-du-lich-nam-ninh-kynghidongduong-022.jpg"],
    videos: [
      "https://www.youtube.com/embed/k_CfVynoCX0",
    ],
  },
  "Nam Định": {
    text: "<p> Nam Định là một tỉnh nằm ở phía bắc Việt Nam, thuộc vùng đồng bằng sông Hồng. Tỉnh này giáp biển Đông về phía đông, giáp tỉnh Thái Bình về phía bắc, giáp tỉnh Ninh Bình về phía nam, tỉnh Hà Nam về phía tây nam và Thành phố Hải Phòng cách Nam Định khoảng 60 km về phía đông bắc. Dưới đây là thông tin chi tiết về vị trí địa lý của Nam Định:<br><br>- Vĩ độ: từ khoảng 20 độ 08 phút đến 20 độ 32 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 105 độ 55 phút đến 106 độ 22 phút kinh độ Đông.</p>",
    images: ["https://upload.wikimedia.org/wikipedia/commons/f/f4/Statue_of_Tran_Hung_Dao%2C_Nam_Dinh_City%2C_Vietnam_%2803%29.jpg"],
    videos: [
      "https://www.youtube.com/embed/-I9uEr5k_FQ",
    ],
  },
  "Ninh Bình": {
    text: "<p> Ninh Bình là một tỉnh nằm ở phía bắc Việt Nam, thuộc vùng đồng bằng sông Hồng. Tỉnh này nằm ở phía nam của Thủ đô Hà Nội và cách Hà Nội khoảng 91 km về phía nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Ninh Bình:<br><br>- Vĩ độ: từ khoảng 20 độ 08 phút đến 20 độ 32 phút vĩ độ Bắc.<br>- Vĩ độ: từ khoảng 19 độ 09 phút đến 20 độ 17 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 105 độ 40 phút đến 106 độ 25 phút kinh độ Đông.</p>",
    images: ["https://top10ninhbinh.com/wp-content/uploads/2021/06/chua-ninh-binh-2.jpg"],
    videos: [
      "https://www.youtube.com/embed/8RnUI3YMxzk",
    ],
  },
  "Thanh Hóa": {
    text: "<p> Thanh Hóa là một tỉnh nằm ở phía bắc của miền Trung Việt Nam. Tỉnh này có vị trí địa lý chiến lược, giáp biển Đông về phía đông, giáp các tỉnh Nghệ An và Hà Tĩnh về phía nam, giáp tỉnh Ninh Bình về phía tây và giáp tỉnh Hà Nam về phía tây bắc. Dưới đây là thông tin chi tiết về vị trí địa lý của Thanh Hóa:<br><br>- Vĩ độ: từ khoảng 19 độ 49 phút đến 21 độ 40 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 104 độ 27 phút đến 106 độ 11 phút kinh độ Đông.</p>",
    images: ["http://www.nhatuvanmocque.com/kcfinder/upload/images/57Ditichhamrong05.jpg"],
    videos: [
      "https://www.youtube.com/embed/A7ll8zlU9VU",
    ],
  },
  "Nghệ An": {
    text: "<p> Nghệ An là một tỉnh nằm ở phía bắc miền Trung Việt Nam. Tỉnh này có vị trí địa lý đắc địa, giáp biển Đông về phía đông, giáp tỉnh Thanh Hóa về phía nam, giáp tỉnh Hà Tĩnh về phía nam và đông nam, giáp Lào về phía tây bắc. Dưới đây là thông tin chi tiết về vị trí địa lý của Nghệ An:<br><br>- Vĩ độ: từ khoảng 18 độ 12 phút đến 20 độ 05 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 103 độ 14 phút đến 105 độ 56 phút kinh độ Đông.</p>",
    links: ["/historicalfigure-details/40"],
    images: ["https://media.truyenhinhdulich.vn/upload/news/75_thanh_co_nghe_an_ngoi_thanh_chung_tich_lich_su.jpg"],
    videos: [
      "https://www.youtube.com/embed/Y6uHw9y7YqQ",
    ],
  },
  "Hà Tĩnh": {
    text: "<p> Hà Tĩnh là một tỉnh nằm ở phía bắc miền Trung Việt Nam. Tỉnh này có vị trí địa lý chiến lược, giáp biển Đông về phía đông, giáp tỉnh Quảng Bình về phía nam, giáp tỉnh Nghệ An về phía bắc, và giáp Lào về phía tây. Dưới đây là thông tin chi tiết về vị trí địa lý của Hà Tĩnh:<br><br>- Vĩ độ: từ khoảng 17 độ 49 phút đến 18 độ 55 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 104 độ 40 phút đến 106 độ 00 phút kinh độ Đông.</p>",
    images: ["https://baoxaydung.com.vn/stores/news_dataimages/hiep/122021/12/09/5555_image003.jpg"],
    videos: [
      "https://www.youtube.com/embed/OhiQoBPoMrU",
    ],
  },
  "Quảng Bình": {
    text: "<p> Quảng Bình là một tỉnh nằm ở phía bắc miền Trung Việt Nam. Tỉnh này có vị trí địa lý đắc địa, giáp biển Đông về phía đông, giáp tỉnh Hà Tĩnh về phía nam, giáp tỉnh Quảng Trị về phía bắc, và giáp Lào về phía tây. Dưới đây là thông tin chi tiết về vị trí địa lý của Quảng Bình:<br><br>- Vĩ độ: từ khoảng 17 độ 20 phút đến 18 độ 30 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 104 độ 30 phút đến 106 độ 11 phút kinh độ Đông.</p>",
    images: ["https://image.vtc.vn/resize/th/upload/2022/08/17/qb-quan-khanh-tuan-14375226.jpg"],
    videos: [
      "https://www.youtube.com/embed/raJigU6v02k",
    ],
  },
  "Quảng Trị": {
    text: "<p> Quảng Trị là một tỉnh nằm ở phía bắc miền Trung Việt Nam. Tỉnh này có vị trí địa lý đắc địa, giáp biển Đông về phía đông, giáp tỉnh Thừa Thiên Huế về phía nam, giáp tỉnh Quảng Bình về phía tây, và giáp Lào về phía tây bắc. Dưới đây là thông tin chi tiết về vị trí địa lý của Quảng Trị:<br><br>- Vĩ độ: từ khoảng 16 độ 35 phút đến 17 độ 23 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 106 độ 31 phút đến 107 độ 22 phút kinh độ Đông.</p>",
    images: ["https://upload.wikimedia.org/wikipedia/commons/0/09/Th%C3%A0nh_c%E1%BB%95_Qu%E1%BA%A3ng_Tr%E1%BB%8B_4.jpg"],
    videos: [
      "https://www.youtube.com/embed/G7bmgK_Q0bs",
    ],
  },
  "Thừa Thiên Huế": {
    text: '<p> Huế là một thành phố nằm ở miền Trung Việt Nam và là thủ phủ của tỉnh Thừa Thiên-Huế. Thành phố này có vị trí địa lý đắc địa, giáp biển Đông về phía đông, giáp tỉnh Quảng Trị về phía bắc, giáp tỉnh Quảng Nam về phía nam, và giáp đồng bằng phía tây. Dưới đây là thông tin chi tiết về vị trí địa lý của Huế:<br><br>- Vĩ độ: từ khoảng 16 độ 21 phút đến 16 độ 34 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 107 độ 39 phút đến 107 độ 54 phút kinh độ Đông.</p>',
    images: ["https://media.techcity.cloud/vietnam.vn/2023/04/Kinh-thanh-Hue-2-1.jpg"],
    videos: [
      "https://www.youtube.com/embed/VPaQ4-5n0_Y",
    ],
  },
  "Đà Nẵng": {
    text: "<p> Đà Nẵng là một thành phố nằm ở miền Trung Việt Nam, và là thành phố trực thuộc Trung ương. Thành phố này có vị trí địa lý đắc địa, nằm trên bờ biển biển Đông, giữa hai tỉnh Quảng Nam về phía nam và Quảng Ngãi về phía bắc. Dưới đây là thông tin chi tiết về vị trí địa lý của Đà Nẵng:<br><br>- Vĩ độ: từ khoảng 15 độ 55 phút đến 16 độ 10 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 108 độ 05 phút đến 108 độ 23 phút kinh độ Đông.</p>",
    images: ["https://hodadi.s3.amazonaws.com/production/blogs/pictures/000/000/028/original/du-lich-da-nang.jpg?1501897690"],
    videos: [
      "https://www.youtube.com/embed/rcrcPDwngeA",
    ],
  },
  "Quảng Nam": {
    text: "<p> Quảng Nam là một tỉnh nằm ở miền Trung Việt Nam. Tỉnh này có vị trí địa lý chiến lược, giáp biển Đông về phía đông, giáp thành phố Đà Nẵng về phía tây bắc, giáp tỉnh Quảng Ngãi về phía nam, giáp tỉnh Thừa Thiên-Huế về phía bắc, và giáp tỉnh Kon Tum về phía tây. Dưới đây là thông tin chi tiết về vị trí địa lý của Quảng Nam:<br><br>- Vĩ độ: từ khoảng 14 độ 40 phút đến 15 độ 43 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 107 độ 48 phút đến 109 độ 27 phút kinh độ Đông.</p>",
    images: ["https://images2.thanhnien.vn/Uploaded/minhnguyet/2022_07_06/thap-cham-3539.jpg"],
    videos: [
      "https://www.youtube.com/embed/JmqtbFAtSHY",
    ],
  },
  "Quảng Ngãi": {
    text: "<p> Quảng Ngãi là một tỉnh nằm ở miền Trung Việt Nam. Tỉnh này có vị trí địa lý chiến lược, giáp biển Đông về phía đông, giáp tỉnh Bình Định về phía nam, giáp tỉnh Quảng Nam về phía tây, giáp tỉnh Kon Tum về phía tây bắc, và giáp tỉnh Gia Lai về phía tây. Dưới đây là thông tin chi tiết về vị trí địa lý của Quảng Ngãi:<br><br>- Vĩ độ: từ khoảng 14 độ 41 phút đến 15 độ 26 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 108 độ 29 phút đến 109 độ 14 phút kinh độ Đông.</p>",
    images: ["https://baoquangngai.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/dataimages/202005/original/images2285863_THANHCOQN.jpg"],
    videos: [
      "https://www.youtube.com/embed/6rv0kfjihZ0",
    ],
  },
  "Kon Tum": {
    text: "<p> Kon Tum là một tỉnh nằm ở Tây Nguyên, khu vực đồng bằng cao nguyên của miền Trung Việt Nam. Tỉnh này có vị trí địa lý độc đáo, giáp biên giới với Lào về phía tây, giáp tỉnh Gia Lai về phía đông, giáp tỉnh Quảng Nam về phía nam, giáp tỉnh Quảng Ngãi và tỉnh Bình Định về phía tây nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Kon Tum:<br><br>- Vĩ độ: từ khoảng 13 độ 15 phút đến 15 độ 09 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 107 độ 47 phút đến 108 độ 55 phút kinh độ Đông.</p>",
    images: ["https://cdnimg.vietnamplus.vn/uploaded/qfsqy/2016_12_09/vnp_0912nha_san.jpg"],
    videos: [
      "https://www.youtube.com/embed/pTQL6U_jxgA",
    ],
  },
  "Bình Định": {
    text: "<p> Bình Định là một tỉnh nằm ở miền Trung Việt Nam. Tỉnh này có vị trí địa lý đắc địa, giáp biển Đông về phía đông, giáp tỉnh Phú Yên về phía nam, giáp tỉnh Gia Lai về phía tây nam, giáp tỉnh Kon Tum về phía tây bắc, giáp tỉnh Quảng Ngãi về phía bắc và giáp tỉnh Quang Nam về phía tây. Dưới đây là thông tin chi tiết về vị trí địa lý của Bình Định:<br><br>- Vĩ độ: từ khoảng 13 độ 11 phút đến 14 độ 40 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 108 độ 33 phút đến 109 độ 32 phút kinh độ Đông.</p>",
    images: ["https://quynhontourist.com/wp-content/uploads/2020/04/du-lich-binh-dinh-cai-noi-cua-vo-thuat.jpg"],
    videos: [
      "https://www.youtube.com/embed/waUuhrH9bSM",
    ],
  },
  "Gia Lai": {
    text: "<p> Gia Lai là một tỉnh nằm ở Tây Nguyên, khu vực cao nguyên của miền Trung Việt Nam. Tỉnh này có vị trí địa lý độc đáo, giáp biên giới với Campuchia về phía tây nam, giáp tỉnh Kon Tum về phía tây, giáp tỉnh Đắk Lắk về phía đông, giáp tỉnh Phú Yên và tỉnh Bình Định về phía nam, giáp tỉnh Kon Tum về phía tây bắc. Dưới đây là thông tin chi tiết về vị trí địa lý của Gia Lai:<br><br>- Vĩ độ: từ khoảng 13 độ 14 phút đến 15 độ 25 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 107 độ 33 phút đến 109 độ 23 phút kinh độ Đông.</p>",
    images: ["https://image.vtc.vn/resize/th/upload/2021/09/02/nha-tho2-22274571.png"],
    videos: [
      "https://www.youtube.com/embed/lqu-8N2BFeU",
    ],
  },
  "Phú Yên": {
    text: "<p> Phú Yên là một tỉnh nằm ở miền Trung Việt Nam. Tỉnh này có vị trí địa lý đắc địa, giáp biển Đông về phía đông, giáp tỉnh Khánh Hòa về phía nam, giáp tỉnh Gia Lai và tỉnh Đắk Lắk về phía tây, giáp tỉnh Bình Định và tỉnh Quảng Ngãi về phía bắc. Dưới đây là thông tin chi tiết về vị trí địa lý của Phú Yên:<br><br>- Vĩ độ: từ khoảng 12 độ 37 phút đến 14 độ 00 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 108 độ 57 phút đến 109 độ 55 phút kinh độ Đông.</p>",
    images: ["https://phuyentourist.com/wp-content/uploads/2020/10/chua-bao-lam.png"],
    videos: [
      "https://www.youtube.com/embed/Vha89lT56iU",
    ],
  },
  "Đắk Lắk": {
    text: "<p> Đắk Lắk là một tỉnh nằm ở Tây Nguyên, khu vực cao nguyên của miền Trung Việt Nam. Tỉnh này có vị trí địa lý đắc địa, giáp biên giới với Campuchia về phía tây nam, giáp tỉnh Gia Lai về phía đông, giáp tỉnh Đắk Nông về phía nam, giáp tỉnh Lâm Đồng về phía tây bắc, giáp tỉnh Phú Yên và tỉnh Khánh Hòa về phía nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Đắk Lắk:<br><br>- Vĩ độ: từ khoảng 11 độ 42 phút đến 13 độ 11 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 108 độ 57 phút đến 109 độ 57 phút kinh độ Đông.</p>",
    images: ["https://phuyentourist.com/wp-content/uploads/2020/10/chua-bao-lam.png"],
    videos: [
      "https://www.youtube.com/embed/La9ZbmbWr7U",
    ],
  },
  "Khánh Hòa": {
    text: "<p> Khánh Hòa là một tỉnh nằm ở miền Trung Việt Nam. Tỉnh này có vị trí địa lý đắc địa, giáp biển Đông về phía đông, giáp tỉnh Phú Yên về phía bắc, giáp tỉnh Đắk Lắk về phía tây bắc, giáp tỉnh Lâm Đồng về phía tây, và giáp tỉnh Ninh Thuận về phía nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Khánh Hòa:<br><br>- Vĩ độ: từ khoảng 11 độ 35 phút đến 12 độ 48 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 108 độ 48 phút đến 109 độ 46 phút kinh độ Đông.</p>",
    images: ["https://dulichvn.org.vn/nhaptin/uploads/images/thanhcodienkhanh1.jpg"],
    videos: [
      "https://www.youtube.com/embed/HW1c9Ri0HtE",
    ],
  },
  "Đắk Nông": {
    text: "<p> Đắk Nông là một tỉnh nằm ở Tây Nguyên, khu vực cao nguyên của miền Trung Việt Nam. Tỉnh này có vị trí địa lý đắc địa, giáp tỉnh Đắk Lắk về phía đông và phía bắc, giáp tỉnh Lam Đồng về phía nam, giáp tỉnh Bình Phước và tỉnh Lâm Đồng về phía tây, giáp tỉnh Gia Lai và tỉnh Lâm Đồng về phía tây nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Đắk Nông:<br><br>- Vĩ độ: từ khoảng 11 độ 28 phút đến 13 độ 03 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 107 độ 21 phút đến 108 độ 19 phút kinh độ Đông.</p>",
    images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Draysap02.JPG/420px-Draysap02.JPG"],
    videos: [
      "https://www.youtube.com/embed/GPiGma4nd_U",
    ],
  },
  "Bình Phước": {
    text: "<p> Bình Phước là một tỉnh nằm ở miền Đông Nam Bộ của Việt Nam. Tỉnh này có vị trí địa lý đắc địa, giáp tỉnh Bình Dương về phía đông bắc, giáp tỉnh Đồng Nai về phía đông, giáp tỉnh Lâm Đồng về phía tây, giáp tỉnh Tây Ninh và tỉnh Bình Dương về phía bắc, giáp tỉnh Đồng Nai và tỉnh Lâm Đồng về phía tây nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Bình Phước:<br><br>- Vĩ độ: từ khoảng 11 độ 38 phút đến 13 độ 08 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 106 độ 37 phút đến 107 độ 46 phút kinh độ Đông.</p>",
    images: ["https://media.baobinhphuoc.com.vn/upload/news/4_2023/d1_17364715042023.jpg"],
    videos: [
      "https://www.youtube.com/embed/vLTV5gvY70c",
    ],
  },
  "Hà Giang": {
    text: '<p><p> Hà Giang là một tỉnh nằm ở vùng đất cao nguyên Bắc Bộ của miền Bắc Việt Nam. Tỉnh Hà Giang có vị trí địa lý đắc địa, giáp biên giới với Trung Quốc về phía bắc và phía đông, giáp tỉnh Cao Bằng về phía đông nam, giáp tỉnh Tuyên Quang về phía nam, giáp tỉnh Lào Cai về phía tây và giáp tỉnh Lai Châu về phía tây nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Hà Giang:<br><br>- Vĩ độ: từ khoảng 22 độ 19 phút đến 23 độ 21 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 104 độ 49 phút đến 105 độ 24 phút kinh độ Đông.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/hagiang/hagiang.jpg",
      "https://images.baodantoc.vn/uploads/lethihongphuc/2023/3/23/h%C3%A0%20giang.jpg",
      "https://static-images.vnncdn.net/files/publish/2022/10/12/ruong-lua-chin-35.jpg"],
    videos: [
      "https://www.youtube.com/embed/Dgt4Mn3nWIg",
    ],
  },
  "Cao Bằng": {
    text: '<p> Cao Bằng là một tỉnh nằm ở vùng Đông Bắc của miền Bắc Việt Nam. Tỉnh này có vị trí địa lý đắc địa, giáp biên giới với Trung Quốc về phía bắc và phía đông, giáp tỉnh Lạng Sơn về phía tây, giáp tỉnh Bắc Kạn về phía nam, và giáp tỉnh Hà Giang về phía tây nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Cao Bằng:<br><br>- Vĩ độ: từ khoảng 22 độ 28 phút đến 23 độ 45 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 104 độ 50 phút đến 107 độ 44 phút kinh độ Đông.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/caobang/caobang.jpg", "https://media.vov.vn/sites/default/files/styles/large_watermark/public/2020-11/dl_cb_6.jpg",
      "https://icdn.dantri.com.vn/2022/05/31/z34379455406568880ef752f54163601920ad22926f9ae-1653970212675.jpg"],
    videos: [
      "https://www.youtube.com/embed/0mRp_QlRSPA",
    ],
  },
  "Lào Cai": {
    text: '<p><p> Lào Cai là một tỉnh nằm ở vùng Tây Bắc của miền Bắc Việt Nam. Tỉnh này có vị trí địa lý đắc địa, giáp biên giới với Trung Quốc về phía bắc, giáp tỉnh Yên Bái về phía tây nam, giáp tỉnh Hà Giang về phía đông nam, giáp tỉnh Lai Châu về phía tây, và giáp tỉnh Điện Biên về phía tây bắc. Dưới đây là thông tin chi tiết về vị trí địa lý của Lào Cai:<br><br>- Vĩ độ: từ khoảng 21 độ 01 phút đến 22 độ 23 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 103 độ 42 phút đến 104 độ 46 phút kinh độ Đông.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/laocai/laocai.jpg",
      "https://media.baodautu.vn/Images/phuongthanh02/2022/08/25/14-Du%20l%E1%BB%8Bch%20l%C3%A0o%20Cai%204.jpg",
      "https://tuyengiao.vn/Uploads/2021/12/23/29/nam-2022-lao-cai-phan-dau-thu-ngan-sach-nha-nuoc-dat-9-500-ty-dong.jpg"],
    videos: [
      "https://www.youtube.com/embed/nDGgWLqj6A4",
    ],
  },
  "Lai Châu": {
    text: '<p> Lai Châu là một tỉnh nằm ở vùng Tây Bắc của miền Bắc Việt Nam. Tỉnh này có vị trí địa lý đắc địa, giáp biên giới với Trung Quốc về phía bắc, giáp tỉnh Lào Cai về phía đông, giáp tỉnh Điện Biên về phía tây, giáp tỉnh Sơn La về phía nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Lai Châu:<br><br>- Vĩ độ: từ khoảng 21 độ 01 phút đến 22 độ 38 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 102 độ 09 phút đến 104 độ 18 phút kinh độ Đông.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/laichau/laichau.jpg",
      "https://image.giacngo.vn/w770/Uploaded/2023/qdhwqmrnd/2022_07_27/67fa5e54-huy-4353-6228.jpg",
      "https://images.baodantoc.vn/uploads/2022/Th%C3%A1ng%202/Ng%C3%A0y_21/TRung/D%C6%B0%E1%BB%9Dng%20h%E1%BA%A7m/1n%20-%20OK.jpg"],
    videos: [
      "https://www.youtube.com/embed/ClC8OEjqgnc",
    ],
  },
  "Bắc Kạn": {
    text: '<p> Bắc Kạn là một tỉnh nằm ở vùng Đông Bắc của miền Bắc Việt Nam. Tỉnh này có vị trí địa lý đắc địa, giáp tỉnh Cao Bằng về phía đông, giáp tỉnh Lạng Sơn về phía đông nam, giáp tỉnh Thái Nguyên về phía nam, giáp tỉnh Tuyên Quang về phía tây, giáp tỉnh Phú Thọ về phía tây nam, và giáp tỉnh Hà Giang về phía bắc. Dưới đây là thông tin chi tiết về vị trí địa lý của Bắc Kạn:<br><br>- Vĩ độ: từ khoảng 22 độ 10 phút đến 22 độ 58 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 105 độ 49 phút đến 107 độ 16 phút kinh độ Đông.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/backan/backan.jpg",
      "https://ik.imagekit.io/tvlk/blog/2021/09/kinh-nghiem-du-lich-bac-kan.jpg?tr=dpr-2,w-675",
      "https://ik.imagekit.io/tvlk/blog/2021/09/kinh-nghiem-du-lich-bac-kan-2-1024x683.jpg?tr=dpr-2,w-675"],
    videos: [
      "https://www.youtube.com/embed/XV4UL6kLjaM",
    ],
  },
  "Tuyên Quang": {
    text: '<p> Tuyên Quang là một tỉnh nằm ở vùng Đông Bắc của miền Bắc Việt Nam. Tỉnh này có vị trí địa lý đắc địa, giáp tỉnh Hà Giang về phía bắc, giáp tỉnh Cao Bằng về phía đông bắc, giáp tỉnh Bắc Kạn về phía đông, giáp tỉnh Thái Nguyên về phía đông nam, giáp tỉnh Vĩnh Phúc về phía nam, giáp tỉnh Phú Thọ về phía tây nam, và giáp tỉnh Yên Bái về phía tây bắc. Dưới đây là thông tin chi tiết về vị trí địa lý của Tuyên Quang:<br><br>- Vĩ độ: từ khoảng 21 độ 44 phút đến 22 độ 25 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 104 độ 46 phút đến 105 độ 37 phút kinh độ Đông.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/tuyenquang/tuyenquang.jpg",
      "https://ik.imagekit.io/tvlk/blog/2021/09/kinh-nghiem-du-lich-tuyen-quang-2-1024x904.jpg?tr=dpr-2,w-675",
      "https://daihoi13.dangcongsan.vn/Uploads/Images/2021/5/25/46/anh_TQ_28_9-1601240966289.jpg"],
    videos: [
      "https://www.youtube.com/embed/869phJtdbyk",
    ],
  },
  "Lạng Sơn": {
    text: '<p> Lạng Sơn là một tỉnh nằm ở vùng Đông Bắc của miền Bắc Việt Nam. Tỉnh này có vị trí địa lý đắc địa, giáp biên giới với Trung Quốc về phía bắc, giáp tỉnh Cao Bằng về phía đông, giáp tỉnh Bắc Giang và tỉnh Quảng Ninh về phía nam, giáp tỉnh Thái Nguyên về phía tây. Dưới đây là thông tin chi tiết về vị trí địa lý của Lạng Sơn:<br><br>- Vĩ độ: từ khoảng 21 độ 17 phút đến 22 độ 31 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 106 độ 33 phút đến 107 độ 40 phút kinh độ Đông.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/langson/langson.jpg",
      "https://scontent.iocvnpt.com/resources/portal/Images/LSN/linhnk.lsn/langson_694464698.jpg",
      "https://media1.nguoiduatin.vn/thumb_x640x384/media/luong-quoc-tiep/2021/06/30/nguon-goc-ten-tinh-lang-son-va-nhung-dieu-thu-vi-co-the-ban-chua-biet.jpg"],
    videos: [
      "https://www.youtube.com/embed/RUOaD_iiYPw",
    ],
  },
  "Yên Bái": {
    text: '<p> Yên Bái là một tỉnh nằm ở vùng Đông Bắc của miền Bắc Việt Nam. Tỉnh này có vị trí địa lý đắc địa, giáp tỉnh Lào Cai về phía tây bắc, giáp tỉnh Lai Châu về phía tây, giáp tỉnh Sơn La về phía nam, giáp tỉnh Phú Thọ về phía đông nam, giáp tỉnh Tuyên Quang về phía đông và giáp tỉnh Hòa Bình về phía đông bắc. Dưới đây là thông tin chi tiết về vị trí địa lý của Yên Bái:<br><br>- Vĩ độ: từ khoảng 21 độ 05 phút đến 22 độ 25 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 104 độ 21 phút đến 105 độ 37 phút kinh độ Đông.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/yenbai/yenbai.jpg",
      "https://cdn.tgdd.vn/Files/2021/07/09/1366829/diem-danh-13-dia-diem-du-lich-tai-yen-bai-ban-nhat-dinh-phai-tham-quan-202202141345041502.jpg",
      "https://cungphuot.info/wp-content/uploads/2014/05/cac-dia-diem-du-lich-o-yen-bai.jpg"],
    videos: [
      "https://www.youtube.com/embed/2dQH38yA39U",
    ],
  },
  "Điện Biên": {
    text: '<p> Điện Biên là một tỉnh nằm ở vùng Tây Bắc của miền Bắc Việt Nam. Tỉnh này có vị trí địa lý đắc địa, giáp biên giới với Lào về phía tây và phía nam, giáp tỉnh Sơn La về phía đông, giáp tỉnh Lai Châu về phía bắc. Dưới đây là thông tin chi tiết về vị trí địa lý của Điện Biên:<br><br>- Vĩ độ: từ khoảng 20 độ 46 phút đến 22 độ 17 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 102 độ 19 phút đến 103 độ 06 phút kinh độ Đông.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/dienbien/dienbien.jpg",
      "https://www.vietnamairlinesgiare.vn/wp-content/uploads/2021/02/du-lich-dien-bien-22-2-2021-1.jpg",
      "https://nld.mediacdn.vn/291774122806476800/2022/5/7/2798442675192139397371526575932225621609096n-1651911906626131234922.jpg"],
    videos: [
      "https://www.youtube.com/embed/hlGdCyBUJd4",
    ],
  },
  "Thái Nguyên": {
    text: '<p> Thái Nguyên là một tỉnh nằm ở vùng Đông Bắc của miền Bắc Việt Nam. Tỉnh này có vị trí địa lý đắc địa, giáp tỉnh Bắc Giang về phía tây nam, giáp tỉnh Vĩnh Phúc về phía nam, giáp tỉnh Tuyên Quang về phía đông bắc, giáp tỉnh Lạng Sơn về phía đông, giáp tỉnh Bắc Kạn về phía bắc và giáp tỉnh Hà Giang về phía tây bắc. Dưới đây là thông tin chi tiết về vị trí địa lý của Thái Nguyên:<br><br>- Vĩ độ: từ khoảng 21 độ 12 phút đến 22 độ 28 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 105 độ 39 phút đến 107 độ 10 phút kinh độ Đông.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/thainguyen/thainguyen.jpg",
      "https://cdn.tgdd.vn/Files/2023/04/26/1527479/du-lich-dong-hy-thai-nguyen-5-dia-diem-du-lich-nen-kham-pha-202304260848095809.jpg",
      "https://daithainguyen.vn/UserFiles/image/2(6950).jpg"],
    videos: [
      "https://www.youtube.com/embed/h5n7jne6Tyw",
    ],
  },
  "Bắc Giang": {
    text: '<p> Bắc Giang là một tỉnh nằm ở vùng Bắc Trung Bộ của miền Bắc Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Thái Nguyên về phía tây, Quảng Ninh về phía đông, Bắc Ninh về phía nam, Lạng Sơn và Thái Nguyên về phía bắc. Dưới đây là thông tin chi tiết về vị trí địa lý của Bắc Giang:<br><br>- Vĩ độ: từ khoảng 21 độ 17 phút đến 21 độ 44 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 105 độ 55 phút đến 106 độ 30 phút kinh độ Đông.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/bacgiang/bacgiang.jpg",
      "https://ik.imagekit.io/tvlk/blog/2022/09/dia-diem-check-in-o-bac-giang-1.jpg?tr=dpr-2,w-675",
      "https://ik.imagekit.io/tvlk/blog/2022/09/dia-diem-check-in-o-bac-giang-3.jpg?tr=dpr-2,w-675"],
    videos: [
      "https://www.youtube.com/embed/Td93LxQasqU",
    ],
  },
  "Vĩnh Phúc": {
    text: '<p> Vĩnh Phúc là một tỉnh nằm ở vùng Bắc Trung Bộ của miền Bắc Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Hà Nội về phía tây nam, Bắc Ninh và Bắc Giang về phía đông nam, Phú Thọ về phía tây, Thái Nguyên về phía đông bắc, và Hòa Bình về phía tây bắc. Dưới đây là thông tin chi tiết về vị trí địa lý của Vĩnh Phúc:<br><br>- Vĩ độ: từ khoảng 21 độ 07 phút đến 21 độ 28 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 105 độ 34 phút đến 105 độ 56 phút kinh độ Đông.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/vinhphuc/vinhphuc.jpg",
      "https://thongkevinhphuc.gov.vn/files/assets/01ec7e179ace42901bdf.jpg",
      "https://vinhphuc.gov.vn/ct/DuyetTinBai_IMG/PublishingImages/2019/hiennm2019/1dn11.jpg"],
    videos: [
      "https://www.youtube.com/embed/ReNl91xRPlA",
    ],
  },
  "Phú Thọ": {
    text: '<p> Phú Thọ là một tỉnh nằm ở vùng Bắc Trung Bộ của miền Bắc Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Hà Nội về phía đông nam, Yên Bái về phía tây bắc, Vĩnh Phúc về phía đông, Tuyên Quang về phía bắc, Hòa Bình về phía tây nam, và Sơn La về phía tây bắc. Dưới đây là thông tin chi tiết về vị trí địa lý của Phú Thọ:<br><br>- Vĩ độ: từ khoảng 21 độ 01 phút đến 21 độ 34 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 104 độ 51 phút đến 105 độ 37 phút kinh độ Đông.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/phutho/phutho.jpg",
      "https://top10phutho.vn/wp-content/uploads/2022/10/hinh-anh-phu-tho-1.jpg",
      "https://dubaothoitiet.info/Uploads/images/anh-den-hung%20(1).jpg"],
    videos: [
      "https://www.youtube.com/embed/YAomjr9Y4uI",
    ],
  },
  "Quảng Ninh": {
    text: '<p> Quảng Ninh là một tỉnh nằm ở vùng Đông Bắc của miền Bắc Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Lạng Sơn về phía tây bắc, Hà Giang và Cao Bằng về phía tây, Bắc Giang và Hải Dương về phía nam, Thái Bình về phía nam, và vịnh Hạ Long thuộc Biển Đông về phía đông. Dưới đây là thông tin chi tiết về vị trí địa lý của Quảng Ninh:<br><br>- Vĩ độ: từ khoảng 20 độ 46 phút đến 21 độ 44 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 106 độ 27 phút đến 107 độ 36 phút kinh độ Đông.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/quangninh/quangninh.jpg",
      "https://ik.imagekit.io/tvlk/blog/2022/02/dia-diem-du-lich-quang-ninh-2.jpg?tr=dpr-2,w-675",
      "https://bvhttdl.mediacdn.vn/291773308735864832/2021/4/27/quang-ninh-16194956971871120645003-1619508590779-1619508596374707232506.jpg"],
    videos: [
      "https://www.youtube.com/embed/USpAs7B5Ef8",
    ],
  },
  "Sơn La": {
    text: '<p> Sơn La là một tỉnh nằm ở vùng Tây Bắc của miền Bắc Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Lai Châu về phía tây bắc, Điện Biên về phía tây, Lào Cai về phía bắc, Yên Bái và Hòa Bình về phía đông, và là biên giới với Lào về phía tây nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Sơn La:<br><br>- Vĩ độ: từ khoảng 20 độ 19 phút đến 22 độ 32 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 103 độ 16 phút đến 104 độ 53 phút kinh độ Đông.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/sonla/sonla.jpg",
      "https://mocchautourism.com/uploads/news/2021_10/di-lich-cao-nguyen-moc-chau-1.jpg",
      "https://media.vov.vn/sites/default/files/styles/large/public/2021-10/image_6483441_26-10-2021-12-45-17.jpg"],
    videos: [
      "https://www.youtube.com/embed/wj-5pmxKB3E",
    ],
  },
  "Bắc Ninh": {
    text: '<p> Bắc Ninh là một tỉnh nằm ở vùng Bắc Trung Bộ của miền Bắc Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Hà Nội về phía tây và nam, Bắc Giang về phía bắc, Hải Dương về phía đông, và Hưng Yên về phía nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Bắc Ninh:<br><br>- Vĩ độ: từ khoảng 20 độ 50 phút đến 21 độ 12 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 106 độ 13 phút đến 106 độ 28 phút kinh độ Đông.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/bacninh/bacninh.jpg",
      "https://hungngangroup.vn/wp-content/uploads/2022/05/b1.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/8/87/Trung_t%C3%A2m_v%C4%83n_h%C3%B3a_Kinh_B%E1%BA%AFc.jpg"],
    videos: [
      "https://www.youtube.com/embed/kvmVhr-moGA",
    ],
  },
  "Hà Nội": {
    text: '<p> Hà Nội là thủ đô và là trung tâm chính trị, văn hóa, kinh tế của Việt Nam. Thành phố này nằm ở vùng Đồng Bằng Sông Hồng, tại phía bắc của miền Bắc Việt Nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Hà Nội:<br><br>- Vĩ độ: từ khoảng 20 độ 54 phút đến 21 độ 23 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 105 độ 44 phút đến 106 độ 02 phút kinh độ Đông.</p>',
    links: ["/video-details/76"],
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/hanoi/hanoi.jpg",
      "https://vcdn1-dulich.vnecdn.net/2022/05/11/hoan-kiem-lake-7673-1613972680-1508-1652253984.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=2wB1cBTUcNKuk68nrG6LMQ",
      "https://cdnimg.vietnamplus.vn/uploaded/hotnnz/2022_08_30/ha_noi.jpg"],
    videos: [
      "https://www.youtube.com/embed/zxeRI0izsUw",
    ],
  },
  "Hải Dương": {
    text: '<p> Hải Dương là một tỉnh nằm ở vùng Đồng Bằng Sông Hồng của miền Bắc Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Hưng Yên về phía tây nam, Hà Nội về phía tây, Bắc Ninh và Hải Phòng về phía nam, Quảng Ninh về phía đông bắc, và Thái Bình về phía đông nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Hải Dương:<br><br>- Vĩ độ: từ khoảng 20 độ 55 phút đến 21 độ 21 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 106 độ 15 phút đến 107 độ 08 phút kinh độ Đông.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/haiduong/haiduong.jpg",
      "https://media.vneconomy.vn/images/upload/2023/04/07/hai-duong-sua3-15-47-46-961.jpg",
      "https://baoxaydung.com.vn/stores/news_dataimages/nga/022020/20/14/in_article/3354_image001.jpg"],
    videos: [
      "https://www.youtube.com/embed/9I8KFCNNlnE",
    ],
  },
  "Hưng Yên": {
    text: '<p> Hưng Yên là một tỉnh nằm ở vùng Đồng Bằng Sông Hồng của miền Bắc Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Hà Nội về phía tây, Hải Dương về phía đông, Hải Phòng về phía đông bắc, Thái Bình về phía nam, và Bắc Ninh về phía nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Hưng Yên:<br><br>- Vĩ độ: từ khoảng 20 độ 48 phút đến 21 độ 18 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 105 độ 49 phút đến 106 độ 32 phút kinh độ Đông.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/hungyen/hungyen.jpg",
      "https://mediabhy.mediatech.vn/upload/image/202206/medium/46808_thanhpho1_result_20220624155103.jpg",
      "https://media.baodautu.vn/Images/chicuong/2022/02/17/1.jpg"],
    videos: [
      "https://www.youtube.com/embed/xOQuQEbOqjs",
    ],
  },
  "Hải Phòng": {
    text: '<p> Hải Phòng là một thành phố trực thuộc trung ương và là một trong những trung tâm kinh tế, chính trị và văn hóa quan trọng của miền Bắc Việt Nam. Thành phố này nằm ở vùng Đồng Bằng Sông Hồng, tại cửa sông Cấm và cửa biển Hạ Long thuộc vịnh Bắc Bộ. Dưới đây là thông tin chi tiết về vị trí địa lý của Hải Phòng:<br><br>- Vĩ độ: từ khoảng 20 độ 43 phút đến 21 độ 07 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 106 độ 36 phút đến 106 độ 48 phút kinh độ Đông.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/haiphong/haiphong.jpg",
      "https://xdcs.cdnchinhphu.vn/446259493575335936/2023/3/31/hai-phong-6-1680234763392125722891.jpg",
      "https://bcp.cdnchinhphu.vn/Uploaded/tranducmanh/2021_09_14/Haiphong1.jpg"],
    videos: [
      "https://www.youtube.com/embed/pAqYiWChVyI",
    ],
  },
  "Hoà Bình": {
    text: '<p> Hòa Bình là một tỉnh nằm ở vùng Tây Bắc của miền Bắc Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Phú Thọ và Sơn La về phía bắc, Hà Nam và Ninh Bình về phía đông, Thanh Hóa về phía nam, và Lào Cai và Yên Bái về phía tây. Dưới đây là thông tin chi tiết về vị trí địa lý của Hòa Bình:<br><br>- Vĩ độ: từ khoảng 20 độ 15 phút đến 21 độ 23 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 104 độ 36 phút đến 105 độ 42 phút kinh độ Đông.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/hoabinh/hoabinh.jpg",
      "https://ik.imagekit.io/tvlk/blog/2022/03/dia-diem-du-lich-hoa-binh-1.jpg",
      "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/08/Thung-Nai-Hoa-Binh-vntrip1.jpg"],
    videos: [
      "https://www.youtube.com/embed/--QBafBQvLM",
    ],
  },
  "Lâm Đồng": {
    text: "<p> Lâm Đồng là một tỉnh nằm ở miền Trung Việt Nam, thuộc khu vực Tây Nguyên. Tỉnh này có vị trí địa lý đắc địa, giáp tỉnh Đồng Nai về phía đông, giáp tỉnh Bình Thuận về phía nam, giáp tỉnh Ninh Thuận về phía tây, giáp tỉnh Khánh Hòa về phía đông nam, giáp tỉnh Đắk Lắk về phía bắc, và giáp tỉnh Bình Phước về phía tây bắc. Dưới đây là thông tin chi tiết về vị trí địa lý của Lâm Đồng:<br><br>- Vĩ độ: từ khoảng 11 độ 42 phút đến 12 độ 25 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 107 độ 46 phút đến 108 độ 42 phút kinh độ Đông.</p>",
    images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Da_Lat%2C_view_to_Xuan_Huong_lake_2.jpg/420px-Da_Lat%2C_view_to_Xuan_Huong_lake_2.jpg"],
    videos: [
      "https://www.youtube.com/embed/FKtOO41ll_s",
    ],
  },
  "Ninh Thuận": {
    text: '<p> Ninh Thuận là một tỉnh nằm ở vùng Nam Trung Bộ của miền Trung Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Khánh Hòa về phía đông, Bình Thuận về phía tây, Đắk Lắk và Lâm Đồng về phía bắc, và Biển Đông về phía nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Ninh Thuận:<br><br>- Vĩ độ: từ khoảng 11 độ 30 phút đến 12 độ 15 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 108 độ 24 phút đến 109 độ 06 phút kinh độ Đông.</p>',
    images: ["https://th.bing.com/th/id/OIP.sKZVQeyCqrtrECcd2HYM8gHaEJ?w=255&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "https://th.bing.com/th/id/R.f162b0326d0225a6201c91b6ae8ba6d9?rik=iINJTqPM5fnZAQ&pid=ImgRaw&r=0",
      "https://welcometovietnam.com.vn/wp-content/uploads/2015/03/Ninh-Thuan.jpg"],
    videos: [
      "https://www.youtube.com/embed/bGK4F8IzED8",
    ],
  },
  "Tây Ninh": {
    text: '<p> Tây Ninh là một tỉnh nằm ở vùng Đông Nam Bộ của miền Nam Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Bình Dương và Bình Phước về phía đông bắc, Long An về phía nam, Hồ Chí Minh (Thành phố Hồ Chí Minh) về phía nam và tây nam, và Lâm Đồng về phía tây. Dưới đây là thông tin chi tiết về vị trí địa lý của Tây Ninh:<br><br>- Vĩ độ: từ khoảng 10 độ 58 phút đến 11 độ 21 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 106 độ 06 phút đến 106 độ 57 phút kinh độ Đông.</p>',
    images: ["https://nguoikesu.com/images/wiki/tinh-tay-ninh/5bb69d415b19db01e566f515995d510f.jpg",
      "https://nguoikesu.com/images/wiki/tinh-tay-ninh/7d141d0984c05d084cf86dd4dfde32e1.jpg",
      "https://nguoikesu.com/images/wiki/tinh-tay-ninh/f96e457af600f4ebeb1ac44e53e9ed03.jpg"],
    videos: [
      "https://www.youtube.com/embed/vqDUPn3ZgkM",
    ],
  },
  "Bình Dương": {
    text: '<p> Bình Dương là một tỉnh nằm ở vùng Đông Nam Bộ của miền Nam Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Đồng Nai và Bà Rịa-Vũng Tàu về phía đông, Hồ Chí Minh (Thành phố Hồ Chí Minh) về phía nam, Tây Ninh về phía tây, Bình Phước về phía bắc, và Đồng Nai về phía đông bắc. Dưới đây là thông tin chi tiết về vị trí địa lý của Bình Dương:<br><br>- Vĩ độ: từ khoảng 10 độ 51 phút đến 11 độ 18 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 106 độ 25 phút đến 107 độ 04 phút kinh độ Đông.</p>',
    images: ["https://nguoikesu.com/images/wiki/tinh-binh-duong/ffdf3098ecd4082271e62b7e19bee353.jpg",
      "https://nguoikesu.com/images/wiki/tinh-binh-duong/4cd4d97c6d41846419c6a4156cd68324.jpg",
      "https://nguoikesu.com/images/wiki/tinh-binh-duong/f30b8d24bc7690560d8ad1940c52e36d.jpg"],
    videos: [
      "https://www.youtube.com/embed/Ky5WG38zK2c",
    ],
  },
  "Bình Thuận": {
    text: '<p> Bình Thuận là một tỉnh nằm ở vùng Nam Trung Bộ của miền Nam Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Ninh Thuận về phía đông, Lâm Đồng về phía bắc, Đồng Nai về phía tây bắc, và biển Đông về phía nam và phía đông nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Bình Thuận:<br><br>- Vĩ độ: từ khoảng 10 độ 36 phút đến 11 độ 42 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 107 độ 34 phút đến 108 độ 44 phút kinh độ Đông.</p>',
    images: ["https://nguoikesu.com/images/wiki/tinh-binh-thuan/343ac40a6e4970c678bc313c6004393b.jpg",
      "https://nguoikesu.com/images/wiki/tinh-binh-thuan/d5ea1162a12924048f6dc8d2f6fa607a.jpg",
      "https://nguoikesu.com/images/wiki/tinh-binh-thuan/70fbd5cd444d41d10ae4803f672ef62c.jpg",
      "https://nguoikesu.com/images/wiki/tinh-binh-thuan/86fdf95ac7b01fa9caa3dbd536f8b368.jpg"],
    videos: [
      "https://www.youtube.com/embed/3xrTrsAhcWI",
    ],
  },
  "Đồng Nai": {
    text: '<p> Đồng Nai là một tỉnh nằm ở vùng Đông Nam Bộ của miền Nam Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Bình Dương và Bình Phước về phía tây, Lâm Đồng về phía tây bắc, Bà Rịa-Vũng Tàu về phía đông nam, và biển Đông về phía nam và phía đông. Dưới đây là thông tin chi tiết về vị trí địa lý của Đồng Nai:<br><br>- Vĩ độ: từ khoảng 10 độ 34 phút đến 11 độ 29 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 106 độ 38 phút đến 107 độ 32 phút kinh độ Đông.</p>',
    images: ["https://nguoikesu.com/images/wiki/tinh-dong-nai/0988b9669a2c49c4ddde844d0b2fd956.jpg",
      "https://nguoikesu.com/images/wiki/tinh-dong-nai/2b9c715edd79800a5be5cdc955d2e289.jpg",
      "https://nguoikesu.com/images/wiki/tinh-dong-nai/cfafbb5e97fa56220227da862a80dc8f.jpg"],
    videos: [
      "https://www.youtube.com/embed/dELdI0cI9a8",
    ],
  },
  "Hồ Chí Minh": {
    text: '<p> Thành phố Hồ Chí Minh (tên gọi chính thức từ năm 1976, trước đây là thành phố Sài Gòn) là thành phố lớn nhất và là trung tâm kinh tế, chính trị, văn hóa của miền Nam Việt Nam. Thành phố này nằm ở vùng Đông Nam Bộ của miền Nam Việt Nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Hồ Chí Minh:<br><br>- Vĩ độ: từ khoảng 10 độ 33 phút đến 10 độ 52 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 106 độ 29 phút đến 106 độ 42 phút kinh độ Đông.</p>',
    links: ["/video-details/77"],
    images: ["https://nguoikesu.com/images/wiki/thanh-pho-ho-chi-minh/339662013eee699cf1ba92873d4094d2.jpg",
      "https://nguoikesu.com/images/wiki/thanh-pho-ho-chi-minh/8a4944feeb3e0ff93362a67b9ff73e69.jpg",
      "https://nguoikesu.com/images/wiki/thanh-pho-ho-chi-minh/5b0e4f7d1b1bd9499223dc3126248ac7.jpg",
      "https://nguoikesu.com/images/wiki/thanh-pho-ho-chi-minh/742a1c1976b0497a782b7e60986ff760.jpg",
      "https://nguoikesu.com/images/wiki/thanh-pho-ho-chi-minh/23de6118beb426ffec8159569a48015f.jpg"],
    videos: [
      "https://www.youtube.com/embed/EeXSaz8M05w",
    ],
  },
  "Long An": {
    text: '<p> Long An là một tỉnh nằm ở vùng Đồng Bằng Sông Cửu Long của miền Nam Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Tiền Giang và Đồng Tháp về phía đông, Tây Ninh và Long An (Campuchia) về phía tây, Hồ Chí Minh (Thành phố Hồ Chí Minh) về phía nam, và biển Đông về phía nam và phía đông nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Long An:<br><br>- Vĩ độ: từ khoảng 10 độ 11 phút đến 11 độ 00 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 106 độ 08 phút đến 106 độ 43 phút kinh độ Đông.</p>',
    images: ["https://toplist.vn/images/800px/di-tich-lich-su-nga-tu-duc-hoa-long-an-133006.jpg",
      "https://th.bing.com/th/id/R.e36f7060269b0b872a2830096b086829?rik=xcUC36cS8MBguQ&riu=http%3a%2f%2fmedia.dulich24.com.vn%2fdiemden%2fdi-tich-lich-su-binh-thanh-7267%2fdi-tich-lich-su-binh-thanh.jpg&ehk=WaQ0YunYJ1F%2b%2fEZIVRoyOLZQqe%2fbMLQ3ExvDnmRHdUc%3d&risl=&pid=ImgRaw&r=0",
      "https://th.bing.com/th/id/R.713f1d0bcb964db286d4ac8f4d237854?rik=xwvTiJI18ykn8g&pid=ImgRaw&r=0"],
    videos: [
      "https://www.youtube.com/embed/10M_Uv28H1I",
    ],
  },
  "Bà Rịa - Vũng Tàu": {
    text: '<p> Bà Rịa-Vũng Tàu là một tỉnh nằm ở vùng Đông Nam Bộ của miền Nam Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Đồng Nai về phía bắc, biển Đông về phía đông, Hồ Chí Minh (Thành phố Hồ Chí Minh) về phía tây bắc, và Đồng bằng sông Cửu Long về phía tây. Dưới đây là thông tin chi tiết về vị trí địa lý của Bà Rịa-Vũng Tàu:<br><br>- Vĩ độ: từ khoảng 10 độ 10 phút đến 11 độ 15 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 106 độ 31 phút đến 107 độ 20 phút kinh độ Đông.</p>',
    images: ["https://th.bing.com/th/id/OIP.uIpZ7RfDmlmuDD6yMXrS_AHaEm?w=269&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "https://th.bing.com/th/id/OIP.zYKMJpG-2SQquQ4nU5qM8QHaEK?w=302&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "https://th.bing.com/th/id/OIP.icNnSSKcdPPh2lEFgqpBSAHaEX?w=289&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"],
    videos: [
      "https://www.youtube.com/embed/ExzHbCno78w",
    ],
  },
  "Đồng Tháp": {
    text: '<p> Đồng Tháp là một tỉnh nằm ở vùng Đồng Bằng Sông Cửu Long của miền Nam Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh An Giang và Vĩnh Long về phía đông, Long An về phía tây, biển Đông về phía nam, và Hậu Giang về phía nam tây nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Đồng Tháp:<br><br>- Vĩ độ: từ khoảng 9 độ 38 phút đến 10 độ 34 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 105 độ 30 phút đến 106 độ 35 phút kinh độ Đông.</p>',
    images: ["https://th.bing.com/th/id/R.8ff738e03649cdc9eb988df2300e7767?rik=5A7R4EC7pf%2fgYA&pid=ImgRaw&r=0",
      "https://scontent.iocvnpt.com/resources/portal/Images/DTP/superadminportal.dtp/trangchu/portal/tintuc/lichsu/l1_637147706761089576.png",
      "https://scontent.iocvnpt.com/resources/portal/Images/DTP/superadminportal.dtp/trangchu/portal/tintuc/lichsu/l6_637147706873309852.png"],
    videos: [
      "https://www.youtube.com/embed/2PWRQtyC3zI",
    ],
  },
  "An Giang": {
    text: '<p> An Giang là một tỉnh nằm ở vùng Đồng Bằng Sông Cửu Long của miền Nam Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Kiên Giang và Hậu Giang về phía tây, Đồng Tháp về phía đông và phía bắc, và biên giới với Campuchia về phía nam và phía tây nam. Dưới đây là thông tin chi tiết về vị trí địa lý của An Giang:<br><br>- Vĩ độ: từ khoảng 9 độ 47 phút đến 10 độ 28 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 105 độ 08 phút đến 106 độ 05 phút kinh độ Đông.</p>',
    images: ["https://th.bing.com/th/id/OIP.125EdG8skYzKM2TQbZHsIAHaE7?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "https://www.angiang.dcs.vn/SiteAssets/AG-190-longxuyen-ho-NgDu.jpg",
      "https://baoangiang.com.vn/image/fckeditor/upload/2022/20221115/images/T1-(2).jpg"],
    videos: [
      "https://www.youtube.com/embed/T0gqq6TURY0",
    ],
  },
  "Tiền Giang": {
    text: '<p> Tiền Giang là một tỉnh nằm ở vùng Đồng Bằng Sông Cửu Long của miền Nam Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Long An và Bến Tre về phía tây, Đồng Tháp về phía đông và phía bắc, và biển Đông về phía nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Tiền Giang:<br><br>- Vĩ độ: từ khoảng 10 độ 15 phút đến 10 độ 57 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 105 độ 42 phút đến 106 độ 24 phút kinh độ Đông.</p>',
    images: ["https://nguoikesu.com/images/wiki/tinh-tien-giang/2653ba760fd94500ca46a2d5ed26f72c.jpg",
      "https://nguoikesu.com/images/wiki/tinh-tien-giang/2293c559302879580789c927b482b78d.jpg",
      "https://nguoikesu.com/images/wiki/tinh-tien-giang/d6ab41841815ebf9806bd368310d383b.jpg"],
    videos: [
      "https://www.youtube.com/embed/lZv5vrxG1b0",
    ],
  },
  "Bến Tre": {
    text: '<p> Bến Tre là một tỉnh nằm ở vùng Đồng Bằng Sông Cửu Long của miền Nam Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Tiền Giang và Trà Vinh về phía tây, Đồng Tháp về phía đông và phía bắc, và biển Đông về phía nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Bến Tre:<br><br>- Vĩ độ: từ khoảng 10 độ 02 phút đến 10 độ 24 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 106 độ 26 phút đến 106 độ 48 phút kinh độ Đông.</p>',
    images: ["https://nguoikesu.com/images/wiki/tinh-ben-tre/fa921b13d89ee21fbddeb113c9e2ad99.jpg",
      "https://nguoikesu.com/images/wiki/tinh-ben-tre/87775850bcbecf68f48d283ed313569f.jpg",
      "https://nguoikesu.com/images/wiki/tinh-ben-tre/09801e0521ad9a8f2b038926cdd5e748.jpg"],
    videos: [
      "https://www.youtube.com/embed/Xh6xQhavyiU",
    ],
  },
  "Cần Thơ": {
    text: '<p> Cần Thơ là một thành phố trực thuộc trung ương nằm ở vùng Đồng Bằng Sông Cửu Long của miền Nam Việt Nam. Thành phố này có vị trí địa lý nằm giữa các tỉnh Hậu Giang và Vĩnh Long về phía đông bắc, biển Đông về phía nam và phía đông nam, Sóc Trăng về phía tây, Kiên Giang về phía tây nam và Cà Mau về phía tây nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Cần Thơ:<br><br>- Vĩ độ: từ khoảng 9 độ 56 phút đến 10 độ 23 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 105 độ 41 phút đến 106 độ 05 phút kinh độ Đông.</p>',
    images: ["https://th.bing.com/th/id/OIP.WhUzDbX27eDuSsvOtRZR8QHaF6?w=194&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "https://ik.imagekit.io/tvlk/blog/2023/05/ben-ninh-kieu-3.jpg?tr=dpr-2,w-675",
      "https://statics.vinpearl.com/dinh-binh-thuy-01_1634109817.jpg"],
    videos: [
      "https://www.youtube.com/embed/2E5QB9ps_hM",
    ],
  },
  "Vĩnh Long": {
    text: '<p> Vĩnh Long là một tỉnh nằm ở vùng Đồng Bằng Sông Cửu Long của miền Nam Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Đồng Tháp và Cần Thơ về phía đông, Long An về phía tây bắc, và biển Đông về phía nam và phía đông nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Vĩnh Long:<br><br>- Vĩ độ: từ khoảng 10 độ 01 phút đến 10 độ 30 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 105 độ 50 phút đến 106 độ 12 phút kinh độ Đông.</p>',
    images: ["https://nguoikesu.com/images/wiki/tinh-vinh-long/68a47d8181f63dd122f08fc5296529be.jpg",
      "https://nguoikesu.com/images/wiki/tinh-vinh-long/33f91c6fff74de29fbcfdf34bb6ae829.jpg",
      "https://dulichmedia.dalat.vn/Images/VLG/nguyentrongyem/2022/T2/tuyetlam/3_637806143762513983.jpg"],
    videos: [
      "https://www.youtube.com/embed/5BlZCOXlPq8",
    ],
  },
  "Kiên Giang": {
    text: '<p> Kiên Giang là một tỉnh nằm ở vùng Đồng Bằng Sông Cửu Long của miền Nam Việt Nam. Tỉnh này có vị trí địa lý nằm ở cực nam của Việt Nam, giáp biên giới với Campuchia về phía tây nam, biển Đông về phía đông nam, An Giang về phía đông, Hậu Giang về phía đông bắc và Cần Thơ về phía bắc. Dưới đây là thông tin chi tiết về vị trí địa lý của Kiên Giang:<br><br>- Vĩ độ: từ khoảng 9 độ 48 phút đến 10 độ 30 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 104 độ 58 phút đến 105 độ 26 phút kinh độ Đông.</p>',
    images: ["https://nguoikesu.com/images/wiki/tinh-kien-giang/b635fe5b375c2b04865527140a7b331b.jpg",
      "https://nguoikesu.com/images/wiki/tinh-kien-giang/aea2480368346bafb4e20fd3442c9a72.jpg",
      "https://nguoikesu.com/images/wiki/tinh-kien-giang/9822889b7e284df3d83d597be09c7407.jpg"],
    videos: [
      "https://www.youtube.com/embed/8IHTItLKIUE",
    ],
  },
  "Trà Vinh": {
    text: '<p> Trà Vinh là một tỉnh nằm ở vùng Đồng Bằng Sông Cửu Long của miền Nam Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Vĩnh Long và Sóc Trăng về phía đông, Hậu Giang và Tiền Giang về phía bắc, và biển Đông về phía nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Trà Vinh:<br><br>- Vĩ độ: từ khoảng 9 độ 25 phút đến 9 độ 59 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 105 độ 59 phút đến 106 độ 27 phút kinh độ Đông.</p>',
    images: ["https://nguoikesu.com/images/wiki/tinh-tra-vinh/58fa6fadb6490b43d0f03d1b69cecd7b.jpg",
      "https://nguoikesu.com/images/wiki/tinh-tra-vinh/6b33dcd1b47a9f779256b381cbe6e62c.jpg",
      "https://nguoikesu.com/images/wiki/tinh-tra-vinh/4e4b7da8cefc8d0bc57c0176069abee4.jpg"],
    videos: [
      "https://www.youtube.com/embed/r7DkP16L8DQ",
    ],
  },
  "Hậu Giang": {
    text: '<p> Hậu Giang là một tỉnh nằm ở vùng Đồng Bằng Sông Cửu Long của miền Nam Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Cần Thơ và Sóc Trăng về phía đông, Kiên Giang về phía tây, Tiền Giang và Vĩnh Long về phía bắc, và biển Đông về phía nam và phía đông nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Hậu Giang:<br><br>- Vĩ độ: từ khoảng 9 độ 41 phút đến 10 độ 07 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 105 độ 53 phút đến 106 độ 24 phút kinh độ Đông.</p>',
    images: ["https://vcdn-dulich.vnecdn.net/2019/11/07/HauGiang-7248-1573095828.jpg",
      "https://www.baohaugiang.com.vn/uploads/image/2021/05/07/SB3260-9-1.jpg",
      "https://dulichdiaphuong.com/imgs/tinh-hau-giang/di-tich-chien-thang-chuong-thien.jpg"],
    videos: [
      "https://www.youtube.com/embed/mQSreUO20vs",
    ],
  },
  "Sóc Trăng": {
    text: '<p> Sóc Trăng là một tỉnh nằm ở vùng Đồng Bằng Sông Cửu Long của miền Nam Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Bạc Liêu và Trà Vinh về phía đông, Hậu Giang về phía đông bắc, Kiên Giang về phía tây bắc, và biển Đông về phía nam. Dưới đây là thông tin chi tiết về vị trí địa lý của Sóc Trăng:<br><br>- Vĩ độ: từ khoảng 9 độ 40 phút đến 10 độ 07 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 105 độ 55 phút đến 106 độ 36 phút kinh độ Đông.</p>',
    images: ["https://media.mia.vn/uploads/blog-du-lich/khu-can-cu-tinh-uy-soc-trang-chung-nhan-cho-lich-su-cach-mang-hao-hung-2-1665440622.jpg",
      "https://tinhaiphong.vn/wp-content/uploads/2022/04/chua-4-mat-soc-trang.jpg",
      "https://cdn3.ivivu.com/2022/06/st.png"],
    videos: [
      "https://www.youtube.com/embed/V6Q2UBvQU8E",
    ],
  },
  "Bạc Liêu": {
    text: '<p> Bạc Liêu là một tỉnh nằm ở vùng Đồng Bằng Sông Cửu Long của miền Nam Việt Nam. Tỉnh này có vị trí địa lý nằm giữa các tỉnh Cà Mau và Sóc Trăng về phía đông, biển Đông về phía nam và phía đông nam, Hậu Giang về phía bắc, và Kiên Giang về phía tây bắc. Dưới đây là thông tin chi tiết về vị trí địa lý của Bạc Liêu:<br><br>- Vĩ độ: từ khoảng 9 độ 02 phút đến 9 độ 44 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 104 độ 49 phút đến 105 độ 32 phút kinh độ Đông.</p>',
    images: ["https://thamhiemmekong.com/wp-content/uploads/2020/07/denthobachobaclieu.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT18wBdXK7OOt-FPrOtVgNkJPdwvWb8YdvnYg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz5N_xS359jWE35EqiK7va5q6ejWihid5mXw&usqp=CAU"],
    videos: [
      "https://www.youtube.com/embed/rDzUnEaZs00",
    ],
  },
  "Cà Mau": {
    text: '<p> Cà Mau là một tỉnh nằm ở vùng Đồng Bằng Sông Cửu Long của miền Nam Việt Nam. Tỉnh này có vị trí địa lý nằm ở cực nam của Việt Nam, giáp biên giới với Campuchia về phía nam, biển Đông về phía đông, Bạc Liêu về phía bắc, biển Đông và biển Nam cũng về phía đông. Dưới đây là thông tin chi tiết về vị trí địa lý của Cà Mau:<br><br>- Vĩ độ: từ khoảng 8 độ 35 phút đến 9 độ 25 phút vĩ độ Bắc.<br>- Kinh độ: từ khoảng 104 độ 30 phút đến 105 độ 42 phút kinh độ Đông.</p>',
    images: ["https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/08/6-2.jpg",
      "https://thamhiemmekong.com/wp-content/uploads/2020/05/hondabac-1.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEmAfqpDGlzVhl8IR4YWWWDwpkWx7FFXhExQ&usqp=CAU"],
    videos: [
      "https://www.youtube.com/embed/o1-0f3JmPlM",
    ],
  }

};
const MapCustom = memo(() => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const [data, setData] = useState(getHeatMapData());
  const [customText, setCustomText] = useState("");
  const [customLinks, setCustomLinks] = useState("");
  const [customImages, setCustomImages] = useState("");
  const [customVideos, setCustomVideos] = useState("");
  const linkLabels = {
    "/video-details/76": "Lăng Chủ tịch Hồ Chí Minh",
    "/video-details/77": "Dinh Độc Lập",
    "/historicalfigure-details/40": "Hồ Chí Minh",
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
    const { text = "", links = [], images = [], videos = [] } = countryInfo;
    setCustomText(text);
    setCustomLinks(links);
    setCustomImages(images);
    setCustomVideos(videos);
    setMapClicked(true);
  };

  const onChangeButtonClick = () => {
    setData(getHeatMapData());
    setSelectedState(null);
    setCustomText("");
  };
  const [mapScale, setMapScale] = useState(3400);
  const [zoomLevel, setZoomLevel] = useState(1);
  const handleZoomIn = () => {
    setMapScale(prevScale => prevScale * 1.2);
    setZoomLevel(prevLevel => prevLevel + 1);
  };

  const handleZoomOut = () => {
    setMapScale(prevScale => prevScale / 1.2);
    setZoomLevel(prevLevel => prevLevel - 1);
  };
  const mapContainerRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleMapScroll = () => {
    const container = mapContainerRef.current;
    const { scrollTop, scrollHeight, clientHeight } = container;
    const totalScroll = scrollHeight - clientHeight;
    const currentScrollPercentage = (scrollTop / totalScroll) * 100;
    setScrollPercentage(currentScrollPercentage);
  };
  return (
    <div>

      <div style={{ flex: mapClicked ? 2 : 0 }}>

        {!mapClicked ? (<>
          <div style={{ display: "flex", position: 'relative' }}>
            <div ref={mapContainerRef} className='map' style={{ flex: 1, display: "flex", width: '4000px', height: '1000px', overflow: 'auto', zIndex: 1 }} onScroll={handleMapScroll}>
              <ComposableMap
                style={{ width: '3000px', height: '2500px' }}
                projectionConfig={{
                  scale: mapScale,
                  center: [108, 15.3],
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
                <Marker coordinates={[112, 16]} fill="#00FF00">
                  <polygon points="0,5 -2,1 -6,0 -2,-1 0,-5 2,-1 6,0 2,1" transform="scale(4)" />
                </Marker>



                <Marker coordinates={[114, 10]} fill="#00FF00">
                  <polygon points="0,5 -2,1 -6,0 -2,-1 0,-5 2,-1 6,0 2,1" transform="scale(4)" />
                </Marker>
              </ComposableMap>
              <div className="map-home" style={{
                flex: 1, position: 'absolute', zIndex: 0, transition: 'transform 0.5s',
                transform: `translateX(${scrollPercentage >= 50 ? '-125%' : '0'})`,
              }}
              >
                <p className="map-home-content">Đây là web về lịch sử Việt Nam, cung cấp thông tin và cho phép người dùng tương tác....</p>
                <iframe
                  className="map-home-content"
                  width="560"
                  height="315"
                  style={{ justifyContent: 'center' }}
                  src="https://www.youtube.com/embed/QicLsVNMGSE"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen>
                </iframe>
              </div>
            </div>

          </div>
        </>
        ) : (
          <><div style={{ display: "flex" }}>
            <div className='map-animation' style={{ width: '1000px' }}>

              <ComposableMap
                height={1000}
                width={1300}
                projectionConfig={{
                  scale: 4200,
                  center: [109.5, 16.3],
                }}
                projection="geoMercator"
                data-tip=""
              >
                <div>
                  <button onClick={handleZoomIn}>+</button>
                  <button onClick={handleZoomOut}>-</button>
                </div>
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
                <Marker coordinates={[112, 16]} fill="#00FF00">
                  <polygon points="0,5 -2,1 -6,0 -2,-1 0,-5 2,-1 6,0 2,1" transform="scale(5)" />
                </Marker>



                <Marker coordinates={[114, 10]} fill="#00FF00">
                  <polygon points="0,5 -2,1 -6,0 -2,-1 0,-5 2,-1 6,0 2,1" transform="scale(5)" />
                </Marker>
              </ComposableMap>

            </div>
            {selectedState && (
              <div className="mapcontent" style={{ flex: 1 }}>

                <h2 className="title_map">{selectedState.state}</h2>
                <br />
                <p>
                  <div className="video-center">
                    {Array.isArray(customVideos) &&
                      customVideos.map((video, index) => (
                        <iframe
                          key={index}
                          width="660"
                          height="415"
                          style={{ justifyContent: 'center' }}
                          src={video}
                          title={`Country Video ${index + 1}`}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ))}
                    <br />
                  </div>

                  {/* {Array.isArray(customImages) && (
                customImages.map((image, index) => (
                  <img key={index}
                    src={image}
                    alt={`Country Image ${index + 1}`}
                    style={{ width: "300px", height: "150px" }} />
                ))
              )} */}

                  <div style={{ marginTop: '50px' }}>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: customText
                      }}
                    ></p>
                  </div>

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
          </div></>
        )}

        {/* <p>Content: {selectedState.content}</p> */}
      </div>


      <Tooltip id="my-tooltip">
        <div style={{ position: 'relative' }}>
          {tooltipContent}
        </div>
      </Tooltip>
    </div>
  );
});

export default function Map() {
  return (
    <Card style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      boxShadow: '10px 10px 10px rgba(0, 0, 0, 0)'
    }}>
      <Card style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        boxShadow: '10px 10px 10px rgba(0, 0, 0, 0)'
      }}>
        {/* <Card style={{ backgroundColor: '000000' }}>  */}
        {/* <div className="overlay" /> */}
        <h2 className="title-map-home"> Chào mừng đến với Sử Việt</h2>
        <MapCustom />
      </Card>
      {/* <div
    style={{
      position: 'absolute', // Position the overlay div absolutely
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
  
    }}
  /> */}

    </Card>
  )
}
