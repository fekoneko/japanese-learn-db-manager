import { PasswordSchema, UserSchema } from '@/schemas/globals';
import { sql } from '@vercel/postgres';
import { Validator } from 'jsonschema';
import { User } from 'next-auth';
import taggedTemplate from './tagged-template';

const validator = new Validator();

const getHash = async (string: string) => {
  const arrayBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(string));
  return new TextDecoder().decode(arrayBuffer);
};

export const createUser = async (payload: User & { password: string }) => {
  if (!validator.validate(payload, UserSchema)) throw new Error('Invalid user data');
  if (!validator.validate(payload.password, PasswordSchema)) throw new Error('Invalid password');

  const passwordHash = await getHash(payload.password);

  await sql`
    INSERT INTO public."Users" ("Email", "Name", "Image", "PasswordHash")
    VALUES (${payload.email},
            ${payload.name ? payload.name : null},
            ${payload.image ? payload.image : null},
            ${passwordHash})
  `;
};

export const updateUser = async (oldEmail: string, payload: User & { password?: string }) => {
  if (!validator.validate(payload, UserSchema)) throw new Error('Invalid user data');

  const query = taggedTemplate`
    UPDATE public."Users"
    SET "Email" = ${payload.email},
        "Name" = ${payload.name ? payload.name : null},
        "Image" = ${payload.image ? payload.image : null}`;

  if (payload.password) {
    if (!validator.validate(payload.password, PasswordSchema)) throw new Error('Invalid password');
    query.append`,\n"PasswordHash" = ${await getHash(payload.password)}`;
  }

  query.append`\nWHERE "Email" = ${oldEmail}`;

  await sql(...query.array);
};

export const getUserByEmail = async (email: string): Promise<User & { passwordHash: string }> => {
  const dbResponse = await sql`
    SELECT * FROM public."Users"
    WHERE "Email" = ${email}
  `;

  const userDto = dbResponse.rows[0];
  if (!userDto) throw new Error('User not found');

  return {
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
