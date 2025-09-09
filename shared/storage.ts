import { PrismaClient } from "@prisma/client";
import type { 
  User, Archdeaconry, Parish, Priest, Event, Contact,
  Prisma
} from "@prisma/client";

const prisma = new PrismaClient();

// Type aliases for insert operations
type InsertUser = Prisma.UserCreateInput;
type InsertArchdeaconry = Prisma.ArchdeaconryCreateInput;
type InsertParish = Prisma.ParishCreateInput;
type InsertPriest = Prisma.PriestCreateInput;
type InsertEvent = Prisma.EventCreateInput;
type InsertContact = Prisma.ContactCreateInput;

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
}

export class DatabaseStorage implements IStorage {
  constructor() {
    // Note: You'll need to implement session store for MySQL if needed
    // this.sessionStore = new MySQLSessionStore({ ... });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: { username }
    });
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    return await prisma.user.create({
      data: insertUser
    });
  }

  // Archdeaconry methods
  async getArchdeaconries(): Promise<Archdeaconry[]> {
    return await prisma.archdeaconry.findMany({
      orderBy: { name: 'asc' }
    });
  }

  async getArchdeaconry(id: string): Promise<Archdeaconry | undefined> {
    const archdeaconry = await prisma.archdeaconry.findUnique({
      where: { id }
    });
    return archdeaconry || undefined;
  }

  async createArchdeaconry(insertArchdeaconry: InsertArchdeaconry): Promise<Archdeaconry> {
    return await prisma.archdeaconry.create({
      data: insertArchdeaconry
    });
  }

  async updateArchdeaconry(id: string, updateArchdeaconry: Partial<InsertArchdeaconry>): Promise<Archdeaconry> {
    return await prisma.archdeaconry.update({
      where: { id },
      data: updateArchdeaconry
    });
  }

  async deleteArchdeaconry(id: string): Promise<void> {
    await prisma.archdeaconry.delete({
      where: { id }
    });
  }

  // Parish methods
  async getParishes(searchQuery?: string, archdeaconryId?: string): Promise<Parish[]> {
    const where: Prisma.ParishWhereInput = {};

    if (searchQuery) {
      where.OR = [
        { name: { contains: searchQuery } },
        { address: { contains: searchQuery } }
      ];
    }

    if (archdeaconryId) {
      where.archdeaconryId = archdeaconryId;
    }

    return await prisma.parish.findMany({
      where,
      orderBy: { name: 'asc' }
    });
  }

  async getParish(id: string): Promise<Parish | undefined> {
    const parish = await prisma.parish.findUnique({
      where: { id }
    });
    return parish || undefined;
  }

  async createParish(insertParish: InsertParish): Promise<Parish> {
    return await prisma.parish.create({
      data: insertParish
    });
  }

  async updateParish(id: string, updateParish: Partial<InsertParish>): Promise<Parish> {
    return await prisma.parish.update({
      where: { id },
      data: updateParish
    });
  }

  async deleteParish(id: string): Promise<void> {
    await prisma.parish.delete({
      where: { id }
    });
  }

  // Priest methods
  async getPriests(searchQuery?: string, parishId?: string): Promise<Priest[]> {
    const where: Prisma.PriestWhereInput = {};

    if (searchQuery) {
      where.name = { contains: searchQuery };
    }

    if (parishId) {
      where.parishId = parishId;
    }

    return await prisma.priest.findMany({
      where,
      orderBy: { name: 'asc' }
    });
  }

  async getPriest(id: string): Promise<Priest | undefined> {
    const priest = await prisma.priest.findUnique({
      where: { id }
    });
    return priest || undefined;
  }

  async createPriest(insertPriest: InsertPriest): Promise<Priest> {
    return await prisma.priest.create({
      data: insertPriest
    });
  }

  async updatePriest(id: string, updatePriest: Partial<InsertPriest>): Promise<Priest> {
    return await prisma.priest.update({
      where: { id },
      data: updatePriest
    });
  }

  async deletePriest(id: string): Promise<void> {
    await prisma.priest.delete({
      where: { id }
    });
  }

  // Event methods
  async getEvents(limit?: number): Promise<Event[]> {
    return await prisma.event.findMany({
      ...(limit && { take: limit }),
      orderBy: { date: 'desc' }
    });
  }

  async getEvent(id: string): Promise<Event | undefined> {
    const event = await prisma.event.findUnique({
      where: { id }
    });
    return event || undefined;
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    return await prisma.event.create({
      data: insertEvent
    });
  }

  async updateEvent(id: string, updateEvent: Partial<InsertEvent>): Promise<Event> {
    return await prisma.event.update({
      where: { id },
      data: updateEvent
    });
  }

  async deleteEvent(id: string): Promise<void> {
    await prisma.event.delete({
      where: { id }
    });
  }

  // Contact methods
  async getContacts(): Promise<Contact[]> {
    return await prisma.contact.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    return await prisma.contact.create({
      data: insertContact
    });
  }

  async markContactAsRead(id: string): Promise<void> {
    await prisma.contact.update({
      where: { id },
      data: { isRead: true }
    });
  }

  async deleteContact(id: string): Promise<void> {
    await prisma.contact.delete({
      where: { id }
    });
  }

  // Cleanup method for graceful shutdown
  async disconnect(): Promise<void> {
    await prisma.$disconnect();
  }
}

export const storage = new DatabaseStorage();