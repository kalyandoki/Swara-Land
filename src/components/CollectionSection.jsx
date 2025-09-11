// import React, { useRef, useState } from "react";
// import videoMp4 from "../assets/videos/swara-v.mp4";

// const CollectionSection = () => {
//   const videoRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(false); // start paused

//   const handlePlayPause = () => {
//     if (!videoRef.current) return;

//     if (isPlaying) {
//       videoRef.current.pause();
//       setIsPlaying(false);
//     } else {
//       videoRef.current.muted = false; // unmute when user clicks
//       videoRef.current.play();
//       setIsPlaying(true);
//     }
//   };

//   return (
//     <section className="bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_100%)] py-20 px-6 md:px-12 lg:px-20 border-2 border-white/10  backdrop-blur-sm">
//       <h1 className="text-2xl md:text-4xl font-bold text-center text-white mb-12">
//         Short-form storytelling is not a trend. <br /> It’s a culture.
//       </h1>

//       <div className="flex justify-center">
//         <div className="relative w-60 sm:w-72 md:w-80">
//           {/* Phone Shadow */}
//           <img
//             src="https://framerusercontent.com/images/a9gc2DlbpkkZlsKZRlBfRklZyY.png?width=2292&height=3366"
//             alt="Phone Shadow"
//             className="absolute inset-0 w-full h-full object-contain opacity-80"
//           />

//           {/* Video Screen */}
//           <div className="absolute top-[9%] left-[8%] w-[84%] h-[82%] rounded-2xl overflow-hidden shadow-lg">
//             <video
//               ref={videoRef}
//               src={videoMp4}
//               playsInline
//               className="w-full h-full object-cover"
//             />
//             {/* Play/Pause Button */}
//             <button
//               onClick={handlePlayPause}
//               className="absolute bottom-2 right-2 z-10 bg-black/50 text-white p-2 rounded-full shadow-lg hover:bg-black/70 transition"
//             >
//               {isPlaying ? "Pause" : "Play"}
//             </button>
//           </div>

//           {/* Phone Border */}
//           <img
//             src="https://framerusercontent.com/images/H2xOBKfRU2M06U4j9LF5WN8z6pA.png?width=1888&height=3832"
//             alt="Phone Border"
//             className="relative w-full h-auto object-contain"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CollectionSection;

// import React from "react";
// import video1 from "../assets/videos/swara-v.mp4";

// const mockups = [
//   {
//     shadow:
//       "https://framerusercontent.com/images/a9gc2DlbpkkZlsKZRlBfRklZyY.png",
//     video: video1,
//     border:
//       "https://framerusercontent.com/images/H2xOBKfRU2M06U4j9LF5WN8z6pA.png",
//     offset: "translate-y-20",
//   },
//   {
//     shadow:
//       "https://framerusercontent.com/images/a9gc2DlbpkkZlsKZRlBfRklZyY.png",
//     video: video1,
//     border:
//       "https://framerusercontent.com/images/H2xOBKfRU2M06U4j9LF5WN8z6pA.png",
//     offset: "translate-y-14",
//   },
//   {
//     shadow:
//       "https://framerusercontent.com/images/a9gc2DlbpkkZlsKZRlBfRklZyY.png",
//     video: video1,
//     border:
//       "https://framerusercontent.com/images/H2xOBKfRU2M06U4j9LF5WN8z6pA.png",
//     sticky: true,
//   },
//   {
//     shadow:
//       "https://framerusercontent.com/images/a9gc2DlbpkkZlsKZRlBfRklZyY.png",
//     video: video1,
//     border:
//       "https://framerusercontent.com/images/H2xOBKfRU2M06U4j9LF5WN8z6pA.png",
//     offset: "translate-y-14",
//   },
//   {
//     shadow:
//       "https://framerusercontent.com/images/a9gc2DlbpkkZlsKZRlBfRklZyY.png",
//     video: video1,
//     border:
//       "https://framerusercontent.com/images/H2xOBKfRU2M06U4j9LF5WN8z6pA.png",
//     offset: "translate-y-20",
//   },
// ];

// const Devices = () => {
//   return (
//     <section className="relative bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_100%)] py-32">
//       {/* Heading */}
//       <h1 className="text-4xl font-bold text-[#ffff] mb-10 text-center">
//         Regional Stories. Short Series. Full High.
//       </h1>

//       <div className="flex justify-center gap-6 md:gap-12 h-[60vh] mb-28 mt-20">
//         {mockups.map((item, i) => (
//           <div
//             key={i}
//             className={`relative w-40 md:w-56 ${
//               item.sticky ? "sticky top-32 self-start" : item.offset || ""
//             }`}
//           >
//             {/* Shadow */}
//             <img
//               src={item.shadow}
//               alt="Device Shadow"
//               className="absolute inset-0 w-full h-full object-fill rounded-2xl opacity-100"
//             />

//             {/* Video Screen */}
//             <div className="absolute inset-0 w-[90%] h-[80%] mx-auto my-auto overflow-hidden rounded-[22px] flex items-center justify-center">
//               <video
//                 src={item.video}
//                 className="w-full h-full object-cover"
//                 controls
//                 muted
//                 preload="metadata"
//               />
//             </div>

//             {/* Border */}
//             <img
//               src={item.border}
//               alt="Device Border"
//               className="w-full h-full object-fill rounded-2xl"
//             />
//           </div>
//         ))}
//       </div>

//       {/* Subtitle */}
//       <p className="text-xl text-center text-[#fff] mt-10 mb-6 font-medium">
//         Addictive Short Series.
//         <br />
//         For your phone. In your language. Just for you.
//       </p>

//       {/* Button */}
//       <div className="flex justify-center">
//         <button className="bg-yellow-400 text-black text-base font-medium px-6 py-3 rounded-xl shadow-md hover:bg-yellow-300 transition-all">
//           Available for iOS &amp; Android
//         </button>
//       </div>
//     </section>
//   );
// };

// export default Devices;

import React, { useEffect, useRef, useState } from "react";
import video1 from "../assets/videos/sm-v.mp4";

const mockups = [
  {
    shadow:
      "https://framerusercontent.com/images/a9gc2DlbpkkZlsKZRlBfRklZyY.png",
    video: video1,
    border:
      "https://framerusercontent.com/images/H2xOBKfRU2M06U4j9LF5WN8z6pA.png",
    offset: "translate-y-24",
  },
  {
    shadow:
      "https://framerusercontent.com/images/a9gc2DlbpkkZlsKZRlBfRklZyY.png",
    video: video1,
    border:
      "https://framerusercontent.com/images/H2xOBKfRU2M06U4j9LF5WN8z6pA.png",
    offset: "translate-y-10",
  },
  {
    shadow:
      "https://framerusercontent.com/images/a9gc2DlbpkkZlsKZRlBfRklZyY.png",
    video: video1,
    border:
      "https://framerusercontent.com/images/H2xOBKfRU2M06U4j9LF5WN8z6pA.png",
    sticky: true, // ✅ center one stays fixed
  },
  {
    shadow:
      "https://framerusercontent.com/images/a9gc2DlbpkkZlsKZRlBfRklZyY.png",
    video: video1,
    border:
      "https://framerusercontent.com/images/H2xOBKfRU2M06U4j9LF5WN8z6pA.png",
    offset: "translate-y-10",
  },
  {
    shadow:
      "https://framerusercontent.com/images/a9gc2DlbpkkZlsKZRlBfRklZyY.png",
    video: video1,
    border:
      "https://framerusercontent.com/images/H2xOBKfRU2M06U4j9LF5WN8z6pA.png",
    offset: "translate-y-24",
  },
];

const SectionWithScrollAction = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_100%)] 
      py-16 sm:py-20 md:py-28 lg:py-32 
      transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-50"
      }`}
    >
      {/* Heading */}
      <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 sm:mb-8 md:mb-10 text-center px-4">
        Regional Stories. Short Series.
        <br />
        Full High.
      </h1>

      {/* Device mockups */}
      <div
        className="
    flex flex-col items-center gap-6
    sm:flex-wrap sm:justify-center sm:gap-6 
    md:flex-nowrap md:flex-row 
    h-auto sm:h-[65vh] md:h-[75vh] lg:h-[80vh] xl:h-[85vh] 
    mb-12 sm:mb-16 md:mb-20 lg:mb-28 mt-6 sm:mt-10 md:mt-20 p-4 sm:p-6 md:p-10
  "
      >
        {mockups.map((item, i) => (
          <div
            key={i}
            className={`
        relative 
        ${
          item.sticky
            ? "w-64 sm:w-72 md:w-80 lg:w-86 xl:w-[24rem] sm:sticky sm:top-32 self-start z-20"
            : "w-40 sm:w-48 md:w-52 lg:w-64 xl:w-72 " + (item.offset || "")
        }
        ${i === 2 ? "block mx-auto sm:mx-0" : "hidden sm:block"}
      `}
          >
            {/* Shadow */}
            <img
              src={item.shadow}
              alt="Device Shadow"
              className="absolute inset-0 w-full h-full object-fill rounded-2xl opacity-100"
            />

            {/* Video */}
            <div
              className="absolute inset-0 w-[85%] sm:w-[90%] h-[75%] sm:h-[80%] mx-auto my-auto 
          overflow-hidden rounded-[18px] sm:rounded-[20px] md:rounded-[22px] flex items-center justify-center"
            >
              <video
                src={item.video}
                className="w-full h-full object-cover"
                controls
                muted
                preload="metadata"
              />
            </div>

            {/* Border */}
            <img
              src={item.border}
              alt="Device Border"
              className="w-full h-full object-fill rounded-2xl"
            />
          </div>
        ))}
      </div>

      {/* Subtitle */}
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center text-white mt-6 sm:mt-8 lg:mt-10 mb-4 sm:mb-6 font-medium px-4">
        Addictive Short Series.
        <br />
        For your phone. In your language. Just for you.
      </p>

      {/* Button */}
      <div className="flex justify-center">
        <button
          className="bg-yellow-400 text-black text-sm sm:text-base md:text-lg font-medium 
          px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl 
          shadow-md hover:bg-yellow-300 transition-all"
        >
          Available for iOS &amp; Android
        </button>
      </div>
    </section>
  );
};

export default SectionWithScrollAction;
