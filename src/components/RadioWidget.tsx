import { FC } from 'react';

const RadioWidget: FC = () => (
  <div
    suppressHydrationWarning
    dangerouslySetInnerHTML={{
      __html: `
          <div
            class="elfsight-app-3b9ddb51-290a-4e95-8094-79b6a04a8bbe"
            data-elfsight-app-lazy
          />
          
          <script async src="https://static.elfsight.com/platform/platform.js"></script>
        `,
    }}
  />
);
export default RadioWidget;
