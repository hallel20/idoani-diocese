// lib/validation.ts
import { z } from "zod";

export const insertArchdeaconrySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  image1Url: z.string().url("Must be a valid URL").optional(),
  image2Url: z.string().url("Must be a valid URL").optional(),
  image3Url: z.string().url("Must be a valid URL").optional(),
});

export const insertParishSchema = z.object({
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().optional(),
  email: z.string().email("Must be a valid email").optional(),
  serviceTimes: z.string().optional(),
  mapUrl: z.string().url("Must be a valid URL").optional(),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  archdeaconryId: z.string().uuid("Must be a valid UUID").optional(),
  imageUrl: z.string().url("Must be a valid URL").optional(),
});

export const insertPriestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  email: z.string().email("Must be a valid email").optional(),
  bio: z.string().optional(),
  imageUrl: z.string().url("Must be a valid URL").optional(),
  parishId: z.string().uuid("Must be a valid UUID").optional(),
  title: z.string().default("Reverend"),
});

export const insertEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.string().datetime("Must be a valid datetime").or(z.date()),
  time: z.string().optional(),
  location: z.string().optional(),
  category: z.string().default("general"),
  isFeatured: z.boolean().default(false),
});

export const insertContactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Must be a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});