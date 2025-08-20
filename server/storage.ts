import { 
  users, archdeaconries, parishes, priests, events, contacts,
  type User, type InsertUser,
  type Archdeaconry, type InsertArchdeaconry,
  type Parish, type InsertParish,
  type Priest, type InsertPriest,
  type Event, type InsertEvent,
  type Contact, type InsertContact
} from "@shared/schema";
import { db } from "./db";
import { eq, like, or, desc, asc } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Archdeaconry methods
  getArchdeaconries(): Promise<Archdeaconry[]>;
  getArchdeaconry(id: string): Promise<Archdeaconry | undefined>;
  createArchdeaconry(archdeaconry: InsertArchdeaconry): Promise<Archdeaconry>;
  updateArchdeaconry(id: string, archdeaconry: Partial<InsertArchdeaconry>): Promise<Archdeaconry>;
  deleteArchdeaconry(id: string): Promise<void>;

  // Parish methods
  getParishes(searchQuery?: string, archdeaconryId?: string): Promise<Parish[]>;
  getParish(id: string): Promise<Parish | undefined>;
  createParish(parish: InsertParish): Promise<Parish>;
  updateParish(id: string, parish: Partial<InsertParish>): Promise<Parish>;
  deleteParish(id: string): Promise<void>;

  // Priest methods
  getPriests(searchQuery?: string, parishId?: string): Promise<Priest[]>;
  getPriest(id: string): Promise<Priest | undefined>;
  createPriest(priest: InsertPriest): Promise<Priest>;
  updatePriest(id: string, priest: Partial<InsertPriest>): Promise<Priest>;
  deletePriest(id: string): Promise<void>;

  // Event methods
  getEvents(limit?: number): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: Partial<InsertEvent>): Promise<Event>;
  deleteEvent(id: string): Promise<void>;

  // Contact methods
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  markContactAsRead(id: string): Promise<void>;
  deleteContact(id: string): Promise<void>;

  sessionStore: session.SessionStore;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ pool, createTableIfMissing: true });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Archdeaconry methods
  async getArchdeaconries(): Promise<Archdeaconry[]> {
    return await db.select().from(archdeaconries).orderBy(asc(archdeaconries.name));
  }

  async getArchdeaconry(id: string): Promise<Archdeaconry | undefined> {
    const [archdeaconry] = await db.select().from(archdeaconries).where(eq(archdeaconries.id, id));
    return archdeaconry || undefined;
  }

  async createArchdeaconry(insertArchdeaconry: InsertArchdeaconry): Promise<Archdeaconry> {
    const [archdeaconry] = await db
      .insert(archdeaconries)
      .values(insertArchdeaconry)
      .returning();
    return archdeaconry;
  }

  async updateArchdeaconry(id: string, updateArchdeaconry: Partial<InsertArchdeaconry>): Promise<Archdeaconry> {
    const [archdeaconry] = await db
      .update(archdeaconries)
      .set(updateArchdeaconry)
      .where(eq(archdeaconries.id, id))
      .returning();
    return archdeaconry;
  }

  async deleteArchdeaconry(id: string): Promise<void> {
    await db.delete(archdeaconries).where(eq(archdeaconries.id, id));
  }

  // Parish methods
  async getParishes(searchQuery?: string, archdeaconryId?: string): Promise<Parish[]> {
    let query = db.select().from(parishes);
    
    if (searchQuery) {
      query = query.where(
        or(
          like(parishes.name, `%${searchQuery}%`),
          like(parishes.address, `%${searchQuery}%`)
        )
      ) as any;
    }

    if (archdeaconryId) {
      query = query.where(eq(parishes.archdeaconryId, archdeaconryId)) as any;
    }

    return await query.orderBy(asc(parishes.name));
  }

  async getParish(id: string): Promise<Parish | undefined> {
    const [parish] = await db.select().from(parishes).where(eq(parishes.id, id));
    return parish || undefined;
  }

  async createParish(insertParish: InsertParish): Promise<Parish> {
    const [parish] = await db
      .insert(parishes)
      .values(insertParish)
      .returning();
    return parish;
  }

  async updateParish(id: string, updateParish: Partial<InsertParish>): Promise<Parish> {
    const [parish] = await db
      .update(parishes)
      .set(updateParish)
      .where(eq(parishes.id, id))
      .returning();
    return parish;
  }

  async deleteParish(id: string): Promise<void> {
    await db.delete(parishes).where(eq(parishes.id, id));
  }

  // Priest methods
  async getPriests(searchQuery?: string, parishId?: string): Promise<Priest[]> {
    let query = db.select().from(priests);
    
    if (searchQuery) {
      query = query.where(like(priests.name, `%${searchQuery}%`)) as any;
    }

    if (parishId) {
      query = query.where(eq(priests.parishId, parishId)) as any;
    }

    return await query.orderBy(asc(priests.name));
  }

  async getPriest(id: string): Promise<Priest | undefined> {
    const [priest] = await db.select().from(priests).where(eq(priests.id, id));
    return priest || undefined;
  }

  async createPriest(insertPriest: InsertPriest): Promise<Priest> {
    const [priest] = await db
      .insert(priests)
      .values(insertPriest)
      .returning();
    return priest;
  }

  async updatePriest(id: string, updatePriest: Partial<InsertPriest>): Promise<Priest> {
    const [priest] = await db
      .update(priests)
      .set(updatePriest)
      .where(eq(priests.id, id))
      .returning();
    return priest;
  }

  async deletePriest(id: string): Promise<void> {
    await db.delete(priests).where(eq(priests.id, id));
  }

  // Event methods
  async getEvents(limit?: number): Promise<Event[]> {
    let query = db.select().from(events);
    
    if (limit) {
      query = query.limit(limit) as any;
    }

    return await query.orderBy(desc(events.date));
  }

  async getEvent(id: string): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event || undefined;
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const [event] = await db
      .insert(events)
      .values(insertEvent)
      .returning();
    return event;
  }

  async updateEvent(id: string, updateEvent: Partial<InsertEvent>): Promise<Event> {
    const [event] = await db
      .update(events)
      .set(updateEvent)
      .where(eq(events.id, id))
      .returning();
    return event;
  }

  async deleteEvent(id: string): Promise<void> {
    await db.delete(events).where(eq(events.id, id));
  }

  // Contact methods
  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contacts)
      .values(insertContact)
      .returning();
    return contact;
  }

  async markContactAsRead(id: string): Promise<void> {
    await db
      .update(contacts)
      .set({ isRead: true })
      .where(eq(contacts.id, id));
  }

  async deleteContact(id: string): Promise<void> {
    await db.delete(contacts).where(eq(contacts.id, id));
  }
}

export const storage = new DatabaseStorage();
