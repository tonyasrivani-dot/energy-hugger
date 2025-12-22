import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

interface EnergyChartProps {
  dailyData: { name: string; consumption: number; cost: number }[];
  weeklyData: { name: string; consumption: number; cost: number }[];
  monthlyData: { name: string; consumption: number; cost: number }[];
}

const EnergyChart = ({ dailyData, weeklyData, monthlyData }: EnergyChartProps) => {
  return (
    <Card className="shadow-energy">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-xl">📊</span>
          Energy Consumption Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyData}>
                  <defs>
                    <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(200, 85%, 45%)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(200, 85%, 45%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px" 
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="hsl(200, 85%, 45%)" 
                    fillOpacity={1} 
                    fill="url(#colorConsumption)" 
                    name="kWh"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="weekly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px" 
                    }} 
                  />
                  <Legend />
                  <Bar dataKey="consumption" fill="hsl(200, 85%, 45%)" name="kWh" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cost" fill="hsl(160, 70%, 45%)" name="Cost (₹)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="monthly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorMonthly" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(160, 70%, 45%)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(160, 70%, 45%)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px" 
                    }} 
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="hsl(160, 70%, 45%)" 
                    fillOpacity={1} 
                    fill="url(#colorMonthly)" 
                    name="kWh"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnergyChart;
