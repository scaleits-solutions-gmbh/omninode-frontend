"use client";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useState } from "react";
import SearchInput from "@/components/input/searchInput";

const serviceCategories = [
  { label: "CRM", value: "crm" },
  { label: "Client Management", value: "clientManagement" },
];

const serviceOptions = [
  {
    label: "Weclapp",
    value: "weclapp",
    icon: "/assets/weclapp.svg",
    category: serviceCategories[0],
  },
  {
    label: "ACMP",
    value: "acmp",
    icon: "/assets/acmp.svg",
    category: serviceCategories[1],
  },
];

interface ServiceSelectionProps {
  onServiceSelect: (service: string) => void;
}

export default function ServiceSelection({ onServiceSelect }: ServiceSelectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const filteredServices = serviceOptions.filter((service) => {
    const matchesSearch = service.label
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || service.category.value === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleServiceSelect = (serviceValue: string) => {
    setSelectedService(serviceValue === selectedService ? null : serviceValue);
  };

  return (
    <>
      <DialogHeader className="pb-4 border-b">
        <DialogTitle>New Service Instance</DialogTitle>
      </DialogHeader>
      <div className="flex gap-4 pb-2">
        <div className="flex-1">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {serviceCategories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="h-[400px] pr-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card
              key={service.value}
              className={`cursor-pointer transition-all duration-200 border-2 hover:shadow-lg ${
                selectedService === service.value
                  ? "border-primary shadow-lg bg-primary/5"
                  : "hover:border-primary/20"
              }`}
              onClick={() => handleServiceSelect(service.value)}
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="relative h-14 w-14 rounded-lg bg-background p-2 border">
                  <Image
                    src={service.icon}
                    alt={service.label}
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <CardTitle className="text-lg">{service.label}</CardTitle>
                  <Badge variant="secondary" className="w-fit">
                    {service.category.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Connect your {service.label} account to manage your{" "}
                  {service.category.label.toLowerCase()} services.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
      <div className="flex justify-end mt-6 pt-4 border-t">
        <Button
          size="lg"
          disabled={!selectedService}
          onClick={() => {
            onServiceSelect(selectedService ?? "");
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
}