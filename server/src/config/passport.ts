import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";
import dotenv from "dotenv";
import { prisma } from "./database";
import { log } from "node:console";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
    ) => {
      try {
        const email = profile.emails![0].value;
        if (!email) {
          return done("Email not found from google", false);
        }
        //check if user already exists
        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user) {
          //create new user
          const newUser = await prisma.user.create({
            data: {
              email,
              name: profile.displayName || profile.name?.givenName || "User",
              picture: profile.photos?.[0]?.value,
              googleId: profile.id,
              isValidated: true, // Auto-validate Google users
              role: "STUDENT", // Default role
            },
          });
          console.log(`User create with email ${email} and name ${newUser.name}`,newUser);
          
        }else if(!user.googleId){
          await prisma.user.update({
            where: { email },
            data: {
              googleId: profile.id,
              isValidated: true,
            },
          });
          console.log(`User update with email ${email} and name ${user.name}`,user);
          
        }
        //update last login timestamp
        await prisma.user.update({
            where:{id:user?.id},
            data:{lastLoginAt:new Date()}
        });
      } catch (error) {
        console.log("Google Oauth error", error);
        return done(error as Error, false);
      }
    }
  )
);
export default passport;
