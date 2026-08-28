import { useState } from "react";
import { 
  useListIntegrations, 
  useDisconnectIntegration, 
  useUpdateIntegrationStatus
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getListIntegrationsQueryKey } from "@workspace/api-client-react";
import { format, parseISO } from "date-fns";
import { Plug, CheckCircle2, AlertCircle, XCircle, ArrowRight, Server, Calendar as CalendarIcon, Video, Mail, MessageSquare, CreditCard, Instagram, Facebook } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const INTEGRATION_META: Record<string, { icon: any, desc: string, env: string[] }> = {
  "Google Calendar": { icon: CalendarIcon, desc: "Sync bookings automatically.", env: ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET"] },
  "Zoom": { icon: Video, desc: "Generate meeting links for online sessions.", env: ["ZOOM_ACCOUNT_ID", "ZOOM_CLIENT_ID", "ZOOM_CLIENT_SECRET"] },
  "Brevo (Email)": { icon: Mail, desc: "Send automated emails to parents.", env: ["BREVO_API_KEY"] },
  "Twilio (SMS)": { icon: MessageSquare, desc: "Send SMS reminders.", env: ["TWILIO_ACCOUNT_SID", "TWILIO_AUTH_TOKEN", "TWILIO_PHONE_NUMBER"] },
  "Stripe": { icon: CreditCard, desc: "Process payments for tutoring and store items.", env: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"] },
  "Instagram": { icon: Instagram, desc: "Post to your social feed directly.", env: ["IG_ACCESS_TOKEN"] },
  "Facebook": { icon: Facebook, desc: "Manage page posts and comments.", env: ["FB_PAGE_TOKEN"] }
};

export default function AdminIntegrations() {
  const queryClient = useQueryClient();
  const { data: integrationsData, isLoading } = useListIntegrations();
  const [setupService, setSetupService] = useState<string | null>(null);

  const disconnect = useDisconnectIntegration({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getListIntegrationsQueryKey() })
    }
  });

  const handleDisconnect = (id: number, service: string) => {
    if (confirm(`Are you sure you want to disconnect ${service}? Associated automations will fail.`)) {
      disconnect.mutate({ id });
    }
  };

  const integrations = integrationsData?.integrations || [];
  const incompleteCount = integrations.filter(i => i.status !== "Connected").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Integrations</h1>
          <p className="text-muted-foreground mt-1">Connect We Grow Kids to external services.</p>
        </div>
      </div>

      {incompleteCount > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-md flex gap-3 shadow-sm">
          <AlertCircle className="text-amber-500 w-5 h-5 flex-shrink-0" />
          <div>
            <h3 className="text-amber-800 font-semibold text-sm">Setup Required</h3>
            <p className="text-amber-700 text-sm mt-1">
              You have {incompleteCount} integrations that need attention. Functionality like automated emails or Zoom links will not work until these are configured in your environment secrets.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-2">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-muted-foreground">Loading integrations...</div>
        ) : integrations.map((integration) => {
          const meta = INTEGRATION_META[integration.service] || { icon: Server, desc: "External service integration.", env: [] };
          const Icon = meta.icon;
          const isConnected = integration.status === "Connected";
          const isError = integration.status === "Error";

          return (
            <Card key={integration.id} className={`flex flex-col border-2 transition-all ${isConnected ? 'border-green-200 bg-white/50' : isError ? 'border-red-200 bg-red-50/30' : 'border-border/50'}`}>
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-muted rounded-xl">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <Badge variant="outline" className={
                    isConnected ? "bg-green-100 text-green-800 border-green-200" :
                    isError ? "bg-red-100 text-red-800 border-red-200" :
                    "bg-gray-100 text-gray-800"
                  }>
                    {isConnected ? <CheckCircle2 className="w-3 h-3 mr-1" /> : 
                     isError ? <XCircle className="w-3 h-3 mr-1" /> : 
                     <AlertCircle className="w-3 h-3 mr-1" />}
                    {integration.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold mt-4">{integration.displayName || integration.service}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2 min-h-[40px]">{meta.desc}</p>
              </CardHeader>
              
              <CardContent className="flex-1">
                {isConnected ? (
                  <div className="space-y-2 text-sm">
                    {integration.accountEmail && (
                      <div className="flex justify-between border-b border-border/50 pb-2">
                        <span className="text-muted-foreground">Account</span>
                        <span className="font-medium truncate ml-4 max-w-[150px]">{integration.accountEmail}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-1">
                      <span className="text-muted-foreground">Last Sync</span>
                      <span className="font-medium">
                        {integration.lastSyncAt ? format(parseISO(integration.lastSyncAt), 'MMM d, h:mm a') : 'Never'}
                      </span>
                    </div>
                  </div>
                ) : isError ? (
                  <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
                    <strong>Error:</strong> {integration.lastError || "Failed to connect. Check credentials."}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
                    Not configured. API keys missing.
                  </div>
                )}
              </CardContent>

              <CardFooter className="pt-4 border-t bg-muted/10 mt-auto gap-2">
                {isConnected ? (
                  <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDisconnect(integration.id, integration.service)}>
                    Disconnect
                  </Button>
                ) : (
                  <Button className="w-full" onClick={() => setSetupService(integration.service)}>
                    {isError ? "Update Setup" : "Connect"} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Setup Dialog */}
      <Dialog open={!!setupService} onOpenChange={(open) => !open && setSetupService(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plug className="text-primary w-5 h-5" /> Connect {setupService}
            </DialogTitle>
            <DialogDescription>
              We Grow Kids uses environment secrets to securely store API credentials. Do not enter passwords here.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <p className="text-sm">To enable <strong>{setupService}</strong>, you need to add the following variables to your Replit Environment Secrets panel:</p>
            
            <div className="bg-slate-900 text-slate-50 p-4 rounded-md font-mono text-sm space-y-2">
              {setupService && INTEGRATION_META[setupService]?.env.map(e => (
                <div key={e} className="flex flex-col">
                  <span className="text-green-400">{e}</span>
                  <span className="text-slate-400 text-xs">="your_api_key_here"</span>
                </div>
              ))}
            </div>

            <div className="bg-muted/50 p-3 rounded text-sm border">
              <strong>Instructions:</strong> Open the "Secrets" tool in your Replit workspace, add the keys exactly as written above, then restart the application to apply changes.
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSetupService(null)}>Close</Button>
            <Button onClick={() => {
              alert("In a real environment, this would verify the newly added secrets.");
              setSetupService(null);
            }}>Verify Connection</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
