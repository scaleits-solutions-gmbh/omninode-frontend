import { FeUserProfile } from "@/types/feUser";

export const fetchUserProfile = async () => {
  const response = await fetch("/api/user/profile");
  return response.json();
};

export const updateUserProfile = async (profile: Partial<FeUserProfile>) => {
  await fetch("/api/user/profile", {
    method: "PUT",
    body: JSON.stringify(profile),
  });
};