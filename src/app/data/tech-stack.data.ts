export interface TechItem {
  readonly name: string;
  readonly category: TechCategory;
  readonly icon: string;
  readonly color: string;
}

export type TechCategory = 'frontend' | 'backend' | 'database' | 'devops' | 'tools';

export const TECH_STACK: readonly TechItem[] = [
  // Frontend
  { name: 'Angular', category: 'frontend', icon: 'angular', color: '#DD0031' },
  { name: 'TypeScript', category: 'frontend', icon: 'typescript', color: '#3178C6' },
  { name: 'Tailwind CSS', category: 'frontend', icon: 'tailwind', color: '#06B6D4' },
  { name: 'SCSS', category: 'frontend', icon: 'sass', color: '#CC6699' },
  { name: 'RxJS', category: 'frontend', icon: 'rxjs', color: '#B7178C' },
  
  // Backend
  { name: '.NET Core', category: 'backend', icon: 'dotnet', color: '#512BD4' },
  { name: 'C#', category: 'backend', icon: 'csharp', color: '#239120' },
  { name: 'Node.js', category: 'backend', icon: 'nodejs', color: '#339933' },
  { name: 'REST API', category: 'backend', icon: 'api', color: '#FF6C37' },
  
  // Database
  { name: 'SQL Server', category: 'database', icon: 'sqlserver', color: '#CC2927' },
  { name: 'PostgreSQL', category: 'database', icon: 'postgresql', color: '#4169E1' },
  { name: 'MongoDB', category: 'database', icon: 'mongodb', color: '#47A248' },
  
  // DevOps
  { name: 'Docker', category: 'devops', icon: 'docker', color: '#2496ED' },
  { name: 'Azure', category: 'devops', icon: 'azure', color: '#0078D4' },
  { name: 'Vercel', category: 'devops', icon: 'vercel', color: '#000000' },
  { name: 'Git', category: 'devops', icon: 'git', color: '#F05032' },
  
  // Tools
  { name: 'VS Code', category: 'tools', icon: 'vscode', color: '#007ACC' },
  { name: 'Figma', category: 'tools', icon: 'figma', color: '#F24E1E' },
] as const;

export const TECH_CATEGORIES: Record<TechCategory, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Base de Datos',
  devops: 'DevOps & Cloud',
  tools: 'Herramientas',
};

export const getTechByCategory = (category: TechCategory): readonly TechItem[] =>
  TECH_STACK.filter(tech => tech.category === category);
