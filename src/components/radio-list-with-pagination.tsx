import { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { http } from "../lib/http";
import { Radio } from "../types/radio";
import { RadioCardListComponent } from "./radio-card-list";

type RadioListWithPaginationProps = {
  radios: Radio[],
  type: 'genre' | 'org'
  id: number
}

const COUNT_PER_PAGE = 10

export const RadioListWithPagination: FunctionComponent<RadioListWithPaginationProps> = ({
  radios,
  type,
  id
}) => {
  const [radioList, setRadioList] = useState(radios)
  const [hasNext, setHasNext] = useState(radios.length > COUNT_PER_PAGE)
  const pageRef = useRef(1)

  const fetchRadios = useCallback(async (page: number = 1, replace = false) => {
    const radioList = await http.get<Radio[]>(`/radio`, {
      query: {
        [type]: id.toString(),
        page: page.toString(),
        limit: COUNT_PER_PAGE.toString()
      }
    })
    if (radioList.length === 0) {
      setHasNext(false)
      return
    }
    setRadioList(list => replace ? radioList : list.concat(radioList))
    setHasNext(radioList.length === COUNT_PER_PAGE)
  }, [type, id])
  
  const nextPage = useCallback(() => {
    if (!hasNext) {
      return
    }
    pageRef.current++
    fetchRadios(pageRef.current)
  }, [hasNext, fetchRadios])

  useEffect(() => {
    fetchRadios(1, true)
  }, [fetchRadios])

  return (
    <>
      <RadioCardListComponent radios={radioList} isGrid />
      {hasNext && (
        <div className="py-6 text-center">
          <button
            onClick={nextPage} 
            className="text-red-500 border-2 border-red-500 px-6 py-2 rounded-lg font-semibold hover:bg-red-500 hover:text-white"
          >加载更多</button>
        </div>
      )}
    </>
  )
}