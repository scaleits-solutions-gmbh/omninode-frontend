"use client";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Card,
  CardContent,
  Input,
  Label,
  Textarea,
} from "@/components/ui";
import { HelpCircle, MessageSquare, CircleHelp, Headphones, Mail, Phone, Clock, Plus, Bug } from "lucide-react";
import { useState, useRef } from "react";
import { cn } from "@/utils/ui/cn";
import { useAuthedMutation } from "@/hooks";
import { baseOmninodeApiClient, getApiAuthentication } from "@repo/omninode-api-client";
import { FeedbackType } from "@scaleits-solutions-gmbh/omninode-lib-global-common-kit";
import { toast } from "sonner";

function FAQsPopup({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking on 'Forgot Password' on the login page. You'll receive an email with instructions to create a new password."
    },
    {
      question: "How do I switch between companies?",
      answer: "Use the company switcher in the top navigation bar. Click on your current company name and select a different company from the dropdown menu."
    },
    {
      question: "How do I update my profile information?",
      answer: "Go to Account Settings from your user menu in the top right corner. You can edit your profile information and save changes there."
    },
    {
      question: "What should I do if I receive a company invitation?",
      answer: "Click on the invitation link in your email. You'll be redirected to accept the invitation and join the company."
    },
    {
      question: "How do I invite users to my company?",
      answer: "Navigate to your company management section and use the 'Invite User' feature. Enter the user's email address and they'll receive an invitation."
    },
    {
      question: "What browsers are supported?",
      answer: "OmniNode supports all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience."
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CircleHelp className="h-5 w-5" />
            Frequently Asked Questions
          </DialogTitle>
          <DialogDescription>
            Find answers to common questions about using OmniNode.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SupportPopup({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Headphones className="h-5 w-5" />
            Contact Support
          </DialogTitle>
          <DialogDescription>
            Get help from our support team.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Mail className="h-5 w-5" />
              <div>
                <h4 className="font-medium">Email Support</h4>
                <p className="text-sm text-muted-foreground">support@omninode.com</p>
                <p className="text-xs text-muted-foreground">We typically respond within 24 hours</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Phone className="h-5 w-5" />
              <div>
                <h4 className="font-medium">Phone Support</h4>
                <p className="text-sm text-muted-foreground">+49 (0) 123 456 789</p>
                <p className="text-xs text-muted-foreground">Monday - Friday, 9:00 AM - 6:00 PM CET</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Clock className="h-5 w-5" />
              <div>
                <h4 className="font-medium">Business Hours</h4>
                <p className="text-sm text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM CET</p>
                <p className="text-sm text-muted-foreground">Saturday - Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-muted-foreground">
              For urgent issues outside business hours, please email us and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FeedbackPopup({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [selectedFeedbackType, setSelectedFeedbackType] = useState<FeedbackType>(FeedbackType.Feature);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const loadingToastIdRef = useRef<string | number | undefined>(undefined);

  const isValid = subject.trim().length > 0 && description.trim().length > 0;

  const handleKeySelect = (event: React.KeyboardEvent<HTMLDivElement>, type: FeedbackType) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setSelectedFeedbackType(type);
    }
  };

  const publishFeedbackMutation = useAuthedMutation({
    onMutate: () => {
      loadingToastIdRef.current = toast.loading("Submitting feedback...");
    },
    mutationFn: async ({ session }) => {
      return await baseOmninodeApiClient().feedbackMicroservice.publishFeedback({
        request: {
          body: {
            feedbackType: selectedFeedbackType,
            title: subject.trim(),
            description: description.trim(),
          },
        },
        apiAuthentication: getApiAuthentication(session.access_token),
      });
    },
    onSuccess: () => {
      toast.success("Feedback submitted successfully", { id: loadingToastIdRef.current });
      setSubject("");
      setDescription("");
      setSelectedFeedbackType(FeedbackType.Feature);
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(`Failed to submit feedback: ${error.message}`, { id: loadingToastIdRef.current });
    },
    onSettled: () => {
      loadingToastIdRef.current = undefined;
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    publishFeedbackMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Give Feedback
          </DialogTitle>
          <DialogDescription>
            Tell us what to improve, fix, or consider next.
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-5 mt-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-2">
            <div id="type" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Card
                role="button"
                tabIndex={0}
                aria-pressed={selectedFeedbackType === FeedbackType.Feature}
                className={cn(
                  "flex-1 cursor-pointer transition-all",
                  selectedFeedbackType === FeedbackType.Feature
                    ? "ring-2 ring-green-400 border-green-400"
                    : "hover:border-foreground/30"
                )}
                onClick={() => setSelectedFeedbackType(FeedbackType.Feature)}
                onKeyDown={(e) => handleKeySelect(e, FeedbackType.Feature)}
              >
                <CardContent className="h-full py-3 flex flex-col gap-3 items-center justify-center">
                  <Plus className="size-6 text-green-400" />
                  <span className="text-sm font-medium text-center">Feature Request</span>
                </CardContent>
              </Card>
              <Card
                role="button"
                tabIndex={0}
                aria-pressed={selectedFeedbackType === FeedbackType.Bug}
                className={cn(
                  "flex-1 cursor-pointer transition-all",
                  selectedFeedbackType === FeedbackType.Bug
                    ? "ring-2 ring-red-400 border-red-400"
                    : "hover:border-foreground/30"
                )}
                onClick={() => setSelectedFeedbackType(FeedbackType.Bug)}
                onKeyDown={(e) => handleKeySelect(e, FeedbackType.Bug)}
              >
                <CardContent className="h-full py-3 flex flex-col gap-3 items-center justify-center">
                  <Bug className="size-6 text-red-400" />
                  <span className="text-sm font-medium text-center">Bug Report</span>
                </CardContent>
              </Card>
              <Card
                role="button"
                tabIndex={0}
                aria-pressed={selectedFeedbackType === FeedbackType.Other}
                className={cn(
                  "flex-1 cursor-pointer transition-all",
                  selectedFeedbackType === FeedbackType.Other
                    ? "ring-2 ring-blue-400 border-blue-400"
                    : "hover:border-foreground/30"
                )}
                onClick={() => setSelectedFeedbackType(FeedbackType.Other)}
                onKeyDown={(e) => handleKeySelect(e, FeedbackType.Other)}
              >
                <CardContent className="h-full py-3 flex flex-col gap-3 items-center justify-center">
                  <MessageSquare className="size-6 text-blue-400" />
                  <span className="text-sm font-medium text-center">Other</span>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Brief summary"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Share details, steps to reproduce, or ideas..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
            />
            <div className="text-xs text-muted-foreground text-right">
              {description.length} characters
            </div>
          </div>

          <div className="flex flex-col justify-end gap-3 items-center">
            <Button className="w-full" type="submit" disabled={!isValid || publishFeedbackMutation.isPending}>
              {publishFeedbackMutation.isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function HelpIndicator() {
  const [faqsOpen, setFaqsOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <HelpCircle className="w-6 h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={() => setFeedbackOpen(true)}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Give Feedback
          </DropdownMenuItem>

          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={() => setFaqsOpen(true)}
          >
            <CircleHelp className="mr-2 h-4 w-4" />
            FAQs
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={() => setSupportOpen(true)}
          >
            <Headphones className="mr-2 h-4 w-4" />
            Support
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <FeedbackPopup open={feedbackOpen} onOpenChange={setFeedbackOpen} />
      <FAQsPopup open={faqsOpen} onOpenChange={setFaqsOpen} />
      <SupportPopup open={supportOpen} onOpenChange={setSupportOpen} />
    </>
  );
}
