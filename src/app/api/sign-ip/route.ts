import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();
    try {
        // first gets data from frontend
        const { email, password, username } = await request.json();

        // check if username exists
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        });

        // if exist then tell the use already exist
        if (existingUserVerifiedByUsername) {
            return new Response(JSON.stringify({
                success: false,
                message: "Username already exists"
            }), { status: 400 });
        }

        // check if email is already exist
        const existingUserByEmail = await UserModel.findOne({ email });
        const verifyCode = Math.floor(1000000 + Math.random() * 9000000).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return new Response(JSON.stringify({
                    success: false,
                    message: "User already exists"
                }), { status: 400 });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }
        } else {
            // otherwise hash the password, generate a verify code (OTP) and an expiry date
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            // create a new user with hashed password etc...
            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: [],
            });

            // save the new user
            await newUser.save();
        }

        // after registering, send the verification email
        const emailResponse = await sendVerificationEmail(
            username,
            email,
            verifyCode
        );

        // if not sent successfully
        if (!emailResponse.success) {
            return new Response(JSON.stringify({
                success: false,
                message: emailResponse.message
            }), { status: 400 });
        }

        // if successfully sent, ok
        return new Response(JSON.stringify({
            success: true,
            message: "User registered successfully, please verify your email"
        }), { status: 201 });

    } catch (error) {
        console.error("Error registering user", error);
        return new Response(JSON.stringify({
            success: false,
            message: "Error while registering user"
        }), { status: 500 });
    }
}
