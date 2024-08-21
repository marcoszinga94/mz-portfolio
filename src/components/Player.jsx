import CurrentSong from "./CurrentSong";
import SongControl from "./SongControl";
import VolumeControl from "./VolumeControl";
import Controls from "./Controls";

const Player = ({ currentSong }) => {
  const audioRef = useRef(new Audio(currentSong.src));

  useEffect(() => {
    audioRef.current.src = currentSong.src;
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentSong.src]);

  return (
    <div className="w-full h-24 bg-black flex justify-between items-center p-3">
      <CurrentSong title={currentSong.title} artists={currentSong.artists} />

      <div className="flex flex-col items-center">
        <Controls />
        <SongControl audio={audioRef} />
      </div>

      <VolumeControl />
    </div>
  );
};

export default Player;
