import { z } from "zod"

export const usernameValidation = z
    .string()
    .min(2, "Username must be greater then 2 charcters")
    .max(20, "Username must not be more than 20 character")
    .regex(/^[a-zA-Z0-9_]{3,20}$/
        , "Username must be contain special charcter")

export const SignUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Must be at least 6 character" })
})