import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import clogo from "@/assets/clogo.png";

interface EnergyBadgeProps {
  monthlyConsumption: number;
}

type BadgeLevel = 'gold' | 'skyblue' | 'bronze' | 'grey' | 'warning' | 'danger';

interface BadgeInfo {
  level: BadgeLevel;
  name: string;
  description: string;
  ringColor: string;
  textColor: string;
}

const getBadgeInfo = (consumption: number): BadgeInfo => {
  if (consumption <= 100) {
    return {
      level: 'gold',
      name: 'Gold Energy Saver',
      description: 'Outstanding! You are an exemplary energy saver.',
      ringColor: 'ring-yellow-400 ring-offset-yellow-100',
      textColor: 'text-yellow-600',
    };
  } else if (consumption <= 200) {
    return {
      level: 'skyblue',
      name: 'Sky Blue Efficient',
      description: 'Great job! Your consumption is well managed.',
      ringColor: 'ring-sky-400 ring-offset-sky-100',
      textColor: 'text-sky-600',
    };
  } else if (consumption <= 300) {
    return {
      level: 'bronze',
      name: 'Bronze Conscious',
      description: 'Good effort! Room for improvement.',
      ringColor: 'ring-orange-400 ring-offset-orange-100',
      textColor: 'text-orange-600',
    };
  } else if (consumption <= 400) {
    return {
      level: 'grey',
      name: 'Grey Average',
      description: 'Average consumption. Consider reducing usage.',
      ringColor: 'ring-gray-400 ring-offset-gray-100',
      textColor: 'text-gray-600',
    };
  } else if (consumption <= 500) {
    return {
      level: 'warning',
      name: 'Orange Warning',
      description: 'High consumption! Take action to reduce.',
      ringColor: 'ring-orange-500 ring-offset-orange-200',
      textColor: 'text-orange-700',
    };
  } else {
    return {
      level: 'danger',
      name: 'Red Danger',
      description: 'Critical! Immediate action required to reduce consumption.',
      ringColor: 'ring-red-500 ring-offset-red-100',
      textColor: 'text-red-600',
    };
  }
};

const EnergyBadge = ({ monthlyConsumption }: EnergyBadgeProps) => {
  const badge = getBadgeInfo(monthlyConsumption);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          Your Energy Badge
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-4">
          {/* Badge Display with Logo */}
          <div 
            className={`relative w-32 h-32 rounded-full ring-8 ring-offset-4 ${badge.ringColor} flex items-center justify-center shadow-lg overflow-hidden bg-background`}
          >
            <img 
              src={clogo} 
              alt="Home Energy Tracker" 
              className="w-28 h-28 object-contain"
            />
          </div>

          {/* Badge Info */}
          <div className="text-center space-y-2">
            <h3 className={`text-xl font-bold ${badge.textColor}`}>
              {badge.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {badge.description}
            </p>
            <p className="text-xs text-muted-foreground">
              Monthly Consumption: <span className="font-semibold">{monthlyConsumption.toFixed(1)} kWh</span>
            </p>
          </div>

          {/* Badge Levels Guide */}
          <div className="w-full mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center mb-3">Badge Levels</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              <div className="flex flex-col items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-yellow-400 ring-2 ring-yellow-500" />
                <span className="text-[10px] text-muted-foreground">Gold</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-sky-400 ring-2 ring-sky-500" />
                <span className="text-[10px] text-muted-foreground">Sky Blue</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-orange-400 ring-2 ring-orange-500" />
                <span className="text-[10px] text-muted-foreground">Bronze</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-gray-400 ring-2 ring-gray-500" />
                <span className="text-[10px] text-muted-foreground">Grey</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-orange-500 ring-2 ring-orange-600" />
                <span className="text-[10px] text-muted-foreground">Warning</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-6 h-6 rounded-full bg-red-500 ring-2 ring-red-600" />
                <span className="text-[10px] text-muted-foreground">Danger</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyBadge;
