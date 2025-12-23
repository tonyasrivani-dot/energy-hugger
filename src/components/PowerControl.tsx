import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Power, PowerOff, Zap, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PowerControlProps {
  hasFluctuation?: boolean;
}

const PowerControl = ({ hasFluctuation = false }: PowerControlProps) => {
  const { toast } = useToast();
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<boolean | null>(null);

  const handlePowerToggle = (newState: boolean) => {
    setPendingAction(newState);
    setShowConfirmDialog(true);
  };

  const confirmPowerChange = async () => {
    if (pendingAction === null) return;
    
    setIsLoading(true);
    setShowConfirmDialog(false);
    
    // Simulate API call to smart meter
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsPowerOn(pendingAction);
    setIsLoading(false);
    
    toast({
      title: pendingAction ? "⚡ Power Restored" : "🔌 Power Disconnected",
      description: pendingAction 
        ? "Current flow has been enabled. Your devices are now receiving power."
        : "Current flow has been stopped. All connected devices are now off.",
      variant: pendingAction ? "default" : "destructive",
    });
  };

  const handleEmergencyShutdown = async () => {
    setIsLoading(true);
    
    // Simulate emergency shutdown
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsPowerOn(false);
    setIsLoading(false);
    
    toast({
      title: "🚨 Emergency Shutdown Complete",
      description: "All power has been immediately cut off for safety.",
      variant: "destructive",
    });
  };

  return (
    <>
      <Card className={`card-energy ${!isPowerOn ? 'border-destructive/50 bg-destructive/5' : ''}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isPowerOn ? (
                <Power className="w-5 h-5 text-success" />
              ) : (
                <PowerOff className="w-5 h-5 text-destructive" />
              )}
              <CardTitle>Power Control</CardTitle>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              isPowerOn 
                ? 'bg-success/20 text-success' 
                : 'bg-destructive/20 text-destructive'
            }`}>
              {isPowerOn ? 'ACTIVE' : 'OFF'}
            </div>
          </div>
          <CardDescription>
            Control the flow of electricity to your home
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Main Power Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border/50">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${isPowerOn ? 'bg-success/20' : 'bg-muted'}`}>
                <Zap className={`w-6 h-6 ${isPowerOn ? 'text-success' : 'text-muted-foreground'}`} />
              </div>
              <div>
                <p className="font-semibold text-foreground">Main Power Supply</p>
                <p className="text-sm text-muted-foreground">
                  {isPowerOn ? 'Current is flowing to your devices' : 'Power supply is disconnected'}
                </p>
              </div>
            </div>
            <Switch
              checked={isPowerOn}
              onCheckedChange={handlePowerToggle}
              disabled={isLoading}
              className="data-[state=checked]:bg-success"
            />
          </div>

          {/* Status Indicator */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-background/50 border border-border/30 text-center">
              <p className="text-2xl font-bold text-foreground">
                {isPowerOn ? '220V' : '0V'}
              </p>
              <p className="text-xs text-muted-foreground">Voltage</p>
            </div>
            <div className="p-3 rounded-lg bg-background/50 border border-border/30 text-center">
              <p className="text-2xl font-bold text-foreground">
                {isPowerOn ? 'Connected' : 'Disconnected'}
              </p>
              <p className="text-xs text-muted-foreground">Status</p>
            </div>
          </div>

          {/* Emergency Shutdown Button */}
          {isPowerOn && (
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleEmergencyShutdown}
              disabled={isLoading}
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              {isLoading ? 'Processing...' : 'Emergency Shutdown'}
            </Button>
          )}

          {/* Fluctuation Warning */}
          {hasFluctuation && isPowerOn && (
            <div className="p-3 rounded-lg bg-warning/10 border border-warning/30 flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-warning">Fluctuation Detected</p>
                <p className="text-sm text-muted-foreground">
                  Consider turning off power to protect your devices.
                </p>
              </div>
            </div>
          )}

          {!isPowerOn && (
            <p className="text-center text-sm text-muted-foreground">
              Turn on the power supply to resume electricity flow
            </p>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingAction ? '⚡ Enable Power Supply?' : '🔌 Disable Power Supply?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingAction 
                ? 'This will restore electricity flow to all connected devices in your home.'
                : 'This will cut off electricity to all connected devices. Make sure to save any work on electronic devices before proceeding.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmPowerChange}
              className={pendingAction ? '' : 'bg-destructive hover:bg-destructive/90'}
            >
              {pendingAction ? 'Enable Power' : 'Disable Power'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PowerControl;
