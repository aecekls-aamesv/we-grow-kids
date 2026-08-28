import { 
  useGetDashboardSummary, 
  useGetDashboardTrends, 
  useGetActivityFeed 
} from "@workspace/api-client-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { 
  Users, 
  CalendarCheck, 
  GraduationCap, 
  TrendingUp, 
  DollarSign, 
  AlertCircle,
  Clock,
  MessageSquare
} from "lucide-react";
import { format, parseISO, formatDistanceToNow } from "date-fns";

export default function AdminDashboard() {
  const { data: summary, isLoading: isLoadingSummary } = useGetDashboardSummary();
  const { data: trends, isLoading: isLoadingTrends } = useGetDashboardTrends({ days: 30 });
  const { data: activities, isLoading: isLoadingActivities } = useGetActivityFeed({ limit: 10 });

  if (isLoadingSummary || isLoadingTrends || isLoadingActivities) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-serif font-bold animate-pulse text-transparent bg-muted rounded w-48 h-10"></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-10 bg-muted/50"></CardHeader>
              <CardContent className="h-20"></CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const statCards = [
    { title: "New Inquiries", value: summary?.newInquiries || 0, icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Consultations", value: summary?.consultationsBooked || 0, icon: CalendarCheck, color: "text-purple-500", bg: "bg-purple-50" },
    { title: "Tutoring Sessions", value: summary?.tutoringSessionsThisMonth || 0, icon: GraduationCap, color: "text-green-500", bg: "bg-green-50" },
    { title: "Conversion Rate", value: `${summary?.conversionRate || 0}%`, icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-50" },
    { title: "Total Revenue", value: `$${((summary?.totalRevenue || 0) / 100).toFixed(2)}`, icon: DollarSign, color: "text-emerald-500", bg: "bg-emerald-50" },
    { title: "Follow-Ups Needed", value: summary?.outstandingFollowUps || 0, icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-serif font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your operations and recent activity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, i) => (
          <Card key={i} className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-serif">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="col-span-1 lg:col-span-2 shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="font-serif">30-Day Activity Trends</CardTitle>
          </CardHeader>
          <CardContent>
            {trends?.inquiriesByDay?.length ? (
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trends.inquiriesByDay} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(val) => format(parseISO(val), 'MMM d')} 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                    />
                    <Tooltip 
                      labelFormatter={(val) => format(parseISO(val as string), 'MMM d, yyyy')}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line 
                      type="monotone" 
                      name="Inquiries"
                      dataKey="value" 
                      stroke="#2563eb" 
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
                Not enough data to display trends.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="col-span-1 shadow-sm border-border/50 flex flex-col h-[400px]">
          <CardHeader className="pb-3 border-b border-border/40">
            <CardTitle className="font-serif flex items-center gap-2 text-lg">
              <Clock className="w-5 h-5 text-primary" /> Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0">
            {activities && activities.length > 0 ? (
              <div className="divide-y divide-border/40">
                {activities.map((activity) => (
                  <div key={activity.id} className="p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex gap-3">
                      <div className="mt-0.5">
                        {activity.type === 'lead_created' ? <Users className="w-4 h-4 text-blue-500" /> :
                         activity.type === 'booking_created' ? <CalendarCheck className="w-4 h-4 text-purple-500" /> :
                         activity.type === 'note_added' ? <MessageSquare className="w-4 h-4 text-amber-500" /> :
                         <AlertCircle className="w-4 h-4 text-gray-400" />}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm text-foreground leading-snug">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(parseISO(activity.createdAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
                <Clock className="w-10 h-10 mb-3 opacity-20" />
                <p>No recent activity.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
