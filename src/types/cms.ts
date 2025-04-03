// Page Types
export interface Page {
  id: string;
  title: string;
  slug: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  sections: Section[];
  status: 'draft' | 'published' | 'archived';
  isHomepage: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date | null;
  createdBy: string;
  updatedBy: string;
}

export interface Section {
  id: string;
  title?: string;
  type: 'hero' | 'services' | 'technology' | 'innovation' | 'timeline' | 'clients' | 'cta' | 'contact' | 'custom';
  layout: 'full' | 'contained' | 'split';
  backgroundColor?: string;
  backgroundImage?: string;
  components: Component[];
  order: number;
}

export interface Component {
  id: string;
  type: 'heading' | 'text' | 'image' | 'video' | 'button' | 'card' | 'form' | 'richText' | 'custom';
  content: any;
  settings?: Record<string, any>;
  order: number;
}

// Media Types
export interface Media {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  thumbnailUrl?: string;
  alt?: string;
  caption?: string;
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
  duration?: number;
  status: 'draft' | 'published' | 'archived';
  folder: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: Date;
  lastLogin?: Date;
}

// Settings Types
export interface Settings {
  id: string;
  siteName: string;
  siteDescription?: string;
  logo?: string;
  favicon?: string;
  primaryColor?: string;
  secondaryColor?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  updatedAt: Date;
  updatedBy: string;
}
