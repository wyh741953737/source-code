const list = ['i18next.t', 't'];
module.exports = {
  input: ['src/**/*.{ts,tsx}', '!src/locales/**/*.{ts,js}'],
  options: {
    debug: true,
    func: {
      list,
      extensions: ['.ts', '.tsx'],
    },
    lngs: ['zh-cn', 'en'],
    ns: ['resource'],
    defaultLng: 'en',
    defaultNs: 'resource',
    defaultValue: '',
    resource: {
      loadPath: 'src/locales/{{lng}}/{{ns}}.json',
      savePath: 'src/locales/{{lng}}/{{ns}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
};
