"use client";
import { useQuery } from "@tanstack/react-query";
import { getClientSessionData } from "@/lib/utils/misc/clientSessionData";

export default function ClientSessionDataInitializer() {
  const {
    data: sessionData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sessionData"],
    queryFn: getClientSessionData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  });

  // You can add logic here to handle the session data
  // For example, redirect to login if no session exists
  if (!isLoading && !error && sessionData) {
    // Session data is available, you can use it as needed
    console.log("Session initialized:", sessionData);
  }

  return null;
}
