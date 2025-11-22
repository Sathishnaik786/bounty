import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import { generatePayload } from '../utils/generatePayload';
import { Button } from '../components/ui/Button';
import { Home } from 'lucide-react';

export default function Result() {
  const navigate = useNavigate();
  const { formData, resetForm } = useFormContext();

  const payload = generatePayload(formData);

  const handleCreateAnother = () => {
    resetForm();
    navigate('/step/1');
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-3">Bounty Details</h1>
          <p className="text-muted-foreground">
            Here's the complete data for your created bounty
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-accent p-6">
            <h2 className="text-xl font-semibold text-white">Generated Payload</h2>
          </div>

          <div className="p-6">
            <pre className="bg-muted rounded-lg p-6 overflow-auto text-sm leading-relaxed">
              <code className="text-foreground">
                {JSON.stringify(payload, null, 2)}
              </code>
            </pre>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Button variant="outline" onClick={handleCreateAnother} size="lg">
            <Home className="w-4 h-4 mr-2" />
            Create Another Bounty
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-primary">{formData.step2.reward.winners}</span>
            </div>
            <p className="text-sm font-medium text-foreground">Winners</p>
            <p className="text-xs text-muted-foreground mt-1">Selected</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-lg font-bold text-accent">
                {formData.step2.reward.currency}
              </span>
            </div>
            <p className="text-sm font-medium text-foreground">
              {formData.step2.reward.amount}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Total Reward</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-success">{formData.step2.sdgs.length}</span>
            </div>
            <p className="text-sm font-medium text-foreground">SDGs</p>
            <p className="text-xs text-muted-foreground mt-1">Aligned</p>
          </div>
        </div>
      </div>
    </div>
  );
}
