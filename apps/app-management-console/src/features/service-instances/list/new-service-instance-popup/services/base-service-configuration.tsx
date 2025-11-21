import React from "react";
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/pkg-frontend-common-kit/components";
import Image from "next/image";

type Bullet = {
  icon?: React.ReactNode;
  text: React.ReactNode;
};

export interface BaseServiceConfigurationProps {
  title: string;
  rightBadges?: React.ReactNode;

  iconSrc: string;
  iconAlt: string;
  connectorHeading: string;
  connectorBadgeLabel?: string;
  description?: React.ReactNode;
  bullets?: Bullet[];
  tip?: React.ReactNode;

  children: React.ReactNode;
  className?: string;
}

export default function BaseServiceConfiguration({
  title,
  rightBadges,
  iconSrc,
  iconAlt,
  connectorHeading,
  connectorBadgeLabel,
  description,
  bullets,
  tip,
  children,
  className,
}: BaseServiceConfigurationProps) {
  return (
    <Card className={className ?? "gap-6"}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {rightBadges}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-6 items-stretch">
          {/* Left side info panel */}
          <div className="flex flex-col items-center text-center gap-5 flex-1 rounded-md p-4 bg-background/50">
            <div className="size-16 rounded-md bg-card flex items-center justify-center relative">
              <Image src={iconSrc} alt={iconAlt} width={40} height={40} />
            </div>
            <div className="flex items-center gap-2">
              <div className="font-medium text-lg">{connectorHeading}</div>
              {connectorBadgeLabel ? (
                <Badge variant="default" className="uppercase">
                  {connectorBadgeLabel}
                </Badge>
              ) : null}
            </div>
            {description ? (
              <p className="text-sm text-muted-foreground max-w-[280px]">
                {description}
              </p>
            ) : null}
            {bullets && bullets.length > 0 ? (
              <ul className="text-left text-sm space-y-2">
                {bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    {b.icon}
                    <span className="text-muted-foreground">{b.text}</span>
                  </li>
                ))}
              </ul>
            ) : null}
            {tip ? (
              <div className="mt-1 rounded-md border bg-muted/40 p-2 text-xs text-muted-foreground">
                {tip}
              </div>
            ) : null}
          </div>

          {/* Vertical separator */}
          <div
            className="hidden md:block w-px bg-border self-stretch"
            aria-hidden="true"
          />

          {/* Right side form content */}
          <div className="space-y-4 flex-1">{children}</div>
        </div>
      </CardContent>
    </Card>
  );
}

