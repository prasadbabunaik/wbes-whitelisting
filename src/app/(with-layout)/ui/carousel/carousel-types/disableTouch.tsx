import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

// Carousel images
const img7 = "/images/small/img-7.jpg";
const img8 = "/images/small/img-8.jpg";
const img9 = "/images/small/img-9.jpg";

const DisableTouch = () => {
  return (
    <React.Fragment>
      <Carousel
        showStatus={false}
        showIndicators={false}
        infiniteLoop={true}
        autoPlay={false}
        swipeable={false}
        emulateTouch={false}
        showThumbs={false}
      >
        <div>
          <Image
            src={img9}
            alt="First slide"
            width={100}
            height={100}
            className="d-block w-100"
          />
        </div>
        <div>
          <Image
            src={img8}
            alt="Second slide"
            width={100}
            height={100}
            className="d-block w-100"
          />
        </div>
        <div>
          <Image
            src={img7}
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

export default DisableTouch;
