import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const updates = pgTable("updates", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(), // 'safety', 'maintenance', 'general'
  isUrgent: boolean("is_urgent").default(false),
  date: timestamp("date").defaultNow().notNull(),
});

export const firedrills = pgTable("firedrills", {
  id: serial("id").primaryKey(),
  location: text("location").notNull(),
  date: timestamp("date").notNull(),
  description: text("description").notNull(),
  status: text("status").notNull(), // 'scheduled', 'completed', 'cancelled'
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
});

export const insertUpdateSchema = createInsertSchema(updates).omit({ id: true });
export const insertFiredrillSchema = createInsertSchema(firedrills).omit({ id: true });
export const insertSubscriberSchema = createInsertSchema(subscribers).omit({ id: true });

export type Update = typeof updates.$inferSelect;
export type InsertUpdate = z.infer<typeof insertUpdateSchema>;
export type Firedrill = typeof firedrills.$inferSelect;
export type InsertFiredrill = z.infer<typeof insertFiredrillSchema>;
export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
