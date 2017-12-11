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

```javascript
import { t, init } from 'pimcore-js-translations';

// define the locale you wanna fetch
init('de', 'en').then(() => {
  window.t = t;
});

// in your js files:
const myTranslation = t('my-cracy-translation-key')

```
