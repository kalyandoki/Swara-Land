import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

// ✅ Import your images
import img1 from "../assets/images/sm-b.png";
import img2 from "../assets/images/eat-p.png";
import img3 from "../assets/images/sm-b.png";
import img4 from "../assets/images/eat-p.png";
import img5 from "../assets/images/sm-b.png";
import img6 from "../assets/images/eat-p.png";
import img7 from "../assets/images/sm-b.png";
import img8 from "../assets/images/eat-p.png";
import img9 from "../assets/images/sm-b.png";
import img10 from "../assets/images/eat-p.png";
import img11 from "../assets/images/sm-b.png";
import img12 from "../assets/images/eat-p.png";
// import img13 from "../assets/images/sm-b.png";

// ✅ Images array
const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  // img13,
];

const MediaCarousel = () => {
  return (
    <div className="max-w-8xl mx-auto pt-20 px-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-center text-[#fff] mb-8 font-roboto">
        Media Partners
      </h2>
      <Carousel
        showArrows={false}
        autoPlay
        infiniteLoop
        interval={1800}
        transitionTime={700}
        showThumbs={false}
        showStatus={false}
        centerMode={true}
        showIndicators={false}
        centerSlidePercentage={20.33}
        swipeable
        emulateTouch
        dynamicHeight={false}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="flex items-center justify-center px-2 py-2 sm:px-4 sm:py-4"
          >
            <div
              className="w-28 sm:w-44 md:w-40 lg:w-50 h-28 sm:h-25 md:h-25 lg:h-28 
            rounded-4xl 
              transition-transform duration-300 ease-in-out transform hover:scale-105 
              flex items-center justify-center bg-[#fff] md:p-4 shadow-lg"
            >
              <img
                src={img}
                alt={`Client Logo ${index + 1}`}
                className="w-full h-full object-contain transition duration-300"
              />
            </div>
          </div>
        ))}
      </Carousel>

      {/* Custom dot styling */}
      <style>
        {`
          .carousel .control-dots {
            position: absolute;
            bottom: -30px;
            display: flex;
            justify-content: center;
            align-items: center;
            list-style: none;
          }
          .carousel .control-dots .dot {
            background: #4a148c !important;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            opacity: 0.6;
            margin: 0 6px;
            transition: all 0.3s ease;
            cursor: pointer;
          }
          .carousel .control-dots .dot.selected {
            opacity: 1;
            transform: scale(1.3);
            background: #9c27b0 !important;
          }
        `}
      </style>
    </div>
  );
};

export default MediaCarousel;
