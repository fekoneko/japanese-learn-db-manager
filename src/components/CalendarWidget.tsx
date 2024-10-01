import { FC } from 'react';

const CalendarWidget: FC = () => (
  <iframe
    src="https://calendar.google.com/calendar/embed?src=ru.russian%23holiday%40group.v.calendar.google.com&ctz=Europe%2FMoscow"
    className="h-[35rem] w-full max-w-[50rem] border-0"
  />
);
export default CalendarWidget;
