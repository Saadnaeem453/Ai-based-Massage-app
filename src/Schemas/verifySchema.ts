import { z } from "zod"

const VerifySchema = z.object({
    code: z.string().length(6, "verification code must be 6 digits")
})