import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

// Carousel images
const img1 = "/images/small/img-4.jpg";
const img2 = "/images/small/img-5.jpg";
const img3 = "/images/small/img-6.jpg";

const SlideDark = () => {
  return (
    <React.Fragment>
      <Carousel
        showStatus={false}
        infiniteLoop={true}
        autoPlay={false}
        showThumbs={false}
        className="carousel-dark"
        showIndicators={true}
      >
        <div>
          <Image
            src={img1}
            alt="First slide"
            width={100}
            height={100}
            className="d-block w-100"
          />
          <div className="carousel-caption d-none d-md-block">
            <h4>Drawing a sketch</h4>
            <p>
              Too much or too little spacing, as in the example below, can make
              things unpleasant for the reader.
            </p>
          </div>
        </div>
        <div>
          <Image
            src={img2}
            alt="Second slide"
            width={100}
            height={100}
            className="d-block w-100"
          />
          <div className="carousel-caption d-none d-md-block">
            <h4>Working at a coffee shop</h4>
            <p>
              A wonderful serenity has taken possession of my entire soul, like
              these sweet mornings of spring.
            </p>
          </div>
        </div>
        <div>
          <Image
            src={img3}
            alt="Third slide"
            width={100}
            height={100}
            className="d-block w-100"
          />
          <div className="carousel-caption d-none d-md-block">
            <h4>Working at a coffee shop</h4>
            <p>
              A wonderful serenity has taken possession of my entire soul, like
              these sweet mornings of spring.
            </p>
          </div>
        </div>
      </Carousel>
    </React.Fragment>
  );
};

export default SlideDark;
