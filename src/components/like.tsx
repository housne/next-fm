import { FunctionComponent, useEffect, useRef, useState } from "react";
import { http } from "../lib/http";
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io'

export const LikeComponent: FunctionComponent<{id: number}> = ({ id }) => {
  const [liked, setLiked] = useState(false)
  const isProcessingRef = useRef(false)

  useEffect(() => {
    http
      .get<{liked: boolean}>('/like', { query: { id: id.toString()}})
      .then(({liked}) => setLiked(liked))
  }, [id])

  const toggleLike = async () => {
    if (isProcessingRef.current) {
      return
    }
    isProcessingRef.current = true
    setLiked(liked => !liked)
    try {
      await http.post('/like', {radioId: id.toString()})
      isProcessingRef.current = false
    } catch (e) {
      setLiked(liked => !liked)
      isProcessingRef.current = false
    }
  }

  return (
    <button className="text-red-500 text-xl" onClick={toggleLike}>
      {
        liked ? <IoIosHeart /> : <IoIosHeartEmpty />
      }
    </button>
  )
}