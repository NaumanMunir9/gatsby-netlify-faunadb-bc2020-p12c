// libraries
import React from "react";
import ReactStars from "react-stars";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default function ReactCarousel({ testimonials, getAvatar }) {
  return (
    <>
      <Carousel
        className="main"
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
      >
        {testimonials &&
          testimonials.map((testimonial, index) => (
            <div className="testimonial" key={index}>
              <img src={getAvatar()} alt="avatar" height="50px" width="50px" />
              <div className="message">
                <ReactStars
                  className="rating"
                  count={testimonial.rating}
                  size={24}
                  color1={"#ffd700"}
                  edit={false}
                  half={false}
                />
                <p className="text">{testimonial.text}</p>
              </div>
            </div>
          ))}
      </Carousel>
    </>
  );
}
