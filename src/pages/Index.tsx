
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VideoUploader from '@/components/VideoUploader';
import VideoProcessor from '@/components/VideoProcessor';

const Index = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  
  const handleFileUploaded = (file: File) => {
    setVideoFile(file);
  };
  
  const handleReset = () => {
    setVideoFile(null);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container px-4 py-8 mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            AI Video Background Remover
          </h1>
          <p className="text-muted-foreground">
            Effortlessly remove backgrounds from your videos with our advanced AI technology. Upload your video to get started.
          </p>
        </div>
        
        {!videoFile ? (
          <VideoUploader onVideoUploaded={handleFileUploaded} />
        ) : (
          <VideoProcessor videoFile={videoFile} onReset={handleReset} />
        )}
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="glass-card rounded-xl p-6 text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Easy to Use</h3>
            <p className="text-sm text-muted-foreground">Simply upload your video and our AI will do the rest for you.</p>
          </div>
          
          <div className="glass-card rounded-xl p-6 text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"></circle><path d="m4.9 4.9 14.2 14.2"></path><path d="M9 9.5V9a3 3 0 0 1 6 0v.5"></path><path d="M7.5 13.5h9"></path><path d="M7.5 10.5h9"></path></svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Background Removal</h3>
            <p className="text-sm text-muted-foreground">Advanced AI identifies and removes backgrounds with precision.</p>
          </div>
          
          <div className="glass-card rounded-xl p-6 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path><path d="M12 12v9"></path><path d="m16 16-4 4-4-4"></path></svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Fast Download</h3>
            <p className="text-sm text-muted-foreground">Download your processed videos instantly in high quality.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
