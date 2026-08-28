import { useState } from "react";
import { 
  useListSocialPosts, 
  useCreateSocialPost,
  useUpdateSocialPost,
  useDeleteSocialPost
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getListSocialPostsQueryKey } from "@workspace/api-client-react";
import { format, parseISO } from "date-fns";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Share2, 
  Plus, 
  Calendar as CalendarIcon, 
  List, 
  Image as ImageIcon,
  CheckCircle2,
  Trash2
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PLATFORM_ICONS: Record<string, any> = {
  "Instagram": Instagram,
  "Facebook": Facebook,
  "Twitter": Twitter,
  "LinkedIn": Share2
};

const PLATFORM_COLORS: Record<string, string> = {
  "Instagram": "text-pink-600 bg-pink-100",
  "Facebook": "text-blue-600 bg-blue-100",
  "Twitter": "text-sky-500 bg-sky-100",
  "LinkedIn": "text-blue-800 bg-blue-100"
};

const STATUS_COLORS: Record<string, string> = {
  "Idea": "bg-gray-100 text-gray-800",
  "Draft": "bg-yellow-100 text-yellow-800",
  "Needs Approval": "bg-orange-100 text-orange-800",
  "Approved": "bg-emerald-100 text-emerald-800",
  "Scheduled": "bg-blue-100 text-blue-800",
  "Published": "bg-green-100 text-green-800 border-green-200",
  "Failed": "bg-red-100 text-red-800"
};

export default function AdminSocial() {
  const queryClient = useQueryClient();
  const { data: postsData, isLoading } = useListSocialPosts();
  const [view, setView] = useState("calendar");
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [isNewOpen, setIsNewOpen] = useState(false);

  const createPost = useCreateSocialPost({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListSocialPostsQueryKey() });
        setIsNewOpen(false);
      }
    }
  });

  const updatePost = useUpdateSocialPost({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListSocialPostsQueryKey() });
      }
    }
  });

  const deletePost = useDeleteSocialPost({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListSocialPostsQueryKey() });
        setSelectedPost(null);
      }
    }
  });

  const handleCreate = (data: any) => {
    createPost.mutate({ data });
  };

  const handleUpdate = (id: number, data: any) => {
    updatePost.mutate({ id, data });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Social Planner</h1>
          <p className="text-muted-foreground mt-1">Plan, approve, and schedule content across platforms.</p>
        </div>
        <div className="flex gap-2">
          <Tabs value={view} onValueChange={setView} className="w-[120px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list"><List className="w-4 h-4" /></TabsTrigger>
              <TabsTrigger value="calendar"><CalendarIcon className="w-4 h-4" /></TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={() => setIsNewOpen(true)} className="bg-primary hover:bg-primary/90 text-white shadow-sm">
            <Plus className="w-4 h-4 mr-2" /> New Post
          </Button>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md flex gap-3 shadow-sm">
        <Share2 className="text-blue-500 w-5 h-5 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-blue-800 font-semibold text-sm">Automated Publishing Note</h3>
          <p className="text-blue-700 text-sm mt-1">
            Posts marked as "Scheduled" will only publish automatically if the corresponding platform is connected in the Integrations tab. Always ensure content is "Approved" before scheduling.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="py-12 text-center text-muted-foreground">Loading posts...</div>
      ) : (
        <>
          {view === "list" ? (
            <div className="space-y-4">
              {postsData?.posts.map(post => {
                const Icon = PLATFORM_ICONS[post.platform] || Share2;
                return (
                  <Card key={post.id} className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setSelectedPost(post)}>
                    <CardContent className="p-4 flex gap-4 items-center">
                      <div className={`p-3 rounded-full ${PLATFORM_COLORS[post.platform] || "bg-gray-100"}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className={STATUS_COLORS[post.status]}>{post.status}</Badge>
                          <span className="text-sm font-medium text-muted-foreground">{post.platform}</span>
                          {post.scheduledAt && (
                            <span className="text-sm text-muted-foreground ml-auto">
                              <CalendarIcon className="w-3 h-3 inline mr-1" />
                              {format(parseISO(post.scheduledAt), 'MMM d, h:mm a')}
                            </span>
                          )}
                        </div>
                        <p className="text-sm line-clamp-2 text-foreground">{post.caption || <span className="italic text-muted-foreground">No caption</span>}</p>
                      </div>
                      {post.mediaUrl && (
                        <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center overflow-hidden border border-border">
                          <img src={post.mediaUrl} alt="Media" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {postsData?.posts.map(post => {
                const Icon = PLATFORM_ICONS[post.platform] || Share2;
                return (
                  <Card key={post.id} className="cursor-pointer hover:shadow-md transition-shadow flex flex-col h-full" onClick={() => setSelectedPost(post)}>
                    {post.mediaUrl ? (
                      <div className="h-40 w-full bg-muted border-b relative">
                        <img src={post.mediaUrl} alt="Media" className="w-full h-full object-cover" />
                        <div className={`absolute top-2 right-2 p-1.5 rounded-full ${PLATFORM_COLORS[post.platform] || "bg-white"} shadow-sm`}>
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                    ) : (
                      <div className="h-24 w-full bg-muted/30 border-b flex items-center justify-center relative">
                        <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
                        <div className={`absolute top-2 right-2 p-1.5 rounded-full ${PLATFORM_COLORS[post.platform] || "bg-white"} shadow-sm`}>
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                    <CardContent className="p-4 flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className={`text-[10px] ${STATUS_COLORS[post.status]}`}>{post.status}</Badge>
                      </div>
                      <p className="text-sm line-clamp-3 mb-2">{post.caption || <span className="italic text-muted-foreground">No caption</span>}</p>
                    </CardContent>
                    {post.scheduledAt && (
                      <CardFooter className="p-3 bg-muted/20 border-t text-xs text-muted-foreground">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        {format(parseISO(post.scheduledAt), 'MMM d, h:mm a')}
                      </CardFooter>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Editor Sheet */}
      <Sheet open={!!selectedPost || isNewOpen} onOpenChange={(open) => {
        if (!open) {
          setSelectedPost(null);
          setIsNewOpen(false);
        }
      }}>
        <SheetContent className="w-full sm:max-w-md overflow-y-auto">
          <PostEditor 
            post={selectedPost} 
            isNew={isNewOpen}
            onClose={() => { setSelectedPost(null); setIsNewOpen(false); }}
            onSave={(data) => {
              if (isNewOpen) handleCreate(data);
              else handleUpdate(selectedPost.id, data);
            }}
            onDelete={selectedPost ? () => {
              if(confirm("Delete this post?")) {
                deletePost.mutate({ id: selectedPost.id });
              }
            } : undefined}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

function PostEditor({ post, isNew, onClose, onSave, onDelete }: any) {
  const [platform, setPlatform] = useState(post?.platform || "Instagram");
  const [status, setStatus] = useState(post?.status || "Idea");
  const [caption, setCaption] = useState(post?.caption || "");
  const [mediaUrl, setMediaUrl] = useState(post?.mediaUrl || "");
  const [scheduledDate, setScheduledDate] = useState(post?.scheduledAt ? post.scheduledAt.substring(0, 10) : "");
  const [scheduledTime, setScheduledTime] = useState(post?.scheduledAt ? post.scheduledAt.substring(11, 16) : "");

  const handleSave = () => {
    let scheduledAt = undefined;
    if (scheduledDate && scheduledTime) {
      scheduledAt = `${scheduledDate}T${scheduledTime}:00Z`;
    }

    onSave({
      platform,
      status,
      caption,
      mediaUrl,
      scheduledAt
    });
    if (!isNew) onClose();
  };

  return (
    <div className="space-y-6 pb-8">
      <SheetHeader className="mb-6">
        <SheetTitle className="text-2xl font-serif">{isNew ? "New Social Post" : "Edit Post"}</SheetTitle>
      </SheetHeader>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Platform</Label>
            <Select value={platform} onValueChange={setPlatform}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="Facebook">Facebook</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                <SelectItem value="Twitter">Twitter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className={STATUS_COLORS[status]}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Idea">Idea</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Needs Approval">Needs Approval</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {status === "Scheduled" && (
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-md grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-blue-800">Schedule Date</Label>
              <Input type="date" value={scheduledDate} onChange={e => setScheduledDate(e.target.value)} className="bg-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-blue-800">Time</Label>
              <Input type="time" value={scheduledTime} onChange={e => setScheduledTime(e.target.value)} className="bg-white" />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label>Media URL (Image/Video)</Label>
          <Input 
            placeholder="https://..." 
            value={mediaUrl} 
            onChange={e => setMediaUrl(e.target.value)} 
          />
          {mediaUrl && (
            <div className="mt-2 h-40 rounded-md overflow-hidden border">
              <img src={mediaUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label>Caption</Label>
          <Textarea 
            placeholder="Write your caption here..." 
            value={caption} 
            onChange={e => setCaption(e.target.value)}
            className="min-h-[150px]"
          />
        </div>

      </div>

      <div className="pt-6 flex justify-between items-center border-t mt-8">
        {onDelete ? (
          <Button variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={onDelete}>
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </Button>
        ) : <div />}
        <div className="flex gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>{isNew ? "Create Post" : "Save Changes"}</Button>
        </div>
      </div>
    </div>
  );
}
