import request from 'superagent'

const url = '/webservice/rest/translations?type=website'

let locale = 'en'
let fallbackLocale = null
let apiKey = null

let cachedTranslations = []

const fetchFromApi = (query = {}) => {
  return request
    .get(url)
    .query({apikey: apiKey})
    .then((res) => {
      return res.body.data
    })
}

const init = (_apiKey, _locale, _fallbackLocale) => {
  if (!_locale) {
    throw new Error('pimcore js tranlsations: no locale defined')
  }

  if (!_apiKey) {
    throw new Error('pimcore js translations: no api key defined')
  }

  locale = _locale
  fallbackLocale = _fallbackLocale
  apiKey = _apiKey

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

  const translation = translations[_locale] ||
    translations[locale] ||
    translations[fallbackLocale]

  if (!translation) {
    return `${key} not translated for ${locale} and ${fallbackLocale}`
  }

  return translation
}

export {
  t,
  init
}
