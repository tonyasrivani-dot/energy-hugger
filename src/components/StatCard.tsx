import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  subtitle: string;
  value: string;
  icon: LucideIcon;
  variant?: "default" | "warning" | "success" | "purple";
  className?: string;
}

const StatCard = ({ title, subtitle, value, icon: Icon, variant = "default", className }: StatCardProps) => {
  const variantClasses = {
    default: "text-primary",
    warning: "text-warning",
    success: "text-success",
    purple: "text-energy-purple",
  };

  return (
    <Card className={cn("stat-card-gradient hover:shadow-energy transition-all duration-300", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Icon className={cn("w-5 h-5", variantClasses[variant])} />
          <CardTitle className="text-sm font-medium text-foreground">{title}</CardTitle>
        </div>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent>
        <p className={cn("text-3xl font-bold", variantClasses[variant])}>{value}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
