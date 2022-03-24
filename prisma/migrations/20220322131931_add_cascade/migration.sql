-- DropForeignKey
ALTER TABLE "LikeOnRadio" DROP CONSTRAINT "LikeOnRadio_like_id_fkey";

-- DropForeignKey
ALTER TABLE "LikeOnRadio" DROP CONSTRAINT "LikeOnRadio_radio_id_fkey";

-- AddForeignKey
ALTER TABLE "LikeOnRadio" ADD CONSTRAINT "LikeOnRadio_radio_id_fkey" FOREIGN KEY ("radio_id") REFERENCES "Radio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeOnRadio" ADD CONSTRAINT "LikeOnRadio_like_id_fkey" FOREIGN KEY ("like_id") REFERENCES "Like"("id") ON DELETE CASCADE ON UPDATE CASCADE;
