import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs"
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail"
import { connect } from "http2";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { email, password, username } = await request.json()
    } catch (error) {
        console.error("Error Registering user", error)
        return Response.json({
            success: false,
            message: "Error while registering user"
        }, {
            status: 500
        })
    }
}