import { UserSchema } from '@/schemas/globals';
import { sql } from '@vercel/postgres';
import { Validator } from 'jsonschema';
import { User } from 'next-auth';

const validator = new Validator();

const getHash = async (string: string) => {
  const arrayBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(string));
  return new TextDecoder().decode(arrayBuffer);
};

export const createUser = async (payload: User & { password: string }) => {
  if (!validator.validate(payload, UserSchema)) throw new Error('Invalid user data');

  const passwordHash = await getHash(payload.password);

  await sql`
    INSERT INTO public."Users" ("Email", "Name", "Image", "PasswordHash")
    VALUES (${payload.email}, ${payload.name}, ${payload.image}, ${passwordHash})
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

export const validateUserPassword = async (user: { passwordHash: string }, password: string) => {
  const passwordHash = await getHash(password);
  return passwordHash === user.passwordHash;
};
