
import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between animate-fade-in">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-sm">AI</span>
        </div>
        <h1 className="text-lg font-semibold gradient-text">VideoFX</h1>
      </div>
      
      <Button variant="outline" size="icon" className="rounded-lg">
        <Settings className="h-4 w-4" />
      </Button>
    </header>
  );
};

export default Header;
