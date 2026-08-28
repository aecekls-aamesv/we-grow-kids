import { useState } from "react";
import { 
  useListBookings, 
  useUpdateBooking,
  useListAvailabilitySlots,
  useCreateAvailabilitySlot,
  useDeleteAvailabilitySlot
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getListBookingsQueryKey, getListAvailabilitySlotsQueryKey } from "@workspace/api-client-react";
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday } from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Plus, Video, MapPin, User, Mail, FileText, CheckCircle2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const STATUS_COLORS: Record<string, string> = {
  "Pending": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Confirmed": "bg-green-100 text-green-800 border-green-200",
  "Completed": "bg-blue-100 text-blue-800 border-blue-200",
  "Cancelled": "bg-gray-100 text-gray-800 border-gray-200",
  "No-Show": "bg-red-100 text-red-800 border-red-200"
};

export default function AdminCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("month");
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [isAddAvailabilityOpen, setIsAddAvailabilityOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const queryClient = useQueryClient();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get data for the current month view
  const { data: bookingsData, isLoading: isLoadingBookings } = useListBookings({
    startDate: format(monthStart, 'yyyy-MM-dd'),
    endDate: format(monthEnd, 'yyyy-MM-dd'),
  });

  const { data: slotsData } = useListAvailabilitySlots({
    startDate: format(monthStart, 'yyyy-MM-dd'),
    endDate: format(monthEnd, 'yyyy-MM-dd'),
  });

  const updateBooking = useUpdateBooking({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListBookingsQueryKey() });
        setSelectedBooking(null);
      }
    }
  });

  const createSlot = useCreateAvailabilitySlot({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListAvailabilitySlotsQueryKey() });
        setIsAddAvailabilityOpen(false);
      }
    }
  });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const today = () => setCurrentDate(new Date());

  const filteredBookings = bookingsData?.bookings.filter(b => statusFilter === "all" || b.status === statusFilter) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground mt-1">Schedule and manage sessions and consultations.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setIsAddAvailabilityOpen(true)} className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm">
            <Clock className="w-4 h-4 mr-2" /> Add Availability
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> New Booking
          </Button>
        </div>
      </div>

      <Card className="border-border/50 shadow-sm p-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-md border border-border bg-background p-1 shadow-sm">
              <Button variant="ghost" size="icon" onClick={prevMonth} className="h-8 w-8 rounded-sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" onClick={today} className="h-8 px-3 rounded-sm font-medium">
                Today
              </Button>
              <Button variant="ghost" size="icon" onClick={nextMonth} className="h-8 w-8 rounded-sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <h2 className="text-2xl font-serif font-bold min-w-[150px]">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex gap-2 flex-wrap max-w-sm">
              {['all', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map(s => (
                <Badge 
                  key={s} 
                  variant={statusFilter === s ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setStatusFilter(s)}
                >
                  {s === 'all' ? 'All' : s}
                </Badge>
              ))}
            </div>
            <Tabs value={view} onValueChange={setView} className="w-[200px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="agenda">Agenda</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="border border-border/60 rounded-xl overflow-hidden bg-background">
          <div className="grid grid-cols-7 border-b border-border/60 bg-muted/20">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="py-3 text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 auto-rows-[120px]">
            {/* Pad start of month */}
            {Array.from({ length: monthStart.getDay() }).map((_, i) => (
              <div key={`empty-${i}`} className="border-b border-r border-border/40 bg-muted/5 p-2" />
            ))}
            
            {/* Days */}
            {daysInMonth.map((day, i) => {
              const dayBookings = filteredBookings.filter(b => b.scheduledDate === format(day, 'yyyy-MM-dd'));
              const daySlots = slotsData?.slots.filter(s => s.date === format(day, 'yyyy-MM-dd')) || [];
              const isCurrentDay = isToday(day);
              
              return (
                <div key={day.toString()} className={`border-b border-r border-border/40 p-2 overflow-y-auto ${!isSameMonth(day, currentDate) ? 'bg-muted/10 opacity-50' : ''} ${isCurrentDay ? 'bg-primary/5' : ''}`}>
                  <div className={`text-right text-sm font-medium mb-1 ${isCurrentDay ? 'text-primary' : 'text-muted-foreground'}`}>
                    <span className={isCurrentDay ? 'bg-primary text-white rounded-full w-7 h-7 inline-flex items-center justify-center' : ''}>
                      {format(day, 'd')}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {dayBookings.map(b => (
                      <div 
                        key={b.id}
                        onClick={() => setSelectedBooking(b)}
                        className={`text-xs p-1 px-2 rounded truncate cursor-pointer shadow-sm border ${STATUS_COLORS[b.status]}`}
                      >
                        {b.scheduledStartTime.substring(0, 5)} - {b.parentName}
                      </div>
                    ))}
                    {daySlots.filter(s => !s.isBooked).map(s => (
                      <div key={`slot-${s.id}`} className="text-[10px] p-1 px-2 rounded truncate bg-muted/40 text-muted-foreground border border-dashed border-border flex items-center justify-between">
                        <span>{s.startTime.substring(0,5)} Slot</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            
            {/* Pad end of month */}
            {Array.from({ length: 6 - monthEnd.getDay() }).map((_, i) => (
              <div key={`empty-end-${i}`} className="border-b border-r border-border/40 bg-muted/5 p-2" />
            ))}
          </div>
        </div>
      </Card>

      {/* Booking Details Modal */}
      <Dialog open={!!selectedBooking} onOpenChange={(open) => !open && setSelectedBooking(null)}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedBooking && (
            <>
              <DialogHeader>
                <div className="flex justify-between items-start pr-6">
                  <DialogTitle className="text-xl font-serif">{selectedBooking.type} with {selectedBooking.parentName}</DialogTitle>
                  <Badge variant="outline" className={STATUS_COLORS[selectedBooking.status]}>{selectedBooking.status}</Badge>
                </div>
              </DialogHeader>
              
              <div className="space-y-4 my-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex gap-2">
                    <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                    <span>{format(parseISO(selectedBooking.scheduledDate), 'EEEE, MMM d, yyyy')}</span>
                  </div>
                  <div className="flex gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{selectedBooking.scheduledStartTime.substring(0,5)} {selectedBooking.scheduledEndTime && `- ${selectedBooking.scheduledEndTime.substring(0,5)}`}</span>
                  </div>
                </div>

                <div className="bg-muted/20 p-4 rounded-lg border border-border/40 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" /> 
                    <span className="font-medium">{selectedBooking.parentName}</span>
                    {selectedBooking.learnerFirstName && <span className="text-muted-foreground">(Learner: {selectedBooking.learnerFirstName})</span>}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" /> {selectedBooking.parentEmail}
                  </div>
                  {selectedBooking.zoomJoinUrl ? (
                    <div className="flex items-center gap-2 text-sm">
                      <Video className="w-4 h-4 text-blue-500" /> 
                      <a href={selectedBooking.zoomJoinUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline truncate">Join Zoom Meeting</a>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" /> In-person or TBD
                    </div>
                  )}
                </div>

                {selectedBooking.notes && (
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground flex items-center gap-1"><FileText className="w-3 h-3" /> Client Notes</Label>
                    <div className="text-sm bg-muted/10 p-3 rounded-md border border-border/30 whitespace-pre-wrap">{selectedBooking.notes}</div>
                  </div>
                )}
              </div>

              <DialogFooter className="flex justify-between items-center sm:justify-between border-t pt-4">
                <div className="flex gap-2">
                  {selectedBooking.status === "Pending" && (
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => updateBooking.mutate({ id: selectedBooking.id, data: { status: "Confirmed" }})}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Confirm
                    </Button>
                  )}
                  {selectedBooking.status !== "Cancelled" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200"
                      onClick={() => {
                        const reason = prompt("Reason for cancellation?");
                        if (reason !== null) updateBooking.mutate({ id: selectedBooking.id, data: { status: "Cancelled", cancellationReason: reason }});
                      }}
                    >
                      <XCircle className="w-4 h-4 mr-1" /> Cancel
                    </Button>
                  )}
                </div>
                <Button variant="secondary" onClick={() => setSelectedBooking(null)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Availability Modal placeholder */}
      <Dialog open={isAddAvailabilityOpen} onOpenChange={setIsAddAvailabilityOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Availability Slot</DialogTitle>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" id="slot-date" defaultValue={format(currentDate, 'yyyy-MM-dd')} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Input type="time" id="slot-start" defaultValue="09:00" />
              </div>
              <div className="space-y-2">
                <Label>End Time</Label>
                <Input type="time" id="slot-end" defaultValue="10:00" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Service Type</Label>
              <Input placeholder="e.g. Tutoring, Consultation" id="slot-type" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddAvailabilityOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              // Basic raw extraction just for demo flow completeness
              const date = (document.getElementById("slot-date") as HTMLInputElement)?.value;
              const start = (document.getElementById("slot-start") as HTMLInputElement)?.value + ":00";
              const end = (document.getElementById("slot-end") as HTMLInputElement)?.value + ":00";
              const type = (document.getElementById("slot-type") as HTMLInputElement)?.value || "General";
              
              if(date && start && end) {
                createSlot.mutate({ data: { date, startTime: start, endTime: end, serviceType: type }});
              }
            }}>Add Slot</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
