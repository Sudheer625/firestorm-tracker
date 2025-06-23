import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import LeetCodeTracker from './components/LeetCodeTracker';
import CodingLogs from './components/CodingLogs';
import WebDevTracker from './components/WebDevTracker';
import ProjectsSection from './components/ProjectsSection';
import Achievements from './components/Achievements';
import Profile from './components/Profile';
import Documentation from './components/Documentation';
import { useLocalStorage } from './hooks/useLocalStorage';
import { 
  LeetCodeEntry, 
  CodingLogEntry, 
  WebDevEntry, 
  ProjectEntry, 
  Achievement, 
  UserStats 
} from './types';
import { ACHIEVEMENTS_CONFIG } from './utils/constants';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  
  // Data storage using localStorage
  const [leetCodeEntries, setLeetCodeEntries] = useLocalStorage<LeetCodeEntry[]>('fire-storm-leetcode', []);
  const [codingLogs, setCodingLogs] = useLocalStorage<CodingLogEntry[]>('fire-storm-coding-logs', []);
  const [webDevEntries, setWebDevEntries] = useLocalStorage<WebDevEntry[]>('fire-storm-webdev', []);
  const [projects, setProjects] = useLocalStorage<ProjectEntry[]>('fire-storm-projects', []);
  const [achievements, setAchievements] = useLocalStorage<Achievement[]>('fire-storm-achievements', 
    ACHIEVEMENTS_CONFIG.map(config => ({
      ...config,
      unlocked: false,
      progress: 0,
    }))
  );

  // Calculate user stats
  const userStats: UserStats = {
    totalLeetCodeProblems: leetCodeEntries.reduce((sum, entry) => sum + entry.problemsSolved, 0),
    currentStreak: calculateCurrentStreak(leetCodeEntries),
    longestStreak: calculateLongestStreak(leetCodeEntries),
    totalCodingHours: codingLogs.reduce((sum, entry) => sum + entry.timeSpent, 0) + 
                      webDevEntries.reduce((sum, entry) => sum + entry.practiceTime, 0),
    completedProjects: projects.filter(p => p.status === 'Completed').length,
    achievementsUnlocked: achievements.filter(a => a.unlocked).length,
  };

  // Helper functions for streak calculation
  function calculateCurrentStreak(entries: LeetCodeEntry[]): number {
    if (entries.length === 0) return 0;
    
    const sortedDates = [...new Set(entries.map(e => e.date))].sort().reverse();
    const today = new Date().toISOString().split('T')[0];
    
    if (sortedDates[0] !== today) {
      // Check if yesterday was the last entry
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (sortedDates[0] !== yesterday.toISOString().split('T')[0]) {
        return 0;
      }
    }
    
    let streak = 0;
    const currentDate = new Date(sortedDates[0]);
    
    for (const dateStr of sortedDates) {
      const entryDate = new Date(dateStr);
      const diffDays = Math.floor((currentDate.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === streak) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  }

  function calculateLongestStreak(entries: LeetCodeEntry[]): number {
    if (entries.length === 0) return 0;
    
    const sortedDates = [...new Set(entries.map(e => e.date))].sort();
    let maxStreak = 1;
    let currentStreak = 1;
    
    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = new Date(sortedDates[i - 1]);
      const currDate = new Date(sortedDates[i]);
      const diffDays = Math.floor((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }
    
    return maxStreak;
  }

  // Add entry functions
  const addLeetCodeEntry = (entry: Omit<LeetCodeEntry, 'id'>) => {
    const newEntry: LeetCodeEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setLeetCodeEntries(prev => [...prev, newEntry]);
  };

  const addCodingLogEntry = (entry: Omit<CodingLogEntry, 'id'>) => {
    const newEntry: CodingLogEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setCodingLogs(prev => [...prev, newEntry]);
  };

  const addWebDevEntry = (entry: Omit<WebDevEntry, 'id'>) => {
    const newEntry: WebDevEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setWebDevEntries(prev => [...prev, newEntry]);
  };

  const addProject = (project: Omit<ProjectEntry, 'id'>) => {
    const newProject: ProjectEntry = {
      ...project,
      id: Date.now().toString(),
    };
    setProjects(prev => [...prev, newProject]);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <Dashboard
            leetCodeEntries={leetCodeEntries}
            codingLogs={codingLogs}
            webDevEntries={webDevEntries}
            userStats={userStats}
          />
        );
      case 'leetcode':
        return (
          <LeetCodeTracker
            entries={leetCodeEntries}
            onAddEntry={addLeetCodeEntry}
          />
        );
      case 'coding':
        return (
          <CodingLogs
            entries={codingLogs}
            onAddEntry={addCodingLogEntry}
          />
        );
      case 'webdev':
        return (
          <WebDevTracker
            entries={webDevEntries}
            onAddEntry={addWebDevEntry}
          />
        );
      case 'projects':
        return (
          <ProjectsSection
            projects={projects}
            onAddProject={addProject}
          />
        );
      case 'achievements':
        return (
          <Achievements
            achievements={achievements}
            userStats={userStats}
            onUpdateAchievements={setAchievements}
          />
        );
      case 'profile':
        return <Profile userStats={userStats} />;
      case 'documentation':
        return <Documentation />;
      default:
        return <Dashboard leetCodeEntries={leetCodeEntries} codingLogs={codingLogs} webDevEntries={webDevEntries} userStats={userStats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveSection()}
      </main>
    </div>
  );
}

export default App;