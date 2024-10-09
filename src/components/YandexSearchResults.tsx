'use client';

import { FC, useEffect } from 'react';

const YandexSearchResults: FC = () => {
  useEffect(() => {
    (function (w, d, c) {
      var s = d.createElement('script'),
        h = d.getElementsByTagName('script')[0];
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
        Ya.Site.Results.init();
      });
    })(window, document, 'yandex_site_callbacks');
  });

  return (
    <div
      id="ya-site-results"
      data-bem='{"tld": "ru","language": "ru","encoding": "","htmlcss": "1.x","updatehash": true}'
      className="py-6"
    />
  );
};
export default YandexSearchResults;
