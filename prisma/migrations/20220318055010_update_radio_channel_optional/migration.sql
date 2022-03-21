-- DropForeignKey
ALTER TABLE "Radio" DROP CONSTRAINT "Radio_channel_id_fkey";

-- AlterTable
ALTER TABLE "Radio" ALTER COLUMN "channel_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Radio" ADD CONSTRAINT "Radio_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
