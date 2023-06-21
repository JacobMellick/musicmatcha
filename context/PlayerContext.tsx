import { createContext, useContext, useEffect, useState } from "react";

type Sample = {
  startPct: number;
  endPct: number;
};

const PlayerContext = createContext({} as any);

export default function PlayerProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [currentTrack, setCurrentTrack] = useState<{
    preview_url: string;
    startPct: number;
    endPct: number;
  } | null>(null);
  const [currentTrackAudio, setCurrentTrackAudio] =
    useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!currentTrack) return;

    if (currentTrackAudio) {
      currentTrackAudio.pause();
      setCurrentTrackAudio(null);
    }

    const tempAudio = new Audio(currentTrack.preview_url!);

    const setAudioData = () => {
      setDuration(tempAudio.duration);
      tempAudio.currentTime = tempAudio.duration * currentTrack.startPct;
      setCurrentTime(tempAudio.currentTime);
    };

    const setAudioTime = () => {
      const currTime = tempAudio.currentTime;
      setCurrentTime(currTime);
      if (currTime > tempAudio.duration * currentTrack.endPct) {
        tempAudio.pause();
        tempAudio.currentTime = tempAudio.duration * currentTrack.startPct;
        setIsPlaying(false);
      }
    };

    tempAudio.addEventListener("loadeddata", setAudioData);
    tempAudio.addEventListener("timeupdate", setAudioTime);
    tempAudio.preload = "none";

    setCurrentTrackAudio(tempAudio);

    return () => {
      tempAudio.pause();
      setCurrentTrackAudio(null);
    };
  }, [currentTrack]);

  useEffect(() => {
    const handlePlay = async () => {
      if (currentTrackAudio) {
        setIsPlaying(true);
        await currentTrackAudio.play();
      }
    };
    handlePlay();
  }, [currentTrackAudio]);

  const togglePlay = async () => {
    if (isPlaying) pause();
    else await play();
  };

  const play = async () => {
    setIsPlaying(true);
    await currentTrackAudio?.play();
  };

  const pause = () => {
    setIsPlaying(false);
    currentTrackAudio?.pause();
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        currentTrackAudio,
        setCurrentTrack,
        isPlaying,
        play,
        pause,
        togglePlay,
        duration,
        currentTime,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
