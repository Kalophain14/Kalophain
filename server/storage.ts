import { type Update, type InsertUpdate, type Firedrill, type InsertFiredrill, type Subscriber, type InsertSubscriber } from "@shared/schema";

export interface IStorage {
  // Updates
  getUpdates(): Promise<Update[]>;
  getUpdateById(id: number): Promise<Update | undefined>;
  createUpdate(update: InsertUpdate): Promise<Update>;
  
  // Fire Drills
  getFiredrills(): Promise<Firedrill[]>;
  getFiredrillById(id: number): Promise<Firedrill | undefined>;
  createFiredrill(firedrill: InsertFiredrill): Promise<Firedrill>;
  
  // Subscribers
  getSubscribers(): Promise<Subscriber[]>;
  createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber>;
}

export class MemStorage implements IStorage {
  private updates: Map<number, Update>;
  private firedrills: Map<number, Firedrill>;
  private subscribers: Map<number, Subscriber>;
  private currentIds: { updates: number; firedrills: number; subscribers: number };

  constructor() {
    this.updates = new Map();
    this.firedrills = new Map();
    this.subscribers = new Map();
    this.currentIds = { updates: 1, firedrills: 1, subscribers: 1 };

    // Add some mock data
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock updates
    const mockUpdates: InsertUpdate[] = [
      {
        title: "Routine Maintenance Schedule",
        content: "Annual maintenance check of reactor cooling systems scheduled for next week.",
        category: "maintenance",
        isUrgent: false,
        date: new Date(),
      },
      {
        title: "Safety Protocol Update",
        content: "New safety protocols implemented for radiation monitoring.",
        category: "safety",
        isUrgent: true,
        date: new Date(),
      },
    ];

    // Mock fire drills
    const mockFiredrills: InsertFiredrill[] = [
      {
        location: "Reactor Building A",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        description: "Quarterly emergency response drill",
        status: "scheduled",
      },
      {
        location: "Control Room Complex",
        date: new Date(Date.now() - 24 * 60 * 60 * 1000),
        description: "Standard evacuation procedure test",
        status: "completed",
      },
    ];

    mockUpdates.forEach(update => this.createUpdate(update));
    mockFiredrills.forEach(drill => this.createFiredrill(drill));
  }

  async getUpdates(): Promise<Update[]> {
    return Array.from(this.updates.values()).sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async getUpdateById(id: number): Promise<Update | undefined> {
    return this.updates.get(id);
  }

  async createUpdate(update: InsertUpdate): Promise<Update> {
    const id = this.currentIds.updates++;
    const newUpdate = { ...update, id };
    this.updates.set(id, newUpdate);
    return newUpdate;
  }

  async getFiredrills(): Promise<Firedrill[]> {
    return Array.from(this.firedrills.values()).sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  async getFiredrillById(id: number): Promise<Firedrill | undefined> {
    return this.firedrills.get(id);
  }

  async createFiredrill(firedrill: InsertFiredrill): Promise<Firedrill> {
    const id = this.currentIds.firedrills++;
    const newFiredrill = { ...firedrill, id };
    this.firedrills.set(id, newFiredrill);
    return newFiredrill;
  }

  async getSubscribers(): Promise<Subscriber[]> {
    return Array.from(this.subscribers.values());
  }

  async createSubscriber(subscriber: InsertSubscriber): Promise<Subscriber> {
    const id = this.currentIds.subscribers++;
    const newSubscriber = { ...subscriber, id };
    this.subscribers.set(id, newSubscriber);
    return newSubscriber;
  }
}

export const storage = new MemStorage();
