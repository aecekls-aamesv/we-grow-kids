import { motion } from "framer-motion";
import { Target, Compass, FileCheck, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function Support() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-secondary/20 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">Family Education Support Services</h1>
            <p className="text-xl text-foreground/80">
              Guidance, planning, and accountability for parents navigating their family's education journey. You don't have to do it alone.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="bg-card rounded-3xl p-8 shadow-lg border border-card-border">
            <h2 className="text-3xl font-serif text-primary mb-6">Charter School Vendor Services</h2>
            <p className="text-lg text-foreground/80 mb-6">
              We Grow Kids operates as an approved vendor for several local charter schools. We can help you navigate vendor funds, ensure your learning plans align with state standards, and provide the necessary documentation for your educational specialist.
            </p>
            <Button asChild>
              <Link href="/contact">Inquire About Vendor Services</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6 text-center">
                <Target className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Goal Setting</h3>
                <p className="text-sm text-foreground/70">Establish clear, achievable academic milestones.</p>
              </CardContent>
            </Card>
            <Card className="bg-secondary/10 border-secondary/20">
              <CardContent className="p-6 text-center">
                <Compass className="w-10 h-10 text-secondary mx-auto mb-4" />
                <h3 className="font-bold mb-2">Curriculum Planning</h3>
                <p className="text-sm text-foreground/70">Select the right materials for your child's learning style.</p>
              </CardContent>
            </Card>
            <Card className="bg-accent/20 border-accent/30">
              <CardContent className="p-6 text-center">
                <FileCheck className="w-10 h-10 text-accent-foreground mx-auto mb-4" />
                <h3 className="font-bold mb-2">Portfolio Help</h3>
                <p className="text-sm text-foreground/70">Organize student work for state or charter review.</p>
              </CardContent>
            </Card>
            <Card className="bg-muted border-border">
              <CardContent className="p-6 text-center">
                <MessageSquare className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-bold mb-2">Check-ins</h3>
                <p className="text-sm text-foreground/70">Regular progress reviews and strategy adjustments.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-12 shadow-sm border border-border">
          <h2 className="text-3xl font-serif text-center text-primary mb-10">Parent Consultations</h2>
          <div className="space-y-8">
            <div className="border-b border-border pb-8">
              <h3 className="text-xl font-bold font-serif mb-2">Initial Strategy Session (60 mins)</h3>
              <p className="text-foreground/70 mb-4">A deep dive into your family's educational philosophy, your child's learning style, and your goals for the year. We'll map out a rough curriculum plan and daily rhythm.</p>
              <div className="font-bold text-primary">$75</div>
            </div>
            <div className="border-b border-border pb-8">
              <h3 className="text-xl font-bold font-serif mb-2">Weekly Learning Plan Support</h3>
              <p className="text-foreground/70 mb-4">Ongoing support where we help you break down the curriculum into manageable weekly chunks, ensuring steady progress without burnout.</p>
              <div className="font-bold text-primary">$150 / month</div>
            </div>
            <div>
              <h3 className="text-xl font-bold font-serif mb-2">End-of-Year Portfolio Review</h3>
              <p className="text-foreground/70 mb-4">Assistance gathering, organizing, and presenting your child's work to demonstrate growth and meet state requirements.</p>
              <div className="font-bold text-primary">$100</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
