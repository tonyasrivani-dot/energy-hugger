import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IndianRupee, MapPin } from "lucide-react";

interface CostCalculatorProps {
  dailyConsumption: number;
  weeklyConsumption: number;
  monthlyConsumption: number;
  ratePerUnit: number;
  userState?: string;
}

// State-wise electricity tariff slabs (approximate rates in INR)
const STATE_TARIFFS: Record<string, { slabs: { limit: number; rate: number }[]; fixedCharge: number; stateName: string }> = {
  AP: { stateName: "Andhra Pradesh", fixedCharge: 35, slabs: [{ limit: 50, rate: 1.45 }, { limit: 100, rate: 2.60 }, { limit: 200, rate: 3.60 }, { limit: 500, rate: 5.50 }, { limit: Infinity, rate: 7.50 }] },
  AR: { stateName: "Arunachal Pradesh", fixedCharge: 30, slabs: [{ limit: 100, rate: 2.50 }, { limit: 200, rate: 3.50 }, { limit: 500, rate: 5.00 }, { limit: Infinity, rate: 6.50 }] },
  AS: { stateName: "Assam", fixedCharge: 40, slabs: [{ limit: 100, rate: 4.00 }, { limit: 200, rate: 5.00 }, { limit: 500, rate: 6.00 }, { limit: Infinity, rate: 7.00 }] },
  BR: { stateName: "Bihar", fixedCharge: 50, slabs: [{ limit: 100, rate: 3.75 }, { limit: 200, rate: 4.75 }, { limit: 500, rate: 6.00 }, { limit: Infinity, rate: 7.50 }] },
  CG: { stateName: "Chhattisgarh", fixedCharge: 45, slabs: [{ limit: 100, rate: 3.00 }, { limit: 200, rate: 4.00 }, { limit: 500, rate: 5.50 }, { limit: Infinity, rate: 7.00 }] },
  DL: { stateName: "Delhi", fixedCharge: 25, slabs: [{ limit: 200, rate: 3.00 }, { limit: 400, rate: 4.50 }, { limit: 800, rate: 6.50 }, { limit: Infinity, rate: 8.00 }] },
  GA: { stateName: "Goa", fixedCharge: 30, slabs: [{ limit: 100, rate: 1.50 }, { limit: 200, rate: 2.50 }, { limit: 400, rate: 3.60 }, { limit: Infinity, rate: 5.00 }] },
  GJ: { stateName: "Gujarat", fixedCharge: 40, slabs: [{ limit: 50, rate: 3.05 }, { limit: 100, rate: 3.50 }, { limit: 250, rate: 4.15 }, { limit: 500, rate: 5.20 }, { limit: Infinity, rate: 5.70 }] },
  HR: { stateName: "Haryana", fixedCharge: 50, slabs: [{ limit: 50, rate: 2.00 }, { limit: 150, rate: 4.50 }, { limit: 250, rate: 6.00 }, { limit: 500, rate: 7.00 }, { limit: Infinity, rate: 7.50 }] },
  HP: { stateName: "Himachal Pradesh", fixedCharge: 35, slabs: [{ limit: 125, rate: 3.35 }, { limit: 300, rate: 4.00 }, { limit: 500, rate: 5.00 }, { limit: Infinity, rate: 5.50 }] },
  JH: { stateName: "Jharkhand", fixedCharge: 45, slabs: [{ limit: 100, rate: 3.50 }, { limit: 200, rate: 4.50 }, { limit: 500, rate: 6.00 }, { limit: Infinity, rate: 7.00 }] },
  KA: { stateName: "Karnataka", fixedCharge: 40, slabs: [{ limit: 50, rate: 3.75 }, { limit: 100, rate: 5.00 }, { limit: 200, rate: 6.25 }, { limit: 500, rate: 7.50 }, { limit: Infinity, rate: 8.50 }] },
  KL: { stateName: "Kerala", fixedCharge: 45, slabs: [{ limit: 50, rate: 3.15 }, { limit: 100, rate: 3.70 }, { limit: 150, rate: 4.80 }, { limit: 200, rate: 6.40 }, { limit: 500, rate: 7.60 }, { limit: Infinity, rate: 8.50 }] },
  MP: { stateName: "Madhya Pradesh", fixedCharge: 55, slabs: [{ limit: 50, rate: 3.68 }, { limit: 150, rate: 5.05 }, { limit: 300, rate: 6.10 }, { limit: 500, rate: 7.05 }, { limit: Infinity, rate: 7.95 }] },
  MH: { stateName: "Maharashtra", fixedCharge: 60, slabs: [{ limit: 100, rate: 3.88 }, { limit: 300, rate: 7.88 }, { limit: 500, rate: 10.00 }, { limit: Infinity, rate: 11.69 }] },
  MN: { stateName: "Manipur", fixedCharge: 35, slabs: [{ limit: 100, rate: 3.50 }, { limit: 200, rate: 4.50 }, { limit: 500, rate: 5.50 }, { limit: Infinity, rate: 6.50 }] },
  ML: { stateName: "Meghalaya", fixedCharge: 30, slabs: [{ limit: 100, rate: 3.00 }, { limit: 200, rate: 4.00 }, { limit: 500, rate: 5.00 }, { limit: Infinity, rate: 6.00 }] },
  MZ: { stateName: "Mizoram", fixedCharge: 30, slabs: [{ limit: 100, rate: 3.50 }, { limit: 200, rate: 4.50 }, { limit: 500, rate: 5.50 }, { limit: Infinity, rate: 6.50 }] },
  NL: { stateName: "Nagaland", fixedCharge: 35, slabs: [{ limit: 100, rate: 3.50 }, { limit: 200, rate: 4.50 }, { limit: 500, rate: 5.50 }, { limit: Infinity, rate: 6.50 }] },
  OD: { stateName: "Odisha", fixedCharge: 40, slabs: [{ limit: 50, rate: 3.00 }, { limit: 200, rate: 4.80 }, { limit: 400, rate: 5.80 }, { limit: Infinity, rate: 6.20 }] },
  PB: { stateName: "Punjab", fixedCharge: 45, slabs: [{ limit: 100, rate: 4.25 }, { limit: 300, rate: 5.80 }, { limit: 500, rate: 6.60 }, { limit: Infinity, rate: 7.10 }] },
  RJ: { stateName: "Rajasthan", fixedCharge: 50, slabs: [{ limit: 50, rate: 4.20 }, { limit: 150, rate: 5.95 }, { limit: 300, rate: 6.50 }, { limit: 500, rate: 7.00 }, { limit: Infinity, rate: 7.50 }] },
  SK: { stateName: "Sikkim", fixedCharge: 25, slabs: [{ limit: 100, rate: 2.50 }, { limit: 200, rate: 3.50 }, { limit: 500, rate: 4.50 }, { limit: Infinity, rate: 5.50 }] },
  TN: { stateName: "Tamil Nadu", fixedCharge: 35, slabs: [{ limit: 100, rate: 2.50 }, { limit: 200, rate: 3.50 }, { limit: 500, rate: 5.50 }, { limit: Infinity, rate: 7.00 }] },
  TS: { stateName: "Telangana", fixedCharge: 40, slabs: [{ limit: 50, rate: 1.45 }, { limit: 100, rate: 2.60 }, { limit: 200, rate: 3.60 }, { limit: 500, rate: 5.50 }, { limit: Infinity, rate: 7.50 }] },
  TR: { stateName: "Tripura", fixedCharge: 30, slabs: [{ limit: 100, rate: 3.00 }, { limit: 200, rate: 4.00 }, { limit: 500, rate: 5.00 }, { limit: Infinity, rate: 6.00 }] },
  UP: { stateName: "Uttar Pradesh", fixedCharge: 55, slabs: [{ limit: 100, rate: 3.50 }, { limit: 150, rate: 4.00 }, { limit: 300, rate: 5.00 }, { limit: 500, rate: 5.50 }, { limit: Infinity, rate: 6.00 }] },
  UK: { stateName: "Uttarakhand", fixedCharge: 40, slabs: [{ limit: 100, rate: 3.00 }, { limit: 200, rate: 4.00 }, { limit: 400, rate: 5.00 }, { limit: Infinity, rate: 5.50 }] },
  WB: { stateName: "West Bengal", fixedCharge: 45, slabs: [{ limit: 102, rate: 5.37 }, { limit: 180, rate: 6.28 }, { limit: 300, rate: 6.93 }, { limit: 600, rate: 8.26 }, { limit: Infinity, rate: 9.53 }] }
};

// Default tariff if state not found
const DEFAULT_TARIFF = {
  stateName: "Default",
  fixedCharge: 50,
  slabs: [
    { limit: 100, rate: 3.5 },
    { limit: 200, rate: 4.5 },
    { limit: 500, rate: 6.5 },
    { limit: Infinity, rate: 8.5 }
  ]
};

const CostCalculator = ({ 
  dailyConsumption, 
  weeklyConsumption, 
  monthlyConsumption, 
  ratePerUnit,
  userState = ""
}: CostCalculatorProps) => {
  const tariff = STATE_TARIFFS[userState] || DEFAULT_TARIFF;
  
  const dailyCost = dailyConsumption * ratePerUnit;
  const weeklyCost = weeklyConsumption * ratePerUnit;
  const monthlyCost = monthlyConsumption * ratePerUnit;

  // Calculate slab-based billing based on state
  const calculateSlabBilling = (units: number) => {
    let total = 0;
    let remainingUnits = units;
    let prevLimit = 0;

    for (const slab of tariff.slabs) {
      const unitsInSlab = Math.min(remainingUnits, slab.limit - prevLimit);
      if (unitsInSlab > 0) {
        total += unitsInSlab * slab.rate;
        remainingUnits -= unitsInSlab;
      }
      prevLimit = slab.limit;
      if (remainingUnits <= 0) break;
    }

    return total;
  };

  const slabBasedCost = calculateSlabBilling(monthlyConsumption);
  const fixedCharges = tariff.fixedCharge;
  const totalBill = slabBasedCost + fixedCharges;

  // Format slabs for display
  const formatSlabs = () => {
    let prevLimit = 0;
    return tariff.slabs.map((slab, index) => {
      const label = slab.limit === Infinity 
        ? `${prevLimit}+ units` 
        : `${prevLimit + 1}-${slab.limit} units`;
      prevLimit = slab.limit;
      return `${label}: ₹${slab.rate}/unit`;
    }).join(" | ");
  };

  return (
    <Card className="shadow-energy">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-primary" />
          Bill Estimation
          {userState && (
            <span className="ml-auto flex items-center gap-1 text-sm font-normal text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {tariff.stateName}
            </span>
          )}
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
          <strong>{tariff.stateName} Slab Rates:</strong><br />
          {formatSlabs()}
        </div>
      </CardContent>
    </Card>
  );
};

export default CostCalculator;
