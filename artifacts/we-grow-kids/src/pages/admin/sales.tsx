import { useState } from "react";
import { 
  useListOrders, 
  useUpdateOrder,
  useGetSalesSummary,
  useListProducts
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { getListOrdersQueryKey } from "@workspace/api-client-react";
import { format, parseISO } from "date-fns";
import { 
  ShoppingBag, 
  TrendingUp, 
  Book, 
  GraduationCap, 
  Download, 
  Edit2,
  DollarSign
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

const PAYMENT_COLORS: Record<string, string> = {
  "Paid": "bg-green-100 text-green-800 border-green-200",
  "Pending": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Refunded": "bg-gray-100 text-gray-800 border-gray-200",
  "Failed": "bg-red-100 text-red-800 border-red-200",
};

const FULFILLMENT_COLORS: Record<string, string> = {
  "Unfulfilled": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Fulfilled": "bg-green-100 text-green-800 border-green-200",
  "Shipped": "bg-blue-100 text-blue-800 border-blue-200",
  "Cancelled": "bg-red-100 text-red-800 border-red-200",
  "N/A": "bg-gray-100 text-gray-800 border-gray-200"
};

export default function AdminSales() {
  const queryClient = useQueryClient();
  const { data: ordersData, isLoading: isLoadingOrders } = useListOrders({ limit: 100 });
  const { data: summaryData, isLoading: isLoadingSummary } = useGetSalesSummary();
  const { data: productsData } = useListProducts();
  
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const updateOrder = useUpdateOrder({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListOrdersQueryKey() });
        setSelectedOrder(null);
      }
    }
  });

  const exportCsv = () => {
    if (!ordersData?.orders) return;
    const headers = ["Order ID", "Date", "Buyer", "Email", "Product", "Quantity", "Gross", "Net", "Payment Status", "Fulfillment Status"];
    const csvContent = [
      headers.join(","),
      ...ordersData.orders.map(o => [
        o.id, 
        o.orderDate,
        `"${o.buyerName}"`,
        o.buyerEmail,
        `"${productsData?.products.find(p => p.id === o.productId)?.name || 'Unknown'}"`,
        o.quantity,
        (o.grossAmountInCents / 100).toFixed(2),
        (o.netAmountInCents / 100).toFixed(2),
        o.paymentStatus,
        o.fulfillmentStatus
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `sales_export_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getProductName = (id?: number | null) => {
    if (!id) return 'Manual Order';
    return productsData?.products.find(p => p.id === id)?.name || 'Unknown Product';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Sales & Revenue</h1>
          <p className="text-muted-foreground mt-1">Track payments, book sales, and curriculum orders.</p>
        </div>
        <Button onClick={exportCsv} variant="outline" className="bg-white shadow-sm">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <CardTitle className="text-sm text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-serif">${((summaryData?.totalRevenue || 0) / 100).toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <CardTitle className="text-sm text-muted-foreground">Orders</CardTitle>
            <ShoppingBag className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-serif">{summaryData?.totalOrders || 0}</div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <CardTitle className="text-sm text-muted-foreground">Book Revenue</CardTitle>
            <Book className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-serif">${((summaryData?.bookRevenue || 0) / 100).toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <CardTitle className="text-sm text-muted-foreground">Curriculum Rev</CardTitle>
            <GraduationCap className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-serif">${((summaryData?.curriculumRevenue || 0) / 100).toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border/40 bg-muted/20 flex justify-between items-center">
          <h2 className="font-serif font-bold text-lg">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/10">
                <TableHead>Date</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Net Amount</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Fulfillment</TableHead>
                <TableHead className="text-right">Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingOrders ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">Loading orders...</TableCell>
                </TableRow>
              ) : ordersData?.orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">No orders found.</TableCell>
                </TableRow>
              ) : (
                ordersData?.orders.map(order => (
                  <TableRow key={order.id} className="cursor-pointer hover:bg-muted/30" onClick={() => setSelectedOrder(order)}>
                    <TableCell className="text-sm">{format(parseISO(order.orderDate), 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      <div className="font-medium">{order.buyerName}</div>
                      <div className="text-xs text-muted-foreground">{order.buyerEmail}</div>
                    </TableCell>
                    <TableCell className="text-sm max-w-[200px] truncate">
                      {getProductName(order.productId)} 
                      <span className="text-xs text-muted-foreground ml-2">x{order.quantity}</span>
                    </TableCell>
                    <TableCell className="font-medium text-emerald-700">
                      ${(order.netAmountInCents / 100).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={PAYMENT_COLORS[order.paymentStatus] || PAYMENT_COLORS["Pending"]}>
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={FULFILLMENT_COLORS[order.fulfillmentStatus] || FULFILLMENT_COLORS["N/A"]}>
                        {order.fulfillmentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      {order.dataSource === 'stripe' ? (
                        <span className="flex justify-end items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" /> Stripe</span>
                      ) : (
                        <span className="flex justify-end items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-400 inline-block" /> Manual</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Edit Order Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-serif">Edit Order #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4 py-2">
              <div className="bg-muted/30 p-3 rounded-lg border border-border/40 text-sm space-y-1">
                <div><strong>Buyer:</strong> {selectedOrder.buyerName} ({selectedOrder.buyerEmail})</div>
                <div><strong>Product:</strong> {getProductName(selectedOrder.productId)}</div>
                <div><strong>Net Total:</strong> ${(selectedOrder.netAmountInCents / 100).toFixed(2)}</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Payment Status</label>
                  <Select 
                    defaultValue={selectedOrder.paymentStatus} 
                    onValueChange={(val) => updateOrder.mutate({ id: selectedOrder.id, data: { paymentStatus: val }})}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Refunded">Refunded</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Fulfillment Status</label>
                  <Select 
                    defaultValue={selectedOrder.fulfillmentStatus} 
                    onValueChange={(val) => updateOrder.mutate({ id: selectedOrder.id, data: { fulfillmentStatus: val }})}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Unfulfilled">Unfulfilled</SelectItem>
                      <SelectItem value="Fulfilled">Fulfilled</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                      <SelectItem value="N/A">N/A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Admin Notes</label>
                <Textarea 
                  defaultValue={selectedOrder.notes || ""} 
                  placeholder="Internal notes about this order..."
                  onBlur={(e) => {
                    if (e.target.value !== selectedOrder.notes) {
                      updateOrder.mutate({ id: selectedOrder.id, data: { notes: e.target.value }});
                    }
                  }}
                />
                <p className="text-xs text-muted-foreground">Changes to notes save automatically on blur.</p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setSelectedOrder(null)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
