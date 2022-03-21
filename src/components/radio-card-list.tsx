import classNames from "classnames"
import { FunctionComponent, PropsWithChildren } from "react"
import { Radio } from "../types/radio"
import { FeatureRadioComponent, RadioComponent } from './radio-card'


const GridList: FunctionComponent<PropsWithChildren<{isGrid?: boolean}>> = ({ children, isGrid }) => {
  return (
    <div className="w-full">
      <div className={classNames("overflow-auto flex flex-nowrap", isGrid ? "grid grid-cols-5 gap-4" : "flex flex-nowrap")}>
        {
          children
        }
      </div>
    </div>
  )
}

type RadioCardListComponentProps = {
  radios: Radio[]
  isFeatured?: boolean
  isGrid?: boolean
}

export const RadioCardListComponent: FunctionComponent<RadioCardListComponentProps> = ({
  radios,
  isFeatured,
  isGrid
}) => {
  return (
    <GridList isGrid={isGrid}>
      {
        radios.map(radio => isFeatured ? 
          <FeatureRadioComponent radio={radio} key={radio.id} isGrid={isGrid} /> : 
          <RadioComponent radio={radio} key={radio.id} isGrid={isGrid} />)
      }
    </GridList>
  )
}