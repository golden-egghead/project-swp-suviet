import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { FaStar } from 'react-icons/fa';
import { BsBookmarkStarFill } from 'react-icons/bs';
import 'react-vertical-timeline-component/style.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

 function TimeLineN() {

  const [listPeriods, setListPeriods] = useState([]);

  useEffect(() => {
    const fetchData = async (page) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/period`);
        setListPeriods(response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const colorArray = ['#13BDA2', '#3CDCF2', '#F08B00', '#8A7837', '#FFC701'];
  
  const periodNameColorArray = ['#FFC701', '#8A7837', '#3CDCF2', '#fff', '#3CDCF2'];

  return (<>
    <div className='text-home' style={{color: 'BA7837'}}><b>DÒNG LỊCH SỬ</b></div>
    <VerticalTimeline>
      {listPeriods.map((period, index) => (
        <VerticalTimelineElement key={period.periodID}
          className="vertical-timeline-element--work"
          contentStyle={{ background: colorArray[index % colorArray.length], color: 'black' }}
          contentArrowStyle={{ borderRight: `7px solid ${colorArray[index % colorArray.length]}` }}
          date={<span style={{ color: '#13BDA2', fontWeight:'bold', fontSize:'25px'}}>{period.year}</span>}
          iconStyle={{ background: 'black', color: '#FFC701' }}
          icon={<BsBookmarkStarFill />}
        >
          <h1 style={{textAlign:'center',color: periodNameColorArray[index % periodNameColorArray.length], fontWeight:'bold'}} className="vertical-timeline-element-title">{period.periodName}</h1>
          <p>
            <div dangerouslySetInnerHTML={{ __html: period.description }} />
          </p>
        </VerticalTimelineElement>
      ))}
      <VerticalTimelineElement
        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
        icon={<FaStar />}
      />
    </VerticalTimeline>
  </>)
}
const TimeLine= () => {
 return (
  <div style={{ background: "url('https://img6.thuthuatphanmem.vn/uploads/2022/11/25/anh-nen-slide-powerpoint-dep_085430590.jpg') no-repeat "}}>
  <TimeLineN />
  </div>
 )
} 
export default TimeLine;