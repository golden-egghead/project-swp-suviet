import React from 'react'
import TimeLine from './TimeLine'
// import CarouselHomePage from './CarouselHomePage';
// import { Card } from 'react-bootstrap';

export default function HomePage() {
  return (<>
  {/* <Card style={{backgroundColor: '#F5F5F5'}}>
    <div>
      <CarouselHomePage />
    </div>
  </Card> */}
    <div style={{ backgroundColor: 'black' }}>
      <TimeLine />
    </div>
  </>)
}
