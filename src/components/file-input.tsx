import { FunctionComponent, InputHTMLAttributes } from "react"

type FileInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
}

export const FileInput: FunctionComponent<FileInputProps> = ({label, ...props}) => (
  <div className="mb-6">
    <label>
      <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>
      <input type="file" className="form-input block w-full text-sm text-gray-900 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" {...props}  />
    </label>
  </div>
)