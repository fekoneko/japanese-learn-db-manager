'use client';

import { FC, useEffect } from 'react';

const YandexSerch: FC = () => {
  useEffect(() => {
    (function (w, d, c) {
      var s = d.createElement('script'),
        h = d.getElementsByTagName('script')[0],
        e = d.documentElement;
      if ((' ' + e.className + ' ').indexOf(' ya-page_js_yes ') === -1) {
        e.className += ' ya-page_js_yes';
      }
      s.type = 'text/javascript';
      s.async = true;
      s.charset = 'utf-8';
      s.src =
        (d.location.protocol === 'https:' ? 'https:' : 'http:') +
        '//site.yandex.net/v2.0/js/all.js';
      h.parentNode!.insertBefore(s, h);
      // @ts-ignore
      (w[c] || (w[c] = [])).push(function () {
        // @ts-ignore
        (Ya as any).Site.Form.init();
      });
    })(window, document, 'yandex_site_callbacks');
  });

  return (
    <div
      className="ya-site-form ya-site-form_inited_no min-w-40 max-w-80"
      data-bem='{"action":"/search","arrow":false,"bg":"transparent","fontsize":12,"fg":"#000000","language":"ru","logo":"rb","publicname":"Поиск по JapaneseLearn DB","suggest":true,"target":"_self","tld":"ru","type":2,"usebigdictionary":true,"searchid":10700152,"input_fg":"#ffffff","input_bg":"#14b8a6","input_fontStyle":"normal","input_fontWeight":"normal","input_placeholder":"Поиск по сайту","input_placeholderColor":"#dddddd","input_borderColor":"#ffffff"}'
    >
      <form
        action="https://yandex.ru/search/site/"
        method="get"
        target="_self"
        acceptCharset="utf-8"
      >
        <input type="hidden" name="searchid" value="10700152" className="hidden" />
        <input type="hidden" name="l10n" value="ru" className="hidden" />
        <input type="hidden" name="reqenc" value="" className="hidden" />
        <input type="search" name="text" value="" className="hidden" />
        <input type="submit" value="Найти" className="hidden" />
      </form>
    </div>
  );
};
export default YandexSerch;
