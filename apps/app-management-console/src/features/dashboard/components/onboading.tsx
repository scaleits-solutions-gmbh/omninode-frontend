"use client";

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Progress,
} from "@repo/pkg-frontend-common-kit/components";
import { Users, Layers2, CheckCircle2, Smile, PartyPopper, Atom } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface Task {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  completed: boolean;
}

export default function Onboarding() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      label: "Invite team members",
      description: "Add users to your organization",
      icon: Users,
      href: "/users",
      completed: true,
    },
    {
      id: "2",
      label: "Connect a service",
      description: "Set up your first service instance",
      icon: Layers2,
      href: "/service-instances",
      completed: true,
    },
    {
      id: "3",
      label: "Connect with partner organization",
      description: "Set up a relationship with an organization",
      icon: Smile,
      href: "/org-relationships",
      completed: true,
    },
  ]);


  const completedCount = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;

  return (
    <Card className="gap-3">
      <CardHeader className="space-y-3 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Getting Started</CardTitle>
          {completedCount === totalTasks ? (
            <Badge variant="default"><Atom />Complete</Badge>
          ) : (
            <span className="text-sm text-muted-foreground">
              {completedCount}/{totalTasks}
            </span>
          )}
        </div>
        <Progress value={(completedCount / totalTasks) * 100} />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => {
            const TaskIcon = task.icon;
            return (
              <div
                key={task.id}
                className="flex items-start gap-3 rounded-lg border p-3"
              >

                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                  <Checkbox
                  id={task.id}
                  checked={task.completed}
                  className="mt-0.5"
                />
                    <TaskIcon className="h-4 w-4 text-muted-foreground shrink-0" />
                    <label
                      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                        task.completed && "text-muted-foreground line-through"
                      }`}
                    >
                      {task.label}
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground ml-6">
                    {task.description}
                  </p>
                  {task.href && !task.completed && (
                    <Link
                      href={task.href}
                      className="text-xs text-primary hover:underline ml-6"
                    >
                      Get started →
                    </Link>
                  )}
                </div>
                {task.completed && (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
