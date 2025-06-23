export interface LeetCodeEntry {
  id: string;
  date: string;
  problemsSolved: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  notes?: string;
}

export interface CodingLogEntry {
  id: string;
  date: string;
  topic: string;
  language: string;
  timeSpent: number;
  description: string;
  resources?: string[];
}

export interface WebDevEntry {
  id: string;
  date: string;
  technology: string;
  concept: string;
  practiceTime: number;
  project?: string;
  notes?: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold';
  githubLink?: string;
  liveLink?: string;
  imageUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  requirement: number;
  progress: number;
}

export interface UserStats {
  totalLeetCodeProblems: number;
  currentStreak: number;
  longestStreak: number;
  totalCodingHours: number;
  completedProjects: number;
  achievementsUnlocked: number;
}