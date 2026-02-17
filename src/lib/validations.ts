import { z } from "zod";

export const leadSchema = z.object({
    name: z.string().min(2, "Имя должно быть не менее 2 символов"),
    telegram: z.string().min(3, "Некорректный Telegram логин (@username)"),
    age: z.string().min(1, "Возраст обязателен").refine(
        (val) => !isNaN(Number(val)) && Number(val) >= 18 && Number(val) <= 65,
        "Возраст должен быть от 18 до 65 лет"
    ),
    shift: z.enum(["morning", "day", "evening"], {
        message: "Выберите смену",
    }),
    device: z.enum(["phone", "laptop", "both"], {
        message: "Выберите устройство",
    }),
});

export type LeadFormEntries = z.infer<typeof leadSchema>;
