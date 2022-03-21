-- CreateTable
CREATE TABLE "Radio" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "thumbnail" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "stream_url" VARCHAR(255) NOT NULL,
    "is_featured" BOOLEAN NOT NULL,
    "is_hls" BOOLEAN NOT NULL,
    "org_id" INTEGER NOT NULL,
    "channel_id" INTEGER NOT NULL,

    CONSTRAINT "Radio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenresOnRadio" (
    "radio_id" INTEGER NOT NULL,
    "genre_id" INTEGER NOT NULL,

    CONSTRAINT "GenresOnRadio_pkey" PRIMARY KEY ("radio_id","genre_id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "thumbnail" VARCHAR(255) NOT NULL,
    "description" TEXT,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255),
    "avatar" VARCHAR(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "nickname" VARCHAR(255) NOT NULL,
    "website" VARCHAR(255),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikeOnRadio" (
    "like_id" INTEGER NOT NULL,
    "radio_id" INTEGER NOT NULL,

    CONSTRAINT "LikeOnRadio_pkey" PRIMARY KEY ("like_id","radio_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_id_key" ON "Profile"("user_id");

-- AddForeignKey
ALTER TABLE "Radio" ADD CONSTRAINT "Radio_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Radio" ADD CONSTRAINT "Radio_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresOnRadio" ADD CONSTRAINT "GenresOnRadio_radio_id_fkey" FOREIGN KEY ("radio_id") REFERENCES "Radio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresOnRadio" ADD CONSTRAINT "GenresOnRadio_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeOnRadio" ADD CONSTRAINT "LikeOnRadio_radio_id_fkey" FOREIGN KEY ("radio_id") REFERENCES "Radio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeOnRadio" ADD CONSTRAINT "LikeOnRadio_like_id_fkey" FOREIGN KEY ("like_id") REFERENCES "Like"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
