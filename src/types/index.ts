export type ViewType =
  | 'landing'
  | 'dashboard'
  | 'instant-ai'
  | 'ai-guided'
  | 'drag-drop'
  | 'developer'
  | 'import-edit'
  | 'design-studio'
  | 'visual-editor'
  | 'components'
  | 'templates'
  | 'projects'
  | 'settings';

export interface Project {
  id: string;
  name: string;
  mode: string;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published';
}

export interface DesignToken {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
  borderRadius: string;
  spacing: string;
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
}

export interface ComponentItem {
  id: string;
  name: string;
  category: string;
  icon: string;
  preview?: string;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  tags: string[];
  description: string;
}

export interface SEOSettings {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  canonicalUrl: string;
}

export interface AppSettings {
  openRouterApiKey: string;
  selectedModel: string;
  frontend: string;
  backend: string;
  seo: SEOSettings;
  theme: 'dark' | 'light';
}
