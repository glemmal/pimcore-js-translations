import request from 'superagent'

const url = '/webservice/rest/translations'

let locale = 'en'
let fallbackLocale = null
let apiKey = null

let cachedTranslations = []

const fetchFromApi = () => {
  return request
    .get(url)
    .query({ 'apikey': apiKey, type: 'website' })
    .then((res) => res.body.data)
}

const init = (_apiKey, _locale, _fallbackLocale) => {
  locale = _locale
  fallbackLocale = _fallbackLocale
  apiKey = _apiKey

  if (!locale) {
    throw new Error('pimcore js tranlsations: no locale defined')
  }

  if (!apiKey) {
    throw new Error('pimcore js translations: no api key defined')
  }

  return new Promise((resolve, reject) => {
    if (cachedTranslations.length) {
      return resolve(cachedTranslations)
    }

    fetchFromApi()
      .then((translations) => {
        cachedTranslations = translations
        return resolve(translations)
      })
      .catch(reject)
  })
}

const t = (key, _locale = null) => {
  const translationElement = cachedTranslations.find((t) => t.key === key)

  if (!translationElement) {
    return `${key} not translated`
  }

  const { translations } = translationElement
  const translation = (
    translations[_locale] ||
    translations[locale] ||
    translations[fallbackLocale]
  )

  return (
    translation || `${key} not translated for ${locale} and ${fallbackLocale}`
  )
}

export {
  t,
  init
}
