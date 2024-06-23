import { z } from "zod"



export const SignInSchema = z.object({
    identifier: z.string(),
    password: z.string().min(6, { message: "Must be at least 6 character" })
})