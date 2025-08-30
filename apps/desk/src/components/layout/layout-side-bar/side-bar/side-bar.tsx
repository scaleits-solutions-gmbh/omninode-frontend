"use client";
import * as React from "react";

import {
  List,
  Plus,
  User,
  MessageSquare,
  Users,
  Ticket,
  FileText,
  BookOpen,
  Home,
  Info,
} from "lucide-react";
import {
  Alert,	
  AlertDescription,
  AlertTitle,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "frontend-common-kit/components";
import {AppLogoDescriptive} from "@/components/custom/app-logo-descriptive";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AppSidebarProps {
  isLoggedIn: boolean;
}

export function AppSidebar({ isLoggedIn, ...props }: AppSidebarProps) {
  const pathname = usePathname();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="mx-auto">
          <AppLogoDescriptive />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>BASE</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link className="flex items-center gap-2" href="/">
                    <Home />
                    <span>Home</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>IDEAS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith("/ideas/all-ideas")}
                >
                  <Link
                    className="flex items-center gap-2"
                    href="/ideas/all-ideas"
                  >
                    <List />
                    <span>All Ideas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild={isLoggedIn}
                        isActive={
                          isLoggedIn &&
                          pathname.startsWith("/ideas/submit-idea")
                        }
                        className={!isLoggedIn ? "opacity-50" : ""}
                      >
                        {isLoggedIn ? (
                          <Link
                            className="flex items-center gap-2"
                            href="/ideas/submit-idea"
                          >
                            <Plus />
                            <span>Submit Idea</span>
                          </Link>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Plus className="size-4" />
                            <span>Submit Idea</span>
                          </div>
                        )}
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    {!isLoggedIn && (
                      <TooltipContent>
                        <p>Please log in to enter this page</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild={isLoggedIn}
                        isActive={
                          isLoggedIn && pathname.startsWith("/ideas/my-ideas")
                        }
                        className={!isLoggedIn ? "opacity-50" : ""}
                      >
                        {isLoggedIn ? (
                          <Link
                            className="flex items-center gap-2"
                            href="/ideas/my-ideas"
                          >
                            <User />
                            <span>My Ideas</span>
                          </Link>
                        ) : (
                          <div className="flex items-center gap-2">
                            <User className="size-4" />
                            <span>My Ideas</span>
                          </div>
                        )}
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    {!isLoggedIn && (
                      <TooltipContent>
                        <p>Please log in to enter this page</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>FEEDBACK</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild={isLoggedIn}
                        isActive={
                          isLoggedIn &&
                          pathname.startsWith("/feedback/submit-feedback")
                        }
                        className={!isLoggedIn ? "opacity-50" : ""}
                      >
                        {isLoggedIn ? (
                          <Link
                            className="flex items-center gap-2"
                            href="/feedback/submit-feedback"
                          >
                            <MessageSquare />
                            <span>Submit Feedback</span>
                          </Link>
                        ) : (
                          <div className="flex items-center gap-2">
                            <MessageSquare className="size-4" />
                            <span>Submit Feedback</span>
                          </div>
                        )}
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    {!isLoggedIn && (
                      <TooltipContent>
                        <p>Please log in to enter this page</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild={isLoggedIn}
                        isActive={
                          isLoggedIn &&
                          pathname.startsWith("/feedback/my-feedback")
                        }
                        className={!isLoggedIn ? "opacity-50" : ""}
                      >
                        {isLoggedIn ? (
                          <Link
                            className="flex items-center gap-2"
                            href="/feedback/my-feedback"
                          >
                            <Users className="size-4" />
                            <span>My Feedback</span>
                          </Link>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Users className="size-4" />
                            <span>My Feedback</span>
                          </div>
                        )}
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    {!isLoggedIn && (
                      <TooltipContent>
                        <p>Please log in to enter this page</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>SUPPORT</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild={isLoggedIn}
                        isActive={
                          isLoggedIn &&
                          pathname.startsWith("/support/submit-ticket")
                        }
                        className={!isLoggedIn ? "opacity-50" : ""}
                      >
                        {isLoggedIn ? (
                          <Link
                            className="flex items-center gap-2"
                            href="/support/submit-ticket"
                          >
                            <Ticket className="size-4" />
                            <span>Submit Ticket</span>
                          </Link>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Ticket className="size-4" />
                            <span>Submit Ticket</span>
                          </div>
                        )}
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    {!isLoggedIn && (
                      <TooltipContent>
                        <p>Please log in to enter this page</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild={isLoggedIn}
                        isActive={
                          isLoggedIn &&
                          pathname.startsWith("/support/my-tickets")
                        }
                        className={!isLoggedIn ? "opacity-50" : ""}
                      >
                        {isLoggedIn ? (
                          <Link
                            className="flex items-center gap-2"
                            href="/support/my-tickets"
                          >
                            <FileText />
                            <span>My Tickets</span>
                          </Link>
                        ) : (
                          <div className="flex items-center gap-2">
                            <FileText className="size-4" />
                            <span>My Tickets</span>
                          </div>
                        )}
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    {!isLoggedIn && (
                      <TooltipContent>
                        <p>Please log in to enter this page</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith("/support/knowledge-base")}
                >
                  <Link
                    className="flex items-center gap-2"
                    href="/support/knowledge-base"
                  >
                    <BookOpen />
                    <span>Knowledge Base</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        {!isLoggedIn && (
          <Alert variant="default">
            <AlertTitle className="text-primary flex items-center gap-2">
              <Info className="size-4" />
              Limited View
            </AlertTitle>
            <AlertDescription>
              You are not logged in. Please log in to see more options.
            </AlertDescription>
          </Alert>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
