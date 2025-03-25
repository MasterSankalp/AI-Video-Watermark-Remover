
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="glass-card rounded-xl p-8 max-w-md w-full text-center space-y-6 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto">
          <span className="text-6xl font-bold gradient-text">404</span>
        </div>
        
        <h1 className="text-2xl font-bold">Page Not Found</h1>
        
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button asChild variant="default" className="gap-2">
          <a href="/">
            <MoveLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
