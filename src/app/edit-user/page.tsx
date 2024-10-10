import EditUserForm from '@/components/EditUserForm';
import Redirect from '@/components/Redirect';
import { auth, signIn } from '@/lib/auth';
import { updateUser } from '@/lib/user';
import { FC } from 'react';

const EditUserPage: FC = async () => {
  const session = await auth();

  if (!session?.user) return <Redirect to="/sign-in" />;

  return (
    <div className="flex grow items-center justify-center p-5">
      <EditUserForm
        currentUser={session.user}
        onEditUser={async (payload) => {
          'use server';

          if (!session.user) return;
          await updateUser(session.user.email as string, payload);
          await signIn('credentials', {
            email: payload.email,
            skipPasswordCheck: true,
            redirectTo: '/profile',
          });
        }}
      />
    </div>
  );
};
export default EditUserPage;
