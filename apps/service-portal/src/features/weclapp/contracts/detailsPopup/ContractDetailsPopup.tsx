import { FeContract } from "@/types/weclapp/contract";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ContractItemsList } from "./ContractItemsList";
import { ContractDocumentsList } from "./ContractDocumentsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface ContractDetailsPopupProps {
  contract?: FeContract;
  onClose: () => void;
}

export const ContractDetailsPopup = ({
  contract,
  onClose,
}: ContractDetailsPopupProps) => {
  // Early return if no contract

  console.log("contract", contract);
  if (!contract) {
    return null;
  }
  return (
    <Dialog open={!!contract} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold">
                Contract Details
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground mt-1">
                Details of the selected contract, including items and documents.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contract Summary */}
          <div className="flex justify-between items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Number
              </p>
              <p className="text-sm">{contract.number}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Customer
              </p>
              <p className="text-sm">{contract.customer}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Start Date
              </p>
              <p className="text-sm">{contract.startDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                End Date
              </p>
              <p className="text-sm">{contract.endDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Min Warning
              </p>
              <p className="text-sm">{contract.latestCancellationWarningQuantity} {contract.latestCancellationWarningUnit}</p>
            </div>
            <div className="flex justify-end">
              <Badge variant="outline" >{contract.status}</Badge>
            </div>
          </div>
          <Tabs defaultValue="items">
            <TabsList>
              <TabsTrigger value="items">Items</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="items">
              <ContractItemsList contract={contract} />
            </TabsContent>
            <TabsContent value="documents">
              <ContractDocumentsList contractId={contract.id} />
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
