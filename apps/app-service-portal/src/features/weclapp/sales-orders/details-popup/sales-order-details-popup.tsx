import { FeSalesOrder } from "@/types/weclapp/sales-order";


import { SalesOrderItemsList } from "./sales-order-items-list";
import { SalesOrderDocumentsList } from "./sales-order-documents-list";
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@repo/pkg-frontend-common-kit/components";



interface SalesOrderDetailsPopupProps {
  salesOrder?: FeSalesOrder;
  onClose: () => void;
}

export const SalesOrderDetailsPopup = ({
  salesOrder,
  onClose,
}: SalesOrderDetailsPopupProps) => {
  // Early return if no salesOrder
  if (!salesOrder) {
    return null;
  }

  return (
    <Dialog open={!!salesOrder} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">
                Sales Order Details
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Details of the selected sales order, including items and documents.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Sales Order Summary */}
          <div className="flex justify-between items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Number
              </p>
              <p className="text-sm">{salesOrder.number}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Customer
              </p>
              <p className="text-sm">{salesOrder.customer}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Gross Amount
              </p>
              <p className="text-sm">{salesOrder.grossAmount}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Net Amount
              </p>
              <p className="text-sm">{salesOrder.netAmount}</p>
            </div>
            <div className="flex justify-end">
              <Badge variant="outline" >{salesOrder.status}</Badge>
            </div>
          </div>
          <Tabs defaultValue="items">
            <TabsList>
              <TabsTrigger value="items">Items</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="items">
              <SalesOrderItemsList salesOrder={salesOrder} />
            </TabsContent>
            <TabsContent value="documents">
              <SalesOrderDocumentsList salesOrderId={salesOrder.id} />
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
