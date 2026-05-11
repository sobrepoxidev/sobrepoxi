import {useLocale} from 'next-intl';
import {routing} from '@/i18n/routing';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';

export default function LocaleSwitcher() {

  const locale = useLocale();

  return (
    <LocaleSwitcherSelect defaultValue={locale} label={locale === 'es' ? 'ES' : 'EN'}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur} className="bg-[#303030] border-0">
          {cur === 'es' ? 'ES' : 'EN'}
        </option>
      ))}
    </LocaleSwitcherSelect>
  );
}
