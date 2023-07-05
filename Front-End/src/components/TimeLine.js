import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { FaStar } from 'react-icons/fa';
import { BsBookmarkStarFill } from 'react-icons/bs';
import 'react-vertical-timeline-component/style.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TimeLine() {

  const [listPeriods, setListPeriods] = useState([]);

  useEffect(() => {
    const fetchData = async (page) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/periods`);
        setListPeriods(response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const colorArray = ['#FFC701', '#FF5733', '#10CC52', '#416AD1', '#BB41D1'];
  
  const periodNameColorArray = ['red', '#FFC701', '#C70039', '#f5e102', '#fff'];

  return (<>
    <div className='text-home'>DÒNG LỊCH SỬ</div>
    <VerticalTimeline>
      {listPeriods.map((period, index) => (
        <VerticalTimelineElement key={period.periodID}
          className="vertical-timeline-element--work"
          contentStyle={{ background: colorArray[index % colorArray.length], color: 'black' }}
          contentArrowStyle={{ borderRight: `7px solid ${colorArray[index % colorArray.length]}` }}
          date={<span style={{ color: 'white', fontWeight:'bold', fontSize:'25px'}}>{period.year}</span>}
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
