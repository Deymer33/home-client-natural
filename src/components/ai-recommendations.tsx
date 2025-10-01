"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getPersonalizedRecommendations, PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-product-recommendations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  preferences: z.string().min(10, {
    message: "Please tell us a bit more about your interests (at least 10 characters).",
  }),
});

export default function AiRecommendations() {
  const [recommendation, setRecommendation] = useState<PersonalizedRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      preferences: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await getPersonalizedRecommendations({
        userId: 'anonymous-user',
        browsingHistory: [],
        purchaseHistory: [],
        statedPreferences: values.preferences,
      });
      setRecommendation(result);
    } catch (error) {
      console.error("Error getting recommendations:", error);
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "We couldn't generate recommendations at this time. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-8 h-8 text-secondary" />
            <CardTitle className="font-headline text-3xl">Personalized Recommendations</CardTitle>
        </div>
        <CardDescription className="text-base">
          Tell us what you're looking for, and our AI will suggest the perfect products for your wellness journey.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="preferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">My interests and needs</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'I'm looking for something to improve my sleep and reduce stress. I prefer organic, vegan products.'"
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button type="submit" disabled={isLoading} size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get My Recommendations
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
        {recommendation && (
          <div className="mt-8 pt-6 border-t animate-in fade-in duration-500">
            <h3 className="font-headline text-xl font-semibold mb-4 text-center">Here's what we suggest for you:</h3>
            <div className="space-y-4 bg-muted/50 p-6 rounded-lg">
                <p className="text-foreground italic text-center">&quot;{recommendation.reasoning}&quot;</p>
                <ul className="list-disc pl-5 space-y-2 marker:text-primary">
                    {recommendation.recommendations.map((product) => (
                        <li key={product} className="font-semibold text-primary">{product}</li>
                    ))}
                </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
