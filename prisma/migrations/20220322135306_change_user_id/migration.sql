-- DropIndex
DROP INDEX "Profile_user_id_key";

-- AlterTable
ALTER TABLE "Like" ALTER COLUMN "user_id" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "user_id" SET DATA TYPE VARCHAR(255);
