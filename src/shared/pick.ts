export default function pick<
  T extends Record<string, unknown>,
  K extends keyof T,
>(obj: T, keys: K[]): Partial<T> {
  const result: Partial<T> = {}

  keys.forEach(key => {
    if (obj?.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key]
    }
  })

  return result
}
