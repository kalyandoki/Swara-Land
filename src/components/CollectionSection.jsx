// import React, { useEffect, useRef, useState } from "react";
// import video1 from "../assets/videos/sm-v.mp4";

// const mockups = [
//   {
//     shadow:
//       "https://framerusercontent.com/images/a9gc2DlbpkkZlsKZRlBfRklZyY.png",
//     video: video1,
//     border:
//       "https://framerusercontent.com/images/H2xOBKfRU2M06U4j9LF5WN8z6pA.png",
//     offset: "translate-y-24",
//   },
//   {
//     shadow:
//       "https://framerusercontent.com/images/a9gc2DlbpkkZlsKZRlBfRklZyY.png",
//     video: video1,
//     border:
//       "https://framerusercontent.com/images/H2xOBKfRU2M06U4j9LF5WN8z6pA.png",
//     offset: "translate-y-10",
//   },
//   {
//     shadow:
//       "https://framerusercontent.com/images/a9gc2DlbpkkZlsKZRlBfRklZyY.png",
//     video: video1,
//     border:
//       "https://framerusercontent.com/images/H2xOBKfRU2M06U4j9LF5WN8z6pA.png",
//     sticky: true, // ✅ center one stays fixed
//   },
//   {
//     shadow:
//       "https://framerusercontent.com/images/a9gc2DlbpkkZlsKZRlBfRklZyY.png",
//     video: video1,
//     border:
//       "https://framerusercontent.com/images/H2xOBKfRU2M06U4j9LF5WN8z6pA.png",
//     offset: "translate-y-10",
//   },
//   {
//     shadow:
//       "https://framerusercontent.com/images/a9gc2DlbpkkZlsKZRlBfRklZyY.png",
//     video: video1,
//     border:
//       "https://framerusercontent.com/images/H2xOBKfRU2M06U4j9LF5WN8z6pA.png",
//     offset: "translate-y-24",
//   },
// ];

// const SectionWithScrollAction = () => {
//   const sectionRef = useRef(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsVisible(entry.isIntersecting);
//       },
//       { threshold: 0.3 }
//     );

//     if (sectionRef.current) observer.observe(sectionRef.current);

//     return () => {
//       if (sectionRef.current) observer.unobserve(sectionRef.current);
//     };
//   }, []);

//   return (
//     <section
//       ref={sectionRef}
//       className={`relative bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_100%)]
//       py-16 sm:py-20 md:py-28 lg:py-32
//       transition-opacity duration-700 ${
//         isVisible ? "opacity-100" : "opacity-50"
//       }`}
//     >
//       {/* Heading */}
//       <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 sm:mb-8 md:mb-10 text-center px-4">
//         Regional Stories. Short Series.
//         <br />
//         Full High.
//       </h1>

//       {/* Device mockups */}
//       <div
//         className="
//     flex flex-col items-center gap-6
//     sm:flex-wrap sm:justify-center sm:gap-6
//     md:flex-nowrap md:flex-row
//     h-auto sm:h-[65vh] md:h-[75vh] lg:h-[80vh] xl:h-[85vh]
//     mb-12 sm:mb-16 md:mb-20 lg:mb-28 mt-6 sm:mt-10 md:mt-20 p-4 sm:p-6 md:p-10
//   "
//       >
//         {mockups.map((item, i) => (
//           <div
//             key={i}
//             className={`
//         relative
//         ${
//           item.sticky
//             ? "w-64 sm:w-72 md:w-80 lg:w-86 xl:w-[24rem] sm:sticky sm:top-32 self-start z-20"
//             : "w-40 sm:w-48 md:w-52 lg:w-64 xl:w-72 " + (item.offset || "")
//         }
//         ${i === 2 ? "block mx-auto sm:mx-0" : "hidden sm:block"}
//       `}
//           >
//             {/* Shadow */}
//             <img
//               src={item.shadow}
//               alt="Device Shadow"
//               className="absolute inset-0 w-full h-full object-fill rounded-2xl opacity-100"
//             />

//             {/* Video */}
//             <div
//               className="absolute inset-0 w-[85%] sm:w-[90%] h-[75%] sm:h-[80%] mx-auto my-auto
//           overflow-hidden rounded-[18px] sm:rounded-[20px] md:rounded-[22px] flex items-center justify-center"
//             >
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
//       <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center text-white mt-6 sm:mt-8 lg:mt-10 mb-4 sm:mb-6 font-medium px-4">
//         Addictive Short Series.
//         <br />
//         For your phone. In your language. Just for you.
//       </p>

//       {/* Button */}
//       <div className="flex justify-center">
//         <button
//           className="bg-yellow-400 text-black text-sm sm:text-base md:text-lg font-medium
//           px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl
//           shadow-md hover:bg-yellow-300 transition-all"
//         >
//           Available for iOS &amp; Android
//         </button>
//       </div>
//     </section>
//   );
// };

// export default SectionWithScrollAction;

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
  const videoRefs = useRef([]); // ✅ store all video refs
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

  // ✅ Handle play: pause all others
  const handlePlay = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) {
        video.pause();
      }
    });
  };

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
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-6 sm:mb-8 md:mb-10 text-center px-4">
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
          mb-12 sm:mb-16 md:mb-20 lg:mb-28 xl:mb-38 mt-6 sm:mt-10 md:mt-20 p-4 sm:p-6 md:p-10
        "
      >
        {mockups.map((item, i) => (
          <div
            key={i}
            className={`
              relative 
              ${
                item.sticky
                  ? "w-64 sm:w-72 md:w-80 lg:w-75 xl:w-[24rem] sm:sticky sm:top-32 self-start z-20"
                  : "w-40 sm:w-48 md:w-52 lg:w-64 xl:w-72 " +
                    (item.offset || "")
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
                ref={(el) => (videoRefs.current[i] = el)}
                src={item.video}
                className="w-full h-full object-cover"
                controls
                muted
                preload="metadata"
                onPlay={() => handlePlay(i)} // ✅ pause others when this plays
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
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-center text-white mt-6 sm:mt-8 lg:mt-16 xl:mt-16 2xl:mt-20 mb-4 sm:mb-6 font-medium px-4">
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
