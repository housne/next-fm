import { FunctionComponent } from "react";

export type SpinnerComponentProps = {
  size?: number | string
  color?: string
  secondaryColor?: string
  borderWidth?: number
}

export const SpinnerComponent: FunctionComponent<SpinnerComponentProps> = ({
  size,
  color,
  secondaryColor,
  borderWidth
}) => {
  return <div 
    className="rounded-full animate-spin box-border border-solid" 
    style={{
      width: size, 
      height: size, 
      borderColor: color,
      borderBottomColor: secondaryColor,
      borderWidth: borderWidth
    }} 
  />
}

SpinnerComponent.defaultProps = {
  size: 24,
  color: 'rgb(239,68,68)',
  secondaryColor: 'rgb(107,114,128)',
  borderWidth: 2
}