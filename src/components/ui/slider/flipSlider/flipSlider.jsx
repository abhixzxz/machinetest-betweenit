import React, { useState } from "react";
import "./programming.css";
import programming1 from "../../../../assets/images/progrmming1.jpg";
import programming2 from "../../../../assets/images/programming2.jpg";
import programming3 from "../../../../assets/images/programming3.jpg";
import programming4 from "../../../../assets/images/programming4.jpg";
import programming5 from "../../../../assets/images/programming5.jpg";
import programming6 from "../../../../assets/images/programming6.jpg";
import programming7 from "../../../../assets/images/programming7.jpg";
import programming8 from "../../../../assets/images/programming8.jpg";
import programming9 from "../../../../assets/images/programming9.jpg";
import programming10 from "../../../../assets/images/programming10.jpg";
import backgroundVideo from "../../../../assets/images/217488.mp4";

const ProgrammingSlider = () => {
  const [isHovered, setIsHovered] = useState(false);

  const Images = [
    programming1,
    programming2,
    programming3,
    programming4,
    programming5,
    programming6,
    programming7,
    programming8,
    programming9,
    programming10,
  ];

  return (
    <div className="main-container">
      <video className="background-video" autoPlay loop muted playsInline>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="banner">
        <div
          className={`slider ${isHovered ? "paused" : ""}`}
          style={{ "--quantity": 10 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {Images.map((image, index) => (
            <div
              key={index}
              className="item"
              style={{ "--position": index + 1 }}
            >
              <img src={image} alt={`Dragon ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className="content">
          <h1 data-content="Explore New" className="uppercase animate-bounce">
            Explore New
          </h1>
          <h1 data-content="Dimensions" className="uppercase ">
            Dimensions
          </h1>
        </div>
      </div>
    </div>
  );
};

export default ProgrammingSlider;
