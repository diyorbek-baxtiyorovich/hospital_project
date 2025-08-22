export function isEmpty(value) {
  if (value === null || value === undefined || value === '')
    return true

  return !!(Array.isArray(value) && value.length === 0)
}

// 👉 IsNullOrUndefined
export function isNullOrUndefined(value) {
  return value === null || value === undefined
}

// 👉 IsEmptyArray
export function isEmptyArray(arr) {
  return Array.isArray(arr) && arr.length === 0
}

// 👉 IsObject
export function isObject(obj) {
  return obj !== null && !!obj && typeof obj === 'object' && !Array.isArray(obj)
}

export function isToday(date) {
  const today = new Date()

  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}


export function requiredValidator(value) {
  if (isNullOrUndefined(value) || isEmptyArray(value))
    return "To'ldirish majburiy"

  return !!String(value).trim().length || "To'ldirish majburiy"
}

export function requiredRule(value) {
  if (isNullOrUndefined(value) || isEmptyArray(value))
    return "To'ldirish majburiy"

  return !!String(value).trim().length || "To'ldirish majburiy"
}

export const requiredRulWithoutTrim = v => (v) ? true : "To'ldirish majburiy!"

export const minLengthRule = min => v =>
  (v && v.trim().length >= min) || `Kamida ${min} harfdan iborat bo'lishi zarur`

export const maxLengthRule = max => v =>
  (!v || v.trim().length <= max) || `Eng ko'pi ${max} ta harfdan oshmasligi kerak`;

export const numberOnly = v =>
  (/^\d+$/.test(v) || "Faqat raqam kiritish mumkin")

