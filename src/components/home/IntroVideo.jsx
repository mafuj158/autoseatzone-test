import { useRef, useState } from "react";
import PauseIcon from "@/assets/icons/PauseIcon";
import PlayIcon from "@/assets/icons/PlayIcon";
import useGetCmsData from "@/hooks/useGetCmsData";
import LoadingComponent from "../loaders/LoadingComponent";

const IntroVideo = () => {
  const [isVideoPlaying, setVideoPlaying] = useState(true);
  const videoRef = useRef(null);

  const { data, isLoading } = useGetCmsData('/vehicle-cover')
  // console.log(data)
  const videoSrc = data?.data?.vehicle_cover?.video;


  const handleVideoPlay = () => {
    if (!videoRef.current) return;

    if (!isVideoPlaying) {
      videoRef.current.play();
      setVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setVideoPlaying(false);
    }
  };

  if (isLoading) {
    return <LoadingComponent />
  }

  return (
    <div className="w-full lg:h-[100vh] xl:h-[70vh] relative overflow-hidden">
      <video
        src={videoSrc}
        className="w-full h-full object-cover"
        ref={videoRef}
        loop
        muted
        autoPlay
        playsInline
      />

      <div
        onClick={handleVideoPlay}
        className="absolute left-1/2 top-1/2 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-primaryBlue text-2xl text-white transition duration-300 ease-in-out"
      >
        {isVideoPlaying ? <PauseIcon /> : <PlayIcon />}
      </div>
    </div>
  );
};

export default IntroVideo;
