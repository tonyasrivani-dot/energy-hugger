import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MessageSquare, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FeedbackForm = () => {
  const { toast } = useToast();
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating) {
      toast({
        title: "Please select a rating",
        description: "We'd love to know how you feel about our app!",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Thank you for your feedback! 🙏",
      description: "Your feedback helps us improve the app.",
    });
    
    setRating("");
    setFeedback("");
    setIsSubmitting(false);
  };

  return (
    <Card className="card-energy">
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          <CardTitle>Share Your Feedback</CardTitle>
        </div>
        <CardDescription>Help us improve your experience</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <Label className="text-foreground">How would you rate this app?</Label>
            <RadioGroup value={rating} onValueChange={setRating} className="flex gap-4 flex-wrap">
              {["1", "2", "3", "4", "5"].map((value) => (
                <div key={value} className="flex items-center space-x-2">
                  <RadioGroupItem value={value} id={`rating-${value}`} />
                  <Label htmlFor={`rating-${value}`} className="flex items-center gap-1 cursor-pointer">
                    {value} <Star className={`w-4 h-4 ${parseInt(value) >= 4 ? "text-warning fill-warning" : "text-muted-foreground"}`} />
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-foreground">Your suggestions (optional)</Label>
            <Textarea
              id="feedback"
              placeholder="Tell us what you love or what we can improve..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[100px] bg-background/50 border-border/50"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
