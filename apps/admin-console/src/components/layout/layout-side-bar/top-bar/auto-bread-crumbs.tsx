import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../../../../../../packages/frontend-common-kit/dist/components";
import Link from "next/link";
import React from "react";

export type AutoBreadCrumbsProps = {
  category: string;
  breadcrumbs: {
    label: string;
    href?: string;
  }[];
};

export function AutoBreadCrumbs({
  category,
  breadcrumbs,
}: AutoBreadCrumbsProps) {
  const lastItemIndex = breadcrumbs.length - 1;

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <span className="text-primary font-medium">{category}</span>
          </BreadcrumbItem>
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator
                className={
                  index === 0 ? "text-primary md:text-muted-foreground" : ""
                }
              />
              <BreadcrumbItem>
                {index === lastItemIndex ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : item.href ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbItem>
                    <span>{item.label}</span>
                  </BreadcrumbItem>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
