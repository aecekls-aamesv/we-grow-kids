import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RESOURCES = [
  {
    id: 1,
    title: "Drums of the First City (Student Workbook)",
    description: "Companion curriculum for the children's book. Brings themes of ancestry, California history, and cultural memory into the classroom.",
    gradeLevel: "Grades 3-8",
    price: 25.00,
    image: "/src/assets/author-with-workbook.jpeg",
    category: "Social Studies"
  },
  {
    id: 2,
    title: "Math Mini Lessons",
    description: "Visual, hands-on math modules covering multiplication, division, and fractions.",
    gradeLevel: "Grades 2-4",
    price: 15.00,
    image: "/src/assets/math-mini.png",
    category: "Math"
  },
  {
    id: 3,
    title: "Literacy Activities",
    description: "Engaging reading comprehension prompts and creative writing exercises.",
    gradeLevel: "Grades 1-3",
    price: 12.00,
    image: "/src/assets/literacy.png",
    category: "Literacy"
  },
  {
    id: 4,
    title: "Family Weekly Planner",
    description: "A printable 52-week planner designed specifically for family learning rhythms.",
    gradeLevel: "Parents",
    price: 5.00,
    image: "/src/assets/planner.png",
    category: "Planning"
  },
  {
    id: 5,
    title: "Cultural Learning Units",
    description: "Deep-dive history and social studies units celebrating diverse cultures.",
    gradeLevel: "Grades 3-6",
    price: 25.00,
    image: "/src/assets/cultural.png",
    category: "Social Studies"
  },
  {
    id: 6,
    title: "Gardening Science Lessons",
    description: "Botany basics, soil science, and plant lifecycle activities.",
    gradeLevel: "All Ages",
    price: 18.00,
    image: "/src/assets/garden-science.png",
    category: "Science"
  },
  {
    id: 7,
    title: "Afrofuturism Learning Activities",
    description: "Creative projects blending science fiction, history, and art.",
    gradeLevel: "Grades 4-8",
    price: 20.00,
    image: "/src/assets/afrofuturism.png",
    category: "Enrichment"
  },
  {
    id: 8,
    title: "Parent Teaching Guides",
    description: "How to introduce complex topics and handle learning frustration.",
    gradeLevel: "Parents",
    price: 0.00,
    image: "/src/assets/parent-guide.png",
    category: "Support"
  }
];

export default function Curriculum() {
  const { toast } = useToast();
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(RESOURCES.map(r => r.category)))];

  const filteredResources = filter === "All" 
    ? RESOURCES 
    : RESOURCES.filter(r => r.category === filter);

  const handleAction = (resource: typeof RESOURCES[0]) => {
    if (resource.price === 0) {
      toast({
        title: "Download Started",
        description: `${resource.title} is downloading.`,
      });
    } else {
      toast({
        title: "Added to Cart",
        description: `${resource.title} has been added to your cart.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif text-primary mb-6">Curriculum Resources</h1>
          <p className="text-xl text-foreground/80">
            Thoughtfully designed materials to supplement your family's educational journey. From math mini-lessons to cultural deep dives.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map(category => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredResources.map((resource) => (
            <Card key={resource.id} className="flex flex-col overflow-hidden hover:shadow-lg transition-shadow border-border">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img 
                  src={resource.image} 
                  alt={resource.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-secondary/20 text-secondary-foreground">
                    {resource.gradeLevel}
                  </Badge>
                  <span className="font-bold text-primary font-serif">
                    {resource.price === 0 ? "Free" : `$${resource.price.toFixed(2)}`}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold line-clamp-1">{resource.title}</h3>
              </CardHeader>
              <CardContent className="flex-grow pb-4">
                <p className="text-sm text-foreground/70 line-clamp-3">{resource.description}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  onClick={() => handleAction(resource)}
                  className="w-full"
                  variant={resource.price === 0 ? "outline" : "default"}
                >
                  {resource.price === 0 ? (
                    <><Download className="w-4 h-4 mr-2" /> Download</>
                  ) : (
                    <><ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart</>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
