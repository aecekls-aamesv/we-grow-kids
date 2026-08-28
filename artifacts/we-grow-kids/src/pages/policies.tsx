import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Policies() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h1 className="text-4xl font-serif text-primary mb-4">Program Policies</h1>
          <p className="text-foreground/70">
            Clear guidelines to ensure a safe, respectful, and effective learning environment for all families.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Accordion type="single" collapsible className="w-full space-y-4" defaultValue="registration">
          <AccordionItem value="registration" className="bg-card px-6 rounded-lg border border-border">
            <AccordionTrigger className="text-xl font-serif font-bold hover:no-underline">Registration & Enrollment</AccordionTrigger>
            <AccordionContent className="text-foreground/80 space-y-4 pt-2 pb-6">
              <p>Enrollment in tutoring or classes requires a completed registration form and an initial consultation (for new tutoring students) to ensure our services align with your child's needs.</p>
              <p>Spots in the Friday Garden Lab are limited and filled on a first-come, first-served basis. A waitlist will be maintained once capacity is reached.</p>
              <p>For charter school families, purchase orders must be received prior to the start of services.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cancellation" className="bg-card px-6 rounded-lg border border-border">
            <AccordionTrigger className="text-xl font-serif font-bold hover:no-underline">Cancellation & Refund Policy</AccordionTrigger>
            <AccordionContent className="text-foreground/80 space-y-4 pt-2 pb-6">
              <h4 className="font-bold text-foreground">Tutoring Sessions</h4>
              <p>Please provide at least 24 hours notice for tutoring cancellations. Cancellations made with less than 24 hours notice may be billed at the normal rate, except in cases of sudden illness or emergency.</p>
              <h4 className="font-bold text-foreground mt-4">Classes (Garden Lab)</h4>
              <p>Registration fees for classes are refundable up to 14 days before the class start date, minus a small processing fee. No refunds are issued after the program begins.</p>
              <h4 className="font-bold text-foreground mt-4">Digital Products</h4>
              <p>Due to the nature of digital curriculum downloads, all digital sales are final. If you have trouble accessing your file, please contact us for support.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="conduct" className="bg-card px-6 rounded-lg border border-border">
            <AccordionTrigger className="text-xl font-serif font-bold hover:no-underline">Code of Conduct</AccordionTrigger>
            <AccordionContent className="text-foreground/80 space-y-4 pt-2 pb-6">
              <p>We Grow Kids is committed to providing a welcoming, inclusive environment. We expect all students, parents, and staff to treat each other with respect and kindness.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Listen respectfully to instructors and peers.</li>
                <li>Respect the physical space, materials, and nature (especially in Garden Lab).</li>
                <li>Communicate needs and frustrations safely with words.</li>
              </ul>
              <p>Repeated disruptive behavior that prevents others from learning or creates an unsafe environment may result in a parent conference and potential removal from the program.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="privacy" className="bg-card px-6 rounded-lg border border-border">
            <AccordionTrigger className="text-xl font-serif font-bold hover:no-underline">Privacy Policy</AccordionTrigger>
            <AccordionContent className="text-foreground/80 space-y-4 pt-2 pb-6">
              <p>We respect your family's privacy. Student records, learning plans, and contact information are kept strictly confidential and are only shared with authorized staff.</p>
              <p>We will never sell or share your personal information with third parties.</p>
              <p>Photographs or videos of students will only be used for promotional purposes (website, social media) if explicit written consent has been provided by the parent or guardian.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
