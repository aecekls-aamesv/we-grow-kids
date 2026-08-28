import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Calendar as CalendarIcon, ArrowRight } from "lucide-react";
import { useCreateLead } from "@workspace/api-client-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "wouter";

const formSchema = z.object({
  parentName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  timezone: z.string(),
  goals: z.string().min(10, "Please briefly describe what you'd like to discuss"),
  preferredDates: z.string().min(5, "Please provide some times that work for you"),
  hearAboutUs: z.string().optional(),
  emailConsent: z.boolean().refine(val => val, "You must consent to email communications"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Consultation() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [_, setLocation] = useLocation();

  const createLead = useCreateLead();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentName: "", 
      email: "", 
      phone: "", 
      timezone: "America/Los_Angeles",
      goals: "", 
      preferredDates: "", 
      hearAboutUs: "",
      emailConsent: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    const payload = {
      parentName: data.parentName,
      email: data.email,
      phone: data.phone,
      timezone: data.timezone,
      goals: data.goals,
      requestedService: "Free Consultation",
      preferredDates: data.preferredDates,
      hearAboutUs: data.hearAboutUs,
      emailConsent: data.emailConsent,
      smsConsent: false, // Not collected in short form
      source: "Consultation Page Form",
      stage: "New"
    };

    createLead.mutate({ data: payload }, {
      onSuccess: () => setIsSubmitted(true)
    });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] py-12 md:py-20 bg-muted/20 relative">
      <div className="container mx-auto px-4 relative z-10 max-w-2xl">
        {isSubmitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="border-2 border-primary/20 shadow-xl overflow-hidden rounded-2xl bg-card">
              <div className="h-3 bg-primary w-full" />
              <CardContent className="pt-12 pb-16 px-8 text-center space-y-6">
                <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-foreground">Consultation Requested!</h2>
                <p className="text-lg text-muted-foreground">
                  Thank you, {form.getValues().parentName.split(' ')[0]}. We'll review your inquiry and reach out via email shortly to confirm a time for our meeting.
                </p>
                <div className="pt-6">
                  <Button onClick={() => setLocation("/")} size="lg" className="px-8 h-14 text-lg">Return to Home</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-10 space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2">
                <CalendarIcon className="w-8 h-8" />
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Let's Connect</h1>
              <p className="text-lg text-muted-foreground">
                Book a free 15-minute consultation to discuss your child's needs and how we can support your family's educational journey.
              </p>
            </div>

            <Card className="shadow-xl border-border/60 overflow-hidden rounded-2xl bg-card">
              <CardContent className="p-0">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-6">
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="parentName" render={({ field }) => (
                        <FormItem><FormLabel>Full Name *</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} className="bg-background h-12" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem><FormLabel>Email Address *</FormLabel><FormControl><Input type="email" placeholder="jane@example.com" {...field} className="bg-background h-12" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="phone" render={({ field }) => (
                        <FormItem><FormLabel>Mobile Number *</FormLabel><FormControl><Input type="tel" placeholder="(555) 555-5555" {...field} className="bg-background h-12" /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="timezone" render={({ field }) => (
                        <FormItem><FormLabel>Timezone</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className="bg-background h-12"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="America/New_York">Pacific Time (PT)</SelectItem>
                              <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                              <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                              <SelectItem value="America/Los_Angeles">Eastern Time (ET)</SelectItem>
                            </SelectContent>
                          </Select>
                        <FormMessage /></FormItem>
                      )} />
                    </div>

                    <FormField control={form.control} name="goals" render={({ field }) => (
                      <FormItem><FormLabel>What would you like to discuss? *</FormLabel><FormControl><Textarea placeholder="Briefly describe your goals or challenges..." {...field} className="min-h-[100px]" /></FormControl><FormMessage /></FormItem>
                    )} />

                    <FormField control={form.control} name="preferredDates" render={({ field }) => (
                      <FormItem><FormLabel>Preferred Days & Times *</FormLabel><FormControl><Textarea placeholder="e.g. Tuesdays after 3:30pm PT, or Thursday mornings" {...field} className="min-h-[80px]" /></FormControl><FormMessage /></FormItem>
                    )} />

                    <div className="space-y-4 pt-4 border-t border-border/50">
                      <FormField control={form.control} name="emailConsent" render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                          <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                          <div className="space-y-1 leading-none mt-0.5">
                            <FormLabel className="text-sm font-medium">I agree to receive email communications regarding this request.</FormLabel>
                          </div>
                        </FormItem>
                      )} />
                    </div>

                    <Button type="submit" disabled={createLead.isPending} className="w-full h-14 text-lg bg-primary text-white btn-glitter overflow-hidden mt-4">
                      {createLead.isPending ? "Submitting..." : <><CalendarIcon className="w-5 h-5 mr-2" /> Request Consultation</>}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
