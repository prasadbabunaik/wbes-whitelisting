import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

// Carousel images
const img2 = "/images/small/img-2.jpg";
const img7 = "/images/small/img-7.jpg";
const img9 = "/images/small/img-9.jpg";

const Slidewithcaption = () => {
  return (
    <React.Fragment>
      <Carousel
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={4000}
        showThumbs={true}
      >
        <div>
          <Image
            src={img7}
            alt="First slide"
            width={100}
            height={100}
            className="d-block w-100"
          />
          <div className="carousel-caption text-white-50">
            <h4 className="text-white">Sunrise above a beach</h4>
            <p>
              You've probably heard that opposites attract. The same is true for
              fonts. Don't be afraid to combine font styles that are different
              but complementary.
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
          <div className="carousel-caption text-white-50">
            <h4 className="text-white">Working from home little spot</h4>
            <p>
              Consistency piques people’s interest is that it has become more
              and more popular over the years, which is excellent.
            </p>
          </div>
        </div>
        <div>
          <Image
            src={img9}
            alt="Third slide"
            width={100}
            height={100}
            className="d-block w-100"
          />
          <div className="carousel-caption text-white-50">
            <h4 className="text-white">
              Dramatic clouds at the Golden Gate Bridge
            </h4>
            <p>
              Increase or decrease the letter spacing depending on the situation
              and try, try again until it looks right, and each letter.
            </p>
          </div>
        </div>
      </Carousel>
    </React.Fragment>
  );
};

export default Slidewithcaption;
