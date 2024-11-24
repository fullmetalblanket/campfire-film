import Image from 'next/image';

const VideoThumbnail = ({ project, thumbNailClassName, onClick }) => {
  const exists = project.id
  const quality1 = 'default';
  const quality2 = 'mqdefault';
  const quality3 = 'hqdefault';
  const quality4 = 'sddefault';
  const quality5 = 'maxresdefault';
  const quality = project.quality || quality5;
  const youTubeUrl = exists ? `https://img.youtube.com/vi/${project.id}/${quality}.jpg` : '';
  const comingSoonUrl = '/images/thumbnails/coming-soon.png';
  const localImage = project.thumbnail
  const thumbnailUrl = youTubeUrl || localImage || comingSoonUrl;
  const length = project.length;
  const curserStyle = exists ? 'cursor-pointer' : 'cursor-default';

  return (
    <div 
      className={`${curserStyle} border border-slate-900 rounded-lg overflow-hidden shadow-md relative bg-black opacity-90 hover:opacity-100 transition-opacity ${thumbNailClassName || ''}`}
      onClick={onClick}
    >
      <Image
        src={thumbnailUrl}
        alt={`Thumbnail for ${project.name}`}
        width={320}
        height={180}
        className="w-full"
      />
      {!exists && (
        <div className="absolute top-0 left-0 h-full w-full">
          <Image
            src={comingSoonUrl}
            alt={`Coming soon overlay for ${project.name}`}
            width={320}
            height={180}
            className="w-full h-full"
          />
        </div>
      )}
      {exists && (
        <div className="absolute top-0 left-0 h-full w-full md:opacity-0 hover:opacity-100 transition-opacity">
          <Image
            src="/images/video-play.png"
            alt="Play button"
            width={50}
            height={50}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      )}
      {length && <div className="text-sm absolute bottom-0 left-0 py-1 px-2 bg-black/50 leading-4 rounded-bl-md rounded-tr-md">{length}</div>}
    </div>
  );
};

export default VideoThumbnail;
