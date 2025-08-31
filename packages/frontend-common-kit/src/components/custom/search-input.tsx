"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

type SearchInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  delay?: number;
};

export function SearchInput({
  value,
  onChange,
  delay = 500,
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    event.persist?.();
    if (delay <= 0) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
        debounceTimeout.current = null;
      }
      onChange(event);
      return;
    }
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      onChange(event);
    }, delay);
  };

  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Search..."
        className="pl-8"
        value={inputValue}
        onChange={handleChange}
      />
      <Search className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}
