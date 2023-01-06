import { COIN_DECIMAL } from 'src/constants';

export const formatBN = (decimal: number, fixed: number, value?: string, currencyFormat = true): string => {
  if (!value || value === '0') return '0';
  if (value.length <= decimal) {
    if (!fixed) {
      return '0';
    }
    return `0.${'0'.repeat(decimal - value.length)}${value.substring(0, fixed)}`;
  }
  let prefix = value.substring(0, value.length - decimal);
  if (currencyFormat) {
    prefix = formatCurrency(prefix);
  }
  if (!fixed) {
    return prefix;
  }
  const suffix = value.substring(value.length - decimal, value.length - decimal + fixed);
  return `${prefix}.${suffix}`;
};

const formatCurrency = (value: string) => {
  if (!value) {
    return '';
  }
  let result = value[value.length - 1];
  for (let i = value.length - 2; i >= 0; i--) {
    if ((value.length - 1 - i) % 3 === 0) {
      result = ',' + result;
    }
    result = value[i] + result;
  }
  return result;
};

export const pad = (num: string, size: number) => {
  if (num.length >= 2) {
    return num;
  }

  const s = '000000000' + num;
  return s.substr(s.length - size);
};

export const calculateTokenAmount = (amount, fund_token_ratio, decimals = COIN_DECIMAL) => {
  if (!amount || !fund_token_ratio) {
    return 0;
  }
  return (parseFloat(amount) * parseFloat(fund_token_ratio)) / Math.pow(10, decimals);
};

export const rate = (ratio, price = Math.pow(10, COIN_DECIMAL)) => {
  const ratioVal = parseFloat(ratio);
  return price / ratioVal;
};

export const formatMoney = (amount, decimals, thousandSeparator = ',', decimalSeparator = '.') => {
  let number = amount;
  const decPlaces = isNaN((decimals = Math.abs(decimals))) ? 2 : decimals;
  const decSeparator = decimalSeparator == undefined ? '.' : decimalSeparator;
  const thouSeparator = thousandSeparator == undefined ? ',' : thousandSeparator;
  const sign = number < 0 ? '-' : '';
  const i = parseInt((number = Math.abs(+number || 0).toFixed(decPlaces))) + '';
  let j = 0;
  j = (j = i.length) > 3 ? j % 3 : 0;
  return (
    sign +
    (j ? i.substr(0, j) + thouSeparator : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thouSeparator) +
    (decPlaces
      ? decSeparator +
        Math.abs(number - parseInt(i))
          .toFixed(decPlaces)
          .slice(2)
      : '')
  );
};
