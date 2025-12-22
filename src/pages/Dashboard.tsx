import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, TrendingUp, TrendingDown, Activity, LogOut, Settings } from "lucide-react";
import StatCard from "@/components/StatCard";
import AlertBanner from "@/components/AlertBanner";
import EnergyChart from "@/components/EnergyChart";
import EnergyTips from "@/components/EnergyTips";
import CostCalculator from "@/components/CostCalculator";
import ConsumptionLimit from "@/components/ConsumptionLimit";
import { useToast } from "@/hooks/use-toast";

// Simulated data - in production this would come from API
const generateDailyData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    name: `${i}:00`,
    consumption: Math.random() * 2 + 0.5,
    cost: (Math.random() * 2 + 0.5) * 6.5,
  }));
};

const generateWeeklyData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day) => ({
    name: day,
    consumption: Math.random() * 20 + 10,
    cost: (Math.random() * 20 + 10) * 6.5,
  }));
};

const generateMonthlyData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
    consumption: Math.random() * 300 + 200,
    cost: (Math.random() * 300 + 200) * 6.5,
  }));
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<{ userId: string; meterNumber: string; apiKey: string; state?: string } | null>(null);
  const [limit, setLimit] = useState(20);
  const [currentUsage, setCurrentUsage] = useState(9.64);
  const [dailyTotal, setDailyTotal] = useState(15.37);
  const [weeklyTotal, setWeeklyTotal] = useState(98.37);
  const [monthlyTotal, setMonthlyTotal] = useState(342.5);
  const [yesterdayUsage] = useState(16.8);
  
  const [dailyData] = useState(generateDailyData);
  const [weeklyData] = useState(generateWeeklyData);
  const [monthlyData] = useState(generateMonthlyData);

  useEffect(() => {
    const storedUser = localStorage.getItem("energyUser");
    if (!storedUser) {
      navigate("/auth");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUsage((prev) => {
        const newValue = prev + (Math.random() * 0.1);
        if (newValue >= limit * 0.9 && prev < limit * 0.9) {
          toast({
            title: "⚠️ High Consumption Alert",
            description: "You're approaching your daily limit!",
            variant: "destructive",
          });
        }
        return newValue;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [limit, toast]);

  const handleLogout = () => {
    localStorage.removeItem("energyUser");
    navigate("/");
  };

  const isLessThanYesterday = dailyTotal < yesterdayUsage;
  const hasFluctuation = Math.abs(currentUsage - (dailyTotal / 24)) > 1;
  const isOverLimit = currentUsage >= limit * 0.9;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-energy flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Energy Monitor</h1>
                <p className="text-xs text-muted-foreground">Track it, understand it, reduce it</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-foreground">{user.userId}</p>
                <p className="text-xs text-muted-foreground">Meter: {user.meterNumber}</p>
              </div>
              <Button variant="ghost" size="icon" title="Settings">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Alerts Section */}
        <div className="space-y-3">
          {isOverLimit && (
            <AlertBanner 
              type="danger" 
              title="High Consumption Warning!" 
              description={`Your current usage (${currentUsage.toFixed(2)} kWh) is approaching your daily limit of ${limit} kWh. Consider turning off non-essential appliances.`}
            />
          )}
          
          {hasFluctuation && (
            <AlertBanner 
              type="warning" 
              title="Unusual Fluctuation Detected" 
              description="We noticed unusual power consumption patterns. This might indicate a faulty appliance or equipment malfunction."
            />
          )}
          
          {isLessThanYesterday && !isOverLimit && (
            <AlertBanner 
              type="celebration" 
              title="🎉 Great Job!" 
              description={`You've consumed ${(yesterdayUsage - dailyTotal).toFixed(2)} kWh less than yesterday. Keep up the good work!`}
            />
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Current Usage"
            subtitle="Real-time consumption"
            value={`${currentUsage.toFixed(2)} kWh`}
            icon={Activity}
            variant="default"
          />
          <StatCard
            title="Daily Total"
            subtitle="Today's consumption"
            value={`${dailyTotal.toFixed(2)} kWh`}
            icon={TrendingUp}
            variant="warning"
          />
          <StatCard
            title="Weekly Total"
            subtitle="Last 7 days"
            value={`${weeklyTotal.toFixed(2)} kWh`}
            icon={TrendingDown}
            variant="purple"
          />
          <StatCard
            title="Monthly Total"
            subtitle="This month"
            value={`${monthlyTotal.toFixed(2)} kWh`}
            icon={Zap}
            variant="success"
          />
        </div>

        {/* Consumption Limit */}
        <ConsumptionLimit 
          currentConsumption={currentUsage} 
          limit={limit} 
          onSetLimit={setLimit}
        />

        {/* Charts */}
        <EnergyChart 
          dailyData={dailyData} 
          weeklyData={weeklyData} 
          monthlyData={monthlyData}
        />

        {/* Cost Calculator and Tips */}
        <div className="grid lg:grid-cols-2 gap-6">
          <CostCalculator
            dailyConsumption={dailyTotal}
            weeklyConsumption={weeklyTotal}
            monthlyConsumption={monthlyTotal}
            ratePerUnit={6.5}
            userState={user?.state}
          />
          <EnergyTips />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
