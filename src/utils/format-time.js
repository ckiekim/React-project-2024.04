import { format, getTime, formatDistanceToNow } from 'date-fns';
import { format as fmt, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

register('ko', koLocale)

export function formatAgo(date, lang='en_US') {
  return fmt(date, lang);
}
