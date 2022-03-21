import { SafeParseReturnType, ZodSchema } from 'zod'

export function transformSecondsToHours(seconds: number) {
  const SECONDS_PER_MINUTE = 60
  const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60
  const hours = Math.floor(seconds / SECONDS_PER_HOUR)
  const remindSecondsAfterHour = seconds % SECONDS_PER_HOUR
  const minutes = Math.floor(remindSecondsAfterHour / SECONDS_PER_MINUTE)
  const remindSecond = remindSecondsAfterHour % SECONDS_PER_MINUTE
  return `${hours > 0 ? timePadding(hours) + ':' : ''}${timePadding(minutes)}:${timePadding(remindSecond)}`
}

export function timePadding(num: number) {
  return `0${num}`.slice(-2)
}

export function getFormData<T = any>(form: HTMLFormElement): T
export function getFormData<T = any>(form: HTMLFormElement,  scheme?: ZodSchema<T>): SafeParseReturnType<T, T>

export function getFormData<T = any>(form: HTMLFormElement, scheme?: ZodSchema<T>) {
  const formData = new FormData(form)
  const data: any = {}
  for (let [k, v] of formData.entries()) {
    data[k] = v
  }
  if (scheme) {
    return scheme.safeParse(data)
  }
  return data
}