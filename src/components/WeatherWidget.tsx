import { FC } from 'react';

const WeatherWidget: FC = () => (
  <div
    suppressHydrationWarning
    dangerouslySetInnerHTML={{
      __html: `
        <div
          id="ww_202264a86cf1f"
          v="1.3"
          loc="auto"
          a='{"t":"horizontal","lang":"ru","ids":[],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"#FFFFFF00","cl_font":"#000000","cl_cloud":"#d4d4d4","cl_persp":"#2196F3","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722"}'
        >
          <a href="https://weatherwidget.org/ru/" id="ww_202264a86cf1f_u" class="hidden">
            Погодный информер погоды для сайта
          </a>
        </div>

        <script async src="https://app3.weatherwidget.org/js/?id=ww_202264a86cf1f"></script>
      `,
    }}
  />
);
export default WeatherWidget;
