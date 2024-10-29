// app/components/AudioPlayer.tsx
'use client';
import { useState, useRef, useEffect } from 'react';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

import { Progress } from './ui/progress';

interface AudioPlayerProps {
  exibePlayer: boolean;
  setExibePlayer: (value: boolean) => void; // Função para alterar o estado
  title: string;
}

export default function AudioPlayer({
  exibePlayer,
  setExibePlayer,
  title
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audio, setAudio] = useState('');

  useEffect(() => {
    console.log(title);
  }, [title]);
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleExpand = () => {
    setExibePlayer(!exibePlayer); // Alterna entre expandir e colapsar
  };

  return (
    <>
      {exibePlayer ? (
        <div className="h-[160px] fixed bottom-4 right-0 flex items-center space-x-4 rounded-bl-lg rounded-tl-lg bg-[#282828] p-2  shadow-lg">
          <button
            onClick={toggleExpand}
            className=" text-blue-500 hover:underline"
          >
            <ChevronsRight />
          </button>

          <iframe
            src="https://open.spotify.com/embed/show/35SAq4bU4AAQHLfF29NGuj?utm_source=generator&theme=0"
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          {/*     <Progress
            value={(5 / 100) * 100}
            className="w-full"
            max={Math.max(100, 0.01)} // Ensure
          />
          <div>player aqui.</div>
           <button
            onClick={togglePlay}
            className="rounded-full bg-[#68B96D] p-2 text-white transition duration-200 hover:bg-green-600"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <audio
            ref={audioRef}
            src={''}
          />
          <p className="text-gray-700">Podcast Episode</p> */}
        </div>
      ) : (
        <div className="h-[160px] fixed bottom-4 right-0 flex items-center space-x-4 rounded-bl-lg rounded-tl-lg bg-[#282828] p-2 shadow-lg">
          <button
            onClick={toggleExpand}
            className=" text-blue-500 hover:underline"
          >
            <ChevronsLeft />
          </button>
        </div>
      )}
    </>
  );
}
