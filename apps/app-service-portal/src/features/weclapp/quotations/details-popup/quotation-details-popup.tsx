import type { WeclappQuotationListItemReadModel } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";

import { QuotationItemsList } from "./quotation-items-list";
import { QuotationDocumentsList } from "./quotation-documents-list";
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



interface QuotationDetailsPopupProps {
  quotation?: WeclappQuotationListItemReadModel;
  onClose: () => void;
}

export const QuotationDetailsPopup = ({
  quotation,
  onClose,
}: QuotationDetailsPopupProps) => {
  // Early return if no quotation
  if (!quotation) {
    return null;
  }

  return (
    <Dialog open={!!quotation} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">
                Quotation Details
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Details of the selected quotation, including items and documents.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quotation Summary */}
          <div className="flex justify-between items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Number
              </p>
              <p className="text-sm">{quotation.number}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Customer
              </p>
              <p className="text-sm">{quotation.customer}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Gross Amount
              </p>
              <p className="text-sm">{quotation.grossAmount}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Net Amount
              </p>
              <p className="text-sm">{quotation.netAmount}</p>
            </div>
            <div className="flex justify-end">
              <Badge variant="outline" >{quotation.status}</Badge>
            </div>
          </div>
          <Tabs defaultValue="items">
            <TabsList>
              <TabsTrigger value="items">Items</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="items">
              <QuotationItemsList quotation={quotation} />
            </TabsContent>
            <TabsContent value="documents">
              <QuotationDocumentsList quotationId={quotation.id} />
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
