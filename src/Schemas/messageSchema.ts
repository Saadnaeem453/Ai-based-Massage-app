import { z } from "zod"

export const MessageSchema = z.object({
    content: z
        .string()
        .min(10, "Content me at least 10 character")
        .max(300, "Max Content limit is 300 characters")

})