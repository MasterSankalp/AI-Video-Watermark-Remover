
import React, { useState, useEffect } from 'react';
import { CheckCircle, Loader2, Play, Trash2, Download } from 'lucide-react';
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
    
    // Simulate analysis
    const analyzeInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(analyzeInterval);
          setProcessStage('processing');
          simulateBackgroundRemoval();
          return 100;
        }
        return prev + 5;
      });
    }, 100);
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
            description: "Your video background has been removed successfully!",
          });
          return 100;
        }
        return prev + 2;
      });
    }, 100);
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
              <div className="relative w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                <Loader2 className="h-10 w-10 text-primary animate-spin" />
              </div>
            </div>
            
            <div className="text-center space-y-2 w-full max-w-xs">
              <h4 className="font-medium">{processStage === 'analyzing' ? 'Analyzing video...' : 'Removing background...'}</h4>
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-muted-foreground">This may take a few minutes depending on video length</p>
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
            <Button 
              variant="default" 
              className="gap-2" 
              onClick={downloadVideo}
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
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
