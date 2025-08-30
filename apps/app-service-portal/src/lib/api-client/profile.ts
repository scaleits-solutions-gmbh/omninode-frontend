import { FeUserProfile } from "@/types/fe-user";

export const fetchUserProfile = async () => {
  const response = await fetch("/service-portal/api/user/profile");
  return response.json();
};

export const updateUserProfile = async (profile: Partial<FeUserProfile>) => {
  await fetch("/service-portal/api/user/profile", {
    method: "PUT",
    body: JSON.stringify(profile),
  });
};