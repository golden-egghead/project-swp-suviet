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
    text: '<p>Hà Giang là một tỉnh miền núi, nằm ở cực Bắc của nước ta. Phía Đông giáp tỉnh Cao Bằng, phía Tây giáp tỉnh Yên Bái và Lào Cai, phía Nam giáp tỉnh Tuyên Quang phía Bắc giáp nước Cộng hòa Nhân dân Trung Hoa. Hà Giang có vị trí chiến lược quan trọng về quốc phòng, an ninh; về môi trường sinh thái đối với các tỉnh hạ lưu sông Lô, sông Gâm, các tỉnh đồng bằng sông Hồng và Thủ đô Hà Nội; về hợp tác, giao lưu kinh tế - văn hoá giữa Việt Nam với Trung Quốc. Tỉnh có 8 cửa khẩu với tỉnh Vân Nam (Trung Quốc), trong đó có cửa khẩu Thanh Thuỷ là cửa khẩu Quốc tế.</p><p>Địa hình của tỉnh khá phức tạp, nhiều đồi núi cao, dẫy núi Tây Côn Lĩnh với đỉnh cao 2.427 m, và cao nguyên đá Đồng Văn đã tạo nên địa hình cao dần về phía tây bắc, thấp dần về phía Đông Nam tạo nên những tiểu vùng khí hậu thích nghi với một cơ cấu nông nghiệp đa dạng. Đất đai và khí hậu thích hợp cho đa dạng hoá phát triển sản xuất nông lâm nghiệp với nhiều loại cây trồng vật nuôi nhiệt đới và á nhiệt đới, tạo ra sự đa dạng sinh học.</p><p>Trên địa bàn tỉnh có các trục đường giao thông quan trọng như: Quốc lộ 2, 4C, 34 và 279 đã được rải nhựa, hiện đang hoạt động có hiệu quả. Trong đó QL2 là tuyến đường nối Hà Giang với các vùng kinh tế phát triển tạo điều kiện thuận lợi lưu chuyển hàng hóa và phát triển kinh tế của tỉnh.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/hagiang/hagiang.jpg",
      "https://images.baodantoc.vn/uploads/lethihongphuc/2023/3/23/h%C3%A0%20giang.jpg",
      "https://static-images.vnncdn.net/files/publish/2022/10/12/ruong-lua-chin-35.jpg"]
  },
  "Cao Bằng": {
    text: '<p>Cao Bằng là tỉnh miền núi vùng cao biên giới, nằm ở cực Bắc của Tổ quốc: (Phía Bắc và Đông Bắc giáp tỉnh Quảng Tây của Trung Quốc, Phía Tây giáp tỉnh Tuyên Quang và Hà Giang, Phái Nam giáp tỉnh Bắc Kạn và Lạng Sơn). Tỉnh Cao Bằng có 3 cửa khẩu Quốc gia (Tà Lùng, Hùng Quốc, Sóc Giang) và nhiều cửa khẩu tiểu ngạch. </p><p>Thành phố Cao Bằng cách thủ đô Hà Nội 283 km theo quốc lộ 3, cách thành phố Lạng Sơn 120 km theo quốc lộ 4A và nối với các tỉnh Hà Giang, Tuyên Quang bằng quốc lộ 34. Trên địa bàn tỉnh có 3 sông chính bắt nguồn từ Trung Quốc (sông Bằng, sông Gâm và sông Quây Sơn), trong đó sông Quây Sơn chảy vào huyện Trùng Khánh tạo nên thác Bản Giốc - khu du lịch nổi tiếng của tỉnh.</p><p>Tỉnh Cao Bằng có vị trí địa lý khá thuận lợi, đường biên giới Việt Trung dài 333km, cùng nhiều cửa khẩu và các lối mở. Có lợi thế cạnh tranh thương mại, du lịch và vận chuyển hàng hoá với Trung Quốc và quốc tế, gần hành lang kinh tế Hà Nội - Lạng Sơn. Có thế mạnh phát triển du lịch với các di tích lịch sử văn hoá, cách mạng có giá trị, khí hậu ôn hoà, nhiều núi cao, phong cảnh thiên nhiên thích hợp cho nghỉ ngơi, du lịch. Có nguồn tài nguyên thiên nhiên giá trị cao, trữ lượng đủ lớn để phát triển công nghiệp. Có quỹ đất thích hợp phát triển nông lâm nghiệp, nông nghiệp sạch. Tuy nhiên, do thiếu nguồn nhân lực, nguồn lực tài chính, hệ thống đường giao thông còn thiếu và chất lượng kém nên chưa phát huy được các tiềm năng, đời sống, thu nhập của người dân còn rất nhiều khó khăn.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/caobang/caobang.jpg", "https://media.vov.vn/sites/default/files/styles/large_watermark/public/2020-11/dl_cb_6.jpg",
      "https://icdn.dantri.com.vn/2022/05/31/z34379455406568880ef752f54163601920ad22926f9ae-1653970212675.jpg"]
  },
  "Lào Cai": {
    text: '<p>Lào Cai là tỉnh vùng cao biên giới nằm phía Tây Bắc Việt Nam cách Hà Nội 296 km theo đường sắt và 345 km theo đường bộ. Phía đông giáp tỉnh Hà Giang; phía tây giáp tỉnh Sơn La và Lai Châu; phía nam giáp tỉnh Yên Bái, phía bắc giáp tỉnh Vân Nam (Trung Quốc) với 203 km đường biên giới.</p><p>Địa hình Lào Cai rất phức tạp, phân tầng độ cao lớn, mức độ chia cắt mạnh. Hai dãy núi chính là dãy Hoàng Liên Sơn và dãy Con Voi cùng có hướng Tây Bắc - Đông Nam nằm về phía đông và phía tây tạo ra các vùng đất thấp, trung bình giữa hai dãy núi này và một vùng về phía tây dãy Hoàng Liên Sơn.</p><p>Lào Cai có vị trí địa lý quan trọng trên tuyến hành lang kinh tế Côn Minh (Trung Quốc) - Lào Cai - Hà Nội - Hải Phòng, đây là lợi thế của tỉnh trong phát triển kinh tế - xã hội và hội nhập kinh tế quốc tế.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/laocai/laocai.jpg",
      "https://media.baodautu.vn/Images/phuongthanh02/2022/08/25/14-Du%20l%E1%BB%8Bch%20l%C3%A0o%20Cai%204.jpg",
      "https://tuyengiao.vn/Uploads/2021/12/23/29/nam-2022-lao-cai-phan-dau-thu-ngan-sach-nha-nuoc-dat-9-500-ty-dong.jpg"]
  },
  "Lai Châu": {
    text: '<p>Lai Châu là tỉnh được tách ra thành lập tỉnh mới từ tỉnh Lai Châu cũ từ tháng 11 năm 2003. Tỉnh Lai Châu thuộc vùng trung du miền núi Bắc Bộ , có đường ranh giới : phía Đông giáp tỉnh Lào Cai, Yên Bái, Sơn La ; phía Tây và phía Nam giáp tỉnh Điện Biên; phía Bắc giáp tỉnh Vân Nam - Trung Quốc. Tỉnh Lai Châu nối với vùng kinh tế trọng điểm Bắc Bộ bằng các tuyến quốc lộ 4D, 70, 32 và đường thuỷ sông Đà.</p><p>Lai Châu có mật độ dân số thưa nhất toàn quốc (37 người/km2). Năm 2007 tỉnh có 5 huyện, và 1 thị xã với 90 xã, phường, thị trấn, số xã thuộc chương trình 135 là 74 xã (chiếm 82,2 % tổng số xã). Dân số sống ở nông thôn là 273.243 người, chiếm 84,42%. Tỷ lệ hộ nghèo theo tiêu chí mới năm 2005 là 63,57%, cao nhất là huyện Mường Tè là 77,43%, Phong Thổ là 74,59%, huyện Sìn Hồ là 74,1%.</p><p>Cơ cấu kinh tế của tỉnh có bước chuyển dịch đúng hướng, phù hợp với đường lối phát triển kinh tế của đất nước theo xu hướng công nghiệp hoá, hiện đại hoá. Tỉ trọng công nghiệp - xây dựng  tăng từ 22,73% năm 2003 lên 27,54% (năm 2007);  Tỉ trọng dịch vụ tăng từ 27,59 (năm 2003) lên 29,46% (năm 2007), đồng thời tỉ trọng nông nghiệp trong GDP giảm từ 49,7 (năm 2003) xuống còn 43% (năm 2007). Tuy tốc độ chuyển dịch khá song đến nay tỉ trọng nông nghiệp trong GDP vẫn còn ở mức cao và Lai Châu vẫn là tỉnh có nền kinh tế nông nghiệp là chính.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/laichau/laichau.jpg",
      "https://image.giacngo.vn/w770/Uploaded/2023/qdhwqmrnd/2022_07_27/67fa5e54-huy-4353-6228.jpg",
      "https://images.baodantoc.vn/uploads/2022/Th%C3%A1ng%202/Ng%C3%A0y_21/TRung/D%C6%B0%E1%BB%9Dng%20h%E1%BA%A7m/1n%20-%20OK.jpg"]
  },
  "Bắc Kạn": {
    text: '<p>Bắc Kạn là tỉnh thuộc Đông Bắc của vùng trung du miền núi phía Bắc, có diện tích tự nhiên 4.859,41 km2. Phía đông giáp tỉnh Lạng Sơn, Phía tây giáp tỉnh Tuyên Quang, Phía nam giáp tỉnh Thái Nguyên. Bắc Kạn có 80% diện tích tự nhiên là đồi núi, độ cao trung bình 550 - 600 m so với mực nước biển, địa hình khá phức tạp, bị chia cắt bởi nhiều dãy núi cao có độ dốc lớn, tạo bởi cánh cung Ngân Sơn - Yên Lạc và cánh cung sông Gâm và còn là vùng đầu nguồn của nhiều sông suối.</p><p>Bắc Kạn là tỉnh nằm sâu trong nội địa, xa các trung tâm kinh tế - thương mại lớn của cả nước, vì vậy việc thông thương sang các tỉnh khác và ra nước ngoài là nhờ hệ thống quốc lộ 3 đi từ Hà Nội lên Cao Bằng và QL 279 chạy qua tỉnh nối thông với Lạng Sơn mang lại khả năng lưu thông kinh tế, đời sống giữa các vùng và sang Trung Quốc.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/backan/backan.jpg",
      "https://ik.imagekit.io/tvlk/blog/2021/09/kinh-nghiem-du-lich-bac-kan.jpg?tr=dpr-2,w-675",
      "https://ik.imagekit.io/tvlk/blog/2021/09/kinh-nghiem-du-lich-bac-kan-2-1024x683.jpg?tr=dpr-2,w-675"]
  },
  "Tuyên Quang": {
    text: '<p>Tuyên Quang là tỉnh miền núi phía Bắc có  toạ độ địa lý 21<sup>0</sup>30- 22<sup>0</sup>40 vĩ độ Bắc và 104<sup>0</sup>53-  105<sup>0</sup>40 kinh độ Ðông, cách Thủ đô Hà Nội 165 km.<br>- Phía bắc giáp tỉnh Hà Giang.<br>- Phía đông giáp tỉnh Thái Nguyên và Bắc  Kạn.<br>- Phía tây giáp tỉnh Yên Bái.<br>- Phía nam giáp tỉnh Vĩnh Phúc và Phú Thọ.<br>Toàn tỉnh có 70% diện tích là đồi núi.  Tuyên Quang có địa hình khá phức tạp, bị chia cắt bởi nhiều dãy núi cao và sông  suối gồm toàn bộ huyện Na Hang, Lâm Bình, xã vùng cao của huyện Chiêm hoá và 02  xã của huyện vùng cao Hàm Yên. Vùng núi thấp và trung du chiếm khoảng 50% diện  tích của tỉnh, bao gồm các xã còn lại của 02 huyện Chiêm Hoá, Hàm Yên và các  huyện Yên Sơn, Sơn Dương. Ðiểm cao nhất là đỉnh núi Chạm Chu (Hàm Yên) có độ  cao 1.587 m so với mực nước biển.</p><p>Tuyên Quang nằm sâu trong nội địa, cách  xa các trung tâm kinh tế - thương mại lớn của cả nước, tỉnh chưa có đường sắt  và đường hàng không, hiện việc thông thương ra ngoài tỉnh chủ yếu qua hệ thống  các quốc lộ 2 và 37.<br>Hệ thống sông suối phân bố có các sông:  Lô, Gâm, Phã Đáy chảy qua nên thuận tiện cho giao thông đường thuỷ. Tuyên Quang  đang được nhà nước đầu tư xây dựng thuỷ điện Na Hang, tạo thuận lợi cho phát  triển kinh tế xã hội trong tương lai.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/tuyenquang/tuyenquang.jpg",
      "https://ik.imagekit.io/tvlk/blog/2021/09/kinh-nghiem-du-lich-tuyen-quang-2-1024x904.jpg?tr=dpr-2,w-675",
      "https://daihoi13.dangcongsan.vn/Uploads/Images/2021/5/25/46/anh_TQ_28_9-1601240966289.jpg"]
  },
  "Lạng Sơn": {
    text: '<p>Lạng Sơn là tỉnh miền núi biên giới thuộc  vùng Đông bắc, cách thủ đô Hà Nội 154 km đường bộ và 165 km đường sắt. Tọa độ địa  lý từ 21<sup>o</sup>20’ đến 22<sup>o</sup>27’ vĩ độ Bắc và từ 106<sup>o</sup>08’  đến 107<sup>o</sup>22’ kinh độ Đông.<br>- Phía Bắc giáp tỉnh Cao Bằng, phía Đông  Bắc giáp tỉnh Quảng Tây (Trung Quốc) với đường biên giới dài 253 km<br>- Phía Đông Nam giáp tỉnh Quảng Ninh, <br>- Phía Nam giáp tỉnh Bắc Giang, <br>- Phía Tây giáp tỉnh Bắc Kạn và Thái  Nguyên. <br>Tỉnh có 5 huyện giáp biên giới với 2 cửa  khẩu quốc tế: cửa khẩu Ga đường sắt Đồng Đăng huyện Cao Lộc và cửa khẩu  đường bộ Hữu Nghị; có một cửa khẩu quốc gia: Chi Ma (huyện Lộc Bình)  và 10 lối mở biên giới với Trung Quốc. <br>Lạng Sơn có vị trí địa lý, kinh tế, quốc  phòng quan trọng của cả nước; có đường Quốc lộ 1A, 1B, 4B và 279 đi qua, có đường  sắt liên vận quốc tế, là điều kiện thuận cho việc giao lưu kinh tế, văn hoá,  khoa học công nghệ với các tỉnh phía Tây như Cao Bằng, Thủ đô Hà nội, các tỉnh  trong cả nước, với Trung quốc, và các nước trên thế giới.<br>Địa hình cao trung bình là 251 m, tuy nằm  ở trong khu vực nhiệt đới gió mùa, nhưng khí hậu Lạng Sơn có nét đặc thù của  khí hậu á nhiệt đới. Độ ẩm cao trên 83% và phân bố đều trong năm, cho phép Lạng  Sơn có thể phát triển đa dạng, phong phú các loại cây trồng nhiệt đới, ôn đới  và á nhiệt đới, đặc biệt là các loại cây ăn quả lâu năm, cây lấy gỗ, cây đặc sản  hồi, trám.</p><p>Những năm gần đây kinh tế của tỉnh đã có  sự phát triển, đặc biệt là kinh tế thương mại với Trung Quốc, cơ cấu chuyển đổi  theo hướng sản xuất hàng hóa gắn với thị trường, sản xuất; các loại sản phẩm  nông nghiệp có lợi thế như: ngô, đỗ, rau, khoai tây, cây ăn quả, chè, chăn nuôi  bò, lợn và gia cầm có điều kiện phát triển.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/langson/langson.jpg",
      "https://scontent.iocvnpt.com/resources/portal/Images/LSN/linhnk.lsn/langson_694464698.jpg",
      "https://media1.nguoiduatin.vn/thumb_x640x384/media/luong-quoc-tiep/2021/06/30/nguon-goc-ten-tinh-lang-son-va-nhung-dieu-thu-vi-co-the-ban-chua-biet.jpg"]
  },
  "Yên Bái": {
    text: '<p>Yên Bái là một tỉnh nằm ở trung tâm vùng núi và  trung du phía Bắc, thuộc vùng sinh thái Việt bắc Hoàng Liên Sơn.<br>- Phía Bắc giáp tỉnh Lào Cai và Hà Giang.<br>- Phía Nam, Tây nam giáp tỉnh Sơn La. <br>- Phía Đông giáp tỉnh Tuyên Quang.<br>- Phía Đông nam giáp tỉnh Phú Thọ. </p><p>Yên Bái có vị trí địa lý là cửa ngõ miền Tây Bắc,  nằm trên trung điểm của một trong những tuyến hành lang kinh tế chủ lực Côn  Minh - Lào Cai - Hà Nội - Hải Phòng, có hệ thống giao thông tương đối đa dạng  đã tạo điều kiện và cơ hội thuận lợi để Yên Bái tăng cường hội nhập và giao lưu  kinh tế thương mại, phát triển văn hóa xã hội… không chỉ với các tỉnh trong  vùng, các trung tâm kinh tế lớn trong cả nước mà còn cả trong giao lưu kinh tế  quốc tế, đặc biệt là với các tỉnh phía Tây Nam của Trung Quốc và các nước trong  khối ASEAN. </p><p>Bên cạnh thuận lợi, Yên Bái cũng là tỉnh có địa hình phức tạp,  bị chia cắt, diện tích dốc chiếm tỷ lệ lớn hạn chế đến xây dựng cơ sở hạ tầng  phục vụ sản xuất, đời sống, lưu thông tiêu thụ nông sản gặp nhiều khó khăn. Đồng  thời điều kiện tự nhiên còn gây nên một số yếu tố bất thuận như: mưa lớn tập  trung vào một số tháng, đất dốc nên dễ gây xói mòn, rửa trôi đất đai, lũ quét sạt  lở làm mất đất sản xuất, ách tắc giao thông.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/yenbai/yenbai.jpg",
      "https://cdn.tgdd.vn/Files/2021/07/09/1366829/diem-danh-13-dia-diem-du-lich-tai-yen-bai-ban-nhat-dinh-phai-tham-quan-202202141345041502.jpg",
      "https://cungphuot.info/wp-content/uploads/2014/05/cac-dia-diem-du-lich-o-yen-bai.jpg"]
  },
  "Điện Biên": {
    text: '<p>Điện Biên là tỉnh Miền núi biên giới phía Bắc được thành lập do tách từ  tỉnh Lai Châu cũ theo Nghị quyết số 22/2003/QH11 ngày 26/11/2003 của Quốc hội nước  CHXHCN Việt Nam. Điện Biên có vị trí giáp ranh: phía Bắc giáp tỉnh Lai Châu,  phía Đông và Đông Nam giáp tỉnh Sơn La, phía Tây Bắc giáp tỉnh Vân Nam (Trung  Quốc), phía Tây và Tây Nam giáp CHND Lào.</p><p>Hệ thống giao thông chính của tỉnh bao gồm các  quốc lộ 6A, QL12, QL279 và một sân bay dân dụng. Mạng lưới sông suối phân bố  khá đều trên lãnh thổ của tỉnh, trong đó có các hệ thống sông lớn là sông Đà,  sông Mã và hệ thống sông Mê Kông. </p><p>Điện Biên  có mật độ dân số thưa: 57 người/ km<sup>2</sup>.  Tỉnh có 8 huyện, 1 TP thuộc tỉnh, 1 Thị xã, 130 xã, phường, thị trấn. Toàn tỉnh  có 21 dân tộc anh em, trong đó người Thái chiếm 42%, người Mông 27%, người Kinh  19%. Dân số sống ở vùng nông thôn chiếm 83%.</p><p>Số xã thuộc chương trình 135 là 59 xã (chiếm 63%  tổng số xã). Tỷ lệ hộ nghèo năm 2005 theo tiêu chí mới là 44,8%, cao nhất là  huyện vùng cao Mường Nhé 76,6%, huyện Tuần Giáo 58,1%. </p><p>Từ nay đến năm 2010, điều chỉnh chiến lược phát triển hàng xuất khẩu, hình thành một số mặt hàng xuất khẩu chủ lực của tỉnh như: chè, thịt chế biến, gỗ chế biến, măng chế biến, xi măng, vật liệu xây dựng, khoáng sản v.v… Phấn đấu nâng kim ngạch xuất khẩu trên địa bàn lên khoảng 16 - 17 triệu USD vào năm 2010, trong đó xuất khẩu hàng của địa phương khoảng 8 triệu USD.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/dienbien/dienbien.jpg",
      "https://www.vietnamairlinesgiare.vn/wp-content/uploads/2021/02/du-lich-dien-bien-22-2-2021-1.jpg",
      "https://nld.mediacdn.vn/291774122806476800/2022/5/7/2798442675192139397371526575932225621609096n-1651911906626131234922.jpg"]
  },
  "Thái Nguyên": {
    text: '<p>Tỉnh Thái Nguyên, là trung tâm chính trị, kinh tế của khu Việt  Bắc nói riêng, của vùng trung du miền núi đông bắc nói chung, là cửa ngõ giao  lưu kinh tế xã hội giữa vùng trung du miền núi với vùng đồng bằng Bắc Bộ, có trị  trí địa lý:<br>- Phía Bắc tiếp giáp với tỉnh Bắc Kạn.<br>- Phía Tây giáp với các tỉnh Vĩnh Phúc, Tuyên Quang, <br>- Phía Đông giáp với các tỉnh Lạng Sơn, Thái Nguyên. <br>- Phía Nam tiếp giáp với thủ đô Hà Nội (cách 80 km).</p><p>Thái Nguyên là một tỉnh trung du miền núi nhưng  địa hình lại không phức tạp nhiều so với các tỉnh trung du, miền núi khác, đây  là một thuận lợi của Thái Nguyên trong sản xuất nông lâm nghiệp và phát triển  kinh tế xã hội so với các tỉnh khác trong vùng. </p><p>Thái Nguyên là điểm nút giao lưu thông qua hệ thống đường bộ,  đường sắt, đường sông hình rẻ quạt kết nối với các tỉnh thành. Hệ thống Đường  quốc lộ và tỉnh lộ phân bố khá hợp lý trên địa bàn tỉnh, phần lớn các Đường đều  xuất phát từ trục dọc quốc lộ 3 đi trung tâm các huyện lỵ, thị xã, các khu kinh  tế, vùng mỏ, khu du lịch và thông với các tỉnh lân cận. Đường quốc lộ 3 từ Hà Nội  lên Bắc Kạn, Cao Bằng cắt dọc toàn bộ tỉnh Thái Nguyên, chạy qua Thành phố Thái  Nguyên, nối Thái Nguyên với Hà Nội và các tỉnh đồng bằng Sông Hồng. Các quốc lộ  37, 18, 259 cùng với hệ thống Đường tỉnh lộ, huyện lộ là mạch máu quan trọng nối  Thái Nguyên với các tỉnh xung quanh. Hệ thống đường sông có 2 tuyến chính là:  Đa Phúc - Hải Phòng và Đa Phúc - Hòn Gai; Hệ thống đường sắt Thái Nguyên - Hà Nội  - Lạng Sơn đảm bảo phục vụ vận chuyển hành khách và hàng hóa với các tỉnh trong  cả nước.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/thainguyen/thainguyen.jpg",
      "https://cdn.tgdd.vn/Files/2023/04/26/1527479/du-lich-dong-hy-thai-nguyen-5-dia-diem-du-lich-nen-kham-pha-202304260848095809.jpg",
      "https://daithainguyen.vn/UserFiles/image/2(6950).jpg"]
  },
  "Bắc Giang": {
    text: '<p>Bắc Giang là tỉnh thuộc vùng miền núi  Đông Bắc, nằm cách Thủ đô Hà Nội 50 km về phía Bắc, cách cửa khẩu quốc tế Hữu  Nghị (Lạng Sơn) 110 km về phía Nam, cách cảng Hải Phòng hơn 100 km về phía  Đông. Về quy hoạch kinh tế trước đây Bắc Giang nằm trong vùng trung du và miền  núi phía Bắc, từ năm 2012 là tỉnh nằm trong quy hoạch vùng Thủ đô Hà Nội.<br>- Phía Bắc và Đông Bắc giáp tỉnh Lạng Sơn.<br>- Phía Tây và Tây Bắc giáp thành phố Hà Nội,  Thái Nguyên. <br>- Phía Nam  và Đông Nam  giáp tỉnh Bắc Ninh, Hải Dương và Quảng Ninh. <br>Địa hình Bắc Giang gồm 2 tiểu vùng: Miền  núi và trung du có đồng bằng xen kẽ. Vùng trung du bao gồm các huyện: Hiệp Hòa,  Việt Yên và thành phố Bắc Giang. Vùng miền núi bao gồm 7 huyện: Sơn Động, Lục  Nam, Lục Ngạn, Yên Thế, Tân Yên, Yên Dũng, Lạng Giang. Trong đó một phần các  huyện Lục Ngạn, Lục Nam,  Yên Thế và Sơn Động là vùng núi cao. Với đặc điểm chủ yếu về địa hình miền núi  (chiếm 72% diện tích toàn tỉnh) nên có sự chia cắt mạnh, phức tạp, chênh lệch về  độ cao lớn. Nhiều vùng đất đai tốt, nhất là ở các khu vực còn rừng tự nhiên.</p><p>Trên địa bàn tỉnh có các tuyến quốc lộ  1A, 31, 37, 279; tuyến đường sắt Hà Nội - Đồng Đăng, Kép - Hạ Long và 3 tuyến  đường thủy trên sông Cầu, sông Thương, sông Lục Nam. Với vị trí và điều kiện  giao thông như trên, tạo cho tỉnh những lợi thế về thị trường tiêu thụ sản phẩm  nông nghiệp và điều kiện tiếp thu các công nghệ kỹ thuật tiên tiến để phát triển  kinh tế nói chung và sản xuất nông - lâm nghiệp nói riêng.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/bacgiang/bacgiang.jpg",
      "https://ik.imagekit.io/tvlk/blog/2022/09/dia-diem-check-in-o-bac-giang-1.jpg?tr=dpr-2,w-675",
      "https://ik.imagekit.io/tvlk/blog/2022/09/dia-diem-check-in-o-bac-giang-3.jpg?tr=dpr-2,w-675"]
  },
  "Vĩnh Phúc": {
    text: '<p>Tỉnh Vĩnh Phúc có  diện tích tự nhiên 1.235,13 km², dân số 1.054,49 nghìn người, là một tỉnh vùng đồng bằng sông Hồng -  Việt Nam, có tọa độ: từ 21°08’ (tại xã Đạo Trù, huyện Tam Đảo) đến 21°19 (tại  xã Tráng Việt, huyện Mê Linh, thành phố Hà Nội) vĩ độ bắc; từ 105° 109’ (xã  Bạch Lưu, huyện Sông Lô) đến 105°47’ (xã Ngọc Thanh, thị xã Phúc Yên) kinh độ  đông. <br>Trên địa bàn có 9  đơn vị hành chính: thành phố Vĩnh Yên, thị xã Phúc Yên và 7 huyện: Lập Thạch,  Sông Lô, Tam Dương, Bình Xuyên, Tam Đảo, Vĩnh Tường, Yên Lạc với 112 xã, 25  phường và thị trấn.<br>- Phía bắc giáp hai tỉnh Thái Nguyên và Tuyên  Quang, đường ranh giới là dãy núi Tam Đảo.<br>- Phía tây giáp tỉnh Phú Thọ, ranh giới tự  nhiên là sông Lô.<br>- Phía nam giáp Hà Nội, ranh giới tự nhiên là  sông Hồng.<br>- Phía đông giáp hai huyện Sóc Sơn và Đông  Anh – Hà Nội.</p><p>Vĩnh Phúc nằm ở  vị trí địa lý của nhiều nút giao thông quan trọng là đường bộ, đường sắt, đường  hàng không, đường thuỷ toả đi khắp đất nước; thuận lợi trên trục phát triển kinh  tế của Việt Nam và trở thành một bộ phận cấu thành của vành đai phát triển công nghiệp các tỉnh phía Bắc Việt Nam. Tỉnh Vĩnh Phúc nằm liền kề với  thủ đô Hà Nội, tiếp giáp với sân bay quốc tế Nội Bài, là điểm đầu của Quốc lộ  18 đi cảng nước sâu Cái Lân (Quảng Ninh), hành lang kinh tế Côn Minh - Hà Nội -  Hải Phòng, Quốc lộ 2 Việt Trì - Hà Giang - Trung Quốc, hành lang đường 18 và  đường vành đai IV thành phố Hà Nội... có hệ thống đường sắt Hà Nội - Lào Cai,  Quốc lộ 2 chạy dọc tỉnh. Vĩnh Phúc có 4 sông chính là sông Hồng, sông Lô, sông  Phó Đáy và sông Cà Lồ.<br>Vĩnh Phúc nằm trong vùng quy hoạch du lịch trọng  điểm quốc gia: Có khu nghỉ mát Tam Đảo, với độ cao gần 1.000 m so với mực nước  biển, nằm trong khu rừng nguyên sinh khoảng 1.500 ha. Các hồ có diện tích vài  trăm ha mặt nước như Đại Lải, Làng Hà, Đầm Vạc... Nhiều di tích lịch sử, văn  hoá được xếp hạng quốc gia như: Tây Thiên, Tháp Bình Sơn…</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/vinhphuc/vinhphuc.jpg",
      "https://thongkevinhphuc.gov.vn/files/assets/01ec7e179ace42901bdf.jpg",
      "https://vinhphuc.gov.vn/ct/DuyetTinBai_IMG/PublishingImages/2019/hiennm2019/1dn11.jpg"]
  },
  "Phú Thọ": {
    text: '<p>Tỉnh  Phú Thọ thuộc vùng Trung du miền núi phía Bắc, có tọa độ địa lý từ 20<sup>0</sup>55’ đến 21<sup>0</sup>43’ vĩ độ Bắc, 104<sup>0</sup>48’ đến 105<sup>0</sup>27<strong>’</strong> kinh độ  Đông. Phía Bắc giáp  tỉnh; Tuyên Quang, Phía Nam giáp tỉnh Hòa Bình; Phía Đông giáp tỉnh Vĩnh Phúc  và Thành phố Hà Nội; Phía Tây giáp tỉnh Sơn La và tỉnh Yên Bái;<br>Phú Thọ có vị trí trung tâm vùng TDMNPB và là cửa  ngõ phía Tây Bắc của Thủ đô Hà Nội, nằm trên trục hành lang kinh tế Hải Phòng –  Hà Nội – Côn Minh (Trung Quốc), liền kề vùng Kinh tế Trọng điểm Bắc Bộ, cách  sân bay quốc tế Nội Bài 50 km và Trung tâm thành phố Hà Nội 80 km, có đường cao  tốc Nội Bài-Lào Cai và là nơi hợp lưu của ba con sông lớn: sông Hồng, sông Đà  và sông Lô. Nên có nhiều điều kiện thuận lợi trong sản xuất và tiêu thụ sản phẩm  nông nghiệp. </p><p>Có các vùng địa  hình khác nhau (đồng bằng, trung du và miền núi), khí hậu đa dạng và phân hóa mạnh,  nên hình thành nhiều tiểu vùng sinh thái khác nhau. Các dạng địa hình của tỉnh  có ảnh hưởng đáng kể đến sản xuất  nông nghiệp của tỉnh và đặc biệt là đối với lĩnh vực trồng trọt. Địa hình đồng bằng khá bằng phẳng (đầu tư hệ thống  thủy lợi ít tốn kém) thích hợp đối với canh tác lúa, nuôi cá và trồng cây màu,  địa hình đồi núi khí hậu thay đổi khi càng lên cao, thích hợp với trồng cây dược  liệu, trồng rừng, trồng hoa. Đây là điều kiện thuận lợi cho phát triển nông  nghiệp theo hướng sản phẩm hàng hoá đa dạng, phong phú. Song các yếu tố khí hậu  khắc nghiệt, đặc biệt là lạnh giá, sương muối, lũ quét… ở vùng đồi núi cũng gây  trở ngại không nhỏ cho sự phát triển chung, nhất là sản xuất nông nghiệp và đời  sống dân cư.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/phutho/phutho.jpg",
      "https://top10phutho.vn/wp-content/uploads/2022/10/hinh-anh-phu-tho-1.jpg",
      "https://dubaothoitiet.info/Uploads/images/anh-den-hung%20(1).jpg"]
  },
  "Quảng Ninh": {
    text: '<p>Quảng Ninh ở toạ độ địa lý: từ 106<sup>0</sup>15’ - 108<sup>0</sup>15’  kinh độ Đông và từ:&nbsp; 20<sup>0</sup>24’ -  21<sup>0</sup>21’ vĩ độ Bắc, là một trong 15 tỉnh thuộc vùng trung du miền núi  Bắc Bộ(TDMNBB), nằm về phía Đông - Bắc của nước ta, đồng thời là một trong 8 tỉnh  thuộc vùng kinh tế trọng điểm Bắc Bộ - khu vực có mức tăng trưởng kinh tế cao,  giao lưu kinh tế mạnh. <br>Trung tâm tỉnh nằm cách thủ đô Hà Nội 153 km. Có đường ranh  giới: <br>- Phía Bắc giáp nước Cộng hoà Nhân dân Trung Hoa (có biên giới  dài 139km) và tỉnh Lạng Sơn<br>- Phía Nam giáp TP. Hải Phòng và tỉnh Hải Dương<br>- Phía Đông và Đông Nam là vịnh Bắc Bộ, có chiều dài bờ  biển 250 km<br>- Phía Tây và Tây Bắc giáp tỉnh Bắc Giang và tỉnh Lạng Sơn<br>Tỉnh Quảng Ninh có 14 đơn vị hành chính trực thuộc tỉnh, bao gồm 4 thành phố  Hạ Long, Móng Cái, Cẩm Phả, Uông Bí; 2 thị xã Đông Triều, Quảng Yên và 8 huyện:  Bình Liêu, Tiên Yên, Đầm Hà, Hải Hà, Ba Chẽ, Vân Đồn, Hoành Bồ, Cô Tô; có 186  đơn vị hành chính cấp xã, gồm 11 xã, 67 phường và 8 thị trấn.</p><p>Nằm trong vùng ảnh  hưởng trực tiếp của tam giác tăng trưởng, so với nhiều địa phương trong vùng, tỉnh  Quảng Ninh có nhiều lợi thế có thể khai thác để thúc đẩy nhanh phát triển kinh  tế nông nghiệp bền vững.<br>Vị trí địa lý mang lại điều kiện cho tỉnh Quảng Ninh có điều  kiện thuận lợi phát triển sản xuất nông nghiệp hàng hoá, mở rộng giao lưu, trao  đổi kinh tế, văn hoá, xã hội với các tỉnh khác trong vùng, với cả nước và với  Quốc Tế thông qua mạng lưới giao thông đường bộ, đường sắt, đường biển, cảng biển  phát triển và hệ thống các cửa khẩu Quốc Tế. </p><p>Sự đa dạng của địa hình với rừng, biển chiếm diện  tích lớn giàu tài nguyên, vùng đồng bằng tạo nên nhiều tiểu vùng khí hậu mang  những nét đặc trưng khác nhau của của khí hậu miền núi ven biển, khí hậu đại  dương… thuận lợi để phát triển đa dạng các loại sản phẩm nông sản đặc trưng và  phù hợp với từng tiểu vùng mang lại hiệu quả và giá trị kinh tế cao. </p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/quangninh/quangninh.jpg",
      "https://ik.imagekit.io/tvlk/blog/2022/02/dia-diem-du-lich-quang-ninh-2.jpg?tr=dpr-2,w-675",
      "https://bvhttdl.mediacdn.vn/291773308735864832/2021/4/27/quang-ninh-16194956971871120645003-1619508590779-1619508596374707232506.jpg"]
  },
  "Sơn La": {
    text: '<p>Sơn La là một tỉnh miền núi cao thuộc phía Tây Bắc Việt Nam giáp các tỉnh  Yên Bái, Lào Cai về phía Bắc, Phú Thọ, Hòa Bình về phía Đông, Lai Châu, Điện  Biên về phía Tây, tỉnh Thanh Hóa về phía Nam, và có 250 km đường biên giới  chung với nước CHDCND Lào. Thị xã Sơn La cách thủ đô Hà Nội 320 km. Khí hậu đặc  trưng cận ôn đới, chia thành hai mùa rõ rệt: mùa khô và mùa mưa. Tỉnh Sơn La có  độ cao trung bình 600 m - 700m so với mặt nước biển, địa hình chia cắt hình  thành 3 vùng sinh thái khác nhau : Vùng dọc trục quốc lộ 6, vùng hồ sông Đà và  vùng cao biên giới với những điều kiện sinh thái khác nhau đã tạo nên đặc trưng của tỉnh Sơn  La. Trong đó vùng dọc quốc lộ số 6 có hai cao nguyên: Mộc Châu (cao 1.050 m) và  Nà Sản (cao 800 m) là vùng động lực phát triển kinh tế năng động nhất của tỉnh  Sơn La trong thời gian qua. Giao thông đường bộ quan trọng nhất của Sơn La bao  gồm Quốc lộ 6&nbsp; nối Hà Nội - Sơn La - Điện  Biên, Quốc lộ 37, 4G, và Quốc lộ 43 đến cửa khẩu Pa Háng lưu thông với nước bạn  Lào. Hệ thống giao thông đường thuỷ có Sông Đà, Sông Mã với các cảng Sông Vạn  Yên, Tà Hộc. Ngoài ra trên địa bàn tỉnh còn có sân bay Nà Sản. Sơn La có diện tích tự nhiên là 14.174 km<sup>2</sup>,  chiếm 4,27% tổng diện tích cả nước và đứng thứ 5 về diện tích trong số 63 tỉnh,  thành phố cả nước.</p><p>Sơn La có một vị trí quan trọng cả về kinh tế, xã hội, an  ninh và quốc phòng. Cùng với Hòa Bình, Điện Biên và Lai Châu, Sơn La còn được  coi là mái nhà xanh của đồng bằng Bắc Bộ.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/sonla/sonla.jpg",
      "https://mocchautourism.com/uploads/news/2021_10/di-lich-cao-nguyen-moc-chau-1.jpg",
      "https://media.vov.vn/sites/default/files/styles/large/public/2021-10/image_6483441_26-10-2021-12-45-17.jpg"]
  },
  "Bắc Ninh": {
    text: '<p>Bắc Ninh  có diện tích tự&nbsp; nhiên 822,71 km²,&nbsp; dân số 1.154,66 nghìn người, là tỉnh có diện tích nhỏ nhất Việt Nam, nằm trong vùng châu thổ sông  Hồng, thuộc khu vực đồng bằng Bắc Bộ. Tỉnh có 8 đơn vị hành chính cấp huyện (gồm:  1 thành phố, 1 thị xã và 6 huyện), 126 đơn vị hành chính cấp xã (gồm: 17  phường, 6 thị trấn, 102 xã).Vị trí địa lý nằm trong phạm vi từ 20<sup>o</sup>58’  đến 21<sup>o</sup>16’ vĩ độ Bắc: <br>- Phía đông và  đông nam giáp tỉnh Hải Dương, <br>- Phía tây và  tây nam giáp thủ đô Hà Nội, <br>- Phía nam giáp  tỉnh Hưng Yên. <br>- Phía bắc giáp  tỉnh Bắc Giang, <br>Trong quy hoạch  xây dựng, Bắc Ninh thuộc vùng Thủ đô. Nằm trên 2 hành lang kinh tế Côn Minh -  Lào Cai - Hà Nội - Hải Phòng - Quảng Ninh và Nam Ninh - Lạng Sơn - Hà Nội - Hải  Phòng - Quảng Ninh. Địa hình tương đối bằng phẳng, được  ngăn cách với vùng trung du và miền núi phía Bắc bởi hệ thống sông Cầu. Ngoài  ra, hai hệ thống sông lớn là sông Thái Bình và sông Đuống, tạo nên một mạng  lưới vận tải đường thủy quan trọng, kết nối các địa phương trong và ngoại tỉnh.  Đồng thời tạo điều kiện thuận lợi cho các hoạt động sản xuất nông nghiệp và  sinh hoạt của người dân.</p><p>Bắc Ninh ở vị trí thuận lợi về giao thông đường  bộ và đường không. Các tuyến đường huyết mạch: Quốc lộ 1A, 1B, quốc lộ 18, quốc  lộ 38, đường sắt Hà Nội- Lạng Sơn, Hà Nội- Quảng Ninh nối liền Bắc Ninh với các  trung tâm kinh tế, văn hóa và thương mại của khu vực phía Bắc Việt Nam, với  cảng hàng không quốc tế Nội Bài và liên thông với hệ thống các trục đường quốc  lộ đến với mọi miền trong cả nước.</p><p>Nhờ vị trí địa lý thuận lợi cùng với các cơ chế  và giải pháp phát triển kinh tế hợp lý, Bắc Ninh đã và đang khai thác các tiềm  năng hiện có để trở thành một trung tâm kinh tế- văn hóa phụ trợ, một thành phố  vệ tinh quan trọng cho Hà Nội và là một điểm nhấn trong tam giác kinh tế trọng  điểm Hà Nội- Hải Phòng-Quảng Ninh. Nơi đây vừa là thị trường tiêu thụ, vừa là  khu vực cung cấp nguồn nhân lực, sản phẩm nông sản, vật liệu xây dựng, hàng thủ  công mỹ nghệ… cho các tỉnh thành trong vùng đồng bằng Sông Hồng và các vùng lân  cận.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/bacninh/bacninh.jpg",
      "https://hungngangroup.vn/wp-content/uploads/2022/05/b1.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/8/87/Trung_t%C3%A2m_v%C4%83n_h%C3%B3a_Kinh_B%E1%BA%AFc.jpg"]
  },
  "Hà Nội": {
    text: '<p>Hà Nội là thủ đô của nước Cộng hoà Xã hội chủ  nghĩa Việt Nam, nằm chếch về phía tây bắc của trung tâm vùng đồng bằng Sông  Hồng, có vị trí từ 20°53 đến 21°23 vĩ độ Bắc và 105°44 đến 106°02 kinh độ Đông.  Phía Bắc giáp các tỉnh Thái Nguyên, Vĩnh Phúc; phía Nam giáp Hà Nam, Hòa Bình;  phía Đông giáp Bắc Giang, Bắc Ninh, Hưng Yên; phía Tây giáp Hòa Bình, Phú Thọ.</p><p><br>Hà Nội là trung tâm chính trị - hành chính quốc gia,  trung tâm lớn về văn hoá, khoa học, giáo dục, kinh tế và giao dịch quốc tế. hiện có 30 đơn vị hành chính cấp huyện – gồm 12 quận, 17 huyện, 1 thị  xã – và 584 đơn vị hành chính cấp xã – gồm 386 xã, 177 phường và 21 thị trấn. </p><p>Trong  mối quan hệ khu vực và quốc tế, thủ đô Hà Nội có nhiều lợi thế về vị trí địa  lý- chính trị, lịch sử phát triển lâu đời và là đô thị trung tâm quan trọng của  Việt Nam, có sức hút và tác động rộng lớn đối với quốc gia trong khu vực và  quốc tế. </p><p> Phát  triển không gian Thủ đô Hà Nội được đặt trong mối quan hệ vùng Thủ đô Hà Nội  với mối quan hệ tương hỗ hai chiều. Trong đó Thủ đô Hà Nội tác động đến vùngbằng  việc thể hiện vai trò là đầu tàu, trung tâm tăng trưởng kinh tế, thúc đẩy toàn  vùng phát triển thông qua sự mở rộng, lan toả các hoạt động kinh tế, đô thị hóa  ra các tỉnh xung quanh. Vùng tác  động đến Thủ đô Hà Nộibằng  việc cung cấp cho Hà Nội nguồn thực phẩm, nguồn lao động, quĩ đất phát triển  cho các khu chức năng mang tính chất liên kết và chia sẻ chức năng vùng.</p><p><br>Hà Nội là trung tâm đầu mối giao thông đối ngoại đường  bộ, đường sắt, đường hàng không quốc gia, quốc tế, có điều kiện thuận lợi để phát triển hợp tác khai thác các công trình hạ tầng kỹ  thuật đầu mối mang tính liên vùng như: Vùng Hà Nội - Vĩnh  Phúc - Hưng Yên khai thác sông Hồng. Vùng Hà Nội - Hà Nam giải quyết tiêu thoát  nước mặt và các giải pháp bảo vệ môi trường sông Đáy. Vùng Hà Nội - Hòa Bình  xây dựng Nghĩa trang liên Vùng và bảo vệ nguồn nước sông Đà. Vùng Hà Nội - Thái  Nguyên - Vĩnh Phúc - Bắc Ninh - Hưng Yên khai thác và quản lý khu xử lý chất  thải rắn liên vùng. </p>',
    links: ["/video-details/2", "/video-details/3"],
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/hanoi/hanoi.jpg",
      "https://vcdn1-dulich.vnecdn.net/2022/05/11/hoan-kiem-lake-7673-1613972680-1508-1652253984.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=2wB1cBTUcNKuk68nrG6LMQ",
      "https://cdnimg.vietnamplus.vn/uploaded/hotnnz/2022_08_30/ha_noi.jpg"]
  },
  "Hải Dương": {
    text: '<p>Hải Dương là một tỉnh thuộc Đồng bằng sông Hồng, nằm trong phạm vi từ 20°36′ đến 21°33’ vĩ độ Bắc và từ 106°30’ đến 106°36 kinh độ Đông. Hải Dương tiếp giáp với 6 tỉnh, đó là:<br> - Phía Đông giáp Hải Phòng. <br>- Phía Tây giáp Hưng Yên. <br>- Phía nam giáp Thái Bình.<br>- Phía Bắc giáp Bắc Ninh, Bắc Giang, Quảng Ninh.<br>Khí hậu nhiệt đới gió mùa, nóng và ẩm ướt với 4 mùa; nhiệt độ trung bình là 23oC; độ ẩm trung bình hàng năm từ 78 đến 87%; lượng mưa trung bình hàng năm từ 1.500 mm đến 1.700 mm. Theo số liệu thống kê, từ năm 1972 đến nay, Hải Dương không bị ảnh hưởng nặng nề bởi mưa và bão.<br>Là một tỉnh có tiềm năng lớn về sản xuất vật liệu xây dựng, như đá vôi với trữ lượng khoảng 200 triệu tấn, đất sét để sản xuất vật liệu chịu lửa với trữ lượng khoảng 8 triệu tấn, cao lanh - nguyên liệu chính để sản xuất gốm sứ với trữ lượng khoảng 400.000 tấn, quặng bô - xít dùng để sản xuất đá mài và bột mài công nghiệp với trữ lượng khoảng 200.000 tấn. Những nguồn tài nguyên này chủ yếu tập trung trên địa bàn huyện Chí Linh và Kinh Môn.<br></p><p>Tỉnh Hải Dương nằm trong địa bàn kinh tế trọng điểm phía Bắc (Hà Nội - Hải Phòng - Quảng Ninh), có các tuyến đường bộ, đường sắt quan trọng của quốc gia chạy qua như các quốc lộ 5, 18, 183, 37. Là điểm trung chuyển giữa thủ đô Hà Nội và thành phố cảng Hải Phòng theo trục quốc lộ 5 (cách Hải Phòng 45 km về phía đông, cách Hà Nội 57 km về phía tây). Phía bắc của tỉnh có hơn 20 km quốc lộ 18 chạy qua, nối sân bay quốc tế Nội Bài với biển qua cảng Cái Lân. Quốc lộ 18 tạo điều kiện giao lưu hàng hóa từ nội địa (vùng Bắc Bộ) và từ tam giác tăng trưởng kinh tế phía Bắc ra biển, giao lưu với các nước trong khu vực và thế giới, đồng thời tạo cơ sở hạ tầng cho việc phát triển hành lang công.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/haiduong/haiduong.jpg",
      "https://media.vneconomy.vn/images/upload/2023/04/07/hai-duong-sua3-15-47-46-961.jpg",
      "https://baoxaydung.com.vn/stores/news_dataimages/nga/022020/20/14/in_article/3354_image001.jpg"]
  },
  "Hưng Yên": {
    text: '<p>Hưng Yên là một tỉnh thuộc đồng bằng sông Hồng có toạ độ&nbsp; từ 20<sup>0</sup>36 - 21<sup>0</sup>00 độ  vĩ Bắc tới 105<sup>0</sup>53 - 106<sup>0</sup>15 kinh độ Đông. Tỉnh nằm ở  trung tâm đồng bằng Bắc Bộ và trong vùng kinh tế trọng điểm Bắc Bộ (Hà Nội -  Hưng Yên - Hải Dương - Hải Phòng - Quảng Ninh).<br>- Phía Bắc giáp tỉnh Bắc Ninh.<br>- Phía tây bắc giáp Thủ đô Hà Nội.<br>- Phía Đông và Đông bắc giáp tỉnh Hải Dương.<br>- Phía Tây giáp Hà Nội và Hà Nam có sông Hồng làm giới hạn. <br>- Phía Nam giáp tỉnh Thái Bình có sông Luộc làm giới hạn.<br>Trên địa bàn tỉnh có hệ thống các tuyến đường giao thông đường  bộ quan trọng như : Quốc lộ 5A, 39A, 38, 38B, đường cao tốc Hà Nội-Hải Phòng; tỉnh  lộ 200, 207, 208, 199 ... và đường sắt Hà Nội - Hải Dương - Hải Phòng, nối Hưng  Yên với các tỉnh phía bắc, đặc biệt là với Hà Nội, Hải Phòng và Quảng Ninh; Có  hệ thống sông Hồng, sông Luộc tạo thành mạng lưới giao thông khá thuận lợi cho  giao lưu hàng hoá và đi lại.<br>Ngoài vị trí  thuận lợi nằm kề sát thủ đô Hà Nội, Hưng Yên còn có các tuyến đường  giao thông quan trọng như quốc lộ 5 (dài 23 km), quốc lộ 38, quốc lộ 39  (dài 43 km) nối quốc lộ 5 với quốc lộ 1 tại Hà Nam, đường sắt Hà  Nội - Hải Phòng và các tuyến đường sông: sông Hồng, sông Luộc chạy  qua. Những lợi thế về vị̣trí địa lý và kết cấu hạ tầng là cơ hội  lớn để tỉnh phát triển mạnh ngành công nghiệp và dịch vụ. Đặc  biệt, quốc lộ 5 đoạn chạy qua lãnh thổ Hưng Yên mở ra cơ hội cho việc  hình thành các khu công nghiệp tập trung, tạo động lực lớn thúc đẩy  kinh tế địa phương phát triển, góp phần thực hiện thành công công  cuộc công nghiệp hoá, hiện đại hoá.</p><p>Nằm trong vùng  kinh tế trọng điểm Bắc Bộ, Hưng Yên có cơ hội đón nhận và tận dụng  những cơ hội phát triển của vùng. Nhất là trong tương lai gần, khi  kết cấu hạ tầng như hệ thống đường bộ, đường cao tốc, đường sắt,  sân bay, cảng sông được đầu tư xây dựng.<br>Bên cạnh đó,  là tỉnh có lợi thế phát triển nông nghiệp, lại có vị trí gần các  trung tâm công nghiệp, Hưng Yên có cơ hội chuyển đổi nhanh cơ cấu kinh  tế, đặc biệt là cơ cấu ngành nông nghiệp theo hướng phát triển mạnh  nông nghiệp hàng hoá phục vụ cho nhu cầu thực phẩm tươi sống và chế  biến của các thành phố và khu công nghiệp.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/hungyen/hungyen.jpg",
      "https://mediabhy.mediatech.vn/upload/image/202206/medium/46808_thanhpho1_result_20220624155103.jpg",
      "https://media.baodautu.vn/Images/chicuong/2022/02/17/1.jpg"]
  },
  "Hải Phòng": {
    text: '<p>Hải Phòng là thành phố trực thuộc  trung ương trong duyên hải nằm ở hạ lưu của hệ thống sông Thái Bình thuộc đồng  bằng sông Hồng có vị trí nằm trong khoảng từ 20<sup>0</sup>35’ đến 21<sup>0</sup>01’  vĩ độ Bắc, và từ 106<sup>0</sup>29’ đến 107<sup>0</sup>05’ kinh độ Đông.<br>- Phía Bắc và Đông Bắc giáp tỉnh  Quảng Ninh.<br>- Phía Tây Bắc giáp tỉnh Hải  Dương. <br>- Phía Tây Nam giáp tỉnh Thái  Bình.<br>- Phía Đông là biển Đông. <br>Hải phòng có đường bờ biển dài  125 km với 5 cửa sông lớn là Bạch Đằng, Cửa Cấm, Lạch Tray, Văn Úc và sông Thái  Bình. Hải Phòng nằm trong vành đai nhiệt đới gió mùa châu á cộng với việc sát  biển Đông nên Hải Phòng chịu ảnh hưởng của gió mùa. Mùa gió bấc (mùa đông) lạnh  và khô kéo dài từ tháng 11 đến tháng 4 năm sau. Gió mùa nồm (mùa hè) mát mẻ,  nhiều mưa kéo dài từ tháng 5 đến tháng 10. Lượng mưa trung bình hàng năm từ  1.600 - 1.800 mm. Bão thường xảy ra từ tháng 6 đến tháng 9.<br></p><p>Hải Phòng từ lâu đã nổi tiếng là  một cảng biển lớn nhất ở miền Bắc, một đầu mối giao thông quan trọng với hệ thống  giao thông thuỷ, bộ, đường sắt, hàng không trong nước và quốc tế, là cửa chính  ra biển của thủ đô Hà Nội và các tỉnh phía Bắc; là đầu mối giao thông quan trọng  của Vùng Kinh tế trọng điểm Bắc Bộ, trên hai hành lang - một vành đai hợp tác  kinh tế Việt Nam - Trung Quốc. Chính vì vậy, trong chiến lược phát triển kinh tế  - xã hội vùng châu thổ sông Hồng, Hải Phòng được xác định là một cực tăng trưởng  của vùng kinh tế động lực phía Bắc (Hà Nội - Hải Phòng - Quảng Ninh); là Trung  tâm kinh tế - khoa học - kĩ thuật tổng hợp của Vùng duyên hải Bắc Bộ và là một  trong những trung tâm phát triển của Vùng Kinh tế trọng điểm Bắc Bộ và cả nước.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/haiphong/haiphong.jpg",
      "https://xdcs.cdnchinhphu.vn/446259493575335936/2023/3/31/hai-phong-6-1680234763392125722891.jpg",
      "https://bcp.cdnchinhphu.vn/Uploaded/tranducmanh/2021_09_14/Haiphong1.jpg"]
  },
  "Hoà Bình": {
    text: '<p>Hoà Bình là tỉnh  miền núi cửa ngõ của vùng Tây Bắc với vùng ĐBSH và Thủ đô Hà Nội. Tỉnh có vị  trí giáp ranh: Phía bắc giáp tỉnh Phú Thọ; Phía nam giáp tỉnh Thanh Hoá và Ninh  Bình; Phía đông giáp tỉnh Hà Tây và Hà Nam; Phía tây giáp tỉnh Sơn La.<br>Hoà Bình có địa hình núi cao, chia cắt phức tạp, độ dốc lớn. Lãnh thổ của  tỉnh chia thành 2 vùng: vùng núi cao nằm ở phía tây - bắc có độ cao trung bình  từ 600 – 700m, địa hình hiểm trở, chiếm 44,8% diện tích toàn tỉnh, vùng núi  thấp nằm ở phía đông - nam của tỉnh ít bị chia cắt độ cao trung bình từ 100 – 200m. <br>Hệ thống sông ngòi trên địa bàn tỉnh được phân bố tương đối đồng đều với  các sông lớn là sông Đà, sông Bôi; đặc biệt hồ thuỷ điện Hoà Bình trên sông Đà  là một lợi thế về giao thông đường thuỷ và nuôi trồng thuỷ sản. Đường bộ có  quốc lộ 6 nối liền trung tâm Hà Nội với các tỉnh Tây Bắc; các QL 12B, và 21 đảm  bảo giao lưu giữa các huyện trong và ngoài tỉnh. Hoà Bình có cảnh quan thiên  nhiên đẹp, có nền văn hoá dân tộc đặc sắc, phong phú đã và đang được khai thác  để phát triển du lịch dưới nhiều hình thức như du lịch nghỉ dưỡng, du lịch văn  hoá, du lịch sinh thái… (khu du lịch văn hoá Bản Lác là một ví dụ điển hình).<br></p><p>Địa hình đồi núi trùng điệp với các động Thác Bờ, Hang Rết, động Hoa Tiên, vùng rừng nhiệt đới nguyên sinh Pù Noọc mở ra những tuyến du lịch mạo hiểm leo núi, đi bộ, săn bắn, tắm suối. Sức người và thiên nhiên đã tạo cho Hòa Bình một vùng hồ sông Ðà thơ mộng cho phép phát triển du lịch vùng lòng hồ và ven hồ có đầy đủ vịnh, đảo và bán đảo mà ở đó động thực vật quý hiếm được bảo tồn. Thấp thoáng các bản Mường, bản Dao, bản Tày rải rác ven hồ, ven thung lũng tạo nên bức tranh sơn thủy hữu tình. Nói đến tài nguyên thiên nhiên của Hòa Bình không thể quên nhắc đến những bãi tắm đẹp bên hồ sông Ðà và suối nước khoáng Kim Bôi đích thực là chén thuốc vàng phục hồi sức khoẻ cho du khách.</p><p>Hòa Bình là một tỉnh có khá nhiều những suối nước khoáng nóng, những thung lũng hoang sơ huyền bí. Tiêu biểu nổi bật như:</p><p>Nước suối Kim Bôi đã được đóng chai làm nước giải khát, nó cùng loại với nước khoáng Thạch Bích ở Quảng Ngãi, Kum-dua ở Nga và Paven Barbia của Hungari .</p><p>Thung lũng Mai Châu thuộc Huyện lỵ Mai Châu là một thung lũng xanh rờn cây lá, đồng lúa và những nếp nhà sàn đều tăm tắp như xếp hàng chào đón khách. Đêm nghỉ lại ở nhà sàn Mai Châu, du khách sẽ được xem múa, hát, nghe nhạc cồng chiêng. </p><p>Những hang động thiên tạo đa dạng hình thù có đỉnh Phù Bua bốn mùa mây phủ. Có bản Nanh, bản Nưa của người Mường, người Dao và xen kẽ một số gia đình người Thái, với những mái nhà sàn cổ đơn sơ nhưng rất nên thơ.</p>',
    images: ["https://vukehoach.mard.gov.vn/atlas/prov/hoabinh/hoabinh.jpg",
      "https://ik.imagekit.io/tvlk/blog/2022/03/dia-diem-du-lich-hoa-binh-1.jpg",
      "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2018/08/Thung-Nai-Hoa-Binh-vntrip1.jpg"]
  },
  "Lâm Đồng": {
    text: 'Lâm Đồng là một trong năm tỉnh thuộc vùng Tây Nguyên, Việt Nam, đồng thời là tỉnh có diện tích lớn thứ 7 cả nước, tiếp giáp với vùng kinh tế trọng điểm phía Nam.<p>Năm 2022, Lâm Đồng là đơn vị hành chính Việt Nam đông thứ 23 về số dân, xếp thứ 23 về Tổng sản phẩm trên địa bàn (GRDP), xếp thứ 18 về GRDP bình quân đầu người, đứng thứ 26 về tốc độ tăng trưởng GRDP. Với 1.321.800 người dân[4], số liệu kinh tế - xã hội thống kê GRDP đạt 103,4 nghìn tỉ Đồng (tương ứng với 3,406 tỉ USD), GRDP bình quân đầu người đạt 77,67 triệu đồng (tương ứng với 3,338 USD), tốc độ tăng trưởng GRDP đạt 12.09%.[5]</p>Nằm trên 3 cao nguyên cao nhất của Tây Nguyên là Lâm Viên - Di Linh - Bảo Lộc (tên cũ là B"Lao) với độ cao 1500 mét so với mực nước biển và là tỉnh duy nhất ở Tây Nguyên không có đường biên giới quốc tế. Tỉnh lỵ là thành phố Đà Lạt nằm cách Thành phố Hồ Chí Minh 300 km về hướng Đông Bắc, cách thành phố Đà Nẵng 658 km về phía nam, cách thủ đô Hà Nội 1.414 km tính theo đường QL.1 Năm 2010, Lâm Đồng là tỉnh đầu tiên của Tây Nguyên có 2 thành phố trực thuộc tỉnh (Đà Lạt, Bảo Lộc).',
    images: ["https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Da_Lat%2C_view_to_Xuan_Huong_lake_2.jpg/420px-Da_Lat%2C_view_to_Xuan_Huong_lake_2.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Deo_Bao_Loc.jpg/330px-Deo_Bao_Loc.jpg",
      "https://cdn8.dissolve.com/p/D1129_2_286/D1129_2_286_1200.jpg"]
  },
  "Ninh Thuận": {
    text: 'Ninh Thuận là một tỉnh ven biển thuộc vùng Duyên hải Nam Trung Bộ của Việt Nam. Tỉnh lỵ của Ninh Thuận là thành phố Phan Rang - Tháp Chàm nằm cách Thành phố Hồ Chí Minh 340 km về phía Nam, cách thủ đô Hà Nội 1.380 km về phía Bắc và cách Nha Trang 100 km theo đường Quốc lộ 1A và cách Đà Lạt 110 km theo đường Quốc lộ 27, đồng thời nằm cách sân bay Cam Ranh khoảng 60 km, thuận tiện cho việc giao lưu phát triển kinh tế xã hội của tỉnh.<p>Ngày 20 tháng 5 năm 1901, tỉnh Phan Rang được thành lập.Năm 1913, tỉnh Phan Rang bị xóa bỏ, phần phía bắc nhập vào tỉnh Khánh Hòa, còn phần phía nam gọi là đại lý hành chính, thuộc tỉnh Bình Thuận.Sau ngày 30 tháng 4 năm 1975, Ninh Thuận được sáp nhập với Bình Thuận, Tuyên Đức, Lâm Đồng để thành lập tỉnh mới là Thuận Lâm.Tháng 2 năm 1976, các tỉnh Ninh Thuận, Bình Thuận và Bình Tuy hợp nhất thành tỉnh Thuận Hải.Ngày 26 tháng 12 năm 1991, Chia tỉnh Thuận Hải thành 2 tỉnh Bình Thuận và Ninh Thuận.</p>Trong sách giáo khoa, Từ điển Bách khoa Việt Nam hay Từ điển Bách khoa quân sự Việt Nam đều xếp Ninh Thuận vào vùng Duyên hải Nam Trung Bộ.Tuy nhiên, Tổng cục Thống kê Việt Nam và Website của Bộ Kế hoạch & đầu tư Việt Nam lại xếp 2 tỉnh Ninh Thuận và Bình Thuận vào Đông Nam Bộ.Một phần khác Bộ Kế hoạch & đầu tư Việt Nam lại xếp Bình Thuận và Ninh Thuận vào vùng Duyên hải miền Trung.',
    images: ["https://th.bing.com/th/id/OIP.sKZVQeyCqrtrECcd2HYM8gHaEJ?w=255&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "https://th.bing.com/th/id/R.f162b0326d0225a6201c91b6ae8ba6d9?rik=iINJTqPM5fnZAQ&pid=ImgRaw&r=0",
      "https://welcometovietnam.com.vn/wp-content/uploads/2015/03/Ninh-Thuan.jpg"]
  },
  "Tây Ninh": {
    text: 'Năm 1802, vua Gia Long lên ngôi, đồng thời đổi tên phủ Gia Định thành trấn Gia Định. Năm 1808, trấn Gia Định đổi lại đổi là thành Gia Định, gồm có 5 trấn là Phiên An, Biên Hòa, Vĩnh Thanh, Định Tường và Hà Tiên. Năm 1832, vua Minh Mạng định tiếp tục tổ chức hành chánh ở Gia Định, từ 5 trấn chia thành 6 tỉnh gồm có Phiên An tỉnh thành (tức trấn Phiên An cũ), Tỉnh Biên Hòa (trấn Biên Hòa cũ), Tỉnh Định Tường (trấn Định Tường cũ), Tỉnh Vĩnh Long (trấn Vĩnh Thanh cũ), Tỉnh An Giang, Tỉnh Hà Tiên. Lúc bấy giờ, vùng đất Tây Ninh thuộc Phiên An tỉnh thành. Năm 1838, vua Minh Mạng đổi Phiên An tỉnh thành là tỉnh Gia Định gồm có 3 phủ, 7 huyện. Các phủ là Phủ Tân Bình có 3 huyện, Phủ Tân An có 2 huyện, Phủ Tây Ninh có 2 huyện là: huyện Tân Ninh và huyện Quang Hóa.<p>Phủ Tây Ninh: phía Bắc giáp Cao Miên(qua núi Chiêng, tức núi Bà Đen), phía Đông giáp huyện Bình Long phủ Tân Bình, phía Nam giáp huyện Bình Dương phủ Tân Bình và huyện Cửu An phủ Tân An, nguyên là đạo Quang Phong.Năm Minh Mạng thứ 19(1838), bỏ đạo lập phủ với tên gọi phủ Tây Ninh, quản lý 2 huyện(với 7 tổng có 56 làng xã)</p>Theo Đại Nam thực lục thì vào khoảng tháng 3 âm năm 1845, Cao Hữu Dực(quyền Tuyên phủ sứ Tây Ninh) cho chiêu mộ dân trong phủ Tây Ninh lập ra 26 thôn làng: Tiên Thuận, Phúc Hưng, Phúc Bình, Vĩnh Tuy, Phúc Mỹ, Long Thịnh, Long Khánh, Long Giang, Long Thái, An Thịnh, Khang Ninh, Vĩnh An, An Hòa, Gia Bình, Long Bình, Hòa Bình, Long Định, Phú Thịnh, Thái Định, Hòa Thuận, An Thường, Thuận Lý, Thiên Thiện, Hướng Hóa, Định Thái, Định Bình, đều thuộc phủ Tây Ninh.Vua Thiệu Trị phê chuẩn quyết định này.',
    images: ["https://nguoikesu.com/images/wiki/tinh-tay-ninh/5bb69d415b19db01e566f515995d510f.jpg",
      "https://nguoikesu.com/images/wiki/tinh-tay-ninh/7d141d0984c05d084cf86dd4dfde32e1.jpg",
      "https://nguoikesu.com/images/wiki/tinh-tay-ninh/f96e457af600f4ebeb1ac44e53e9ed03.jpg"]
  },
  "Bình Dương": {
    text: 'Bình Dương là một phần của tỉnh Thủ Dầu Một xưa kia. Tỉnh Thủ Dầu Một được thành lập tháng 12 năm 1899 từ Sở Tham biện Thủ Dầu Một, tách từ tỉnh Biên Hòa. Tháng mười năm 1956 chính quyền Việt Nam Cộng hòa giải thể tỉnh Thủ Dầu Một để thành lập các tỉnh Bình Dương, và một phần tỉnh Bình Long. Như vậy Bình Dương là một trong 22 tỉnh của Nam Phần được chính quyền Việt Nam Cộng Hòa thiết lập theo Sắc lệnh 143-NV ngày 22 tháng 10 năm 1956. Tỉnh lị là Phú Cường, Thủ Dầu Một. Tỉnh Bình Dương bao gồm 5 quận, 10 tổng, 60 xã (ngày 30 tháng 8 năm 1957) trong đó các quận là quận Châu Thành, Lái Thiêu, Bến Cát, Trị Tâm, Phú Giáo.<p>Năm 1957, lập mới quận Củ Chi từ các tổng Long Tuy Thượng, Long Tuy Trung và Long Tuy Hạ của quận Hóc Môn, tỉnh Gia Định cắt sang.</p> Năm 1959, cắt một phần đất, cùng với phần đất của 2 tỉnh Biên Hòa và tỉnh Phước Long lập ra tỉnh Phước Thành.Tỉnh này tồn tại đến năm 1965 thì giải thể.Ngày 18 tháng 12 năm 1963, quận Củ Chi tách thành hai quận Củ Chi và Phú Hòa.Đồng thời, quận Củ Chi được chuyển về tỉnh Hậu Nghĩa mới thành lập.Quận lị Phú Hòa đặt tại Bến Cỏ, xã Phú Hòa Đông, đến ngày 18 tháng 5 năm 1968 dời về xã Tân Hòa.Sau năm 1975, quận Phú Hòa lại nhập với quận Củ Chi, tỉnh Hậu Nghĩa thành huyện Củ Chi thuộc Thành phố Hồ Chí Minh.<p>Năm 1976, chính quyền mới hợp nhất tỉnh Bình Dương và tỉnh Bình Phước(gồm hai tỉnh Bình Long và tỉnh Phước Long cũ) thành tỉnh Sông Bé, nhưng đến ngày 1 tháng 1 năm 1997 lại tách ra thành hai tỉnh như cũ.',
    images: ["https://nguoikesu.com/images/wiki/tinh-binh-duong/ffdf3098ecd4082271e62b7e19bee353.jpg",
      "https://nguoikesu.com/images/wiki/tinh-binh-duong/4cd4d97c6d41846419c6a4156cd68324.jpg",
      "https://nguoikesu.com/images/wiki/tinh-binh-duong/f30b8d24bc7690560d8ad1940c52e36d.jpg"]
  },
  "Bình Thuận": {
    text: 'Đất Bình Thuận nguyên thuộc nước Nhật Nam ngày xưa, sau là đất của Chiêm Thành. Vì chiến tranh liên miên nên Chiêm Thành mất dần đất đai.</br >Năm 1653, chúa Nguyễn Phúc Tần đánh chiếm đất Phan Lang(sau gọi là Phan Rang), để lại mảnh đất phía Tây cho Chiêm Thành.Năm 1692, chúa Nguyễn Phúc Chu lấy luôn mảnh đất còn lại đặt tên là Thuận Phủ và năm 1694 đặt là Thuận Thành trấn.</br >Năm 1697, Lập Bình Thuận phủ gồm 2 huyện An Phước và Hòa Đa.Sau cải thành Bình Thuận Dinh.Đời vua Gia Long vẫn giữ Bình Thuận dinh, đến vua Minh Mạng đổi lại Bình Thuận phủ.</br >Năm 1827: Minh Mạng đặt ra hai phủ Ninh Thuận và Hàm Thuận và hai huyện Tuy Phong và Tuy Định.Bình Thuận được đặt thành tỉnh và giao cho quan Tuần phủ Thuận Khánh kiêm nhiệm luôn tỉnh Khánh Hòa.</br >Năm 1883: Hòa ước ký với Pháp(ngày 23 tháng 7) sáp nhập Bình Thuận vào Nam Kỳ.Năm 1884: Hòa ước Patenôtre(ngày 6 tháng 6) lại đưa Bình Thuận về Trung Kỳ.Năm 1888, vua Đồng Khánh chuyển phủ Ninh Thuận vào Khánh Hòa.</br >Năm 1900, vua Thành Thái đặt huyện Tuy Lý và lấy huyện Tánh Linh trước thuộc Đồng Nai Thượng sáp nhập vào Bình Thuận.Năm 1905: Phủ Di Linh được nhập vào Bình Thuận.</br > Năm 1955 - 1975 chính quyền Việt Nam Cộng hòa chia Bình Thuận làm 8 Quận: Hàm Thuận, Phú Quý, Thiện Giáo, Hải Long, Hải Ninh, Hòa Đa, Tuy Phong và Phan Lý Chàm.</br >Năm 1976: Bình Thuận sáp nhập với Bình Tuy và Ninh Thuận thành tỉnh Thuận Hải.',
    images: ["https://nguoikesu.com/images/wiki/tinh-binh-thuan/343ac40a6e4970c678bc313c6004393b.jpg",
      "https://nguoikesu.com/images/wiki/tinh-binh-thuan/d5ea1162a12924048f6dc8d2f6fa607a.jpg",
      "https://nguoikesu.com/images/wiki/tinh-binh-thuan/70fbd5cd444d41d10ae4803f672ef62c.jpg",
      "https://nguoikesu.com/images/wiki/tinh-binh-thuan/86fdf95ac7b01fa9caa3dbd536f8b368.jpg"]
  },
  "Đồng Nai": {
    text: 'Lịch sử của Đồng Nai gắn liền với lịch sử của vùng đất Nam Bộ . Nước Đại Việt lúc bấy giờ chỉ từ ải Nam Quan đến vùng Bắc Đèo Ngang (Hà Tĩnh ngày nay). Việc mở rộng được bắt đầu khi có những giao tranh giữa Đại Việt và vương quốc Chăm Pa láng giềng lúc bấy giờ.</br >Để mở rộng cõi bờ về phía Nam, nước Đại Việt lúc bấy giờ đã biết tổ chức một quân đội tốt, hùng hậu và có chiến lược nhu lẫn cương để thực hiện mưu đồ Nam tiến của mình.</br >Nước Việt Nam lúc bấy giờ xảy ra giao tranh giữa vua Lê - Chúa Trịnh và Chúa Nguyễn, lịch sử vẫn gọi là thời kỳ Trịnh - Nguyễn phân tranh, đây là cuộc phân tranh tạo ra tình trạng cát cứ trong lịch sử Việt Nam.Cuộc sống của người dân đói khổ và lâm vào lầm than.Điều này tạo ra một làn sóng di dân ồ ạt đầu tiên từ Bắc vào Nam, trong đó có làn sóng di dân của miền Thuận Quảng vào Đồng Nai tìm đất sinh sống và tái lập nghiệp.</br >Người Việt di cư đến đâu thì khai khẩn và phá hoang lấy đất canh tác đến đó tạo nên vùng đất trù phú.Ruộng lúa, hoa màu xanh tốt.</br >Năm 1679, nhà Minh ở Trung Quốc sụp đổ, Tổng binh Trần Thượng Xuyên trấn thủ các châu Cao, Lôi, Liêm không khuất phục nhà Thanh đã đem 50 chiến thuyền, 3.000 binh lính thân tín và gia quyến đến xin thuần phục chúa Nguyễn ở Thuận Hóa.Lúc bấy giờ, đứng đầu nhà Nguyễn là Chúa Nguyễn Phúc Tần đã thu nhận họ và cho vào khai khẩn, mở mang vùng đất Đông Phố(Cù lao Phố ngày nay).Họ biến Cù Lao Phố trên sông Đồng Nai trở thành một thương cảng sầm uất và phát triển.',
    images: ["https://nguoikesu.com/images/wiki/tinh-dong-nai/0988b9669a2c49c4ddde844d0b2fd956.jpg",
      "https://nguoikesu.com/images/wiki/tinh-dong-nai/2b9c715edd79800a5be5cdc955d2e289.jpg",
      "https://nguoikesu.com/images/wiki/tinh-dong-nai/cfafbb5e97fa56220227da862a80dc8f.jpg"]
  },
  "Hồ Chí Minh": {
    text: 'Những người Việt đầu tiên tự động vượt biển tới khai vùng đất này hoàn toàn không có sự tổ chức của nhà Nguyễn. Nhờ cuộc hôn nhân giữa công nữ Ngọc Vạn với vua Chân Lạp Chey Chetta II từ năm 1620, mối quan hệ giữa Đại Việt và Chân Lạp trở nên êm đẹp, dân cư hai nước có thể tự do qua lại sinh sống. Khu vực Sài Gòn, Đồng Nai bắt đầu xuất hiện những người Việt định cư. Trước đó, người Khmer, người Chăm, người Man cũng sinh sống rải rác ở đây từ xa xưa.</br > Giai đoạn từ 1623 tới 1698 được xem như thời kỳ hình thành của Sài Gòn sau này.Năm 1623, chúa Nguyễn sai một phái bộ tới yêu cầu con rể là vua Chey Chettha II cho lập đồn thu thuế tại Prei Nokor(Sài Gòn) và Kas Krobei(Bến Nghé).Tuy đây là vùng rừng rậm hoang vắng nhưng lại nằm trên đường giao thông của các thương nhân Việt Nam, Trung Quốc,... qua Campuchia và Xiêm.Hai sự kiện quan trọng tiếp theo của thời kỳ này là lập doanh trại và dinh thự của Phó vương Nặc Nộn và lập đồn dinh ở Tân Mỹ(gần ngã tư Cống Quỳnh - Nguyễn Trãi ngày nay).Có thể nói Sài Gòn hình thành từ ba cơ quan chính quyền này.</br > Năm 1679, chúa Nguyễn Phúc Tần cho một số nhóm người Hoa tị nạn triều Mãn Thanh tới Mỹ Tho, Biên Hòa và Sài Gòn để lánh nạn.Đến năm 1698, chúa Nguyễn sai tướng Nguyễn Hữu Cảnh vào kinh lý miền Nam.Trên cơ sở những lưu dân Việt đã tự phát tới khu vực này trước đó, Nguyễn Hữu Cảnh cho lập phủ Gia Định và hai huyện Phước Long, Tân Bình.Vùng Đông Nam Bộ được sát nhập vào cương vực Việt Nam.</br >Thời điểm ban đầu này, khu vực Biên Hòa, Gia Định có khoảng 10.000 hộ với 200.000 khẩu.Công cuộc khai hoang được tiến hành theo những phương thức mới, mang lại hiệu quả hơn.</br >Cuối thế kỉ 17 và đầu thế kỉ 18, Mỹ Tho và Cù lao Phố là hai trung tâm thương mại lớn nhất Nam Bộ.Tuy nhiên, cuối thế kỉ 18, sau các biến loạn và chiến tranh, thương nhân dần chuyển về vùng Chợ Lớn.Khu vực Sài Gòn dần trở thành trung tâm kinh tế lớn nhất Nam Bộ.',
    images: ["https://nguoikesu.com/images/wiki/thanh-pho-ho-chi-minh/339662013eee699cf1ba92873d4094d2.jpg",
      "https://nguoikesu.com/images/wiki/thanh-pho-ho-chi-minh/8a4944feeb3e0ff93362a67b9ff73e69.jpg",
      "https://nguoikesu.com/images/wiki/thanh-pho-ho-chi-minh/5b0e4f7d1b1bd9499223dc3126248ac7.jpg",
      "https://nguoikesu.com/images/wiki/thanh-pho-ho-chi-minh/742a1c1976b0497a782b7e60986ff760.jpg",
      "https://nguoikesu.com/images/wiki/thanh-pho-ho-chi-minh/23de6118beb426ffec8159569a48015f.jpg"]
  },
  "Long An": {
    text: 'Ngày 24 tháng 4 năm 1957, tỉnh được ấn định các đơn vị hành chính, gồm 7 quận: Bến Lức (mới lập do tách một phần đất đai của quận Thủ Thừa hợp với phần còn lại của quận Gò Đen), Đức Hòa, Cần Đước, Cần Giuộc, Châu Thành, Thủ Thừa, Tân Trụ. Trong đó, các quận Đức Hòa, Cần Đước, Cần Giuộc và một phần quận Bến Lức (phần phía đông sông Vàm Cỏ Đông, thuộc quận Gò Đen cũ) thuộc địa giới tỉnh Chợ Lớn cũ, phần còn lại thuộc địa giới tỉnh Tân An cũ.</br >Tỉnh lỵ đặt tại Tân An, vốn là tỉnh lỵ tỉnh Tân An cũ, về mặt hành chính thuộc xã Bình Lập, quận Châu Thành.</br > Ngày 29 tháng 1 năm 1959, tổng An Thít được sáp nhập vào tỉnh Phước Tuy.</br >Ngày 03 tháng 10 năm 1957, đổi tên quận Châu Thành thành quận Bình Phước.</br >Ngày 03 tháng 3 năm 1959, lập quận mới Đức Huệ(do cắt 3 xã của quận Đức Hòa và 5 xã phía bắc của quận Thủ Thừa).</br >Ngày 07 tháng 2 năm 1963, đổi tên quận Cần Đước thành quận Cần Đức, quận Cần Giuộc thành quận Thanh Đức, nhưng đến ngày 17 tháng 11 năm 1965 lại đổi tên như cũ.</br >Ngày 15 tháng 10 năm 1963, tách 2 quận Đức Hòa, Đức Huệ nhập vào tỉnh Hậu Nghĩa mới thành lập.</br > Ngày 07 tháng 1 năm 1967, lập mới quận Rạch Kiến(do tách 10 xã của quận Cần Đước và 3 xã của quận Cần Giuộc).</br >Đến năm 1975, tỉnh Long An có 7 quận: Bình Phước, Bến Lức, Cần Đước, Cần Giuộc, Rạch Kiến, Thủ Thừa, Tân Trụ.',
    images: ["https://toplist.vn/images/800px/di-tich-lich-su-nga-tu-duc-hoa-long-an-133006.jpg",
      "https://th.bing.com/th/id/R.e36f7060269b0b872a2830096b086829?rik=xcUC36cS8MBguQ&riu=http%3a%2f%2fmedia.dulich24.com.vn%2fdiemden%2fdi-tich-lich-su-binh-thanh-7267%2fdi-tich-lich-su-binh-thanh.jpg&ehk=WaQ0YunYJ1F%2b%2fEZIVRoyOLZQqe%2fbMLQ3ExvDnmRHdUc%3d&risl=&pid=ImgRaw&r=0",
      "https://th.bing.com/th/id/R.713f1d0bcb964db286d4ac8f4d237854?rik=xwvTiJI18ykn8g&pid=ImgRaw&r=0"]
  },
  "Bà Rịa - Vũng Tàu": {
    text: 'Từ tháng 2 năm 1976 sáp nhập vào tỉnh Đồng Nai.</br >Từ ngày 30 tháng 5 năm 1979, thành lập Đặc khu Vũng Tàu – Côn Đảo trên cơ sở sáp nhập thị xã Vũng Tàu, xã Long Sơn thuộc huyện Châu Thành, tỉnh Đồng Nai và huyện Côn Đảo thuộc tỉnh Hậu Giang.</br > Ngày 12 tháng 8 năm 1991, thành lập tỉnh Bà Rịa – Vũng Tàu từ Đặc khu Vũng Tàu – Côn Đảo vừa giải thể và 3 huyện: Châu Thành, Long Đất và Xuyên Mộc thuộc tỉnh Đồng Nai.Đồng thời, thành lập thành phố Vũng Tàu và huyện Côn Đảo trên cơ sở đặc khu vừa giải thể.</br > Khi mới thành lập, tỉnh Bà Rịa – Vũng Tàu gồm thành phố Vũng Tàu(tỉnh lỵ) và 4 huyện: Châu Thành, Côn Đảo, Long Đất, Xuyên Mộc.</br >Ngày 2 tháng 6 năm 1994, chia huyện Châu Thành thành thị xã Bà Rịa và 2 huyện: Châu Đức, Tân Thành.</br >Ngày 9 tháng 12 năm 2003, chia huyện Long Đất thành 2 huyện Long Điền và Đất Đỏ.</br >Ngày 2 tháng 5 năm 2012, tỉnh lỵ của tỉnh Bà Rịa – Vũng Tàu được chuyển từ thành phố Vũng Tàu về thị xã Bà Rịa(nay là thành phố Bà Rịa).</br >Ngày 22 tháng 8 năm 2012, chuyển thị xã Bà Rịa thành thành phố Bà Rịa.</br >Ngày 12 tháng 4 năm 2018, chuyển huyện Tân Thành thành thị xã Phú Mỹ.</br >Tỉnh Bà Rịa – Vũng Tàu có 2 thành phố, 1 thị xã và 5 huyện như hiện nay.',
    images: ["https://th.bing.com/th/id/OIP.uIpZ7RfDmlmuDD6yMXrS_AHaEm?w=269&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "https://th.bing.com/th/id/OIP.zYKMJpG-2SQquQ4nU5qM8QHaEK?w=302&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "https://th.bing.com/th/id/OIP.icNnSSKcdPPh2lEFgqpBSAHaEX?w=289&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"]
  },
  "Đồng Tháp": {
    text: 'Tỉnh Đồng Tháp được hình thành từ một phần của tỉnh Hậu Giang vào năm 1976 sau cuộc chiến tranh Việt Nam và quá trình thống nhất đất nước. Trước khi trở thành tỉnh riêng, khu vực này đã có một quá trình phát triển lịch sử và chính trị.</br >Trước năm 1976, Đồng Tháp là một phần của tỉnh Hậu Giang.Tuy nhiên, vùng đất này đã có sự phân chia và thay đổi biên giới hàng nhiều lần trong quá khứ.</br >Trong thời kỳ thuộc địa Pháp, khu vực này được gọi là tỉnh Sa Đéc.Sau khi cuộc chiến tranh Việt Nam kết thúc, tỉnh Hậu Giang được chia thành hai phần, một phần thành tỉnh Đồng Tháp và phần còn lại là tỉnh Hậu Giang.</br >Việc thành lập tỉnh Đồng Tháp vào năm 1976 là một quyết định của chính quyền Việt Nam sau khi thực hiện quá trình thống nhất đất nước.Tỉnh Đồng Tháp gồm các huyện Cao Lãnh, Lai Vung, Lấp Vò và thành phố Cao Lãnh.</br >Từ khi trở thành tỉnh riêng, Đồng Tháp đã phát triển về mọi mặt, đặc biệt là trong lĩnh vực nông nghiệp và du lịch.Đồng Tháp còn nổi tiếng với các di tích lịch sử và văn hóa như Di tích lịch sử và văn hóa Đồng Tháp Mười và vườn quốc gia Tràm Chim.</br >Đây là một cái nhìn tổng quan về quá trình hình thành tỉnh Đồng Tháp.Nếu bạn muốn tìm hiểu thêm chi tiết hoặc có bất kỳ câu hỏi nào khác, xin vui lòng cho tôi biết!',
    images: ["https://th.bing.com/th/id/R.8ff738e03649cdc9eb988df2300e7767?rik=5A7R4EC7pf%2fgYA&pid=ImgRaw&r=0",
      "https://scontent.iocvnpt.com/resources/portal/Images/DTP/superadminportal.dtp/trangchu/portal/tintuc/lichsu/l1_637147706761089576.png",
      "https://scontent.iocvnpt.com/resources/portal/Images/DTP/superadminportal.dtp/trangchu/portal/tintuc/lichsu/l6_637147706873309852.png"]
  },
  "An Giang": {
    text: 'Thời kỳ cổ đại: Khu vực An Giang hiện nay từng là một phần của vương quốc Funan và sau đó là vương quốc Khmer. Có nhiều di chỉ khảo cổ chứng minh sự hiện diện của các nền văn hóa cổ đại trong khu vực này.</br >Thời kỳ thuộc địa Pháp: Trong thời kỳ thuộc địa Pháp, An Giang là một phần của tỉnh Hậu Giang.Người Pháp đã đóng vai trò quan trọng trong việc phát triển cơ sở hạ tầng và kinh tế cho khu vực này.</br >Thời kỳ chiến tranh Việt Nam: An Giang nằm gần biên giới với Campuchia và đã trở thành một điểm căng thẳng trong cuộc chiến tranh Việt Nam.Khu vực này thường xuyên bị tấn công và có sự xung đột giữa quân đội Việt Nam Cộng hòa và quân đội Dân chủ Kampuchea.</br >Thành lập tỉnh An Giang: Năm 1976, sau cuộc chiến tranh và quá trình thống nhất đất nước, An Giang được tách ra từ tỉnh Hậu Giang để trở thành một tỉnh riêng.Tỉnh này bao gồm các huyện Châu Đốc, Châu Phú, Tịnh Biên, Tri Tôn, Châu Thành và thành phố Long Xuyên.</br >Phát triển hiện đại: Từ khi trở thành một tỉnh riêng, An Giang đã có sự phát triển về kinh tế và xã hội.Nông nghiệp và thủy sản là ngành chính của tỉnh, với các mặt hàng như gạo, cá tra và các loại cây trồng khác.Du lịch cũng đóng vai trò quan trọng, với các điểm tham quan như chùa Bà Chúa Xứ, vườn quốc gia Tràm Chim và bến Núi Sam.',
    images: ["https://th.bing.com/th/id/OIP.125EdG8skYzKM2TQbZHsIAHaE7?w=268&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "https://www.angiang.dcs.vn/SiteAssets/AG-190-longxuyen-ho-NgDu.jpg",
      "https://baoangiang.com.vn/image/fckeditor/upload/2022/20221115/images/T1-(2).jpg"]
  },
  "Tiền Giang": {
    text: 'Thời kỳ cổ đại: Khu vực Tiền Giang được cho là đã có sự hiện diện của các dân tộc cổ đại như người Sa Huỳnh và người Óc Eo. Các di chỉ khảo cổ gần đây đã khám phá ra nhiều di tích và đồn điền từ thời kỳ này.</br >Thời kỳ thuộc địa Pháp: Trong thời kỳ thuộc địa Pháp, Tiền Giang là một phần của tỉnh Hậu Giang.Người Pháp đã đóng vai trò quan trọng trong việc phát triển hạ tầng và kinh tế cho khu vực này</br >Chiến tranh Việt Nam: Tiền Giang đã trải qua những sự kiện đáng kể trong cuộc chiến tranh Việt Nam.Khu vực này đã là một điểm căng thẳng và chịu ảnh hưởng nặng nề từ cuộc chiến tranh.Tiền Giang cũng là nơi diễn ra trận Long Dinh, một trận chiến quan trọng giữa quân đội Việt Nam Cộng hòa và quân đội Việt Cộng vào năm 1964.</br >Thành lập tỉnh Tiền Giang: Năm 1976, sau cuộc chiến tranh và quá trình thống nhất đất nước, Tiền Giang được tách ra từ tỉnh Hậu Giang để trở thành một tỉnh riêng.Tỉnh này bao gồm các huyện Mỹ Tho, Cái Bè, Cai Lậy và thành phố Mỹ Tho.</br >Phát triển hiện đại: Từ khi trở thành một tỉnh riêng, Tiền Giang đã có sự phát triển về kinh tế và xã hội.Nông nghiệp và chế biến nông sản là ngành chính của tỉnh, với trồng cây lương thực, trái cây và nuôi trồng thủy sản.Tiền Giang cũng nổi tiếng với vườn quốc gia Tràm Chim, nơi có hệ sinh thái đa dạng và chim di cư quan trọng.',
    images: ["https://nguoikesu.com/images/wiki/tinh-tien-giang/2653ba760fd94500ca46a2d5ed26f72c.jpg",
      "https://nguoikesu.com/images/wiki/tinh-tien-giang/2293c559302879580789c927b482b78d.jpg",
      "https://nguoikesu.com/images/wiki/tinh-tien-giang/d6ab41841815ebf9806bd368310d383b.jpg"]
  },
  "Bến Tre": {
    text: 'Thời kỳ cổ đại: Khu vực Bến Tre được cho là đã có sự hiện diện của các dân tộc cổ đại như người Sa Huỳnh và người Óc Eo. Các di chỉ khảo cổ gần đây đã khám phá ra nhiều di tích và văn hóa từ thời kỳ này.</br >Thời kỳ thuộc địa Pháp: Trong thời kỳ thuộc địa Pháp, Bến Tre là một phần của tỉnh Hậu Giang.Người Pháp đã đóng vai trò quan trọng trong việc phát triển hạ tầng và kinh tế cho khu vực này.</br >Chiến tranh Việt Nam: Bến Tre đã trải qua những sự kiện đáng kể trong cuộc chiến tranh Việt Nam.Khu vực này là nơi diễn ra trận Bến Tre vào năm 1968, trong đó quân đội Mỹ và Việt Nam Cộng hòa đã tiến hành cuộc tấn công dưới tên gọi "Rạch Miễu".Trận đánh này đã gây thiệt hại nặng nề cho Bến Tre và có ảnh hưởng lớn đến dân cư và hạ tầng.</br >Thành lập tỉnh Bến Tre: Năm 1976, sau cuộc chiến tranh và quá trình thống nhất đất nước, Bến Tre được tách ra từ tỉnh Hậu Giang để trở thành một tỉnh riêng.Tỉnh này bao gồm các huyện Bình Đại, Ba Tri, Châu Thành và thành phố Bến Tre.</br >Phát triển hiện đại: Từ khi trở thành một tỉnh riêng, Bến Tre đã có sự phát triển về kinh tế và xã hội.Nông nghiệp và chế biến nông sản là ngành chính của tỉnh, với trồng cây trái, đặc biệt là dừa, cũng như nuôi trồng thủy sản.Bến Tre cũng nổi tiếng với văn hóa và du lịch, với những điểm đến như cù lao An Bình, khu du lịch sinh thái Xẻo Mít và làng gốm Bình Đại.',
    images: ["https://nguoikesu.com/images/wiki/tinh-ben-tre/fa921b13d89ee21fbddeb113c9e2ad99.jpg",
      "https://nguoikesu.com/images/wiki/tinh-ben-tre/87775850bcbecf68f48d283ed313569f.jpg",
      "https://nguoikesu.com/images/wiki/tinh-ben-tre/09801e0521ad9a8f2b038926cdd5e748.jpg"]
  },
  "Cần Thơ": {
    text: 'Thời kỳ cổ đại: Khu vực Cần Thơ đã có sự hiện diện của các dân tộc cổ đại như người Sa Huỳnh và người Óc Eo. Có nhiều di chỉ khảo cổ chứng minh sự phát triển của các nền văn hóa và kinh tế trong khu vực này.</br >Thời kỳ thuộc địa Pháp: Trong thời kỳ thuộc địa Pháp, Cần Thơ là một phần của tỉnh Hậu Giang.Người Pháp đã đóng vai trò quan trọng trong việc phát triển hạ tầng và kinh tế cho khu vực này</br >Chiến tranh Việt Nam: Cần Thơ đã trải qua những sự kiện quan trọng trong cuộc chiến tranh Việt Nam.Thành phố này trở thành một căn cứ chiến lược của quân đội Mỹ và quân đội Việt Nam Cộng hòa trong việc kiểm soát khu vực đồng bằng sông Cửu Long.Cần Thơ cũng chịu ảnh hưởng của cuộc tấn công Tết Mậu Thân năm 1968 và cuộc Tổng tiến công và nổi dậy năm 1975.</br >Thành lập thành phố Cần Thơ: Năm 1976, sau khi cuộc chiến tranh kết thúc và quá trình thống nhất đất nước, Cần Thơ được nâng cấp lên thành phố trực thuộc trung ương.Thành phố này bao gồm các quận Ninh Kiều, Bình Thủy, Cái Răng, Ô Môn và Thốt Nốt.</br >Phát triển hiện đại: Từ khi trở thành một thành phố trực thuộc trung ương, Cần Thơ đã có sự phát triển vượt bậc về kinh tế và xã hội.Cần Thơ là một trung tâm kinh tế, văn hóa và giáo dục quan trọng trong miền Tây Nam Bộ Việt Nam.Thành phố này có nền kinh tế đa ngành, với ngành nông nghiệp, thủy sản, công nghiệp và dịch vụ đóng vai trò quan trọng.',
    images: ["https://th.bing.com/th/id/OIP.WhUzDbX27eDuSsvOtRZR8QHaF6?w=194&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "https://ik.imagekit.io/tvlk/blog/2023/05/ben-ninh-kieu-3.jpg?tr=dpr-2,w-675",
      "https://statics.vinpearl.com/dinh-binh-thuy-01_1634109817.jpg"]
  },
  "Vĩnh Long": {
    text: 'Thời kỳ cổ đại: Khu vực Vĩnh Long được cho là đã có sự hiện diện của các dân tộc cổ đại như người Sa Huỳnh và người Óc Eo. Có nhiều di chỉ khảo cổ chứng minh sự phát triển của các nền văn hóa và kinh tế trong khu vực này.</br >Thời kỳ thuộc địa Pháp: Trong thời kỳ thuộc địa Pháp, Vĩnh Long là một phần của tỉnh Hậu Giang.Người Pháp đã đóng vai trò quan trọng trong việc phát triển hạ tầng và kinh tế cho khu vực này.</br >Chiến tranh Việt Nam: Vĩnh Long đã trải qua những sự kiện quan trọng trong cuộc chiến tranh Việt Nam.Khu vực này là một căn cứ chiến lược của quân đội Mỹ và quân đội Việt Nam Cộng hòa trong việc kiểm soát khu vực đồng bằng sông Cửu Long.</br >Thành lập tỉnh Vĩnh Long: Năm 1976, sau khi cuộc chiến tranh kết thúc và quá trình thống nhất đất nước, Vĩnh Long được tách ra từ tỉnh Hậu Giang để trở thành một tỉnh riêng.Tỉnh này bao gồm các huyện Long Hồ, Vũng Liêm, Tam Bình và thành phố Vĩnh Long.</br >Phát triển hiện đại: Từ khi trở thành một tỉnh riêng, Vĩnh Long đã có sự phát triển về kinh tế và xã hội.Nông nghiệp và chế biến nông sản là ngành chính của tỉnh, với trồng cây trái và nuôi trồng thủy sản là hoạt động quan trọng.Tỉnh cũng đẩy mạnh phát triển các ngành công nghiệp và dịch vụ, đặc biệt là du lịch sinh thái và nông nghiệp công nghệ cao.',
    images: ["https://nguoikesu.com/images/wiki/tinh-vinh-long/68a47d8181f63dd122f08fc5296529be.jpg",
      "https://nguoikesu.com/images/wiki/tinh-vinh-long/33f91c6fff74de29fbcfdf34bb6ae829.jpg",
      "https://dulichmedia.dalat.vn/Images/VLG/nguyentrongyem/2022/T2/tuyetlam/3_637806143762513983.jpg"]
  },
  "Kiên Giang": {
    text: 'Thời kỳ cổ đại: Khu vực Kiên Giang đã có sự hiện diện của các dân tộc cổ đại như người Sa Huỳnh và người Óc Eo. Có nhiều di chỉ khảo cổ chứng minh sự phát triển của các nền văn hóa và kinh tế trong khu vực này.</br >Thời kỳ Trung Nguyên và Trần: Trong thời kỳ Trung Nguyên và Trần, Kiên Giang thuộc vương quốc Champa và sau đó trở thành một phần của đất nước Đại Việt(nay là Việt Nam).Khu vực này có vai trò quan trọng trong việc giao thương và đóng góp vào sự phát triển của vùng đất miền Tây Nam Bộ.</br >Thời kỳ thuộc địa Pháp: Trong thời kỳ thuộc địa Pháp, Kiên Giang là một phần của tỉnh Cần Thơ.Người Pháp đã đóng vai trò quan trọng trong việc phát triển hạ tầng, giao thông và kinh tế cho khu vực này.</br >Chiến tranh Việt Nam: Trong cuộc chiến tranh Việt Nam, Kiên Giang là một trong những vùng đất chịu ảnh hưởng nặng nề.Khu vực này nằm gần biên giới với Campuchia và là một điểm căng thẳng trong việc kiểm soát biên giới.Các cuộc tấn công và trận đánh đã diễn ra tại Kiên Giang, như trận Long Chỉ và trận An Biên - Hòn Nghệ.</br >Thành lập tỉnh Kiên Giang: Năm 1976, sau cuộc chiến tranh và quá trình thống nhất đất nước, Kiên Giang được tách ra từ tỉnh Cần Thơ để trở thành một tỉnh riêng.Tỉnh này bao gồm các huyện Kiên Lương, Rạch Giá, Hà Tiên và các đảo thuộc quần đảo Phú Quốc.</br > Phát triển hiện đại: Từ khi trở thành một tỉnh riêng, Kiên Giang đã phát triển về kinh tế và xã hội.Nông nghiệp, thủy sản, công nghiệp và du lịch là các ngành chính của tỉnh.Kiên Giang cũng nổi tiếng với quần đảo Phú Quốc, một điểm du lịch biển nổi tiếng thu hút du khách trong và ngoài nước.',
    images: ["https://nguoikesu.com/images/wiki/tinh-kien-giang/b635fe5b375c2b04865527140a7b331b.jpg",
      "https://nguoikesu.com/images/wiki/tinh-kien-giang/aea2480368346bafb4e20fd3442c9a72.jpg",
      "https://nguoikesu.com/images/wiki/tinh-kien-giang/9822889b7e284df3d83d597be09c7407.jpg"]
  },
  "Trà Vinh": {
    text: 'Thời kỳ cổ đại: Khu vực Trà Vinh đã có sự hiện diện của các dân tộc cổ đại như người Sa Huỳnh và người Óc Eo. Có nhiều di chỉ khảo cổ chứng minh sự phát triển của các nền văn hóa và kinh tế trong khu vực này.</br >Thời kỳ Trung Nguyên và Trần: Trong thời kỳ Trung Nguyên và Trần, Trà Vinh thuộc vương quốc Champa và sau đó trở thành một phần của đất nước Đại Việt(nay là Việt Nam).Khu vực này có vai trò quan trọng trong việc giao thương và đóng góp vào sự phát triển của vùng đất miền Tây Nam Bộ.</br >Thời kỳ thuộc địa Pháp: Trong thời kỳ thuộc địa Pháp, Trà Vinh là một phần của tỉnh Sóc Trăng.Người Pháp đã đóng vai trò quan trọng trong việc phát triển hạ tầng, kinh tế và xã hội cho khu vực này.</br >Chiến tranh Việt Nam: Trà Vinh đã trải qua những sự kiện quan trọng trong cuộc chiến tranh Việt Nam.Khu vực này chịu ảnh hưởng nặng nề từ cuộc chiến, và những cuộc tấn công và trận đánh đã diễn ra trong khu vực này.</br >Thành lập tỉnh Trà Vinh: Năm 1976, sau cuộc chiến tranh và quá trình thống nhất đất nước, Trà Vinh được tách ra từ tỉnh Sóc Trăng để trở thành một tỉnh riêng.Tỉnh này bao gồm các huyện Trà Cú, Cầu Kè, Châu Thành và thành phố Trà Vinh.</br >Phát triển hiện đại: Từ khi trở thành một tỉnh riêng, Trà Vinh đã phát triển về kinh tế và xã hội.Nông nghiệp và thủy sản là hai ngành chính của tỉnh, với trồng cây trái và nuôi trồng thủy sản là hoạt động quan trọng.Trà Vinh cũng có các ngành công nghiệp và dịch vụ khác như du lịch sinh thái và du lịch văn hóa.',
    images: ["https://nguoikesu.com/images/wiki/tinh-tra-vinh/58fa6fadb6490b43d0f03d1b69cecd7b.jpg",
      "https://nguoikesu.com/images/wiki/tinh-tra-vinh/6b33dcd1b47a9f779256b381cbe6e62c.jpg",
      "https://nguoikesu.com/images/wiki/tinh-tra-vinh/4e4b7da8cefc8d0bc57c0176069abee4.jpg"]
  },
  "Hậu Giang": {
    text: 'Thời kỳ cổ đại: Khu vực Hậu Giang đã có sự hiện diện của các dân tộc cổ đại như người Sa Huỳnh và người Óc Eo. Có nhiều di chỉ khảo cổ chứng minh sự phát triển của các nền văn hóa và kinh tế trong khu vực này.</br >Thời kỳ thuộc địa Pháp: Trong thời kỳ thuộc địa Pháp, Hậu Giang là một phần của tỉnh Cần Thơ.Người Pháp đã đóng vai trò quan trọng trong việc phát triển hạ tầng và kinh tế cho khu vực này.</br > Chiến tranh Việt Nam: Hậu Giang đã trải qua những sự kiện quan trọng trong cuộc chiến tranh Việt Nam.Khu vực này nằm gần biên giới với Campuchia và là một điểm căng thẳng trong việc kiểm soát biên giới.Hậu Giang chịu ảnh hưởng từ cuộc chiến và các cuộc tấn công diễn ra trong khu vực này.</br >Thành lập tỉnh Hậu Giang: Năm 1975, sau cuộc chiến tranh và quá trình thống nhất đất nước, Hậu Giang được tách ra từ tỉnh Cần Thơ để trở thành một tỉnh riêng.Tỉnh này bao gồm các huyện Long Mỹ, Vị Thanh, Phụng Hiệp và thành phố Vị Thanh.</br >Phát triển hiện đại: Từ khi trở thành một tỉnh riêng, Hậu Giang đã có sự phát triển về kinh tế và xã hội.Nông nghiệp và thủy sản là ngành chính của tỉnh, với trồng cây trái và nuôi trồng thủy sản là hoạt động quan trọng.Tỉnh cũng có sự đa dạng trong các ngành công nghiệp và dịch vụ khác nhau, đồng thời du lịch sinh thái cũng đóng vai trò quan trọng trong phát triển kinh tế địa phương.',
    images: ["https://vcdn-dulich.vnecdn.net/2019/11/07/HauGiang-7248-1573095828.jpg",
      "https://www.baohaugiang.com.vn/uploads/image/2021/05/07/SB3260-9-1.jpg",
      "https://dulichdiaphuong.com/imgs/tinh-hau-giang/di-tich-chien-thang-chuong-thien.jpg"]
  },
  "Sóc Trăng": {
    text: 'Thời kỳ cổ đại: Khu vực Sóc Trăng đã có sự hiện diện của các dân tộc cổ đại như người Sa Huỳnh và người Óc Eo. Có nhiều di chỉ khảo cổ chứng minh sự phát triển của các nền văn hóa và kinh tế trong khu vực này.</br >Thời kỳ thuộc địa Pháp: Trong thời kỳ thuộc địa Pháp, Sóc Trăng là một phần của tỉnh Cần Thơ.Người Pháp đã đóng vai trò quan trọng trong việc phát triển hạ tầng và kinh tế cho khu vực này.</br > Chiến tranh Việt Nam: Sóc Trăng đã trải qua những sự kiện quan trọng trong cuộc chiến tranh Việt Nam.Khu vực này chịu ảnh hưởng từ cuộc chiến và các cuộc tấn công diễn ra trong khu vực này.</br >Thành lập tỉnh Sóc Trăng: Năm 1992, sau cuộc chiến tranh và quá trình thống nhất đất nước, Sóc Trăng được tách ra từ tỉnh Cần Thơ để trở thành một tỉnh riêng.Tỉnh này bao gồm các huyện Châu Thành, Cù Lao Dung, Kế Sách, Long Phú, Mỹ Tú, Mỹ Xuyên, Ngã Năm, Thạnh Trị và thành phố Sóc Trăng.</br >Phát triển hiện đại: Từ khi trở thành một tỉnh riêng, Sóc Trăng đã có sự phát triển về kinh tế và xã hội.Nông nghiệp và thủy sản là ngành chính của tỉnh, với trồng cây trái và nuôi trồng thủy sản là hoạt động quan trọng.Tỉnh cũng có sự đa dạng trong các ngành công nghiệp và dịch vụ khác nhau, đồng thời du lịch cũng đóng vai trò quan trọng trong phát triển kinh tế địa phương.',
    images: ["https://media.mia.vn/uploads/blog-du-lich/khu-can-cu-tinh-uy-soc-trang-chung-nhan-cho-lich-su-cach-mang-hao-hung-2-1665440622.jpg",
      "https://tinhaiphong.vn/wp-content/uploads/2022/04/chua-4-mat-soc-trang.jpg",
      "https://cdn3.ivivu.com/2022/06/st.png"]
  },
  "Bạc Liêu": {
    text: 'Thời kỳ cổ đại: Khu vực Bạc Liêu đã có sự hiện diện của các dân tộc cổ đại như người Sa Huỳnh và người Óc Eo. Có nhiều di chỉ khảo cổ chứng minh sự phát triển của các nền văn hóa và kinh tế trong khu vực này.</br >Thời kỳ thuộc địa Pháp: Trong thời kỳ thuộc địa Pháp, Bạc Liêu là một phần của tỉnh Cần Thơ.Người Pháp đã đóng vai trò quan trọng trong việc phát triển hạ tầng và kinh tế cho khu vực này.</br >Chiến tranh Việt Nam: Bạc Liêu đã trải qua những sự kiện quan trọng trong cuộc chiến tranh Việt Nam.Khu vực này chịu ảnh hưởng từ cuộc chiến và các cuộc tấn công diễn ra trong khu vực này.</br > Thành lập tỉnh Bạc Liêu: Năm 1996, sau cuộc chiến tranh và quá trình thống nhất đất nước, Bạc Liêu được tách ra từ tỉnh Cần Thơ để trở thành một tỉnh riêng.Tỉnh này bao gồm các huyện Hồng Dân, Vĩnh Lợi, Đông Hải và thành phố Bạc Liêu.</br >Phát triển hiện đại: Từ khi trở thành một tỉnh riêng, Bạc Liêu đã có sự phát triển về kinh tế và xã hội.Nông nghiệp và thủy sản là ngành chính của tỉnh, với trồng cây trái và nuôi trồng thủy sản là hoạt động quan trọng.Tỉnh cũng có sự đa dạng trong các ngành công nghiệp và dịch vụ khác nhau, đồng thời du lịch cũng đóng vai trò quan trọng trong phát triển kinh tế địa phương.',
    images: ["https://thamhiemmekong.com/wp-content/uploads/2020/07/denthobachobaclieu.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT18wBdXK7OOt-FPrOtVgNkJPdwvWb8YdvnYg&usqp=CAU",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz5N_xS359jWE35EqiK7va5q6ejWihid5mXw&usqp=CAU"]
  },
  "Cà Mau": {
    text: '<p>Thời kỳ cổ đại: Khu vực Cà Mau đã có sự hiện diện của các dân tộc cổ đại như người Sa Huỳnh và người Óc Eo. Có nhiều di chỉ khảo cổ chứng minh sự phát triển của các nền văn hóa và kinh tế trong khu vực này.</p><p>Thời kỳ thuộc địa Pháp: Trong thời kỳ thuộc địa Pháp, Cà Mau là một phần của tỉnh Sóc Trăng.Người Pháp đã đóng vai trò quan trọng trong việc phát triển hạ tầng, giao thông và kinh tế cho khu vực này.</p><p>Chiến tranh Việt Nam: Cà Mau đã trải qua những sự kiện quan trọng trong cuộc chiến tranh Việt Nam.Khu vực này nằm gần biên giới với Campuchia và là một điểm căng thẳng trong việc kiểm soát biên giới.Cà Mau chịu ảnh hưởng từ cuộc chiến và các cuộc tấn công diễn ra trong khu vực này.</p><p>Thành lập tỉnh Cà Mau: Năm 1976, sau cuộc chiến tranh và quá trình thống nhất đất nước, Cà Mau được tách ra từ tỉnh Sóc Trăng để trở thành một tỉnh riêng.Tỉnh này bao gồm các huyện Thới Bình, U Minh, Trần Văn Thời, Cái Nước, Đầm Dơi và thành phố Cà Mau.</p>Phát triển hiện đại: Từ khi trở thành một tỉnh riêng, Cà Mau đã có sự phát triển về kinh tế và xã hội.Nông nghiệp và thủy sản là ngành chính của tỉnh, với trồng cây trái, nuôi trồng thủy sản và khai thác nguồn tài nguyên biển là hoạt động quan trọng.Cà Mau cũng nổi tiếng với quần đảo Cà Mau, một điểm du lịch thiên nhiên hấp dẫn và quan trọng.',
    images: ["https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/08/6-2.jpg",
      "https://thamhiemmekong.com/wp-content/uploads/2020/05/hondabac-1.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEmAfqpDGlzVhl8IR4YWWWDwpkWx7FFXhExQ&usqp=CAU"]
  }

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
