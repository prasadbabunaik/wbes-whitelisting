import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

// Carousel images

const img1 = "/images/small/img-4.jpg";
const img2 = "/images/small/img-5.jpg";
const img3 = "/images/small/img-6.jpg";

const Slidewithcontrol = () => {
  return (
    <React.Fragment>
      <Carousel
        showStatus={false}
        showIndicators={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={4000}
        showThumbs={false}
      >
        <div>
          <Image
            src={img1}
            alt="First slide"
            width={100}
            height={100}
            className="d-block w-100"
          />
        </div>
        <div>
          <Image
            src={img2}
            alt="Second slide"
            width={100}
            height={100}
            className="d-block w-100"
          />
        </div>
        <div>
          <Image
            src={img3}
            alt="Third slide"
            width={100}
            height={100}
            className="d-block w-100"
          />
        </div>
      </Carousel>
    </React.Fragment>
  );
};

export default Slidewithcontrol;
