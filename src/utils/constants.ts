export const FIRE_COLORS = {
  primary: '#FF4500',    // Orange Red
  secondary: '#FF6B35',  // Vermillion
  accent: '#F7931E',     // Orange
  warm: '#FFB74D',       // Light Orange
  dark: '#CC2500',       // Dark Red
  light: '#FFE0B2',      // Light Cream
} as const;

export const CODING_LANGUAGES = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C', 'Go', 'Rust', 
  'Swift', 'Kotlin', 'PHP', 'Ruby', 'C#', 'Scala', 'R', 'HTML', 'CSS'
] as const;

export const DSA_TOPICS = [
  'Arrays', 'Strings', 'Linked Lists', 'Trees', 'Graphs', 'Dynamic Programming',
  'Sorting', 'Searching', 'Hash Tables', 'Stacks', 'Queues', 'Heaps',
  'Backtracking', 'Greedy', 'Two Pointers', 'Sliding Window', 'DFS', 'BFS'
] as const;

export const WEB_TECHNOLOGIES = [
  'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular',
  'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Tailwind CSS', 'SASS',
  'GraphQL', 'REST API', 'Firebase', 'Supabase', 'Next.js', 'Gatsby'
] as const;

export const ACHIEVEMENTS_CONFIG = [
  { id: 'first-solve', title: 'First Steps', description: 'Solve your first LeetCode problem', requirement: 1, icon: 'Zap' },
  { id: 'week-streak', title: 'Consistent Coder', description: 'Maintain a 7-day streak', requirement: 7, icon: 'Flame' },
  { id: 'fifty-problems', title: 'Problem Solver', description: 'Solve 50 LeetCode problems', requirement: 50, icon: 'Target' },
  { id: 'hundred-problems', title: 'Century Club', description: 'Solve 100 LeetCode problems', requirement: 100, icon: 'Trophy' },
  { id: 'first-project', title: 'Builder', description: 'Complete your first project', requirement: 1, icon: 'Hammer' },
  { id: 'coding-master', title: 'Coding Master', description: 'Log 100 hours of coding', requirement: 100, icon: 'Crown' },
] as const;