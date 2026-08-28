import { useState } from "react";
import { 
  useListLeads, 
  useCreateLead, 
  useUpdateLead, 
  useDeleteLead,
  useGetLead,
  useGetLeadActivities,
  useCreateLeadActivity
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getListLeadsQueryKey, getGetLeadQueryKey, getGetLeadActivitiesQueryKey } from "@workspace/api-client-react";
import { format, parseISO } from "date-fns";
import { Search, Plus, Filter, MoreHorizontal, User, Mail, Phone, Calendar, Clock, Trash2, Edit2, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const STAGE_COLORS: Record<string, string> = {
  "New": "bg-blue-100 text-blue-800 border-blue-200",
  "Contacted": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Consultation Booked": "bg-purple-100 text-purple-800 border-purple-200",
  "Converted": "bg-green-100 text-green-800 border-green-200",
  "Follow-Up": "bg-orange-100 text-orange-800 border-orange-200",
  "Closed": "bg-gray-100 text-gray-800 border-gray-200"
};

export default function AdminLeads() {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [selectedLeadId, setSelectedLeadId] = useState<number | null>(null);
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);
  
  const queryClient = useQueryClient();
  
  const { data: leadsData, isLoading } = useListLeads({ 
    q: search || undefined, 
    stage: stageFilter !== "all" ? stageFilter : undefined,
    limit: 50
  });

  const deleteLead = useDeleteLead({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListLeadsQueryKey() });
        setSelectedLeadId(null);
      }
    }
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this lead? This action cannot be undone.")) {
      deleteLead.mutate({ id });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Leads & CRM</h1>
          <p className="text-muted-foreground mt-1">Manage inquiries, consultations, and client relationships.</p>
        </div>
        <Button onClick={() => setIsNewLeadOpen(true)} className="bg-primary hover:bg-primary/90 text-white shadow-sm">
          <Plus className="w-4 h-4 mr-2" /> New Lead
        </Button>
      </div>

      <Card className="border-border/50 shadow-sm">
        <div className="p-4 border-b border-border/40 bg-muted/10 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search parent or learner name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={stageFilter} onValueChange={setStageFilter}>
              <SelectTrigger className="w-[180px] bg-background">
                <SelectValue placeholder="Filter by Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Consultation Booked">Consultation Booked</SelectItem>
                <SelectItem value="Follow-Up">Follow-Up</SelectItem>
                <SelectItem value="Converted">Converted</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead>Parent Name</TableHead>
                <TableHead>Learner</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">Loading...</TableCell>
                </TableRow>
              ) : leadsData?.leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No leads found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                leadsData?.leads.map((lead) => (
                  <TableRow key={lead.id} className="group cursor-pointer" onClick={() => setSelectedLeadId(lead.id)}>
                    <TableCell>
                      <div className="font-medium text-foreground">{lead.parentName}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Mail className="w-3 h-3" /> {lead.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      {lead.learnerFirstName ? (
                        <div>
                          <span>{lead.learnerFirstName}</span>
                          {lead.learnerGrade && <span className="text-xs text-muted-foreground ml-2">({lead.learnerGrade})</span>}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-xs italic">Not provided</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {lead.requestedService || <span className="text-muted-foreground text-xs italic">Any</span>}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={STAGE_COLORS[lead.stage] || STAGE_COLORS["New"]}>
                        {lead.stage}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(parseISO(lead.createdAt), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setSelectedLeadId(lead.id); }}>
                            <Edit2 className="w-4 h-4 mr-2" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                            onClick={(e) => { e.stopPropagation(); handleDelete(lead.id); }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" /> Delete Lead
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Details Sheet */}
      <Sheet open={selectedLeadId !== null} onOpenChange={(open) => !open && setSelectedLeadId(null)}>
        <SheetContent className="w-full sm:max-w-md md:max-w-lg overflow-y-auto">
          {selectedLeadId && <LeadDetails leadId={selectedLeadId} />}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function LeadDetails({ leadId }: { leadId: number }) {
  const queryClient = useQueryClient();
  const { data: lead, isLoading } = useGetLead(leadId);
  const { data: activities } = useGetLeadActivities(leadId);
  
  const updateLead = useUpdateLead({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetLeadQueryKey(leadId) });
        queryClient.invalidateQueries({ queryKey: getListLeadsQueryKey() });
      }
    }
  });

  const addActivity = useCreateLeadActivity({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetLeadActivitiesQueryKey(leadId) });
        setNewNote("");
      }
    }
  });

  const [newNote, setNewNote] = useState("");

  if (isLoading || !lead) return <div className="p-8 text-center">Loading details...</div>;

  return (
    <div className="space-y-6 pb-12">
      <SheetHeader className="border-b pb-4">
        <div className="flex justify-between items-start">
          <div>
            <SheetTitle className="text-2xl font-serif">{lead.parentName}</SheetTitle>
            <SheetDescription className="flex items-center gap-2 mt-1">
              <Mail className="w-3 h-3" /> {lead.email}
              {lead.phone && <><span className="mx-1">•</span> <Phone className="w-3 h-3" /> {lead.phone}</>}
            </SheetDescription>
          </div>
          <Select 
            value={lead.stage} 
            onValueChange={(val) => updateLead.mutate({ id: leadId, data: { stage: val } })}
          >
            <SelectTrigger className={`w-[140px] h-8 text-xs ${STAGE_COLORS[lead.stage]}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(STAGE_COLORS).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </SheetHeader>

      <div className="space-y-6 mt-4">
        <section>
          <h3 className="font-semibold mb-3 flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Learner Info</h3>
          <Card className="bg-muted/20 shadow-none border-border/40">
            <CardContent className="p-4 grid grid-cols-2 gap-4 text-sm">
              <div><span className="text-muted-foreground block mb-1">Name</span> {lead.learnerFirstName || '-'}</div>
              <div><span className="text-muted-foreground block mb-1">Age / Grade</span> {lead.learnerAge || '-'} / {lead.learnerGrade || '-'}</div>
              <div className="col-span-2"><span className="text-muted-foreground block mb-1">Subjects</span> {lead.subject || '-'}</div>
              <div className="col-span-2"><span className="text-muted-foreground block mb-1">Goals</span> {lead.goals || '-'}</div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h3 className="font-semibold mb-3 flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> Service Request</h3>
          <Card className="bg-muted/20 shadow-none border-border/40">
            <CardContent className="p-4 text-sm space-y-3">
              <div><span className="text-muted-foreground block mb-1">Requested Service</span> {lead.requestedService || '-'}</div>
              <div><span className="text-muted-foreground block mb-1">Preferred Dates</span> {lead.preferredDates || '-'}</div>
              <div><span className="text-muted-foreground block mb-1">Source</span> {lead.source || lead.hearAboutUs || '-'}</div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h3 className="font-semibold mb-3 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-primary" /> Notes & Activity</h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Textarea 
                placeholder="Add an internal note..." 
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="min-h-[80px] resize-none"
              />
            </div>
            <div className="flex justify-end">
              <Button 
                size="sm" 
                disabled={!newNote.trim() || addActivity.isPending}
                onClick={() => addActivity.mutate({ 
                  id: leadId, 
                  data: { type: "note", content: newNote } 
                })}
              >
                Add Note
              </Button>
            </div>

            <div className="border-t pt-4 space-y-4">
              {activities?.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No activities yet.</p>
              ) : (
                activities?.map(act => (
                  <div key={act.id} className="flex gap-3 text-sm p-3 bg-muted/10 rounded-lg border border-border/30">
                    <div className="mt-1">
                      {act.type === 'note' ? <MessageSquare className="w-4 h-4 text-amber-500" /> : 
                       act.type === 'email' ? <Mail className="w-4 h-4 text-blue-500" /> :
                       <Clock className="w-4 h-4 text-gray-400" />}
                    </div>
                    <div>
                      <div className="font-medium">{act.type === 'note' ? 'Internal Note' : act.subject || act.type}</div>
                      {act.content && <div className="text-muted-foreground mt-1 whitespace-pre-wrap">{act.content}</div>}
                      <div className="text-xs text-muted-foreground mt-2">
                        {format(parseISO(act.createdAt), 'MMM d, h:mm a')} {act.performedBy && `by ${act.performedBy}`}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
