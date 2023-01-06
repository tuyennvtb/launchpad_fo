const gcd = (a: number, b: number): number => {
  if (b < 0.0000001) return a;

  return gcd(b, Math.floor(a % b));
};

export const toFraction = (num: number) => {
  const len = num.toString().length - 2;

  let denominator = Math.pow(10, len);
  let numerator = num * denominator;

  const divisor = gcd(numerator, denominator);

  numerator /= divisor;
  denominator /= divisor;

  return { numerator, denominator };
};
