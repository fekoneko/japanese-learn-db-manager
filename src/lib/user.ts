import { UserSchema } from '@/schemas/globals';
import { sql } from '@vercel/postgres';
import { Validator } from 'jsonschema';
import { User } from 'next-auth';

const validator = new Validator();

export const createUser = async (payload: User & { passwordHash: string }) => {
  if (!validator.validate(payload, UserSchema)) throw new Error('Invalid user data');

  await sql`
    INSERT INTO public."Users" ("Name", "PasswordHash")
    VALUES (${payload.name}, ${payload.passwordHash})
  `;
};

export const getUserByEmail = async (email: string): Promise<User & { passwordHash: string }> => {
  const dbResponse = await sql`
    SELECT * FROM public."Users"
    WHERE "Email" = ${email}
  `;

  const userDto = dbResponse.rows[0];
  if (!userDto) throw new Error('User not found');

  return {
    id: userDto.UserId,
    email: userDto.Email,
    passwordHash: userDto.PasswordHash,
    name: userDto.Name,
    image: userDto.Image,
  };
};
