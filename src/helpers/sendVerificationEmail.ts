import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import { ApiResponse } from "@/types/apiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {
        await resend.emails.send({
            from: "no-reply@example.com",
            to: email,
            subject: "Verification email",
            react: VerificationEmail({ username, otp: verifyCode }),
            text: ""
        });
        return { success: true, message: "Successfully! sending the verification email" }
    } catch (emailError) {
        console.log("emailError", emailError);
        return { success: false, message: "Error while sending verification email" }

    }
}