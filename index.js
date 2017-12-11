import request from 'superagent'

const url = '/webservice/rest/translations?type=website'

let locale = 'en'
let fallbackLocale = null

let cachedTranslations = []

const fetchFromApi = (key = null) => {
  return request
    .get(url)
    .then((res) => {
      return res.body.data
    })
}

const init = (_locale, _fallbackLocale) => {
  if (!_locale) {
    throw new Error('pimcore js tranlsations: no locale defined')
  }

  locale = _locale
  fallbackLocale = _fallbackLocale

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

const t = (key) => {
  const translationElement = cachedTranslations.find((t) => t.key === key)

  if (!translationElement) {
    return `${key} not translated`
  }

  const { translations } = translationElement
  const translation = translations[locale] || translations[fallbackLocale]

  if (!translation) {
    return `${key} not translated for ${locale} and ${fallbackLocale}`
  }

  return translation
}

export {
  t,
  init
}
