export const UserType = {
  ADMIN: "ADMIN",
  SELLER: "SELLER",
  CLIENT: "CLIENT",
} as const;

export type UserType = keyof typeof UserType;