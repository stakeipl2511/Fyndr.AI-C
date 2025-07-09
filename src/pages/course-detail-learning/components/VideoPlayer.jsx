import React, { useState, useRef, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const VideoPlayer = ({ videoUrl, onTimeUpdate, onTranscriptToggle, isTranscriptOpen }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [isSpeedOpen, setIsSpeedOpen] = useState(false);

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const time = video.currentTime;
      setCurrentTime(time);
      onTimeUpdate?.(time);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onTimeUpdate]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    videoRef.current.playbackRate = speed;
    setIsSpeedOpen(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    const container = videoRef.current.parentElement;
    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="relative bg-black rounded-xl overflow-hidden group aspect-video">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-cover"
        onClick={togglePlay}
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      />

      {/* Play/Pause Overlay */}
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={togglePlay}
      >
        <Button
          variant="ghost"
          className="w-16 h-16 rounded-full bg-black/50 hover:bg-black/70 text-white"
          iconName={isPlaying ? 'Pause' : 'Play'}
          iconSize={32}
        />
      </div>

      {/* Controls Bar */}
      <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Progress Bar */}
        <div className="mb-4">
          <div 
            className="w-full h-2 bg-white/20 rounded-full cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-primary rounded-full transition-all duration-150"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={togglePlay}
              iconName={isPlaying ? 'Pause' : 'Play'}
              className="text-white hover:text-primary"
            />

            <Button
              variant="ghost"
              onClick={() => {
                const video = videoRef.current;
                video.currentTime = Math.max(0, video.currentTime - 10);
              }}
              iconName="RotateCcw"
              className="text-white hover:text-primary"
            />

            <Button
              variant="ghost"
              onClick={() => {
                const video = videoRef.current;
                video.currentTime = Math.min(duration, video.currentTime + 10);
              }}
              iconName="RotateCw"
              className="text-white hover:text-primary"
            />

            {/* Volume Control */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setIsVolumeOpen(!isVolumeOpen)}
                iconName={volume === 0 ? 'VolumeX' : volume < 0.5 ? 'Volume1' : 'Volume2'}
                className="text-white hover:text-primary"
              />
              
              {isVolumeOpen && (
                <div className="absolute bottom-12 left-0 bg-black/90 p-3 rounded-lg">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 h-2 bg-white/20 rounded-lg appearance-none slider"
                  />
                </div>
              )}
            </div>

            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Speed Control */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setIsSpeedOpen(!isSpeedOpen)}
                className="text-white hover:text-primary text-sm"
              >
                {playbackSpeed}x
              </Button>
              
              {isSpeedOpen && (
                <div className="absolute bottom-12 right-0 bg-black/90 rounded-lg overflow-hidden">
                  {speedOptions.map((speed) => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={`block w-full px-4 py-2 text-sm text-left hover:bg-white/20 ${
                        speed === playbackSpeed ? 'bg-primary text-white' : 'text-white'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              onClick={onTranscriptToggle}
              iconName="FileText"
              className={`text-white hover:text-primary ${isTranscriptOpen ? 'text-primary' : ''}`}
            />

            <Button
              variant="ghost"
              onClick={toggleFullscreen}
              iconName={isFullscreen ? 'Minimize' : 'Maximize'}
              className="text-white hover:text-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;