import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function Confirmation() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/result');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-6">
          <CheckCircle className="w-12 h-12 text-success" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">Bounty Created Successfully!</h1>
        <p className="text-muted-foreground mb-6">
          Your bounty has been submitted. Redirecting to results...
        </p>
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-75" />
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-150" />
        </div>
      </div>
    </div>
  );
}
