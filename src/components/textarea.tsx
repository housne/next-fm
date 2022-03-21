import { FunctionComponent, TextareaHTMLAttributes } from "react"

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
}

export const Textarea: FunctionComponent<TextareaProps> = ({label, ...props}) => (
  <div className="mb-6">
    <label>
      <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>
      <textarea className="form-textarea block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500t" {...props}  />
    </label>
  </div>
)