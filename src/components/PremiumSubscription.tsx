import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Check, Zap, TrendingUp, Bell, Shield, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Basic",
    price: "Free",
    period: "",
    description: "Essential energy monitoring",
    features: [
      { text: "Real-time consumption tracking", included: true },
      { text: "Daily/Weekly reports", included: true },
      { text: "Basic energy tips", included: true },
      { text: "Email alerts", included: false },
      { text: "Advanced analytics", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    name: "Premium",
    price: "₹299",
    period: "/month",
    description: "Advanced features for power users",
    features: [
      { text: "Real-time consumption tracking", included: true },
      { text: "Daily/Weekly/Monthly reports", included: true },
      { text: "AI-powered energy tips", included: true },
      { text: "Email & SMS alerts", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority support", included: false },
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "₹799",
    period: "/month",
    description: "Complete solution for businesses",
    features: [
      { text: "Everything in Premium", included: true },
      { text: "Multiple meter support", included: true },
      { text: "API access", included: true },
      { text: "Custom integrations", included: true },
      { text: "Dedicated support", included: true },
      { text: "SLA guarantee", included: true },
    ],
  },
];

const PremiumSubscription = () => {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const { toast } = useToast();

  const handleSelectPlan = (plan: PricingPlan) => {
    if (plan.name === "Basic") {
      toast({
        title: "You're on the Basic plan",
        description: "Upgrade to Premium for more features!",
      });
      return;
    }
    setSelectedPlan(plan);
    setShowDialog(true);
  };

  const handleConfirmSubscription = () => {
    setShowDialog(false);
    setIsPremium(true);
    toast({
      title: "🎉 Welcome to Premium!",
      description: `You've successfully subscribed to the ${selectedPlan?.name} plan.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              Premium Plans
            </CardTitle>
            <CardDescription>
              Unlock advanced features and take control of your energy usage
            </CardDescription>
          </div>
          {isPremium && (
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              Premium Member
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border p-5 transition-all hover:shadow-lg ${
                plan.popular
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-border bg-card"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              </div>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <Check
                      className={`w-4 h-4 ${
                        feature.included ? "text-green-500" : "text-muted-foreground/30"
                      }`}
                    />
                    <span
                      className={
                        feature.included ? "text-foreground" : "text-muted-foreground/50 line-through"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
                onClick={() => handleSelectPlan(plan)}
              >
                {plan.name === "Basic" ? "Current Plan" : `Choose ${plan.name}`}
              </Button>
            </div>
          ))}
        </div>

        {/* Premium Benefits */}
        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="text-sm font-semibold text-foreground mb-4 text-center">
            Why Go Premium?
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/50">
              <Zap className="w-8 h-8 text-primary mb-2" />
              <span className="text-xs font-medium text-foreground">Real-time Alerts</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/50">
              <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
              <span className="text-xs font-medium text-foreground">Advanced Analytics</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/50">
              <Bell className="w-8 h-8 text-orange-500 mb-2" />
              <span className="text-xs font-medium text-foreground">SMS Notifications</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/50">
              <Shield className="w-8 h-8 text-blue-500 mb-2" />
              <span className="text-xs font-medium text-foreground">Priority Support</span>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Subscription Confirmation Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              Confirm Subscription
            </DialogTitle>
            <DialogDescription>
              You're about to subscribe to the {selectedPlan?.name} plan at {selectedPlan?.price}
              {selectedPlan?.period}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              By confirming, you agree to our terms of service and will be charged accordingly.
              You can cancel anytime from your account settings.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmSubscription}>
              Confirm Subscription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PremiumSubscription;