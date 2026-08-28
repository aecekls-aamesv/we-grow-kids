import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Calendar, Download, MessageSquare, Clock } from "lucide-react";

export default function Portal() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-muted/20 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-primary mb-2">Parent Portal</h1>
            <p className="text-foreground/70">Sign in to access your family's resources and schedules.</p>
          </div>
          
          <Card className="border-border shadow-md">
            <CardContent className="pt-6">
              <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="jane@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">Sign In</Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Note: This is a demo portal. Any credentials will work.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Logged in state
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif font-bold">Welcome back, Jane!</h1>
            <p className="text-primary-foreground/80 text-sm">Student: Alex (3rd Grade)</p>
          </div>
          <Button variant="outline" className="bg-transparent border-primary-foreground/20 hover:bg-primary-foreground/10" onClick={() => setIsLoggedIn(false)}>
            Sign Out
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-8">
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="schedule" className="space-y-6">
            <h2 className="text-xl font-bold font-serif mb-4">Upcoming Schedule</h2>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  <div className="p-4 flex items-center gap-4 hover:bg-muted/50">
                    <div className="bg-primary/10 text-primary p-3 rounded-lg text-center min-w-[70px]">
                      <div className="text-xs font-bold uppercase">Wed</div>
                      <div className="text-xl font-bold font-serif">14</div>
                    </div>
                    <div>
                      <h4 className="font-bold">Math Tutoring (1-on-1)</h4>
                      <p className="text-sm text-foreground/70 flex items-center gap-1"><Clock className="w-3 h-3"/> 2:00 PM - 3:00 PM (Online)</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center gap-4 hover:bg-muted/50">
                    <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center min-w-[70px]">
                      <div className="text-xs font-bold uppercase">Fri</div>
                      <div className="text-xl font-bold font-serif">16</div>
                    </div>
                    <div>
                      <h4 className="font-bold">Friday Garden Lab</h4>
                      <p className="text-sm text-foreground/70 flex items-center gap-1"><Clock className="w-3 h-3"/> 9:00 AM - 12:00 PM (Community Garden)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <h2 className="text-xl font-bold font-serif mb-4">My Resources</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader className="pb-2">
                    <Book className="w-8 h-8 text-secondary mb-2" />
                    <CardTitle className="text-base">Math Mini Lesson Module {i}</CardTitle>
                    <CardDescription>Purchased on Jan {i+10}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full"><Download className="w-4 h-4 mr-2" /> Download PDF</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="updates" className="space-y-6">
            <h2 className="text-xl font-bold font-serif mb-4">Progress Updates</h2>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Tutoring Note - Math</CardTitle>
                  <span className="text-sm text-muted-foreground">Feb 7, 2024</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Alex did fantastic today with fractions! We used the visual pie charts and it really clicked. For homework, please have them complete pages 12-14 in the workbook. No rush, just focus on understanding the denominator concept.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Garden Lab Update</CardTitle>
                  <span className="text-sm text-muted-foreground">Feb 2, 2024</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Today we planted our early spring peas! The kids learned about nitrogen fixation in the soil. Ask Alex about what the roots of legumes do for the dirt!
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold font-serif">Messages</h2>
              <Button size="sm"><MessageSquare className="w-4 h-4 mr-2" /> New Message</Button>
            </div>
            <div className="text-center py-12 bg-muted/30 rounded-lg border border-border border-dashed">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-20" />
              <p className="text-muted-foreground">No new messages at this time.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
