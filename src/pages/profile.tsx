import { Profile } from "@prisma/client";
import { NextPage } from "next";
import { FormEventHandler, useCallback, useEffect, useState } from "react";
import { ImageUploader } from "../components/image-uploader";
import { Input } from "../components/input";
import { getFormData } from "../helpers/helpers";
import { useAuthorization } from "../hooks/authorization";
import { http } from "../lib/http";
import { ProfileScheme } from "../scheme/profile";


const ProfilePage: NextPage = () => {
  const [profile, setProfile] = useState<Profile>()

  const getProfile = useCallback(async () => {
    const { profile } = await http.get<{profile: Profile | null}>('/profile')
    if (profile) {
      setProfile(profile)
    }
  }, [])

  const updateProfile: FormEventHandler = useCallback(async (e) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const result = getFormData(form, ProfileScheme)
    if (!result.success) {
      console.log(result.error)
      return
    }
    const res = await http.post(`/profile`, result.data)
    console.log(res)
  }, [])

  useAuthorization(getProfile)

  return (
    <div className="px-12 py-12">
      <h1 className="text-2xl">个人资料</h1>
      <form className="max-w-[360px]" onSubmit={updateProfile}>
        <div className="my-6">
          <ImageUploader dir="user/avatar" name="avatar" defaultImageUrl={profile?.avatar || ''} />
        </div>
        <Input label="昵称" name="nickname" defaultValue={profile?.nickname || ''} />
        <button className="px-6 py-1.5 bg-red-500 text-white rounded-md mt-2" type="submit">更新</button>
      </form>
    </div>
  )
}

export default ProfilePage
