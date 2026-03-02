/*
  Warnings:

  - You are about to drop the column `durationMinutes` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Review` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `endDate` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `planId` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `UserSubscription` table. All the data in the column will be lost.
  - You are about to drop the `MovieCategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `duration` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `UserSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_userId_fkey";

-- DropForeignKey
ALTER TABLE "MovieCategory" DROP CONSTRAINT "MovieCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "MovieCategory" DROP CONSTRAINT "MovieCategory_movieId_fkey";

-- DropIndex
DROP INDEX "Category_name_key";

-- DropIndex
DROP INDEX "Favorite_userId_movieId_key";

-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "durationMinutes",
DROP COLUMN "rating",
DROP COLUMN "userId",
ADD COLUMN     "duration" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "country",
DROP COLUMN "fullName",
DROP COLUMN "phone",
ADD COLUMN     "bio" TEXT;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "createdAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE "UserSubscription" DROP COLUMN "endDate",
DROP COLUMN "planId",
DROP COLUMN "startDate",
DROP COLUMN "status",
ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "MovieCategory";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "SubscriptionType";

-- CreateTable
CREATE TABLE "_MovieCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MovieCategories_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MovieCategories_B_index" ON "_MovieCategories"("B");

-- AddForeignKey
ALTER TABLE "_MovieCategories" ADD CONSTRAINT "_MovieCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieCategories" ADD CONSTRAINT "_MovieCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
