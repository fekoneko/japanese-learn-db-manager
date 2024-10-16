import { FC } from 'react';

const ClockWidget: FC = () => (
  <iframe
    width="280"
    height="150"
    src="https://yandex.ru/time/widget/?geoid=213&lang=ru&layout=horiz&type=analog&face=serif"
  />
);
export default ClockWidget;
