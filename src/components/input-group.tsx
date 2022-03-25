import { FunctionComponent, InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export const Input: FunctionComponent<InputProps> = ({...props}) => (
  <div className="border rounded-md first:rounded-b-none last:rounded-t-none mb-[-1px] focus-within:relative focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/60">
    <label>
      <input className="bg-transparent px-2.5 py-2 w-full appearance-none ring-0 border-none focus:ring-0 outline-none" {...props}  />
    </label>
  </div>
)