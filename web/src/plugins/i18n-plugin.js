const clearGlobals = globals => globals.reduce((accu, globalVariable) => {
  return `${accu} const ${globalVariable} = undefined;`
}, '')

const i18n = {
  install (Vue, options) {
    Vue.prototype.$i18n = {
      t (key, lang = 'hu-HU') {
        if (!options[lang]) {
          console.error(lang, 'locale keys not provided')
        }
        if (options.simpleKey) {
          return options[lang][key] || key
        }
        return key.split('.').reduce((trans, keyPart) => {
          if (trans[keyPart]) {
            return trans[keyPart]
          }
          return key
        }, options[lang])
      },
      interpolate (template, params = {}) {
        const names = Object.keys(params)
        const vals = Object.values(params)
        const globals = ['process', 'global', 'window', 'self', 'document']
        // eslint-disable-next-line no-new-func
        return new Function(...names, `
            return (function(){
              'use strict'; ${clearGlobals(globals)} return \`${template}\`;
            }).call(undefined)`)(...vals)
      }
    }
  }
}

export default i18n
