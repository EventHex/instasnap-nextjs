// // components/InstaSnapLoader.jsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { Camera, Scissors, Sparkles } from 'lucide-react';

// const InstaSnapLoader = () => {
//   const [progress, setProgress] = useState(0);
//   const [cutComplete, setCutComplete] = useState(false);
//   const [cutPosition, setCutPosition] = useState(0);
  
//   // Simulate loading progress
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress(prev => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           return 100;
//         }
//         return prev + 1;
//       });
//     }, 70); // Smoother progress
    
//     return () => clearInterval(interval);
//   }, []);
  
//   // Control scissors animation
//   useEffect(() => {
//     if (progress <= 95) {
//       const scissorInterval = setInterval(() => {
//         setCutPosition(prev => {
//           if (prev >= 100) {
//             setCutComplete(true);
//             clearInterval(scissorInterval);
//             return 100;
//           }
//           return prev + 1.5;
//         });
//       }, 30);
      
//       return () => clearInterval(scissorInterval);
//     }
//   }, [progress]);
  
//   return (
//     <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-br from-blue-100 to-white">
//       {/* Logo */}
//       <div className="mb-8 flex items-center">
//         <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-gray-300 to-indigo-300">
//           InstaSnap
//         </span>
//         <Sparkles className=" animate-bounce ml-2 text-yellow-300" size={24} />
//       </div>
      
//       {/* Main content container */}
//       <div className="relative w-80 h-80 rounded-xl bg-gray-50 shadow-2xl overflow-hidden">
//         {/* Content preview box */}
//         <div className="absolute inset-0 border-2 border-gray-100 rounded-xl overflow-hidden">
//           {/* Loading content gradient */}
//           <div 
//             className="absolute inset-0 bg-gradient-to-br from-blue-300 via-purple-50 to-blue-50" 
//             style={{ clipPath: `inset(0 ${100 - cutPosition}% 0 0)` }}
//           />
          
//           {/* Grid overlay */}
//           <div className="absolute inset-0 opacity-20">
//             <div className="w-full h-full grid grid-cols-3 grid-rows-3">
//               {[...Array(9)].map((_, i) => (
//                 <div key={i} className="border border-white/20"></div>
//               ))}
//             </div>
//           </div>
          
//           {/* Camera icon */}
//           <div className="absolute inset-0 flex items-center justify-center">
//             <Camera size={48} className="text-white/30" />
//           </div>
//         </div>
        
//         {/* Cutting effect */}
//         {!cutComplete && (
//           <div 
//             className="absolute top-0 bottom-0 z-10 transition-all duration-200 ease-out" 
//             style={{ left: `${cutPosition}%` }}
//           >
//             <div className="relative h-full flex items-center">
//               <Scissors 
//                 size={28} 
//                 strokeWidth={1.5}
//                 className="text-white drop-shadow-lg transform -translate-x-1/2" 
//               />
//               <div className="absolute left-0 top-0 bottom-0 w-px bg-white opacity-80 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
//             </div>
//           </div>
//         )}
        
//         {/* Shine effect - moves across as loading progresses */}
//         <div 
//           className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
//           style={{ 
//             transform: `translateX(${progress - 100}%)`,
//             width: '100%',
//             transition: 'transform 0.5s ease-out'
//           }}
//         />
        
//         {/* Film frame marks */}
//         <div className="absolute top-0 bottom-0 left-0 right-0 pointer-events-none">
//           {[...Array(10)].map((_, i) => (
//             <div 
//               key={i} 
//               className="absolute w-2 h-3 bg-blue-100"
//               style={{ 
//                 top: i % 2 === 0 ? -1 : 'auto',
//                 bottom: i % 2 !== 0 ? -1 : 'auto', 
//                 left: `${(i * 10) + 5}%`,
//                 transform: 'translateX(-50%)'
//               }}
//             />
//           ))}
//         </div>
//       </div>
      
//       {/* Progress indicator */}
//       <div className="mt-8 flex flex-col items-center space-y-3 w-80">
//         <div className="text-sm font-medium text-black/60 w-full flex justify-between">
//           <span>InstaSnap content is loading</span>
//           <span>{Math.min(progress, 100)}%</span>
//         </div>
//         <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
//           <div 
//             className="h-full bg-gradient-to-r from-pink-500 to-indigo-500 rounded-full"
//             style={{ width: `${Math.min(progress, 100)}%`, transition: 'width 0.2s ease-out' }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InstaSnapLoader;




import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="load-inner load-one" />
        <div className="load-inner load-two" />
        <div className="load-inner load-three" />
        <span className="text">Loading...</span>
      </div>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* This makes it take the full viewport height */
  
  .loader {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    perspective: 780px;
  }
  .text {
    font-size: 20px;
    font-weight: 700;
    color: #cecece;
    z-index: 10;
  }
  .load-inner {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 50%;
  }
  .load-inner.load-one {
    left: 0%;
    top: 0%;
    border-bottom: 3px solid #5c5edc;
    animation: rotate1 1.15s linear infinite;
  }
  .load-inner.load-two {
    right: 0%;
    top: 0%;
    border-right: 3px solid #9147ff;
    animation: rotate2 1.15s 0.1s linear infinite;
  }
  .load-inner.load-three {
    right: 0%;
    bottom: 0%;
    border-top: 3px solid #3b82f6;
    animation: rotate3 1.15s 0.15s linear infinite;
  }
  @keyframes rotate1 {
    0% {
      transform: rotateX(45deg) rotateY(-45deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(45deg) rotateY(-45deg) rotateZ(360deg);
    }
  }
  @keyframes rotate2 {
    0% {
      transform: rotateX(45deg) rotateY(45deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(45deg) rotateY(45deg) rotateZ(360deg);
    }
  }
  @keyframes rotate3 {
    0% {
      transform: rotateX(-60deg) rotateY(0deg) rotateZ(0deg);
    }
    100% {
      transform: rotateX(-60deg) rotateY(0deg) rotateZ(360deg);
    }
  }
`;
export default Loader;
