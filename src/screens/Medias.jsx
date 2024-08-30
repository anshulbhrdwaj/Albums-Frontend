import React, { useEffect } from "react";
import { Card, CardFooter, Button } from "@nextui-org/react";
import { useFetchMedia } from "../hooks/useAlbums";
import Delete from "../modals/DeleteAlbum.modal";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ReactPlayer from "react-player";
import { isVideoUrl } from "../utils/utils";

function MediaContent({ mediaData, isVideo }) {
  console.log(mediaData);

  if (isVideo) {
    return (
      <ReactPlayer
        controls
        autoPlay
        muted
        width="100%"
        height="auto"
        crossOrigin="anonymous"
        url={mediaData?.url}
        className="w-full h-full object-cover"
      />
    );
  } else {
    return (
      <img
        crossOrigin="anonymous"
        alt="Media"
        className="w-auto h-auto object-cover"
        src={mediaData?.url}
      />
    );
  }
}

export default function Medias({ media, refetchAlbum }) {
  return (
    <div className="gap-2 px-8">
      <ResponsiveMasonry columnsCountBreakPoints={{ 300: 1, 500: 3, 900: 5 }}>
        <Masonry>
          {media?.map((file) => (
            <MediaCard key={file} file={file} refetchAlbum={refetchAlbum} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

function MediaCard({ file, refetchAlbum }) {
  const { data, error, refetch } = useFetchMedia(file);
  const isVideo = isVideoUrl(data?.url);

  if (error) {
    console.error("Error fetching media:", error);
    return null;
  }

  return (
    <div className="m-4">
      <Card isFooterBlurred>
        <MediaContent mediaData={data} isVideo={isVideo} />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <Button radius="full" size="xs" className="w-full bg-transparent">
            <Delete
              media={file}
              refetch={refetch}
              refetchAlbum={refetchAlbum}
            />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
