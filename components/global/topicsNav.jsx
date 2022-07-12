
import Link from 'next/link';
import { useRouter } from 'next/router';

import { topics } from './data';

// const Discover = () => {
//   const router = useRouter();
//   const { topic } = router.query;

//   const activeTopicStyle = "laptop:border-2 hover:bg-primary laptop:border-[#F51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#FF1997]"

//   const topicStyle = "xl:border-2 hover:bg-primary laptop:border-gray-300 px-3 py-2 rounded laptop:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black"

//   return (
//     <div className="laptop:border-b-2 xl:border-gray-200 pb-6">
//       <p className="text-gray-500 font-semibold m-3 mt-4 hidden laptop:block">
//         Popular Topics
//       </p>
//       <div className="flex gap-3 flex-wrap">
//         {topics.map((item) => (
//           <Link href={`/main?topic=${item.name}`} key={item.name}>
//             <div className={topic === item.name ?activeTopicStyle : topicStyle}>
//               <span className="font-bold text-2xl xl:text-md">
//              <img className='h-14 w-14 rounded-full' src={item.icon} alt="" /> 
//               </span>
//               <span className="font-medium text-md hidden laptop:block capitalize">
//                 {item.name}
//               </span>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Discover








import React, {useState} from 'react';
import {createRef} from "react";
import {Button, Carousel, Col, Row} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import cl from '../styles/slidenav.module.css'
//import SlideC from "./Slide/SlideC";
//import '../styles/slidenav.module.css'

const Slider = ({pointImg}) => {
    const [kol, setKol]=useState(3)
    const carouselRef = createRef()
    const router = useRouter();
       const { topic } = router.query;

    const nextSlide = () => {
        carouselRef.current.next()
    }

    const prevSlide = () => {
        carouselRef.current.prev()
    }

  const activeTopicStyle = "laptop:border-2 hover:bg-primary laptop:border-[#F51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#FF1997]"

  const topicStyle = "xl:border-2 hover:bg-primary laptop:border-gray-300 px-3 py-2 rounded laptop:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black"


    return (

        // -----flex row  previous arrow 1 span 22 span topics and 1span next arrow-
        <Row style={{alignItems: 'center', marginTop: 20, height: '100px'}}>

            {/* ---- previous arrow---- */}
            <Col span={1}>
                <Button
                    type="primary"
                    shape="circle"
                    icon={<LeftOutlined/>}
                    onClick={prevSlide}
                    className={cl.button_custom}
                />
            </Col>

            {/* ---- topics---- */}

            <Col span={22}>
                <Carousel 
                autoplay={true}
                slidesToShow={5} ref={carouselRef} dots={false}>
                {topics.map((item) => (
          <Link href={`/main?topic=${item.name}`} key={item.name}>
            <div className={topic === item.name ?activeTopicStyle : topicStyle}>
              <span className="font-bold text-2xl xl:text-md">
             <img className='h-14 w-14 rounded-full' src={item.icon} alt="" /> 
              </span>
              <span className="font-medium text-md hidden laptop:block capitalize">
                {item.name}
              </span>
            </div>
          </Link>
        ))}
                </Carousel>
            </Col>

            {/* ---- next arrow---- */}
            <Col span={1}>
                <Button
                    type="primary"
                    shape="circle"
                    icon={<RightOutlined/>}
                    onClick={nextSlide}
                    className={cl.button_custom}
                />
            </Col>
        </Row>
    );
};

export default Slider;