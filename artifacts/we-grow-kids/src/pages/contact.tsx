import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  grade: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Please provide a brief message"),
  contactMethod: z.enum(["email", "phone", "text"]),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      grade: "",
      service: "",
      message: "",
      contactMethod: "email",
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log("Form submitted", data);
    setIsSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Get in Touch</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            We'd love to hear from you. Reach out with questions about our services, curriculum, or to book a consultation.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-12">
          
          <div className="md:col-span-1 space-y-8">
            <div className="bg-card rounded-3xl p-6 shadow-lg border border-card-border">
              <h3 className="text-xl font-serif font-bold text-primary mb-4">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-bold text-sm">Email</p>
                    <a href="mailto:hello@wegrowkids.com" className="text-foreground/70 hover:text-primary">hello@wegrowkids.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-bold text-sm">Phone</p>
                    <a href="tel:+15555555555" className="text-foreground/70 hover:text-primary">(555) 555-5555</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-bold text-sm">Location</p>
                    <p className="text-foreground/70">Serving families locally and online.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted p-6 rounded-xl border border-border">
              <h4 className="font-bold font-serif mb-2">Office Hours</h4>
              <ul className="text-sm space-y-1 text-foreground/70">
                <li className="flex justify-between"><span>Mon - Thu</span> <span>9:00 AM - 4:00 PM</span></li>
                <li className="flex justify-between"><span>Friday</span> <span>Garden Lab (In Field)</span></li>
                <li className="flex justify-between"><span>Sat - Sun</span> <span>Closed</span></li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-2">
            <Card className="border-border shadow-sm">
              <CardContent className="pt-6">
                {isSubmitted ? (
                  <div className="text-center py-16 space-y-4">
                    <div className="mx-auto w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                      <Mail className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold">Message Sent!</h3>
                    <p className="text-foreground/70 max-w-sm mx-auto">
                      Thank you for reaching out. We will get back to you within 1-2 business days.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)} variant="outline" className="mt-4">Send Another Message</Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem><FormLabel>Your Name</FormLabel><FormControl><Input placeholder="Jane Doe" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" placeholder="jane@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem><FormLabel>Phone Number (Optional)</FormLabel><FormControl><Input type="tel" placeholder="(555) 555-5555" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="grade" render={({ field }) => (
                          <FormItem><FormLabel>Student Grade (Optional)</FormLabel><FormControl><Input placeholder="e.g. 2nd Grade" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>

                      <FormField control={form.control} name="service" render={({ field }) => (
                        <FormItem>
                          <FormLabel>What are you interested in?</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select a service" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="tutoring">Private Tutoring</SelectItem>
                              <SelectItem value="gardening">Friday Garden Lab</SelectItem>
                              <SelectItem value="curriculum">Curriculum Resources</SelectItem>
                              <SelectItem value="consultation">Parent Consultation</SelectItem>
                              <SelectItem value="charter">Charter Vendor Services</SelectItem>
                              <SelectItem value="other">Other / General Inquiry</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea placeholder="How can we help?" className="min-h-[120px]" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />

                      <FormField control={form.control} name="contactMethod" render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Preferred Contact Method</FormLabel>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="email" /></FormControl>
                                <FormLabel className="font-normal">Email</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="phone" /></FormControl>
                                <FormLabel className="font-normal">Phone Call</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl><RadioGroupItem value="text" /></FormControl>
                                <FormLabel className="font-normal">Text Message</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <Button type="submit" className="w-full" size="lg">Send Message</Button>
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
