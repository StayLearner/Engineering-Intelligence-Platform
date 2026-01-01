import { relations } from "drizzle-orm";
import {
  uuid,
  boolean,
  text,
  integer,
  pgTable,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("Users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  passwordHash: text("password").notNull(),
  githubName: text("githubName"),
  githubId: text("gitId").unique(),
  githubAvatarUrl: text("githubAvatarUrl"),
  githubUserName: text("githubUserName"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const refreshTokens = pgTable("RefreshTokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  hashedToken: text("hashedToken").notNull().unique(),
  userId: uuid("userId")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  revoked: boolean("revoked").notNull().default(false),
});

export const verifications = pgTable("Verifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  hashedPassword: text("hashedPassword").notNull(),
  otp: text("otp").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  expiresAt: timestamp("expiresAt").notNull(),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  refreshTokens: many(refreshTokens),
}));

export const refreshTokensRelations = relations(refreshTokens, ({ one }) => ({
  user: one(usersTable, {
    fields: [refreshTokens.userId],
    references: [usersTable.id],
  }),
}));
