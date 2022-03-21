import { FunctionComponent, InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export const Input: FunctionComponent<InputProps> = ({label, ...props}) => (
  <div className="mb-6">
    <label>
      <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>
      <input className="form-input shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" {...props}  />
    </label>
  </div>
)