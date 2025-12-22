import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, TrendingDown, Zap, PartyPopper } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertBannerProps {
  type: "warning" | "success" | "danger" | "celebration";
  title: string;
  description: string;
}

const AlertBanner = ({ type, title, description }: AlertBannerProps) => {
  const config = {
    warning: {
      icon: AlertTriangle,
      bgClass: "bg-warning/10 border-warning",
      iconClass: "text-warning",
    },
    danger: {
      icon: Zap,
      bgClass: "bg-destructive/10 border-destructive",
      iconClass: "text-destructive",
    },
    success: {
      icon: TrendingDown,
      bgClass: "bg-success/10 border-success",
      iconClass: "text-success",
    },
    celebration: {
      icon: PartyPopper,
      bgClass: "bg-accent/10 border-accent",
      iconClass: "text-accent",
    },
  };

  const { icon: Icon, bgClass, iconClass } = config[type];

  return (
    <Alert className={cn("border-2 animate-pulse-glow", bgClass)}>
      <Icon className={cn("h-5 w-5", iconClass)} />
      <AlertTitle className="font-semibold">{title}</AlertTitle>
      <AlertDescription className="text-muted-foreground">{description}</AlertDescription>
    </Alert>
  );
};

export default AlertBanner;
