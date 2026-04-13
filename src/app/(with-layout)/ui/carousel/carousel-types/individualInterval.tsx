import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

// Carousel images
const img10 = "/images/small/img-10.jpg";
const img11 = "/images/small/img-11.jpg";
const img12 = "/images/small/img-12.jpg";

const IndividualInterval = () => {
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
            src={img12}
            alt="First slide"
            width={100}
            height={100}
            className="d-block w-100"
          />
        </div>
        <div>
          <Image
            src={img11}
            alt="Second slide"
            width={100}
            height={100}
            className="d-block w-100"
          />
        </div>
        <div>
          <Image
            src={img10}
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

export default IndividualInterval;
