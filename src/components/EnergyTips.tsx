import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, ThermometerSun, Tv, WashingMachine, Fan } from "lucide-react";

const tips = [
  {
    icon: Lightbulb,
    title: "Switch to LED Bulbs",
    description: "LED bulbs use 75% less energy than incandescent lighting and last 25 times longer.",
  },
  {
    icon: ThermometerSun,
    title: "Optimize AC Temperature",
    description: "Set your AC to 24°C instead of 20°C. Each degree can save 3-5% on cooling costs.",
  },
  {
    icon: Tv,
    title: "Unplug Standby Devices",
    description: "Devices on standby can account for 5-10% of your electricity bill. Use power strips.",
  },
  {
    icon: WashingMachine,
    title: "Wash Full Loads",
    description: "Run washing machines and dishwashers only when full. Use cold water when possible.",
  },
  {
    icon: Fan,
    title: "Use Ceiling Fans",
    description: "Ceiling fans use only 1/10th the energy of AC units. Use them to circulate cool air.",
  },
];

const EnergyTips = () => {
  return (
    <Card className="shadow-energy">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-xl">💡</span>
          Energy Saving Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div 
              key={index} 
              className="flex gap-4 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <tip.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{tip.title}</h4>
                <p className="text-sm text-muted-foreground">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyTips;
