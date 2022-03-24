import { NextPage } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";
import { PageHeaderComponent } from "../components/page-header";
import { RadioCardListComponent } from "../components/radio-card-list";
import { PageSpinner } from "../components/spinner/page-spinner";
import { useAuthorization } from "../hooks/authorization";
import { http } from "../lib/http";
import { Radio } from "../types/radio";

const LikedPage: NextPage = () => {
  const [likedRadios, setLikedRadios] = useState<Radio[]>()

  const fetchLiked = useCallback(async () => {
    const radios = await http.get<Radio[]>('/like')
    setLikedRadios(radios)
  }, [])
  
  useAuthorization(fetchLiked)

  return (
    <div className="px-12 py-4">
      <Head>
        <title>喜欢</title>
      </Head>
      <PageHeaderComponent title="喜欢" />
      <div className="mt-4">
        {
          !likedRadios ? (
            <div className="flex items-center justify-center h-[50vh]">
              <PageSpinner size={40} />
            </div>
          ) : (
            <RadioCardListComponent radios={likedRadios} isGrid />
          )
        }
      </div>
    </div>
  )
}

export default LikedPage