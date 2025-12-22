import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Zap, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    meterNumber: "",
    apiKey: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!formData.userId || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!isLogin && !formData.meterNumber) {
      toast({
        title: "Error",
        description: "Meter number is required",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate auth - store in localStorage for demo
    setTimeout(() => {
      localStorage.setItem("energyUser", JSON.stringify({
        userId: formData.userId,
        meterNumber: formData.meterNumber || localStorage.getItem("meterNumber") || "MTR-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        apiKey: formData.apiKey || "demo-api-key",
      }));
      
      toast({
        title: isLogin ? "Welcome back!" : "Account created!",
        description: isLogin ? "Successfully logged in" : "Your account has been created successfully",
      });
      
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md shadow-energy">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-full gradient-energy flex items-center justify-center mb-2">
            <Zap className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">
            {isLogin ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? "Enter your credentials to access your energy dashboard" 
              : "Sign up to start monitoring your energy consumption"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                placeholder="Enter your user ID"
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                className="transition-all focus:shadow-energy"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pr-10 transition-all focus:shadow-energy"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="transition-all focus:shadow-energy"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meterNumber">Meter Number</Label>
                  <Input
                    id="meterNumber"
                    placeholder="Enter your meter number"
                    value={formData.meterNumber}
                    onChange={(e) => setFormData({ ...formData, meterNumber: e.target.value })}
                    className="transition-all focus:shadow-energy"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key (Optional)</Label>
                  <Input
                    id="apiKey"
                    placeholder="Enter your energy provider API key"
                    value={formData.apiKey}
                    onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                    className="transition-all focus:shadow-energy"
                  />
                  <p className="text-xs text-muted-foreground">
                    Connect to your energy provider for real-time data
                  </p>
                </div>
              </>
            )}

            <Button 
              type="submit" 
              className="w-full gradient-energy text-primary-foreground hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-primary hover:underline transition-all"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
