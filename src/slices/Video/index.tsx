import Lazy from "@/components/Lazy";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { FC } from "react";

export type VideoProps = SliceComponentProps<Content.VideoSlice>;

const Video: FC<VideoProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-black"
    >
      <h2 className="sr-only">Côte Royal Video Reel</h2>
      <Lazy
        rootMargin="1500px"
        className="relative h-screen overflow-hidden md:aspect-video md:h-auto"
      >
        <iframe
          title="video"
          src={`https://www.youtube-nocookie.com/embed/${slice.primary.youtube_video_id}?autoplay=1&mute=1&loop=1&playlist=${slice.primary.youtube_video_id}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
          className="pointer-events-none absolute left-1/2 aspect-video h-full -translate-x-1/2"
        />
      </Lazy>
    </section>
  );
};

export default Video;
