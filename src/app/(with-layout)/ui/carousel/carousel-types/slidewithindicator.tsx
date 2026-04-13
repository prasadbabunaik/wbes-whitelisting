import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Carousel images
const img1 = "/images/small/img-1.jpg";
const img2 = "/images/small/img-2.jpg";
const img3 = "/images/small/img-3.jpg";

const Slidewithindicator = () => {
  return (
    <React.Fragment>
      <Carousel
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={4000}
      >
        <div>
          <Image
            src={img3}
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
            src={img1}
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

export default Slidewithindicator;
