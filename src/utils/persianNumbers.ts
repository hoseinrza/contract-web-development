// Utility for Persian numbers, formatting, and number-to-words conversion

const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

export function toPersianDigits(n: number | string | undefined | null): string {
  if (n === undefined || n === null) return '';
  return n.toString().replace(/\d/g, (d) => persianDigits[parseInt(d, 10)]);
}

export function formatCurrencyToman(amount: number | string): string {
  const num = typeof amount === 'string' ? parseInt(amount.replace(/[^0-9]/g, ''), 10) || 0 : amount;
  return toPersianDigits(num.toLocaleString('en-US'));
}

export function parseNumber(val: string): number {
  const cleaned = val
    .replace(/[۰-۹]/g, (d) => String(persianDigits.indexOf(d)))
    .replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10) || 0;
}

// Convert number to Persian words
const ones = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
const teens = [
  'ده',
  'یازده',
  'دوازده',
  'سیزده',
  'چهارده',
  'پانزده',
  'شانزده',
  'هفده',
  'هجده',
  'نوزده',
];
const tens = [
  '',
  '',
  'بیست',
  'سی',
  'چهل',
  'پنجاه',
  'شصت',
  'هفتاد',
  'هشتاد',
  'نود',
];
const hundreds = [
  '',
  'یکصد',
  'دویست',
  'سیصد',
  'چهارصد',
  'پانصد',
  'ششصد',
  'هفتصد',
  'هشتصد',
  'نهصد',
];
const scales = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون'];

function convertThreeDigits(num: number): string {
  const parts: string[] = [];

  const h = Math.floor(num / 100);
  const remainder = num % 100;

  if (h > 0) {
    parts.push(hundreds[h]);
  }

  if (remainder >= 10 && remainder < 20) {
    parts.push(teens[remainder - 10]);
  } else {
    const t = Math.floor(remainder / 10);
    const o = remainder % 10;
    if (t > 0) parts.push(tens[t]);
    if (o > 0) parts.push(ones[o]);
  }

  return parts.join(' و ');
}

export function numberToPersianWords(num: number): string {
  if (num === 0) return 'صفر';
  if (num < 0) return 'منفی ' + numberToPersianWords(Math.abs(num));

  const chunks: number[] = [];
  let temp = Math.floor(num);

  while (temp > 0) {
    chunks.push(temp % 1000);
    temp = Math.floor(temp / 1000);
  }

  const words: string[] = [];

  for (let i = chunks.length - 1; i >= 0; i--) {
    const chunk = chunks[i];
    if (chunk > 0) {
      const chunkWords = convertThreeDigits(chunk);
      const scale = scales[i];
      if (scale) {
        words.push(`${chunkWords} ${scale}`);
      } else {
        words.push(chunkWords);
      }
    }
  }

  return words.join(' و ');
}
