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
} from "@/components/ui";
import { HelpCircle, MessageSquare, CircleHelp, Headphones, Mail, Phone, Clock } from "lucide-react";
import { useState } from "react";
import { getFeedbackUrl } from "@/utils/url-utils/get-feedback-url";
import Link from "next/link";

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
      answer: "Go to Personal Settings from your user menu in the top right corner. You can edit your profile information and save changes there."
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

export function HelpIndicator() {
  const [faqsOpen, setFaqsOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <HelpCircle className="w-6 h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <Link href={getFeedbackUrl()}>
            <DropdownMenuItem className="cursor-pointer">
              <MessageSquare className="mr-2 h-4 w-4" />
              Give Feedback
            </DropdownMenuItem>
          </Link>

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

      <FAQsPopup open={faqsOpen} onOpenChange={setFaqsOpen} />
      <SupportPopup open={supportOpen} onOpenChange={setSupportOpen} />
    </>
  );
}
