import { useState } from "react";
import { 
  useListAutomations, 
  useUpdateAutomation, 
  useGetAutomationLogs,
  useTestAutomation
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getListAutomationsQueryKey } from "@workspace/api-client-react";
import { format, parseISO } from "date-fns";
import { Zap, Settings, Play, History, Check, X, AlertTriangle, MessageSquare, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AdminAutomations() {
  const queryClient = useQueryClient();
  const { data: automationsData, isLoading } = useListAutomations();
  const [selectedAutomation, setSelectedAutomation] = useState<any | null>(null);
  const [isTestOpen, setIsTestOpen] = useState<number | null>(null);
  
  const updateAutomation = useUpdateAutomation({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListAutomationsQueryKey() });
      }
    }
  });

  const testAutomation = useTestAutomation({
    mutation: {
      onSuccess: () => {
        alert("Test sent successfully!");
        setIsTestOpen(null);
      }
    }
  });

  const handleToggle = (id: number, currentEnabled: boolean) => {
    if (!currentEnabled) {
      if (!confirm("Are you sure you want to enable this automation? It will start sending messages immediately when triggered.")) {
        return;
      }
    }
    updateAutomation.mutate({ id, data: { enabled: !currentEnabled } });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Automations</h1>
          <p className="text-muted-foreground mt-1">Configure automated emails and SMS messages.</p>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md flex gap-3">
        <AlertTriangle className="text-blue-500 w-5 h-5 flex-shrink-0" />
        <div>
          <h3 className="text-blue-800 font-semibold text-sm">Important Note</h3>
          <p className="text-blue-700 text-sm mt-1">
            Automations will only fire if the corresponding integrations (Brevo for Email, Twilio for SMS) are connected and active. Please check the Integrations tab if messages are failing.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-muted-foreground">Loading automations...</div>
        ) : automationsData?.automations.map((auto) => (
          <Card key={auto.id} className={`border-2 transition-colors ${auto.enabled ? 'border-primary/50' : 'border-border/50 bg-muted/20'}`}>
            <CardHeader className="pb-3 flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Zap className={`w-4 h-4 ${auto.enabled ? 'text-yellow-500' : 'text-muted-foreground'}`} />
                  {auto.name}
                </CardTitle>
                <CardDescription className="mt-1 flex items-center gap-2">
                  <Badge variant="outline" className="bg-background">
                    {auto.channel === 'Email' ? <Mail className="w-3 h-3 mr-1" /> : 
                     auto.channel === 'SMS' ? <MessageSquare className="w-3 h-3 mr-1" /> : 
                     <><Mail className="w-3 h-3 mr-1" /><MessageSquare className="w-3 h-3 mr-1" /></>}
                    {auto.channel}
                  </Badge>
                </CardDescription>
              </div>
              <Switch 
                checked={auto.enabled}
                onCheckedChange={() => handleToggle(auto.id, auto.enabled)}
                className="mt-1"
              />
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Trigger:</span>
                  <span className="font-medium text-foreground text-right">{auto.trigger}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delay:</span>
                  <span className="font-medium text-foreground">{auto.delayMinutes === 0 ? 'Immediate' : `${auto.delayMinutes} mins`}</span>
                </div>
              </div>
              
              <div className="flex gap-2 border-t pt-4">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedAutomation(auto)}>
                  <Settings className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button variant="secondary" size="sm" className="flex-1" onClick={() => setIsTestOpen(auto.id)}>
                  <Play className="w-4 h-4 mr-1" /> Test
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Sheet */}
      <Sheet open={!!selectedAutomation} onOpenChange={(open) => !open && setSelectedAutomation(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedAutomation && (
            <EditAutomation 
              automation={selectedAutomation} 
              onClose={() => setSelectedAutomation(null)}
              onSave={(id, data) => updateAutomation.mutate({ id, data })}
            />
          )}
        </SheetContent>
      </Sheet>

      {/* Test Dialog */}
      <Dialog open={!!isTestOpen} onOpenChange={(open) => !open && setIsTestOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Test Automation</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Test Email Address</Label>
              <Input id="test-email" placeholder="admin@example.com" />
            </div>
            <div className="space-y-2">
              <Label>Test Phone Number (Optional)</Label>
              <Input id="test-phone" placeholder="+15551234567" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTestOpen(null)}>Cancel</Button>
            <Button onClick={() => {
              const email = (document.getElementById('test-email') as HTMLInputElement).value;
              const phone = (document.getElementById('test-phone') as HTMLInputElement).value;
              if (email) {
                testAutomation.mutate({ id: isTestOpen!, data: { recipientEmail: email, recipientPhone: phone } });
              }
            }}>
              Send Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EditAutomation({ automation, onClose, onSave }: { automation: any, onClose: () => void, onSave: (id: number, data: any) => void }) {
  const [subject, setSubject] = useState(automation.emailSubjectTemplate || "");
  const [emailBody, setEmailBody] = useState(automation.emailBodyTemplate || "");
  const [smsBody, setSmsBody] = useState(automation.smsBodyTemplate || "");

  const handleSave = () => {
    onSave(automation.id, {
      emailSubjectTemplate: subject,
      emailBodyTemplate: emailBody,
      smsBodyTemplate: smsBody,
    });
    onClose();
  };

  return (
    <div className="space-y-6 pb-8">
      <SheetHeader className="mb-6">
        <SheetTitle className="text-2xl font-serif">Edit Template</SheetTitle>
        <SheetDescription>{automation.name}</SheetDescription>
      </SheetHeader>

      <div className="bg-muted p-4 rounded-lg text-sm border border-border/50">
        <h4 className="font-semibold mb-2">Available Variables</h4>
        <div className="flex flex-wrap gap-2">
          {["{parentName}", "{learnerName}", "{date}", "{time}", "{zoomLink}", "{service}"].map(v => (
            <code key={v} className="bg-background px-1.5 py-0.5 rounded text-primary">{v}</code>
          ))}
        </div>
      </div>

      {(automation.channel === "Email" || automation.channel === "Both") && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold flex items-center gap-2 border-b pb-2"><Mail className="w-5 h-5 text-primary" /> Email Configuration</h3>
          <div className="space-y-2">
            <Label>Subject Line</Label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Email Body</Label>
            <Textarea 
              value={emailBody} 
              onChange={(e) => setEmailBody(e.target.value)} 
              className="min-h-[200px]"
            />
          </div>
        </div>
      )}

      {(automation.channel === "SMS" || automation.channel === "Both") && (
        <div className="space-y-4 mt-8">
          <h3 className="text-lg font-bold flex items-center gap-2 border-b pb-2"><MessageSquare className="w-5 h-5 text-primary" /> SMS Configuration</h3>
          <div className="space-y-2">
            <Label>SMS Body (Keep it short, max 160 chars recommended)</Label>
            <Textarea 
              value={smsBody} 
              onChange={(e) => setSmsBody(e.target.value)} 
              className="min-h-[100px]"
            />
            <div className={`text-xs text-right ${smsBody.length > 160 ? 'text-red-500' : 'text-muted-foreground'}`}>
              {smsBody.length} characters
            </div>
          </div>
        </div>
      )}

      <div className="pt-6 flex justify-end gap-3 border-t">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}
