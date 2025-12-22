import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, BarChart3, Bell, Award, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-energy-meter.jpg";

const features = [
  {
    icon: BarChart3,
    title: "Discover your daily energy journey",
    description: "Explore your energy habits, uncover trends, and celebrate each step forward. Every day is a new opportunity to improve.",
  },
  {
    icon: Award,
    title: "Celebrate weekly achievements",
    description: "Reflect on your weekly energy patterns with encouraging insights and helpful tips to keep you inspired and on track.",
  },
  {
    icon: Zap,
    title: "Simplify your monthly expenses",
    description: "Visualize your spending with intuitive charts and summaries. Gain clarity on your energy expenses and plan with ease.",
  },
];

const benefits = [
  "Monitor your usage in real-time",
  "Get notified of excessive consumption",
  "Enjoy rewards for saving energy",
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-2xl">
            <p className="text-primary font-medium mb-4">Monitor Your Energy</p>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Smarter energy,<br />
              <span className="text-primary">brighter every day</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              See your daily, weekly, and monthly energy use at a glance. Get instant alerts if you're using more than usual, and celebrate every time you save. Track your progress, discover easy tips to cut costs, and join a community that cheers you on—one watt at a time.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate("/auth")}
              className="gradient-energy text-primary-foreground hover:opacity-90 transition-opacity px-8 py-6 text-lg"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Welcome to a brighter, more efficient future
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our energy monitoring platform helps you understand and optimize your energy consumption
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-energy transition-all duration-300 bg-card">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-xl gradient-energy flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Take control of your energy
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <ArrowRight className="w-4 h-4 text-accent" />
                    </div>
                    <p className="text-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
              <Button 
                size="lg" 
                onClick={() => navigate("/auth")}
                className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Sign In
              </Button>
            </div>
            
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto rounded-2xl overflow-hidden shadow-energy">
                <img 
                  src={heroImage} 
                  alt="Smart energy meter" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full gradient-energy animate-pulse-glow" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full gradient-energy flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Energy Monitor</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Energy Monitor - The Smart Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
