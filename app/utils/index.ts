export const timeAgo = (input: Date | string | number): string => {
  const date = new Date(input)
  const now = new Date()

  const diffInSeconds = Math.round((date.getTime() - now.getTime()) / 1000)
  const absDiff = Math.abs(diffInSeconds)

  const units: Partial<Record<Intl.RelativeTimeFormatUnit, number>> = {
    year: 60 * 60 * 24 * 365,
    month: 60 * 60 * 24 * 30,
    week: 60 * 60 * 24 * 7,
    day: 60 * 60 * 24,
    hour: 60 * 60,
    minute: 60,
    second: 1,
  }

  if (absDiff < 45) return "just now"

  for (const [unit, secondsInUnit] of Object.entries(units) as [
    Intl.RelativeTimeFormatUnit,
    number
  ][]) {
    const interval = Math.floor(absDiff / secondsInUnit)
    if (interval >= 1) {
      const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })
      return rtf.format(Math.sign(diffInSeconds) * interval, unit)
    }
  }

  return "just now"
}

export const capFirstLetter = (word: string) => {
  if (!word || typeof word !== "string" || word.length <= 0) {
    return ""
  }
  const [firstChar = "", ...rest] = word.split("")
  return firstChar?.toUpperCase() + rest?.join("")?.toLowerCase()
}

export const formatIndianNumber = (num: number | string): string => {
  const str = num.toString()
  const [integerPart = "", decimalPart] = str.split(".")

  const lastThree = integerPart.slice(-3)
  const otherNumbers = integerPart.slice(0, -3)

  const formatted =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
    (otherNumbers ? "," : "") +
    lastThree

  return decimalPart ? `${formatted}.${decimalPart}` : formatted
}

export const getRandomItems = <T>(list: T[], maxItemsCount: number): T[] => {
  if (!Array.isArray(list) || list.length === 0) return []
  if (list.length <= maxItemsCount) return [...list]

  const shuffled = [...list].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, maxItemsCount)
}
