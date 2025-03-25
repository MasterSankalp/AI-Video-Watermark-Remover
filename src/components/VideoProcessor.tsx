
import React, { useState, useEffect } from 'react';
import { CheckCircle, Play, Trash2, Download, Crosshair } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

interface VideoProcessorProps {
  videoFile: File | null;
  onReset: () => void;
}

const VideoProcessor: React.FC<VideoProcessorProps> = ({ videoFile, onReset }) => {
  const [processStage, setProcessStage] = useState<'analyzing' | 'processing' | 'completed'>('analyzing');
  const [progress, setProgress] = useState(0);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null);
  const [watermarksFound, setWatermarksFound] = useState(0);
  
  useEffect(() => {
    if (!videoFile) return;
    
    // Create a URL for the original video
    const url = URL.createObjectURL(videoFile);
    setVideoUrl(url);
    
    // Simulate video processing
    simulateProcessing();
    
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
      if (processedVideoUrl) URL.revokeObjectURL(processedVideoUrl);
    };
  }, [videoFile]);
  
  const simulateProcessing = () => {
    setProcessStage('analyzing');
    setProgress(0);
    
    // Simulate analysis - looking for watermarks
    const analyzeInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(analyzeInterval);
          // Simulate finding watermarks
          setWatermarksFound(Math.floor(Math.random() * 5) + 1);
          toast({
            title: "Analysis complete",
            description: `Found ${watermarksFound} potential watermarks in the video.`,
          });
          setProcessStage('processing');
          simulateBackgroundRemoval();
          return 100;
        }
        return prev + 2; // Slower progress for more realistic experience
      });
    }, 200);
  };
  
  const simulateBackgroundRemoval = () => {
    setProgress(0);
    
    // Simulate processing
    const processInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(processInterval);
          setProcessStage('completed');
          // Here we're simulating the processed video being the same as the original
          // In a real app, this would be the actually processed video
          if (videoUrl) setProcessedVideoUrl(videoUrl);
          toast({
            title: "Processing complete",
            description: "Your video background and watermarks have been removed successfully!",
          });
          return 100;
        }
        return prev + 1; // Even slower for more realistic processing time (about 1 minute)
      });
    }, 600);
  };
  
  const downloadVideo = () => {
    if (!processedVideoUrl) return;
    
    // Create download link
    const a = document.createElement('a');
    a.href = processedVideoUrl;
    a.download = `processed-${videoFile?.name || 'video.mp4'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Download started",
      description: "Your processed video is being downloaded.",
    });
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
      {/* Original Video */}
      <div className="glass-card rounded-xl p-4 space-y-4">
        <h3 className="text-lg font-medium">Original Video</h3>
        {videoUrl && (
          <div className="rounded-lg overflow-hidden aspect-video bg-muted">
            <video 
              src={videoUrl} 
              controls 
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
      
      {/* Processed Video or Processing Status */}
      <div className="glass-card rounded-xl p-4 space-y-4">
        <h3 className="text-lg font-medium">
          {processStage === 'completed' ? 'Processed Video' : 'Processing'}
        </h3>
        
        {processStage !== 'completed' ? (
          <div className="h-full flex flex-col items-center justify-center gap-6 py-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              {processStage === 'analyzing' ? (
                <div className="relative w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                  <Crosshair className="h-10 w-10 text-primary animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="loader"></div>
                  </div>
                </div>
              ) : (
                <div className="relative w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                  <div className="loader"></div>
                </div>
              )}
            </div>
            
            <div className="text-center space-y-2 w-full max-w-xs">
              <h4 className="font-medium">
                {processStage === 'analyzing' 
                  ? 'Analyzing video for watermarks...' 
                  : 'Removing background and watermarks...'}
              </h4>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                {processStage === 'analyzing'
                  ? 'Zooming and scanning for text, watermarks, and objects...'
                  : watermarksFound > 0 
                    ? `Removing ${watermarksFound} watermarks and background, this may take a minute...`
                    : 'Processing video frames, this may take a minute...'}
              </p>
            </div>
          </div>
        ) : (
          <>
            {processedVideoUrl && (
              <div className="rounded-lg overflow-hidden aspect-video bg-muted">
                <video 
                  src={processedVideoUrl} 
                  controls 
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Controls */}
      <div className="md:col-span-2 flex flex-wrap justify-center gap-4 mt-4">
        {processStage === 'completed' ? (
          <>
            <button 
              onClick={downloadVideo}
              className="download-button"
            >
              <svg
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                className="download-button__icon"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                <path d="M7 11l5 5l5 -5"></path>
                <path d="M12 4l0 12"></path>
              </svg>
              <span>Download</span>
            </button>
            <Button 
              variant="outline" 
              className="gap-2" 
              onClick={onReset}
            >
              <Trash2 className="h-4 w-4" />
              <span>Start Over</span>
            </Button>
          </>
        ) : (
          <Button 
            variant="outline" 
            className="gap-2" 
            onClick={onReset}
          >
            <Trash2 className="h-4 w-4" />
            <span>Cancel</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default VideoProcessor;
