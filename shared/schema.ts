import { pgTable, text, serial, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  technologies: text("technologies").array().notNull(),
  projectUrl: text("project_url"),
  githubUrl: text("github_url"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  avatarUrl: text("avatar_url"),
  email: text("email").notNull(),
  location: text("location"),
  socialLinks: json("social_links").$type<{
    twitter: string | null;
    instagram: string | null;
    github: string | null;
    linkedin: string | null;
  }>().notNull(),
});

export const blog_posts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  slug: text("slug").notNull().unique(),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const music_tracks = pgTable("music_tracks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  audioUrl: text("audio_url").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({ id: true, createdAt: true });
export const insertProfileSchema = createInsertSchema(profile).omit({ id: true });
export const insertBlogPostSchema = createInsertSchema(blog_posts).omit({ id: true, createdAt: true, updatedAt: true });
export const insertMusicTrackSchema = createInsertSchema(music_tracks).omit({ id: true, createdAt: true });

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Profile = typeof profile.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type BlogPost = typeof blog_posts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type MusicTrack = typeof music_tracks.$inferSelect;
export type InsertMusicTrack = z.infer<typeof insertMusicTrackSchema>;