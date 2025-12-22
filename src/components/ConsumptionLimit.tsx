import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConsumptionLimitProps {
  currentConsumption: number;
  limit: number;
  onSetLimit: (limit: number) => void;
}

const ConsumptionLimit = ({ currentConsumption, limit, onSetLimit }: ConsumptionLimitProps) => {
  const [inputLimit, setInputLimit] = useState(limit.toString());
  const { toast } = useToast();
  
  const percentage = limit > 0 ? Math.min((currentConsumption / limit) * 100, 100) : 0;
  
  const getProgressColor = () => {
    if (percentage >= 90) return "bg-destructive";
    if (percentage >= 70) return "bg-warning";
    return "bg-success";
  };

  const handleSetLimit = () => {
    const newLimit = parseFloat(inputLimit);
    if (isNaN(newLimit) || newLimit <= 0) {
      toast({
        title: "Invalid limit",
        description: "Please enter a valid positive number",
        variant: "destructive",
      });
      return;
    }
    onSetLimit(newLimit);
    toast({
      title: "Limit Updated",
      description: `Daily consumption limit set to ${newLimit} kWh`,
    });
  };

  return (
    <Card className="shadow-energy">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Set Consumption Limit
        </CardTitle>
        <p className="text-sm text-muted-foreground">Configure your daily energy consumption threshold</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Enter limit in kWh"
            value={inputLimit}
            onChange={(e) => setInputLimit(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSetLimit}>Set Limit</Button>
        </div>

        {limit > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Current Progress</span>
              <span className="font-medium text-foreground">{currentConsumption.toFixed(2)} / {limit} kWh</span>
            </div>
            <div className="relative">
              <Progress value={percentage} className="h-3" />
              <div 
                className={`absolute top-0 left-0 h-3 rounded-full transition-all ${getProgressColor()}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className={`text-xs ${percentage >= 90 ? 'text-destructive' : percentage >= 70 ? 'text-warning' : 'text-success'}`}>
              {percentage >= 90 
                ? "⚠️ Warning: You're close to exceeding your daily limit!" 
                : percentage >= 70 
                  ? "📊 You've used 70% of your daily limit" 
                  : "✅ You're well within your daily limit"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConsumptionLimit;
