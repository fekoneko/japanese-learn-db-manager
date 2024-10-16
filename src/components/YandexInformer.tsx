import { FC } from 'react';

const YandexInformer: FC = () => (
  <a
    href="https://metrika.yandex.ru/stat/?id=98585440&amp;from=informer"
    target="_blank"
    rel="nofollow"
  >
    {
      //eslint-disable-next-line @next/next/no-img-element
      <img
        src="https://informer.yandex.ru/informer/98585440/3_0_8494ABFF_64748BFF_1_pageviews"
        style={{ width: '88px', height: '31px', border: '0' }}
        alt="Яндекс.Метрика"
        title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)"
        className="ym-advanced-informer"
        data-cid="98585440"
        data-lang="ru"
      />
    }
  </a>
);
export default YandexInformer;
