import { text } from '@language/text';
import style from './Breadcrumbs.module.css';
import { Link } from '@navikt/ds-react';
import { minSideUrlWithLanguage, baseUrlWithLanguage } from '@src/urls.client';
import { logEvent } from '@src/utils/client/amplitude';
import type { Language } from '@language/language';

interface Props {
  showDokumenter: boolean;
  language: Language;
}

const Breadcrumbs = ({ showDokumenter, language }: Props) => (
  <div className={style.container}>
    <a
      className={`${style.minSideLink} ${style.link}`}
      href={minSideUrlWithLanguage[language]}
      onClick={() => logEvent('breadcrum', 'min-side')}
    >
      {text.minSide[language]}
    </a>
    {showDokumenter && (
      <div className={style.linkWrapper}>
        <a
          className={style.link}
          onClick={() => logEvent('breadcrum', 'utbetalinger')}
          href={baseUrlWithLanguage[language]}
        >
          {text.dokumenter[language]}
        </a>
      </div>
    )}
  </div>
);
export default Breadcrumbs;