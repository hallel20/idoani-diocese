import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { 
  insertArchdeaconrySchema, 
  insertParishSchema, 
  insertPriestSchema, 
  insertEventSchema, 
  insertContactSchema 
} from "@shared/schema";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Middleware to check if user is authenticated
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    next();
  };

  // Public routes
  // Get all archdeaconries
  app.get("/api/archdeaconries", async (req, res) => {
    try {
      const archdeaconries = await storage.getArchdeaconries();
      res.json(archdeaconries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch archdeaconries" });
    }
  });

  // Get parishes with optional search and filter
  app.get("/api/parishes", async (req, res) => {
    try {
      const { search, archdeaconryId } = req.query;
      const parishes = await storage.getParishes(
        search as string,
        archdeaconryId as string
      );
      res.json(parishes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch parishes" });
    }
  });

  // Get single parish
  app.get("/api/parishes/:id", async (req, res) => {
    try {
      const parish = await storage.getParish(req.params.id);
      if (!parish) {
        return res.status(404).json({ message: "Parish not found" });
      }
      res.json(parish);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch parish" });
    }
  });

  // Get priests with optional search and filter
  app.get("/api/priests", async (req, res) => {
    try {
      const { search, parishId } = req.query;
      const priests = await storage.getPriests(
        search as string,
        parishId as string
      );
      res.json(priests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch priests" });
    }
  });

  // Get events
  app.get("/api/events", async (req, res) => {
    try {
      const { limit } = req.query;
      const events = await storage.getEvents(limit ? parseInt(limit as string) : undefined);
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch events" });
    }
  });

  // Create contact
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact data" });
    }
  });

  // Protected admin routes
  // Archdeaconries management
  app.post("/api/admin/archdeaconries", requireAuth, async (req, res) => {
    try {
      const validatedData = insertArchdeaconrySchema.parse(req.body);
      const archdeaconry = await storage.createArchdeaconry(validatedData);
      res.status(201).json(archdeaconry);
    } catch (error) {
      res.status(400).json({ message: "Invalid archdeaconry data" });
    }
  });

  app.put("/api/admin/archdeaconries/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = insertArchdeaconrySchema.partial().parse(req.body);
      const archdeaconry = await storage.updateArchdeaconry(req.params.id, validatedData);
      res.json(archdeaconry);
    } catch (error) {
      res.status(400).json({ message: "Invalid archdeaconry data" });
    }
  });

  app.delete("/api/admin/archdeaconries/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteArchdeaconry(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete archdeaconry" });
    }
  });

  // Parishes management
  app.post("/api/admin/parishes", requireAuth, async (req, res) => {
    try {
      const validatedData = insertParishSchema.parse(req.body);
      const parish = await storage.createParish(validatedData);
      res.status(201).json(parish);
    } catch (error) {
      res.status(400).json({ message: "Invalid parish data" });
    }
  });

  app.put("/api/admin/parishes/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = insertParishSchema.partial().parse(req.body);
      const parish = await storage.updateParish(req.params.id, validatedData);
      res.json(parish);
    } catch (error) {
      res.status(400).json({ message: "Invalid parish data" });
    }
  });

  app.delete("/api/admin/parishes/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteParish(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete parish" });
    }
  });

  // Priests management
  app.post("/api/admin/priests", requireAuth, async (req, res) => {
    try {
      const validatedData = insertPriestSchema.parse(req.body);
      const priest = await storage.createPriest(validatedData);
      res.status(201).json(priest);
    } catch (error) {
      res.status(400).json({ message: "Invalid priest data" });
    }
  });

  app.put("/api/admin/priests/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = insertPriestSchema.partial().parse(req.body);
      const priest = await storage.updatePriest(req.params.id, validatedData);
      res.json(priest);
    } catch (error) {
      res.status(400).json({ message: "Invalid priest data" });
    }
  });

  app.delete("/api/admin/priests/:id", requireAuth, async (req, res) => {
    try {
      await storage.deletePriest(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete priest" });
    }
  });

  // Events management
  app.post("/api/admin/events", requireAuth, async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(validatedData);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ message: "Invalid event data" });
    }
  });

  app.put("/api/admin/events/:id", requireAuth, async (req, res) => {
    try {
      const validatedData = insertEventSchema.partial().parse(req.body);
      const event = await storage.updateEvent(req.params.id, validatedData);
      res.json(event);
    } catch (error) {
      res.status(400).json({ message: "Invalid event data" });
    }
  });

  app.delete("/api/admin/events/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteEvent(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete event" });
    }
  });

  // Contact management
  app.get("/api/admin/contacts", requireAuth, async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  app.put("/api/admin/contacts/:id/read", requireAuth, async (req, res) => {
    try {
      await storage.markContactAsRead(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Failed to mark contact as read" });
    }
  });

  app.delete("/api/admin/contacts/:id", requireAuth, async (req, res) => {
    try {
      await storage.deleteContact(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete contact" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
