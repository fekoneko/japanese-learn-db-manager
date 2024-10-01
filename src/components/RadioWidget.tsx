'use client';

import { FC, useEffect } from 'react';

const RadioWidget: FC = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="elfsight-app-3b9ddb51-290a-4e95-8094-79b6a04a8bbe" data-elfsight-app-lazy />
  );
};
export default RadioWidget;
