import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("admin"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const archdeaconries = pgTable("archdeaconries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  image1Url: text("image1_url"),
  image2Url: text("image2_url"),
  image3Url: text("image3_url"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const parishes = pgTable("parishes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  address: text("address").notNull(),
  phone: text("phone"),
  email: text("email"),
  serviceTimes: text("service_times"),
  mapUrl: text("map_url"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  archdeaconryId: varchar("archdeaconry_id").references(() => archdeaconries.id),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const priests = pgTable("priests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email"),
  bio: text("bio"),
  imageUrl: text("image_url"),
  parishId: varchar("parish_id").references(() => parishes.id),
  title: text("title").default("Reverend"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const events = pgTable("events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  time: text("time"),
  location: text("location"),
  category: text("category").default("general"),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").default(sql`now()`),
});

// Relations
export const archdeaconriesRelations = relations(archdeaconries, ({ many }) => ({
  parishes: many(parishes),
}));

export const parishesRelations = relations(parishes, ({ one, many }) => ({
  archdeaconry: one(archdeaconries, {
    fields: [parishes.archdeaconryId],
    references: [archdeaconries.id],
  }),
  priests: many(priests),
}));

export const priestsRelations = relations(priests, ({ one }) => ({
  parish: one(parishes, {
    fields: [priests.parishId],
    references: [parishes.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertArchdeaconrySchema = createInsertSchema(archdeaconries).omit({
  id: true,
  createdAt: true,
});

export const insertParishSchema = createInsertSchema(parishes).omit({
  id: true,
  createdAt: true,
});

export const insertPriestSchema = createInsertSchema(priests).omit({
  id: true,
  createdAt: true,
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  isRead: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertArchdeaconry = z.infer<typeof insertArchdeaconrySchema>;
export type Archdeaconry = typeof archdeaconries.$inferSelect;

export type InsertParish = z.infer<typeof insertParishSchema>;
export type Parish = typeof parishes.$inferSelect;

export type InsertPriest = z.infer<typeof insertPriestSchema>;
export type Priest = typeof priests.$inferSelect;

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;
