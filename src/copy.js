export const TITLES = [
  'هننزل سينما النهارده؟ 🍿',
  'يلا سينما ولا ايه؟ 😏',
  'فيلم الليلة ولا قعدة فاضية؟',
  'جاهز تضيع فلوسك في الفشار؟ 😂🍿',
]

export const SUBTITLES = [
  'اختار بحكمة عشان مفيش رجوع 😆',
  'مفيش escape النهارده 😂',
  'الإجابة الصح معروفة 👀',
  'فكر براحتك… بس هنروح في الآخر 😏',
]

export const YES_LABELS = [
  'يلا بينا 🔥',
  'آه طبعًا 🍿',
  'جاهز 😎',
  'سينما و خلاص 🎬',
]

export const NO_LABELS = [
  'لأ',
  'مش فايق',
  'مش عايز',
  'يمكن بعدين',
]

export const NO_FLEE_MESSAGES = [
  'هو انت فاكرها زرار حقيقي؟ 😏',
  'لأ مش هتقول لأ 😂',
  'try harder 🤭',
  'مش مسموح بالرفض 😎',
  'قرارك مش هنا أصلاً',
]

export const SUCCESS_MESSAGES = [
  'يلا بيناااا 🔥🍿',
  'اتقفلت… السينما confirmed 🎬',
  'اختيارك صح 😂👏',
  'مفيش أحسن من كده 😎',
]

export const BADGE = 'سينما النهاردة 🍿'
export const FOOTER_HINT = 'دوس يلا بينا قبل ما لأ يهرب 🏃‍♂️'

export function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)]
}
