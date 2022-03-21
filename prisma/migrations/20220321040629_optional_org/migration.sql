-- DropForeignKey
ALTER TABLE "Radio" DROP CONSTRAINT "Radio_org_id_fkey";

-- AlterTable
ALTER TABLE "Radio" ALTER COLUMN "org_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Radio" ADD CONSTRAINT "Radio_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
