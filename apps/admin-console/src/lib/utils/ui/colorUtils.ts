import { AppColor, AppColors } from "@/types/global";

export function generateColor(seed: string): AppColor {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash += seed.charCodeAt(i);
    }
    const color = AppColors[hash % AppColors.length];
    return color;
}
