import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Send } from "lucide-react";
import { useCreateLead } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  guardianName: z.string().min(2, "Please enter a guardian name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a phone number"),
  studentName: z.string().min(2, "Please enter the student's name"),
  studentAge: z.coerce.number().min(8, "Please enter an age between 8 and 18").max(18, "Please enter an age between 8 and 18"),
  grade: z.string().min(1, "Please select a grade"),
  sport: z.string().min(2, "Please share a sport or athletic interest"),
  school: z.string().min(2, "Please share the current school"),
  interestAreas: z.string().min(2, "Please share what interests you"),
  contactMethod: z.enum(["Email", "Phone Call", "SMS"]),
  comments: z.string().optional(),
  consent: z.boolean().refine((value) => value, "Please consent to follow-up"),
});

type FormValues = z.infer<typeof formSchema>;

export function CreeksideInterestForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const createLead = useCreateLead();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guardianName: "",
      email: "",
      phone: "",
      studentName: "",
      studentAge: undefined,
      grade: "",
      sport: "",
      school: "",
      interestAreas: "",
      contactMethod: "Email",
      comments: "",
      consent: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    createLead.mutate(
      {
        data: {
          parentName: data.guardianName,
          email: data.email,
          phone: data.phone,
          preferredContact: data.contactMethod,
          timezone: "America/Los_Angeles",
          learnerFirstName: data.studentName,
          learnerAge: data.studentAge,
          learnerGrade: data.grade,
          subject: `Athletics: ${data.sport}`,
          requestedService: "Creekside Warriors Student Athlete Academy",
          source: "creekside-warriors",
          emailConsent: true,
          smsConsent: data.contactMethod === "SMS",
          notes: [
            `Current school: ${data.school}`,
            `Interest areas: ${data.interestAreas}`,
            data.comments ? `Comments: ${data.comments}` : "",
          ].filter(Boolean).join("\n"),
          stage: "New",
        },
      },
      {
        onSuccess: () => {
          setIsSubmitted(true);
          form.reset();
        },
      },
    );
  };

  return (
    <section id="creekside-interest" className="scroll-mt-24 bg-muted/35 py-20 md:py-24">
      <div className="container mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-primary/70">Creekside Warriors</p>
          <h2 className="text-4xl text-primary">Tell us about your student-athlete.</h2>
          <p className="mt-5 text-lg leading-8 text-foreground/70">
            Join the interest list to receive updates as program details are confirmed. Sharing your information does not guarantee enrollment, placement, or athletic outcomes.
          </p>
          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            We will only use this information to respond to your Creekside Warriors inquiry and share relevant program updates.
          </p>
        </div>

        <Card className="border-border/70 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Join the interest list</CardTitle>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="rounded-2xl bg-primary/5 px-6 py-12 text-center">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="h-7 w-7" />
                </span>
                <h3 className="mt-5 text-2xl font-bold text-primary">You’re on the list.</h3>
                <p className="mx-auto mt-3 max-w-md leading-7 text-foreground/70">
                  Thank you for your interest in Creekside Warriors. We’ll follow up with current information as the program takes shape.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField control={form.control} name="guardianName" render={({ field }) => (
                      <FormItem><FormLabel>Parent / guardian name</FormLabel><FormControl><Input placeholder="Your full name" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem><FormLabel>Email address</FormLabel><FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem><FormLabel>Phone number</FormLabel><FormControl><Input type="tel" placeholder="(555) 555-5555" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="contactMethod" render={({ field }) => (
                      <FormItem><FormLabel>Preferred contact method</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent><SelectItem value="Email">Email</SelectItem><SelectItem value="Phone Call">Phone call</SelectItem><SelectItem value="SMS">Text message</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                    )} />
                  </div>

                  <div className="border-t border-border/60 pt-7">
                    <p className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-primary/70">Student-athlete profile</p>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <FormField control={form.control} name="studentName" render={({ field }) => (
                        <FormItem><FormLabel>Student name</FormLabel><FormControl><Input placeholder="Student's name" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="studentAge" render={({ field }) => (
                        <FormItem><FormLabel>Student age</FormLabel><FormControl><Input type="number" min="8" max="18" placeholder="Age" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="grade" render={({ field }) => (
                        <FormItem><FormLabel>Current grade</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a grade" /></SelectTrigger></FormControl><SelectContent>{["5th grade", "6th grade", "7th grade", "8th grade", "9th grade", "10th grade", "11th grade", "12th grade", "Other"].map((grade) => <SelectItem key={grade} value={grade}>{grade}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="sport" render={({ field }) => (
                        <FormItem><FormLabel>Sport or athletic interest</FormLabel><FormControl><Input placeholder="Basketball, soccer, track..." {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="school" render={({ field }) => (
                        <FormItem className="sm:col-span-2"><FormLabel>Current school</FormLabel><FormControl><Input placeholder="School name" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>
                  </div>

                  <FormField control={form.control} name="interestAreas" render={({ field }) => (
                    <FormItem><FormLabel>What are you most interested in?</FormLabel><FormControl><Textarea placeholder="Academic support, athletic development, mentorship, high-school readiness..." className="min-h-24" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="comments" render={({ field }) => (
                    <FormItem><FormLabel>Questions or comments <span className="font-normal text-muted-foreground">(optional)</span></FormLabel><FormControl><Textarea placeholder="Anything else you would like us to know?" className="min-h-24" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="consent" render={({ field }) => (
                    <FormItem className="flex items-start gap-3 space-y-0 rounded-xl bg-muted/50 p-4">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                      <div className="space-y-1"><FormLabel className="cursor-pointer text-sm leading-6">I agree to be contacted by We Grow Kids about Creekside Warriors and understand that joining the interest list does not guarantee enrollment.</FormLabel><FormMessage /></div>
                    </FormItem>
                  )} />
                  <Button type="submit" disabled={createLead.isPending} className="w-full rounded-full bg-primary py-6 font-bold text-white hover:bg-primary/90">
                    {createLead.isPending ? "Sending..." : "Join the Creekside Interest List"} <Send className="ml-2 h-4 w-4" />
                  </Button>
                  {createLead.isError && <p className="text-center text-sm font-semibold text-destructive">We couldn’t send that yet. Please try again or contact us directly.</p>}
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
