import classNames from 'classnames'
import { FunctionComponent } from 'react'
import styles from './page-spinner.module.scss'

type PageSpinnerProps = {
  size?: number
}

export const PageSpinner: FunctionComponent<PageSpinnerProps> = ({ size = 80}) => {
  return (
    <div className={classNames("box-border", styles.spinner)} style={{height: size, width: size}}>
      <div style={{width: '100%', height: '100%', position: 'relative', left: '50%', top: '50%'}}>
        {
          new Array(12).fill(0).map((_, i) => <div key={i} className={classNames("bg-black absolute", styles.bar)} style={{
            top: '-3.9%',
            left: '-10%',
            height: '8%',
            width: '24%',
            borderRadius: 6,
            transform: `rotate(${i * 30}deg) translate(146%)`,
            animationDelay: `${(1.2 - i * 0.1) * -1}s`
          }} />)
        }
      </div>
    </div>
  )
}