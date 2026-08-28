import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Leaf, Sun, Clock, MapPin, Calendar, Sprout, HandHeart, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const gardeningFormSchema = z.object({
  parentName: z.string().min(2, "Parent name is required"),
  studentName: z.string().min(2, "Student name is required"),
  emergencyContact: z.string().min(10, "Emergency contact info is required"),
  allergies: z.string().optional(),
  consent: z.boolean().refine(val => val, "You must consent to participation"),
});

type GardeningFormValues = z.infer<typeof gardeningFormSchema>;

export default function Gardening() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<GardeningFormValues>({
    resolver: zodResolver(gardeningFormSchema),
    defaultValues: {
      parentName: "",
      studentName: "",
      emergencyContact: "",
      allergies: "",
      consent: false,
    },
  });

  function onSubmit(data: GardeningFormValues) {
    console.log("Form submitted", data);
    setIsSubmitted(true);
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Banner */}
      <div className="relative bg-primary h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="/src/assets/gardening-class.png" 
            alt="Garden background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-4 drop-shadow-md">Friday Garden Lab</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
            Hands-on science, community connection, and digging in the dirt.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Content */}
          <div className="lg:col-span-7 space-y-12">
            <section className="bg-card rounded-3xl p-8 shadow-lg border border-card-border">
              <h2 className="text-3xl font-serif text-primary mb-6">About the Lab</h2>
              <p className="text-lg text-foreground/80 mb-6">
                Our Friday Garden Lab is more than just planting seeds. It's an experiential science classroom where students learn about food systems, biological lifecycles, nature connection, and real-world problem solving. We get our hands dirty to understand the world around us.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-2">
                <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
                  <Calendar className="w-5 h-5 text-primary" /> <span className="font-medium">Every Friday</span>
                </div>
                <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
                  <Clock className="w-5 h-5 text-secondary" /> <span className="font-medium">9:00 AM - 12:00 PM</span>
                </div>
                <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full">
                  <MapPin className="w-5 h-5 text-destructive" /> <span className="font-medium">Community Garden (Location TBD)</span>
                </div>
              </div>
            </section>

            <section className="bg-card rounded-3xl p-8 shadow-lg border border-card-border">
              <h2 className="text-2xl font-serif text-primary mb-6">What Students Learn</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <Sprout className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">Soil Science & Botany</h4>
                    <p className="text-sm text-foreground/70">Understanding plant life cycles, root systems, and what makes soil healthy.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Sun className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">Observation & Journaling</h4>
                    <p className="text-sm text-foreground/70">Tracking growth, measuring outcomes, and scientific sketch notes.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Leaf className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">Composting Basics</h4>
                    <p className="text-sm text-foreground/70">The science of decomposition and reducing food waste.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <HandHeart className="w-6 h-6 text-red-400 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold">Food Justice</h4>
                    <p className="text-sm text-foreground/70">Conversations about where food comes from and community sharing.</p>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="bg-secondary/10 p-6 rounded-2xl border border-secondary/20">
              <h3 className="font-serif text-xl font-bold mb-4">Typical Weekly Activities</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-secondary mt-0.5" /> <span>Preparing beds and planting seasonal seeds</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-secondary mt-0.5" /> <span>Watering schedules and moisture observation</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-secondary mt-0.5" /> <span>Pest identification and natural management</span></li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-secondary mt-0.5" /> <span>Harvesting crops (when available) and tasting</span></li>
              </ul>
            </section>
          </div>

          {/* Registration Form */}
          <div className="lg:col-span-5">
            <Card className="sticky top-24 shadow-md border-border/60">
              <CardHeader className="bg-primary text-primary-foreground pb-4 rounded-t-xl">
                <CardTitle className="text-2xl font-serif">Register for Garden Lab</CardTitle>
                <p className="text-sm opacity-90">Secure your spot for the upcoming season.</p>
              </CardHeader>
              <CardContent className="pt-6">
                {isSubmitted ? (
                  <div className="text-center py-8 px-4 space-y-4">
                    <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-serif font-bold">Registration Received!</h3>
                    <p className="text-foreground/70">We're excited to have you join us in the garden. We'll send you an email with location details and what to bring.</p>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField control={form.control} name="studentName" render={({ field }) => (
                        <FormItem><FormLabel>Student Name</FormLabel><FormControl><Input placeholder="Alex" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      
                      <FormField control={form.control} name="parentName" render={({ field }) => (
                        <FormItem><FormLabel>Parent/Guardian Name</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />

                      <FormField control={form.control} name="emergencyContact" render={({ field }) => (
                        <FormItem><FormLabel>Emergency Contact & Phone</FormLabel><FormControl><Input placeholder="John Doe (555-555-5555)" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />

                      <FormField control={form.control} name="allergies" render={({ field }) => (
                        <FormItem><FormLabel>Allergies or Medical Notes</FormLabel><FormControl><Textarea placeholder="E.g., bee stings, pollen allergies..." {...field} /></FormControl><FormMessage /></FormItem>
                      )} />

                      <FormField control={form.control} name="consent" render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-muted/50">
                          <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                          <div className="space-y-1 leading-none text-sm">
                            <FormLabel>I give permission for my child to participate in outdoor gardening activities and understand the inherent risks involved.</FormLabel>
                          </div>
                        </FormItem>
                      )} />

                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6">
                        Submit Registration
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
