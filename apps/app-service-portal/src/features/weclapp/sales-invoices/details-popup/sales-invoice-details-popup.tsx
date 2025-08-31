import { FeSalesInvoice } from "@/types/weclapp/sales-invoice";

import { SalesInvoiceItemsList } from "./sales-invoice-items-list";
import { SalesInvoiceDocumentsList } from "./sales-invoice-documents-list";
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



interface SalesInvoiceDetailsPopupProps {
  salesInvoice?: FeSalesInvoice;
  onClose: () => void;
}

export const SalesInvoiceDetailsPopup = ({
  salesInvoice,
  onClose,
}: SalesInvoiceDetailsPopupProps) => {
  // Early return if no salesInvoice
  if (!salesInvoice) {
    return null;
  }

  return (
    <Dialog open={!!salesInvoice} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">
                Sales Invoice Details
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Details of the selected sales invoice, including items and documents.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Sales Invoice Summary */}
          <div className="flex justify-between items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Number
              </p>
              <p className="text-sm">{salesInvoice.number}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Customer
              </p>
              <p className="text-sm">{salesInvoice.customer}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Gross Amount
              </p>
              <p className="text-sm">{salesInvoice.grossAmount}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Net Amount
              </p>
              <p className="text-sm">{salesInvoice.netAmount}</p>
            </div>
            <div className="flex justify-end">
              <Badge variant="outline" >{salesInvoice.status}</Badge>
            </div>
          </div>
          <Tabs defaultValue="items">
            <TabsList>
              <TabsTrigger value="items">Items</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="items">
              <SalesInvoiceItemsList salesInvoice={salesInvoice} />
            </TabsContent>
            <TabsContent value="documents">
              <SalesInvoiceDocumentsList salesInvoiceId={salesInvoice.id} />
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
