import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, Calendar as CalendarIcon, User, BookOpen, Calculator, Pencil, Users } from "lucide-react";
import { useCreateLead } from "@workspace/api-client-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLocation } from "wouter";

const formSchema = z.object({
  parentName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  preferredContact: z.enum(["Email", "SMS", "Phone Call"]),
  timezone: z.string(),

  learnerFirstName: z.string().min(2, "Learner's first name is required"),
  learnerAge: z.coerce.number().min(3).max(20),
  learnerGrade: z.string().min(1, "Grade level is required"),
  subjects: z.array(z.string()).min(1, "Select at least one subject"),
  goals: z.string().min(10, "Please describe the learning goals"),
  challenges: z.string().optional(),

  requestedService: z.enum(["Tutoring Session", "Free Consultation", "Curriculum Consultation", "Other"]),
  preferredDates: z.string().min(5, "Please provide availability"),
  notes: z.string().optional(),
  hearAboutUs: z.string().min(1, "Please select an option"),

  emailConsent: z.boolean().refine(val => val, "You must consent to email communications"),
  smsConsent: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

const STEPS = [
  { id: 1, title: "Parent/Guardian Info" },
  { id: 2, title: "Learner Profile" },
  { id: 3, title: "Scheduling" },
  { id: 4, title: "Review & Submit" }
];

export default function Tutoring() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [_, setLocation] = useLocation();

  const createLead = useCreateLead();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentName: "", email: "", phone: "", preferredContact: "Email", timezone: "America/Los_Angeles",
      learnerFirstName: "", learnerAge: undefined, learnerGrade: "", subjects: [], goals: "", challenges: "",
      requestedService: "Tutoring Session", preferredDates: "", notes: "", hearAboutUs: "",
      emailConsent: false, smsConsent: false,
    },
  });

  const processNext = async () => {
    const fieldsToValidate = {
      1: ['parentName', 'email', 'phone', 'preferredContact', 'timezone'],
      2: ['learnerFirstName', 'learnerAge', 'learnerGrade', 'subjects', 'goals'],
      3: ['requestedService', 'preferredDates', 'hearAboutUs'],
    }[step] as any[];

    const isStepValid = await form.trigger(fieldsToValidate);
    if (isStepValid) setStep(s => s + 1);
  };

  const processPrev = () => setStep(s => s - 1);

  const onSubmit = (data: FormValues) => {
    const payload = {
      parentName: data.parentName,
      email: data.email,
      phone: data.phone,
      preferredContact: data.preferredContact,
      timezone: data.timezone,
      learnerFirstName: data.learnerFirstName,
      learnerAge: data.learnerAge,
      learnerGrade: data.learnerGrade,
      subject: data.subjects.join(", "),
      goals: data.goals,
      challenges: data.challenges,
      requestedService: data.requestedService,
      preferredDates: data.preferredDates,
      notes: data.notes,
      hearAboutUs: data.hearAboutUs,
      emailConsent: data.emailConsent,
      smsConsent: data.smsConsent,
      source: "Tutoring Page Form",
      stage: "New"
    };

    createLead.mutate({ data: payload }, {
      onSuccess: () => setIsSubmitted(true)
    });
  };

  return (
    <div className="min-h-screen pb-20 bg-muted/10">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2000')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight"
          >
            Private Tutoring & Learning Support
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-primary-foreground/90 max-w-2xl mx-auto font-medium"
          >
            Tailored instruction that meets your child exactly where they are.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10">
        {isSubmitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto">
            <Card className="border-2 border-primary/20 shadow-xl overflow-hidden rounded-2xl">
              <div className="h-3 bg-primary w-full" />
              <CardContent className="pt-12 pb-16 px-8 text-center space-y-6">
                <div className="mx-auto w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-foreground">Request Received!</h2>
                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                  Thank you for reaching out, {form.getValues().parentName.split(' ')[0]}. We'll review {form.getValues().learnerFirstName}'s needs and contact you shortly to schedule our first conversation.
                </p>
                <div className="pt-6">
                  <Button onClick={() => setLocation("/")} size="lg" className="px-8 h-14 text-lg">Return to Home</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            {/* Context Sidebar */}
            <div className="lg:col-span-4 space-y-6 hidden lg:block sticky top-28">
              <div className="bg-card rounded-2xl p-6 shadow-md border border-border/50">
                <h3 className="font-serif text-xl font-bold mb-4 text-primary">Our Approach</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  We believe every child can thrive given the right tools. We focus on fundamental understanding, confidence building, and nurturing a love for learning.
                </p>
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-700 shrink-0"><Calculator size={18} /></div>
                    <div>
                      <h4 className="font-bold text-sm">Math</h4>
                      <p className="text-xs text-muted-foreground">Conceptual & visual support</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="bg-orange-100 p-2 rounded-lg text-orange-700 shrink-0"><BookOpen size={18} /></div>
                    <div>
                      <h4 className="font-bold text-sm">Literacy</h4>
                      <p className="text-xs text-muted-foreground">Phonics & comprehension</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Container */}
            <Card className="lg:col-span-8 shadow-xl border-0 overflow-hidden rounded-2xl bg-card">
              <div className="bg-muted/40 p-6 border-b flex justify-between items-center relative">
                <div className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-300 ease-out" style={{ width: `${(step / STEPS.length) * 100}%` }} />
                <div>
                  <h2 className="text-2xl font-serif font-bold text-foreground">Tutoring Request</h2>
                  <p className="text-sm text-muted-foreground">Step {step} of {STEPS.length}: {STEPS[step-1].title}</p>
                </div>
                <div className="flex gap-1">
                  {STEPS.map(s => (
                    <div key={s.id} className={`w-2.5 h-2.5 rounded-full ${s.id === step ? 'bg-primary' : s.id < step ? 'bg-primary/40' : 'bg-muted-foreground/20'}`} />
                  ))}
                </div>
              </div>

              <CardContent className="p-0">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                    
                    <AnimatePresence mode="wait">
                      {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
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
                          <FormField control={form.control} name="preferredContact" render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Preferred Contact Method</FormLabel>
                              <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                                  {["Email", "SMS", "Phone Call"].map(method => (
                                    <FormItem key={method} className="flex items-center space-x-2 space-y-0 bg-background border px-4 py-3 rounded-lg flex-1 cursor-pointer [&:has([data-state=checked])]:border-primary">
                                      <FormControl><RadioGroupItem value={method} /></FormControl>
                                      <FormLabel className="font-normal cursor-pointer w-full">{method}</FormLabel>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            <FormMessage /></FormItem>
                          )} />
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                          <div className="grid md:grid-cols-3 gap-6">
                            <FormField control={form.control} name="learnerFirstName" render={({ field }) => (
                              <FormItem className="md:col-span-1"><FormLabel>Learner First Name</FormLabel><FormControl><Input placeholder="Alex" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="learnerAge" render={({ field }) => (
                              <FormItem className="md:col-span-1"><FormLabel>Age</FormLabel><FormControl><Input type="number" placeholder="8" {...field} className="h-12" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="learnerGrade" render={({ field }) => (
                              <FormItem className="md:col-span-1"><FormLabel>Grade Level</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl><SelectTrigger className="h-12"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                                  <SelectContent>
                                    {["Pre-K", "Kindergarten", "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "High School", "Other"].map(g => (
                                      <SelectItem key={g} value={g}>{g}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              <FormMessage /></FormItem>
                            )} />
                          </div>

                          <FormField control={form.control} name="subjects" render={() => (
                            <FormItem>
                              <div className="mb-4">
                                <FormLabel className="text-base">Subject(s) Needed</FormLabel>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {["Math", "Reading/Literacy", "Science", "Writing", "Homework Help", "Other"].map((subject) => (
                                  <FormField key={subject} control={form.control} name="subjects" render={({ field }) => {
                                    return (
                                      <FormItem key={subject} className="flex flex-row items-start space-x-3 space-y-0 border p-3 rounded-lg bg-background hover:bg-muted/50 transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(subject)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, subject])
                                                : field.onChange(field.value?.filter((value) => value !== subject))
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal w-full cursor-pointer leading-tight">{subject}</FormLabel>
                                      </FormItem>
                                    )
                                  }} />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )} />

                          <FormField control={form.control} name="goals" render={({ field }) => (
                            <FormItem><FormLabel>Learning Goals</FormLabel><FormControl><Textarea placeholder="What are your main goals for this support?" {...field} className="min-h-[100px]" /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="challenges" render={({ field }) => (
                            <FormItem><FormLabel>Current Challenges / Accommodations (Optional)</FormLabel><FormControl><Textarea placeholder="IEP/504 info or specific challenges..." {...field} className="min-h-[80px]" /></FormControl><FormMessage /></FormItem>
                          )} />
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                          <FormField control={form.control} name="requestedService" render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Requested Service</FormLabel>
                              <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {[
                                    {v:"Tutoring Session", d:"1-on-1 private instruction"},
                                    {v:"Free Consultation", d:"Initial meet & greet (15m)"},
                                    {v:"Curriculum Consultation", d:"Homeschool planning"},
                                    {v:"Other", d:"General inquiry"}
                                  ].map(item => (
                                    <FormItem key={item.v} className="flex items-start space-x-3 space-y-0 bg-background border p-4 rounded-xl cursor-pointer [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                                      <FormControl><RadioGroupItem value={item.v} className="mt-1" /></FormControl>
                                      <div>
                                        <FormLabel className="font-bold cursor-pointer text-base">{item.v}</FormLabel>
                                        <p className="text-sm text-muted-foreground mt-1">{item.d}</p>
                                      </div>
                                    </FormItem>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            <FormMessage /></FormItem>
                          )} />

                          <FormField control={form.control} name="preferredDates" render={({ field }) => (
                            <FormItem><FormLabel>Preferred Days/Times</FormLabel><FormControl><Textarea placeholder="e.g. Tuesdays after 3:30pm, or Thursday mornings" {...field} className="min-h-[100px]" /></FormControl><FormMessage /></FormItem>
                          )} />

                          <FormField control={form.control} name="notes" render={({ field }) => (
                            <FormItem><FormLabel>Additional Notes (Optional)</FormLabel><FormControl><Textarea placeholder="Anything else we should know before we meet?" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />

                          <FormField control={form.control} name="hearAboutUs" render={({ field }) => (
                            <FormItem><FormLabel>How did you hear about us?</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger className="h-12"><SelectValue placeholder="Select an option" /></SelectTrigger></FormControl>
                                <SelectContent>
                                  {["Friend / Referral", "Search Engine", "Instagram", "Facebook", "Community Event", "Other"].map(g => (
                                    <SelectItem key={g} value={g}>{g}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            <FormMessage /></FormItem>
                          )} />
                        </motion.div>
                      )}

                      {step === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-6">
                          <div className="bg-primary/5 p-6 rounded-xl border border-primary/20 space-y-4">
                            <h3 className="font-serif text-xl font-bold text-primary border-b border-primary/20 pb-2">Review Summary</h3>
                            
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div><span className="text-muted-foreground block text-xs uppercase tracking-wider">Parent/Guardian</span><span className="font-medium">{form.getValues().parentName}</span></div>
                              <div><span className="text-muted-foreground block text-xs uppercase tracking-wider">Contact</span><span className="font-medium">{form.getValues().email} • {form.getValues().phone}</span></div>
                              <div><span className="text-muted-foreground block text-xs uppercase tracking-wider">Learner</span><span className="font-medium">{form.getValues().learnerFirstName}, Age {form.getValues().learnerAge} ({form.getValues().learnerGrade})</span></div>
                              <div><span className="text-muted-foreground block text-xs uppercase tracking-wider">Subjects</span><span className="font-medium">{form.getValues().subjects.join(', ')}</span></div>
                              <div className="md:col-span-2"><span className="text-muted-foreground block text-xs uppercase tracking-wider">Service Requested</span><span className="font-medium">{form.getValues().requestedService}</span></div>
                            </div>
                          </div>

                          <div className="space-y-4 pt-4">
                            <FormField control={form.control} name="emailConsent" render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4 bg-background">
                                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm font-medium">I agree to receive email communications from We Grow Kids.</FormLabel>
                                  <p className="text-xs text-muted-foreground">Used for scheduling and updates. You can unsubscribe at any time.</p>
                                </div>
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="smsConsent" render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border p-4 bg-background">
                                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm font-medium">I agree to receive SMS text messages.</FormLabel>
                                  <p className="text-xs text-muted-foreground">Used for session reminders. Reply STOP to opt out. Message/data rates apply.</p>
                                </div>
                              </FormItem>
                            )} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
                      {step > 1 ? (
                        <Button type="button" variant="outline" onClick={processPrev} className="h-12 px-6">
                          <ChevronLeft className="w-4 h-4 mr-2" /> Back
                        </Button>
                      ) : <div />}
                      
                      {step < STEPS.length ? (
                        <Button type="button" onClick={processNext} className="h-12 px-8 bg-primary text-white ml-auto">
                          Next <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      ) : (
                        <Button type="submit" disabled={createLead.isPending} className="h-12 px-8 bg-primary text-white btn-glitter ml-auto overflow-hidden">
                          {createLead.isPending ? "Submitting..." : "Submit Request"}
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
