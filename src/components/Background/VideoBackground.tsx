import React, { useRef, useEffect } from 'react';

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Set playback speed after component mounts
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Set to half speed
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen overflow-hidden z-[-1]">
      <video
        ref={videoRef} // Add ref to video element
        autoPlay
        loop
        muted // Muted is required for autoplay in most browsers
        playsInline // Important for iOS playback
        className="absolute top-1/2 left-1/2 w-auto min-w-full min-h-full max-w-none transform -translate-x-1/2 -translate-y-1/2 object-cover"
      >
        {/* Use /bg.mp4 directly assuming it's in public folder root */}
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Optional overlay for darkening/tinting the video */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
    </div>
  );
};

export default VideoBackground;
