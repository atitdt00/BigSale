import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";

function Slider() {

    let [ slides, setSlides]= useState([])
    const getphoto=async()=>{
        try{
            const resp= await axios.get("https://fakestoreapi.com/products");
            setSlides(resp.data)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getphoto()
    },[])
  return (
    <div className="w-full min-h-150 ">
      <Swiper
        spaceBetween={40}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
            
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((item, index)=>(
            <SwiperSlide>
                    <img src={item.image} alt={`Slide ${index+1}`} className="w-full h-150 object-cover rounded" />
        </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;
