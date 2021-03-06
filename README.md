# Pimcore JS translations
This package helps you to bring your shared translations from Pimcore
to you Javascript frontend. It uses the Pimcore translation REST Endpoint.
You can use the simple t function to request any translation by key.

## Usage
You can attach the t function to your window object to make it
globally available to your Javascript source.
The init function

- Make sure the Pimcore REST Api is enabled.
- Use the package like:

```bash
npm i pimcore-js-translations
```

```javascript
import { t, init } from 'pimcore-js-translations';

// define the locale you wanna fetch
// The translations are available inside the Promise!

// You need a pimcore user with a configured api key.
// Create a user in pimcore and assign the translation permissions to it.
const apiKey = 'xxxxxxxxxxxx';
const locale = 'de';
const fallbackLocale = 'en';

init(apiKey, locale, fallbackLocale).then(() => {
  const myTranslation = t('my-crazy-translation-key')
});
```

This version is still in Alpha! It initially loads all your translations from your CMS!
If you have a huge amount of translations please consider another solution.
Feel free to contribute :)
