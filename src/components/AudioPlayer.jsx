import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, RotateCcw } from 'lucide-react';

export default function AudioPlayer({ src, title = "Hindustani Classical Track" }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    // Reset play state if source changes
    setIsPlaying(false);
    setCurrentTime(0);
  }, [src]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleRestart = () => {
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    if (!isPlaying) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      setIsPlaying(true);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-ink-light border border-brown-light/40 rounded-xl p-4 md:p-6 shadow-lg max-w-xl w-full select-none">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
      
      {/* Track info */}
      <div className="mb-4">
        <h4 className="font-display text-lg md:text-xl text-gold-light font-medium tracking-wide truncate">{title}</h4>
        <p className="text-xs text-neutral-400 font-sans mt-0.5">SANGAM Audio Verification Channel</p>
      </div>

      <div className="flex flex-col gap-3">
        {/* Progress bar slider */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-cream-dark w-10">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-saffron"
            style={{
              background: `linear-gradient(to right, #C45C1A 0%, #C45C1A ${(currentTime / (duration || 1)) * 100}%, #2A201A ${(currentTime / (duration || 1)) * 100}%, #2A201A 100%)`
            }}
          />
          <span className="text-xs font-mono text-cream-dark w-10 text-right">{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-saffron hover:bg-saffron-light text-cream flex items-center justify-center transition-transform active:scale-95 shadow-md shadow-saffron/20 border border-saffron-light/40"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={20} className="fill-cream" /> : <Play size={20} className="fill-cream ml-1" />}
            </button>
            <button
              onClick={handleRestart}
              className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-cream transition-colors"
              title="Restart"
            >
              <RotateCcw size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Volume2 size={16} className="text-neutral-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              defaultValue="0.8"
              onChange={(e) => {
                if (audioRef.current) audioRef.current.volume = e.target.value;
              }}
              className="w-20 md:w-24 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-gold"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
