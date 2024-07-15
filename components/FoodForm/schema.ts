import { z } from "zod";

export const FoodPreservationCard = z.object({
  name: z.string(),
  expirationDate: z.date(),
  purchaseDate: z.date(),
  quantity: z.number().min(1), // 确保数量至少为1
  unit: z.enum(["kg", "g", "pcs"]), // 使用枚举定义单位
  notes: z.string().optional(), // 备注是可选的
  icon: z.string().optional(), // 图标是可选的
});

// 类型别名
export type FoodPreservationCardType = z.infer<typeof FoodPreservationCard>;
