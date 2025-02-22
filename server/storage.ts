import { type Project, type InsertProject, type Profile, type InsertProfile } from "@shared/schema";
import { type BlogPost, type InsertBlogPost, type MusicTrack, type InsertMusicTrack } from "@shared/schema";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  getFeaturedProjects(): Promise<Project[]>;

  // Profile
  getProfile(): Promise<Profile | undefined>;
  updateProfile(profile: InsertProfile): Promise<Profile>;

  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;

  // Music
  getMusicTracks(): Promise<MusicTrack[]>;
  getMusicTrackById(id: number): Promise<MusicTrack | undefined>;
  createMusicTrack(track: InsertMusicTrack): Promise<MusicTrack>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private profile: Profile | undefined;
  private blogPosts: Map<number, BlogPost>;
  private musicTracks: Map<number, MusicTrack>;
  private currentIds: { 
    projects: number; 
    blogPosts: number;
    musicTracks: number;
  };

  constructor() {
    this.projects = new Map();
    this.blogPosts = new Map();
    this.musicTracks = new Map();
    this.currentIds = { 
      projects: 1, 
      blogPosts: 1,
      musicTracks: 1
    };
    this.initializeMockData();
  }

  private initializeMockData() {
    // Sample projects
    const mockProjects: InsertProject[] = [
      {
        title: "E-commerce Platform",
        description: "A full-stack e-commerce platform built with React and Node.js",
        imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c",
        technologies: ["React", "Node.js", "PostgreSQL", "Typescript"],
        projectUrl: "https://ecommerce.example.com",
        githubUrl: "https://github.com/username/ecommerce",
        featured: true,
      },
      {
        title: "Portfolio Website",
        description: "Personal portfolio website with dynamic content management",
        imageUrl: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
        technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
        projectUrl: "https://portfolio.example.com",
        githubUrl: "https://github.com/username/portfolio",
        featured: true,
      },
    ];

    // Sample profile
    const mockProfile: InsertProfile = {
      name: "Temoso Chueu",
      title: "Full Stack Developer",
      bio: "Passionate developer crafting digital experiences with modern web technologies",
      email: "temoso@example.com",
      location: "Cape Town, South Africa",
      socialLinks: {
        twitter: "https://x.com/kalophain?s=21",
        instagram: "https://www.instagram.com/kalophain14",
        github: "https://github.com/Kalophain14",
        linkedin: null
      },
    };

    // Sample blog posts
    const mockBlogPosts: InsertBlogPost[] = [
      {
        title: "Building Modern Web Applications",
        content: "In this post, we'll explore the latest trends and best practices in web development...",
        excerpt: "Exploring the latest trends and best practices in web development",
        slug: "building-modern-web-applications",
        published: true,
      },
      {
        title: "My Journey in Tech",
        content: "Starting my journey in tech wasn't easy, but here's what I've learned...",
        excerpt: "Reflecting on my experiences and growth as a developer",
        slug: "my-journey-in-tech",
        published: true,
      },
    ];

    // Sample music tracks
    const mockMusicTracks: InsertMusicTrack[] = [
      {
        title: "Latest Tracks",
        description: "My recent musical creations and experiments",
        imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
        audioUrl: "/music/latest-tracks.mp3",
        category: "electronic",
      },
      {
        title: "Ambient Collection",
        description: "A collection of ambient soundscapes",
        imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea",
        audioUrl: "/music/ambient-collection.mp3",
        category: "ambient",
      },
    ];

    mockProjects.forEach(project => this.createProject(project));
    mockBlogPosts.forEach(post => this.createBlogPost(post));
    mockMusicTracks.forEach(track => this.createMusicTrack(track));
    this.updateProfile(mockProfile);
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.currentIds.projects++;
    const newProject = {
      ...project,
      id,
      createdAt: new Date(),
      projectUrl: project.projectUrl || null,
      githubUrl: project.githubUrl || null,
      featured: project.featured || false,
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.featured)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getProfile(): Promise<Profile | undefined> {
    return this.profile;
  }

  async updateProfile(profile: InsertProfile): Promise<Profile> {
    const newProfile: Profile = { 
      ...profile, 
      id: 1,
      location: profile.location ?? null,
      avatarUrl: profile.avatarUrl ?? null,
      socialLinks: {
        twitter: profile.socialLinks?.twitter || null,
        instagram: profile.socialLinks?.instagram || null,
        github: profile.socialLinks?.github || null,
        linkedin: profile.socialLinks?.linkedin || null
      }
    };
    this.profile = newProfile;
    return newProfile;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.published)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentIds.blogPosts++;
    const newPost = {
      ...post,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      published: post.published ?? false, // Ensure published is never undefined
    };
    this.blogPosts.set(id, newPost);
    return newPost;
  }

  async getMusicTracks(): Promise<MusicTrack[]> {
    return Array.from(this.musicTracks.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getMusicTrackById(id: number): Promise<MusicTrack | undefined> {
    return this.musicTracks.get(id);
  }

  async createMusicTrack(track: InsertMusicTrack): Promise<MusicTrack> {
    const id = this.currentIds.musicTracks++;
    const newTrack = {
      ...track,
      id,
      createdAt: new Date(),
    };
    this.musicTracks.set(id, newTrack);
    return newTrack;
  }
}

export const storage = new MemStorage();