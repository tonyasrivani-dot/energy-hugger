import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IndianRupee } from "lucide-react";

interface CostCalculatorProps {
  dailyConsumption: number;
  weeklyConsumption: number;
  monthlyConsumption: number;
  ratePerUnit: number;
}

const CostCalculator = ({ 
  dailyConsumption, 
  weeklyConsumption, 
  monthlyConsumption, 
  ratePerUnit 
}: CostCalculatorProps) => {
  const dailyCost = dailyConsumption * ratePerUnit;
  const weeklyCost = weeklyConsumption * ratePerUnit;
  const monthlyCost = monthlyConsumption * ratePerUnit;

  // Calculate slab-based billing (Indian electricity slabs example)
  const calculateSlabBilling = (units: number) => {
    let total = 0;
    if (units <= 100) {
      total = units * 3.5;
    } else if (units <= 200) {
      total = 100 * 3.5 + (units - 100) * 4.5;
    } else if (units <= 500) {
      total = 100 * 3.5 + 100 * 4.5 + (units - 200) * 6.5;
    } else {
      total = 100 * 3.5 + 100 * 4.5 + 300 * 6.5 + (units - 500) * 8.5;
    }
    return total;
  };

  const slabBasedCost = calculateSlabBilling(monthlyConsumption);
  const fixedCharges = 50;
  const totalBill = slabBasedCost + fixedCharges;

  return (
    <Card className="shadow-energy">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-primary" />
          Bill Estimation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-lg bg-secondary/50">
            <p className="text-xs text-muted-foreground mb-1">Today</p>
            <p className="font-bold text-foreground">₹{dailyCost.toFixed(2)}</p>
          </div>
          <div className="p-3 rounded-lg bg-secondary/50">
            <p className="text-xs text-muted-foreground mb-1">This Week</p>
            <p className="font-bold text-foreground">₹{weeklyCost.toFixed(2)}</p>
          </div>
          <div className="p-3 rounded-lg bg-secondary/50">
            <p className="text-xs text-muted-foreground mb-1">This Month</p>
            <p className="font-bold text-foreground">₹{monthlyCost.toFixed(2)}</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h4 className="font-medium text-foreground">Monthly Bill Breakdown</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Energy Charges (Slab-based)</span>
              <span className="text-foreground">₹{slabBasedCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Fixed Charges</span>
              <span className="text-foreground">₹{fixedCharges.toFixed(2)}</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <span className="text-foreground">Estimated Total</span>
              <span className="text-primary">₹{totalBill.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
          <strong>Slab Rates:</strong> 0-100 units: ₹3.5/unit | 101-200: ₹4.5/unit | 201-500: ₹6.5/unit | 500+: ₹8.5/unit
        </div>
      </CardContent>
    </Card>
  );
};

export default CostCalculator;
