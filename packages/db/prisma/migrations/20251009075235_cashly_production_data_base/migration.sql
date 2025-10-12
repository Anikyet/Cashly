-- CreateTable
CREATE TABLE "public"."emailOtp" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emailOtp_pkey" PRIMARY KEY ("id")
);
