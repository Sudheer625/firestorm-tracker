import React from 'react';
import { 
  Flame, Target, Code, Globe, Trophy, TrendingUp,
  Calendar, Clock, Star, Zap
} from 'lucide-react';
import { LeetCodeEntry, CodingLogEntry, WebDevEntry, UserStats } from '../types';

interface DashboardProps {
  leetCodeEntries: LeetCodeEntry[];
  codingLogs: CodingLogEntry[];
  webDevEntries: WebDevEntry[];
  userStats: UserStats;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  leetCodeEntries, 
  codingLogs, 
  webDevEntries, 
  userStats 
}) => {
  const today = new Date().toISOString().split('T')[0];
  const todayLeetCode = leetCodeEntries.filter(entry => entry.date === today);
  const todayCoding = codingLogs.filter(entry => entry.date === today);
  const todayWebDev = webDevEntries.filter(entry => entry.date === today);

  const todayStats = {
    leetcodeProblems: todayLeetCode.reduce((sum, entry) => sum + entry.problemsSolved, 0),
    codingHours: todayCoding.reduce((sum, entry) => sum + entry.timeSpent, 0),
    webdevHours: todayWebDev.reduce((sum, entry) => sum + entry.practiceTime, 0),
  };

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    gradient, 
    subtitle 
  }: { 
    title: string; 
    value: string | number; 
    icon: React.ElementType; 
    gradient: string;
    subtitle?: string;
  }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${gradient}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  const StreakIndicator = () => (
    <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
      <div className="flex items-center space-x-4">
        <div className="bg-white/20 p-3 rounded-lg">
          <Flame className="h-8 w-8" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Current Streak</h3>
          <p className="text-3xl font-bold">{userStats.currentStreak} days</p>
          <p className="text-orange-100 text-sm">Longest: {userStats.longestStreak} days</p>
        </div>
      </div>
    </div>
  );

  const ActivityHeatmap = () => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return date.toISOString().split('T')[0];
    });

    const getActivityLevel = (date: string) => {
      const dayLeetCode = leetCodeEntries.filter(entry => entry.date === date);
      const dayCoding = codingLogs.filter(entry => entry.date === date);
      const dayWebDev = webDevEntries.filter(entry => entry.date === date);
      
      const totalActivity = dayLeetCode.length + dayCoding.length + dayWebDev.length;
      
      if (totalActivity === 0) return 'bg-gray-200 dark:bg-gray-700';
      if (totalActivity <= 2) return 'bg-orange-200 dark:bg-orange-900';
      if (totalActivity <= 4) return 'bg-orange-400 dark:bg-orange-700';
      return 'bg-orange-600 dark:bg-orange-500';
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Activity Heatmap (Last 30 Days)
        </h3>
        <div className="grid grid-cols-10 gap-1">
          {last30Days.map((date, index) => (
            <div
              key={date}
              className={`w-3 h-3 rounded-sm ${getActivityLevel(date)}`}
              title={`${date}: Activity level`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
          <span>Less</span>
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-gray-200 dark:bg-gray-700 rounded-sm" />
            <div className="w-3 h-3 bg-orange-200 dark:bg-orange-900 rounded-sm" />
            <div className="w-3 h-3 bg-orange-400 dark:bg-orange-700 rounded-sm" />
            <div className="w-3 h-3 bg-orange-600 dark:bg-orange-500 rounded-sm" />
          </div>
          <span>More</span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Welcome to Fire Storm
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track your coding journey and ignite your potential
        </p>
      </div>

      {/* Streak Indicator */}
      <StreakIndicator />

      {/* Today's Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Today's LeetCode"
          value={todayStats.leetcodeProblems}
          subtitle="problems solved"
          icon={Target}
          gradient="bg-gradient-to-br from-blue-500 to-purple-600"
        />
        <StatCard
          title="Coding Hours"
          value={`${todayStats.codingHours}h`}
          subtitle="practice time"
          icon={Code}
          gradient="bg-gradient-to-br from-green-500 to-teal-600"
        />
        <StatCard
          title="Web Dev Time"
          value={`${todayStats.webdevHours}h`}
          subtitle="learning time"
          icon={Globe}
          gradient="bg-gradient-to-br from-purple-500 to-pink-600"
        />
        <StatCard
          title="Total Projects"
          value={userStats.completedProjects}
          subtitle="completed"
          icon={Trophy}
          gradient="bg-gradient-to-br from-orange-500 to-red-600"
        />
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Problems"
          value={userStats.totalLeetCodeProblems}
          icon={Target}
          gradient="bg-gradient-to-br from-indigo-500 to-blue-600"
        />
        <StatCard
          title="Coding Hours"
          value={`${userStats.totalCodingHours}h`}
          icon={Clock}
          gradient="bg-gradient-to-br from-emerald-500 to-green-600"
        />
        <StatCard
          title="Achievements"
          value={userStats.achievementsUnlocked}
          icon={Star}
          gradient="bg-gradient-to-br from-yellow-500 to-orange-600"
        />
        <StatCard
          title="Streak Record"
          value={`${userStats.longestStreak} days`}
          icon={Zap}
          gradient="bg-gradient-to-br from-red-500 to-pink-600"
        />
      </div>

      {/* Activity Heatmap */}
      <ActivityHeatmap />

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200">
            <Target className="h-5 w-5" />
            <span>Log LeetCode Problem</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all duration-200">
            <Code className="h-5 w-5" />
            <span>Add Coding Session</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-200">
            <Globe className="h-5 w-5" />
            <span>Track Web Dev Progress</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;