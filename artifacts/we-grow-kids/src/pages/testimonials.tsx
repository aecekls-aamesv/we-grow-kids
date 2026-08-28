import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    role: "Parent of a 3rd Grader",
    service: "Private Tutoring",
    quote: "Finding We Grow Kids was a turning point for our family's education journey. My son was really struggling with reading confidence, and within a few months of tutoring, he's picking up books on his own. The approach is so gentle but incredibly effective.",
    initials: "SM"
  },
  {
    name: "The Johnson Family",
    role: "Educating 2 kids at home",
    service: "Friday Garden Lab & Curriculum",
    quote: "The Friday Garden Lab is the highlight of our week! It gives my kids a chance to learn hands-on science while socializing in a meaningful way. We also use the cultural learning units at home and they are beautifully put together.",
    initials: "JF"
  },
  {
    name: "David T.",
    role: "First-year home educator",
    service: "Family Education Support",
    quote: "I was completely overwhelmed pulling my daughter out of traditional school. The consultation and weekly planning support gave me the structure I needed to breathe and actually enjoy teaching her.",
    initials: "DT"
  },
  {
    name: "Alicia W.",
    role: "Parent of a 5th Grader",
    service: "Math Tutoring",
    quote: "Math used to end in tears at our house. The visual, hands-on strategies used in the tutoring sessions changed everything. My daughter actually says she likes math now, which I never thought I'd hear.",
    initials: "AW"
  },
  {
    name: "Marcus & Elena",
    role: "Parents of a 1st Grader",
    service: "Curriculum Resources",
    quote: "The Afrofuturism learning activities are incredible. It's so hard to find diverse, imaginative curriculum that isn't just a boring worksheet. These materials spark real conversations in our home.",
    initials: "ME"
  },
  {
    name: "Jessica R.",
    role: "Parent of 2nd & 4th Graders",
    service: "Charter Vendor Services",
    quote: "We Grow Kids handles the charter school vendor paperwork seamlessly. It's so helpful to have a tutor who understands how to align with our educational specialist's goals while keeping the learning fun and child-led.",
    initials: "JR"
  }
];

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-4">Family Stories</h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Hear from the families growing with us in their education journey.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, i) => (
            <Card key={i} className="bg-card hover:shadow-md transition-shadow border-border">
              <CardContent className="p-8">
                <Quote className="w-10 h-10 text-secondary/30 mb-4" />
                <p className="text-foreground/80 mb-6 italic leading-relaxed min-h-[120px]">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <Avatar className="bg-primary/10 border border-primary/20">
                    <AvatarFallback className="text-primary font-bold">{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold font-serif">{testimonial.name}</h4>
                    <p className="text-xs text-foreground/60">{testimonial.role}</p>
                    <p className="text-xs text-secondary font-medium mt-0.5">{testimonial.service}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
