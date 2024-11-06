'use client';

import CustomPostForm from '@/components/CustomPostForm';
import RssPreview from '@/components/RssPreview';
import RssSourcesForm from '@/components/RssSourcesForm';
import { FC, useState } from 'react';

const CreateFeedPage: FC = () => {
  const [isPostFormExpanded, setIsPostFormExpanded] = useState(false);
  const [isSourcesFormExpanded, setIsSourcesFormExpanded] = useState(false);

  return (
    <div>
      <RssPreview
        src="/rss/custom-feed"
        section={
          <>
            <button
              onClick={() => setIsPostFormExpanded((prev) => !prev)}
              className="mx-[12.5%] mb-3 w-3/4 border-slate-400 hover:bg-slate-300"
            >
              {isPostFormExpanded ? 'Скрыть добавление поста' : 'Добавить пост'}
            </button>

            {isPostFormExpanded && (
              <div className="mb-6 px-[12.5%]">
                <CustomPostForm />
              </div>
            )}

            <button
              onClick={() => setIsSourcesFormExpanded((prev) => !prev)}
              className="mx-[12.5%] mb-3 w-3/4 border-slate-400 hover:bg-slate-300"
            >
              {isSourcesFormExpanded ? 'Скрыть добавление фидов' : 'Добавить фиды'}
            </button>

            {isSourcesFormExpanded && (
              <div className="mb-6 px-[12.5%]">
                <RssSourcesForm />
              </div>
            )}
          </>
        }
      />
    </div>
  );
};

export default CreateFeedPage;
