import { useEffect, useRef, useState } from 'react';
import { Box, IconButton, Text, Spinner } from '@chakra-ui/react';
import { FaPlay, FaPause, FaExpand, FaCompress, FaFastForward, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import Hls from 'hls.js';
import './watermark.css';

interface VideoState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isFullscreen: boolean;
  playbackRate: number;
  isLoading: boolean;
  isSeeking: boolean;
  error: string | null;
  showControls: boolean;
}

interface VideoPlayerProps {
  url: string;
  watermark?: string;
  canPlay?: boolean;
  onError?: (error: { type: string; attempt?: number }) => void;
}

export default function VideoPlayer({ url, watermark, onError }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsTimeoutRef = useRef<number>();
  const [state, setState] = useState<VideoState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isFullscreen: false,
    playbackRate: 1,
    isLoading: true,
    isSeeking: false,
    error: null,
    showControls: true
  });

  const setLoading = (loading: boolean) => {
    setState(prev => ({ ...prev, isLoading: loading }));
  };

  const handleError = (errorType: string) => {
    setState(prev => ({ ...prev, error: errorType, isLoading: false }));
    onError?.({ type: errorType });
  };

  // Handle mouse movement and controls visibility
  const handleMouseMove = () => {
    setState(prev => ({ ...prev, showControls: true }));
    
    // Clear any existing timeout
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    // Set new timeout to hide controls after 2 seconds of inactivity
    controlsTimeoutRef.current = setTimeout(() => {
      if (state.isPlaying) {  // Only hide controls if video is playing
        setState(prev => ({ ...prev, showControls: false }));
      }
    }, 2000);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const initialFetch = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch manifest.');
      }
      
      const data = await response.json();
      const modifiedManifest = data.modified_m3u8_content;

      if (Hls.isSupported()) {
        console.log('HLS is supported');
        const hls = new Hls();
        const blob = new Blob([modifiedManifest], { type: 'application/x-mpegURL' });
        const blobUrl = URL.createObjectURL(blob);
        
        hls.loadSource(blobUrl);
        hls.attachMedia(videoRef.current!);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log('Manifest parsed');
          setLoading(false);
          videoRef.current?.play().catch(console.error);
        });

        hls.on(Hls.Events.ERROR, () => {
          console.log('Error parsing manifest');
          handleError('manifest');
        });

        return () => {
          hls.destroy();
          URL.revokeObjectURL(blobUrl);
        };
      } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
        console.log('Native HLS support');
        videoRef.current.src = data.manifest_url;
        
        videoRef.current.addEventListener('loadedmetadata', () => {
          setLoading(false);
          videoRef.current?.play().catch(console.error);
        });

        videoRef.current.addEventListener('error', () => {
          handleError('manifest');
        });
      }
    } catch (error) {
      console.error('Error fetching manifest:', error);
      handleError('manifest');
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const cleanup = initialFetch();
    const intervalId = setInterval(initialFetch, 55 * 60 * 1000);

    const handlers = {
      playing: () => setState(s => ({ ...s, isPlaying: true })),
      pause: () => setState(s => ({ ...s, isPlaying: false, showControls: true })),
      timeupdate: () => setState(s => ({ ...s, currentTime: videoElement.currentTime })),
      loadedmetadata: () => setState(s => ({ ...s, duration: videoElement.duration })),
      volumechange: () => setState(s => ({ ...s, volume: videoElement.volume })),
      seeking: () => setState(s => ({ ...s, isSeeking: true })),
      seeked: () => setState(s => ({ ...s, isSeeking: false })),
      fullscreenchange: () => setState(s => ({ 
        ...s, 
        isFullscreen: document.fullscreenElement !== null 
      }))
    };

    Object.entries(handlers).forEach(([event, handler]) => {
      videoElement.addEventListener(event, handler);
    });

    videoElement.disablePictureInPicture = true;

    return () => {
      Object.entries(handlers).forEach(([event, handler]) => {
        videoElement.removeEventListener(event, handler);
      });
      clearInterval(intervalId);
      cleanup?.then(fn => fn?.());
    };
  }, [url]);

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '00:00';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours.toString()}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const controls = {
    togglePlay: () => {
      if (!videoRef.current) return;
      if (state.isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(console.error);
      }
    },
    handleSeek: (value: number) => {
      if (!videoRef.current) return;
      videoRef.current.currentTime = value;
    },
    toggleFullscreen: async () => {
      if (!videoRef.current) return;
      try {
        if (!state.isFullscreen) {
          await videoRef.current.requestFullscreen();
        } else {
          await document.exitFullscreen();
        }
      } catch (error) {
        console.error('Fullscreen error:', error);
      }
    },
    changePlaybackRate: () => {
      if (!videoRef.current) return;
      const rates = [1, 1.5, 2];
      const nextRate = rates[(rates.indexOf(state.playbackRate) + 1) % rates.length];
      videoRef.current.playbackRate = nextRate;
      setState(s => ({ ...s, playbackRate: nextRate }));
    },
    handleVolume: (value: number) => {
      if (!videoRef.current) return;
      videoRef.current.volume = value;
      setState(s => ({ ...s, volume: value }));
    },
    toggleMute: () => {
      if (!videoRef.current) return;
      controls.handleVolume(state.volume === 0 ? 1 : 0);
    }
  };

  return (
    <Box 
      position="relative" 
      width="100%" 
      height="100%" 
      bg="black"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setState(prev => ({ ...prev, showControls: true }))}
       className={state.isFullscreen ? 'fullscreen-container' : ''}
    >
       <Box position="relative" width="100%" height="100%" className="video-container">   
      <video
        ref={videoRef}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          backgroundColor: 'black',
          cursor: state.showControls ? 'default' : 'none'
        }}
        onClick={controls.togglePlay}
        onContextMenu={(e) => e.preventDefault()}
        controlsList="nodownload"
      />

       {watermark && (
          <Box 
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            overflow="hidden"
            pointerEvents="none"
            className="watermark-container"
          >
            <i className="watermark">{watermark}</i>
          </Box>
        )}


      {(state.isLoading || state.isSeeking) && (
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
          <Spinner size="xl" color="white" />
        </Box>
      )}

      {state.error && (
        <Text position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" color="red">
          {state.error}
        </Text>
      )}

      {watermark && (
        <Text position="absolute" top={2} left={2} color="white">
          {watermark}
        </Text>
      )}
        {/* <i className="watermark">{watermark}</i> */}

      <Box
        position="absolute"
        bottom={0}
        width="100%"
        p={4}
        background="rgba(0,0,0,0.8)"
        style={{
          boxShadow: 'inset 0 -10px 20px -10px rgba(0,0,0,0.5), inset 0 10px 20px -10px rgba(0,0,0,0.5)',
          opacity: state.showControls ? 1 : 0,
          visibility: state.showControls ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease, visibility 0.3s ease'
        }}
      >
       

        <input
          type="range"
          value={state.currentTime}
          max={state.duration || 0}
          onChange={(e) => controls.handleSeek(Number(e.target.value))}
          style={{
            width: '100%',
            height: '4px',
            appearance: 'none',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '2px',
            cursor: 'pointer',
            marginBottom: '1rem'
          }}
        />

        <Box width="100%" display="flex" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <IconButton
              onClick={controls.togglePlay}
              variant="ghost"
              color="white"
              aria-label="play/pause"
            >
              {state.isPlaying ? <FaPause /> : <FaPlay />}
            </IconButton>

            <Box display="flex" alignItems="center" gap={2}>
              <IconButton
                onClick={controls.toggleMute}
                variant="ghost"
                color="white"
                aria-label="volume"
              >
                {state.volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
              </IconButton>
              <input
                type="range"
                value={state.volume}
                min={0}
                max={1}
                step={0.1}
                onChange={(e) => controls.handleVolume(Number(e.target.value))}
                style={{
                  width: '100px',
                  height: '4px',
                  appearance: 'none',
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '2px',
                  cursor: 'pointer'
                }}
              />
            </Box>

            <Text color="white">
              {formatTime(state.currentTime)} / {formatTime(state.duration)}
            </Text>
          </Box>

          <Box>
            <IconButton
              onClick={controls.changePlaybackRate}
              variant="ghost"
              color="white"
              aria-label="playback speed"
            >
              <FaFastForward />
              {state.playbackRate}x
            </IconButton>
            <IconButton
              onClick={controls.toggleFullscreen}
              variant="ghost"
              color="white"
              aria-label="fullscreen"
            >
              {state.isFullscreen ? <FaCompress /> : <FaExpand />}
            </IconButton>
          </Box>
        </Box>
      </Box>
      </Box>
    </Box>
  );
}