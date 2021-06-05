import { useEffect, useState } from 'react';
import i18next from 'i18next';
import { getInfoCollection } from '@/services/CJHeader';

export interface Flg {
  /** 翻译语言 */
  opt: string;
  /** 语言 */
  name: string;
  /** 国旗 */
  flag?: string;
}

export interface CurrencyObj {
  /** 货币名称 */
  NAME: string;
  /** 货币英文代号 */
  currency: string;
  /** 货币符号 */
  symbol: string;
}

export const flagList = [
  { opt: 'en|en', name: i18next.t('English'), flag: 'US' },
  { opt: 'en|af', name: i18next.t('Afrikaans'), flag: 'ZA' },
  { opt: 'en|sq', name: i18next.t('Albanian'), flag: 'AL' },
  { opt: 'en|ar', name: i18next.t('Arabic'), flag: 'SA' },
  { opt: 'en|hy', name: i18next.t('Armenian'), flag: 'AM' },
  { opt: 'en|az', name: i18next.t('Azerbaijani') },
  { opt: 'en|be', name: i18next.t('Belarusian'), flag: 'BY' },
  { opt: 'en|bg', name: i18next.t('Bulgarian') },
  { opt: 'en|zh-CN', name: i18next.t('Chinese (Simplified)'), flag: 'CN' },
  { opt: 'en|zh-TW', name: i18next.t('Chinese (Traditional)'), flag: 'CN' },
  { opt: 'en|hr', name: i18next.t('Croatian') },
  { opt: 'en|cs', name: i18next.t('Czech'), flag: 'CZ' },
  { opt: 'en|da', name: i18next.t('Danish'), flag: 'DK' },
  { opt: 'en|nl', name: i18next.t('Dutch') },
  { opt: 'en|et', name: i18next.t('Estonian'), flag: 'EE' },
  { opt: 'en|tl', name: i18next.t('Filipino'), flag: 'PH' },
  { opt: 'en|fi', name: i18next.t('Finnish') },
  { opt: 'en|fr', name: i18next.t('French') },
  { opt: 'en|ka', name: i18next.t('Georgian'), flag: 'GE' },
  { opt: 'en|de', name: i18next.t('German') },
  { opt: 'en|el', name: i18next.t('Greek'), flag: 'GR' },
  { opt: 'en|hi', name: i18next.t('Hindi'), flag: 'HT' },
  { opt: 'en|hu', name: i18next.t('Hungarian') },
  { opt: 'en|is', name: i18next.t('Icelandic') },
  { opt: 'en|id', name: i18next.t('Indonesian') },
  { opt: 'en|ga', name: i18next.t('Irish'), flag: 'IE' },
  { opt: 'en|it', name: i18next.t('Italian') },
  { opt: 'en|ja', name: i18next.t('Japanese'), flag: 'JP' },
  { opt: 'en|ko', name: i18next.t('Korean'), flag: 'KR' },
  { opt: 'en|lv', name: i18next.t('Latvian') },
  { opt: 'en|lt', name: i18next.t('Lithuanian') },
  { opt: 'en|mk', name: i18next.t('Macedonian') },
  { opt: 'en|ms', name: i18next.t('Malay'), flag: 'MY' },
  { opt: 'en|mt', name: i18next.t('Maltese') },
  { opt: 'en|no', name: i18next.t('Norwegian') },
  { opt: 'en|pl', name: i18next.t('Polish') },
  { opt: 'en|pt', name: i18next.t('Portuguese') },
  { opt: 'en|ro', name: i18next.t('Romanian') },
  { opt: 'en|ru', name: i18next.t('Russian') },
  { opt: 'en|sr', name: i18next.t('Serbian'), flag: 'RS' },
  { opt: 'en|sk', name: i18next.t('Slovak') },
  { opt: 'en|sl', name: i18next.t('Slovenian'), flag: 'SI' },
  { opt: 'en|es', name: i18next.t('Spanish') },
  { opt: 'en|sw', name: i18next.t('Swahili'), flag: 'SJ' },
  { opt: 'en|sv', name: i18next.t('Swedish'), flag: 'SE' },
  { opt: 'en|th', name: i18next.t('Thai') },
  { opt: 'en|tr', name: i18next.t('Turkish') },
  { opt: 'en|uk', name: i18next.t('Ukrainian'), flag: 'UA' },
  { opt: 'en|ur', name: i18next.t('Urdu'), flag: 'PK' },
  { opt: 'en|vi', name: i18next.t('Vietnamese'), flag: 'VN' },
  { opt: 'en|cy', name: i18next.t('Welsh'), flag: 'WELSH' },
  { opt: 'en|yi', name: i18next.t('Yiddish'), flag: 'YIDDISH' },
];

/** 国旗,这样require防止rn报错 */
const flgObg: any = {
  AL: require('../../../assets/flag/AL.png'),
  AM: require('../../../assets/flag/AM.png'),
  AZ: require('../../../assets/flag/AZ.png'),
  BG: require('../../../assets/flag/BG.png'),
  BY: require('../../../assets/flag/BY.png'),
  CN: require('../../../assets/flag/CN.png'),
  CZ: require('../../../assets/flag/CZ.png'),
  DE: require('../../../assets/flag/DE.png'),
  DK: require('../../../assets/flag/DK.png'),
  EE: require('../../../assets/flag/EE.png'),
  ES: require('../../../assets/flag/ES.png'),
  FI: require('../../../assets/flag/FI.png'),
  FR: require('../../../assets/flag/FR.png'),
  GE: require('../../../assets/flag/GE.png'),
  GR: require('../../../assets/flag/GR.png'),
  HR: require('../../../assets/flag/HR.png'),
  HT: require('../../../assets/flag/HT.png'),
  HU: require('../../../assets/flag/HU.png'),
  ID: require('../../../assets/flag/ID.png'),
  IE: require('../../../assets/flag/IE.png'),
  IS: require('../../../assets/flag/IS.png'),
  IT: require('../../../assets/flag/IT.png'),
  JP: require('../../../assets/flag/JP.png'),
  KR: require('../../../assets/flag/KR.png'),
  LT: require('../../../assets/flag/LT.png'),
  LV: require('../../../assets/flag/LV.png'),
  MK: require('../../../assets/flag/MK.png'),
  MT: require('../../../assets/flag/MT.png'),
  MY: require('../../../assets/flag/MY.png'),
  NL: require('../../../assets/flag/NL.png'),
  NO: require('../../../assets/flag/NO.png'),
  PH: require('../../../assets/flag/PH.png'),
  PK: require('../../../assets/flag/PK.png'),
  PL: require('../../../assets/flag/PL.png'),
  PT: require('../../../assets/flag/PT.png'),
  RO: require('../../../assets/flag/RO.png'),
  RS: require('../../../assets/flag/RS.png'),
  RU: require('../../../assets/flag/RU.png'),
  SA: require('../../../assets/flag/SA.png'),
  SE: require('../../../assets/flag/SE.png'),
  SI: require('../../../assets/flag/SI.png'),
  SJ: require('../../../assets/flag/SJ.png'),
  SK: require('../../../assets/flag/SK.png'),
  TH: require('../../../assets/flag/TH.png'),
  TR: require('../../../assets/flag/TR.png'),
  UA: require('../../../assets/flag/UA.png'),
  US: require('../../../assets/flag/US.png'),
  VN: require('../../../assets/flag/VN.png'),
  WELSH: require('../../../assets/flag/WELSH.png'),
  YIDDISH: require('../../../assets/flag/YIDDISH.png'),
  ZA: require('../../../assets/flag/ZA.png'),
};

/** 选择语言组件 */
export default (): any => {
  const [visible, setVisible] = useState(false); // 组件下拉
  const [lanVisible, setLanVisible] = useState(false); // 语言下拉
  const [curVisible, setCurVisible] = useState(false); // 货币下拉
  const [language, setLanguage] = useState<Flg>(flagList[0]); // 选择的语言
  const [tempLanguage, setTempLanguage] = useState<Flg>(flagList[0]); // 下拉临时缓存
  const [currency, setCurrency] = useState<CurrencyObj>({
    symbol: '$',
    NAME: '美元',
    currency: 'USD',
  }); // 选择的货币
  const [tempCurrency, setTempCurrency] = useState<CurrencyObj>({
    symbol: '$',
    NAME: '美元',
    currency: 'USD',
  }); // 下拉临时缓存
  const [currencyList, setCurrencyList] = useState<Array<CurrencyObj>>([]); // 货币列表

  useEffect(() => {
    getCurrency();
  }, []);

  /** 获取货币信息 */
  async function getCurrency(): Promise<any> {
    const resp = await getInfoCollection({
      // currency: 1,
      // currentCountry: 1,
      symbol: 1,
      // countryList: 1,
    });

    const cList = resp?.data?.symbol || [];
    setCurrencyList(cList);
  }

  /** 点击展示或者隐藏下拉弹窗 */
  function showMenu(e: React.MouseEvent): void {
    e.stopPropagation();
    setVisible((v: boolean) => !v);
  }

  /** 关闭下拉 */
  function unshow(): void {
    setVisible(false);
    setLanVisible(false);
    setCurVisible(false);
  }

  /** 关闭&重置 */
  function close(): void {
    unshow();
    resetLanCur();
  }

  /** 重置缓存语言和货币为当前已选择语言货币 */
  function resetLanCur() {
    setTempLanguage(language);
    setTempCurrency(currency);
  }

  /** 点击选择语言 */
  function showLanguage(e: React.MouseEvent): void {
    e.stopPropagation();
    setLanVisible((v: boolean) => !v);
    setCurVisible(false);
  }

  /** 点击选择货币 */
  function showCurrency(e: React.MouseEvent): void {
    e.stopPropagation();
    setCurVisible((v: boolean) => !v);
    setLanVisible(false);
  }

  /** 点击下拉弹窗 */
  function clickDropdown(e: React.MouseEvent): void {
    e.stopPropagation();
    setLanVisible(false);
    setCurVisible(false);
  }

  /** 保存选中语言 */
  function selectLanguage(lan: Flg): void {
    setTempLanguage(lan);
  }

  function selectCurrency(cur: CurrencyObj): void {
    setTempCurrency(cur);
  }

  /** 获取国旗src */
  function getFlgSrc(item: Flg): void {
    const tmp = item.flag || item.opt.split('|')[1].toUpperCase();
    return flgObg[tmp];
  }

  /** 保存选择的语言&货币 */
  function saveLanCur(): void {
    setLanguage(tempLanguage);
    setCurrency(tempCurrency);
    unshow();
  }

  return {
    visible,
    lanVisible,
    curVisible,
    language,
    tempLanguage,
    currency,
    tempCurrency,
    currencyList,
    showMenu,
    unshow,
    close,
    showLanguage,
    showCurrency,
    clickDropdown,
    selectLanguage,
    selectCurrency,
    getFlgSrc,
    saveLanCur,
  };
};
