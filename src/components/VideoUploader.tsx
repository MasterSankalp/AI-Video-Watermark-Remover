
import React, { useCallback, useState } from 'react';
import { Cloud, FileVideo, FileX, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface VideoUploaderProps {
  onVideoUploaded: (file: File) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onVideoUploaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    processFile(file);
  }, []);
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  }, []);
  
  const processFile = (file: File) => {
    if (!file) return;
    
    // Check if file is a video
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate upload progress
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          onVideoUploaded(file);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };
  
  return (
    <div className="w-full max-w-xl mx-auto mt-8">
      <div 
        className={`drop-zone glass-card ${isDragging ? 'active' : ''} flex flex-col items-center justify-center gap-4 animate-scale-in`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div className="w-full flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Cloud className="h-8 w-8 text-primary animate-pulse" />
            </div>
            <h3 className="text-lg font-medium">Uploading video...</h3>
            <Progress value={uploadProgress} className="w-full max-w-md" />
          </div>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center animate-fade-in">
              <FileVideo className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="text-center space-y-2 animate-fade-in">
              <h3 className="text-lg font-medium">Drag and drop your video</h3>
              <p className="text-muted-foreground text-sm">Or click to browse files</p>
            </div>
            <input 
              type="file" 
              accept="video/*" 
              className="hidden" 
              id="video-upload" 
              onChange={handleFileChange} 
            />
            <label htmlFor="video-upload">
              <Button variant="outline" className="gap-2 animate-fade-in">
                <Upload className="h-4 w-4" />
                <span>Select Video</span>
              </Button>
            </label>
          </>
        )}
      </div>
      
      <div className="mt-4 text-center text-sm text-muted-foreground animate-fade-in">
        <p>Supported formats: MP4, WebM, MOV, AVI</p>
      </div>
    </div>
  );
};

export default VideoUploader;
