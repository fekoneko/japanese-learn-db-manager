import LinkButton from '@/components/LinkButton';
import Redirect from '@/components/Redirect';
import { auth } from '@/lib/auth';
import { FC } from 'react';

const ProfilePage: FC = async () => {
  const session = await auth();

  if (!session?.user) return <Redirect to="/sign-in" />;

  return (
    <div className="flex grow flex-col items-center justify-center gap-6 pb-10 pt-2">
      <figure className="flex flex-col items-center gap-2">
        <div className="size-28 overflow-hidden rounded-full border border-slate-400 bg-slate-300">
          {session.user.image && (
            <img
              src={session.user.image}
              alt={`Аватар пользователя ${session.user.name ?? session.user.email}`}
              className="size-full object-cover"
            />
          )}
        </div>

        <figcaption className="text-2xl font-semibold">
          {session.user.name ?? session.user.email}
        </figcaption>
      </figure>

      <table className="w-72 border-t-[1.5px] border-slate-400 [&_th]:whitespace-nowrap [&_th]:pr-8 [&_th]:text-left [&_th]:font-semibold [&_tr:not(:last-child)]:border-b [&_tr]:h-14 [&_tr]:border-slate-400">
        <tbody>
          <tr>
            <th>Имя пользователя:</th>
            <td>{session.user.name ?? '—'}</td>
          </tr>
          <tr>
            <th>Эл. почта:</th>
            <td>{session.user.email}</td>
          </tr>
          <tr>
            <th>URL аватара:</th>
            <td>
              {session.user.image ? (
                <a
                  href={session.user.image}
                  target="_blank"
                  className="text-teal-600 hover:underline"
                >
                  {session.user.image}
                </a>
              ) : (
                '—'
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <LinkButton href="/edit-user" className="border-slate-400 hover:bg-slate-300">
        Редактировать данные
      </LinkButton>
    </div>
  );
};
export default ProfilePage;
