import React from 'react';
import { Trophy, Star, Zap, Target, Flame, Crown, Hammer } from 'lucide-react';
import { Achievement, UserStats } from '../types';
import { ACHIEVEMENTS_CONFIG } from '../utils/constants';

interface AchievementsProps {
  achievements: Achievement[];
  userStats: UserStats;
  onUpdateAchievements: (achievements: Achievement[]) => void;
}

const Achievements: React.FC<AchievementsProps> = ({ achievements, userStats, onUpdateAchievements }) => {
  const iconMap = {
    Zap: Zap,
    Flame: Flame,
    Target: Target,
    Trophy: Trophy,
    Hammer: Hammer,
    Crown: Crown,
  } as const;

  const getProgress = (achievement: Achievement) => {
    switch (achievement.id) {
      case 'first-solve':
      case 'fifty-problems':
      case 'hundred-problems':
        return Math.min(userStats.totalLeetCodeProblems, achievement.requirement);
      case 'week-streak':
        return Math.min(userStats.currentStreak, achievement.requirement);
      case 'first-project':
        return Math.min(userStats.completedProjects, achievement.requirement);
      case 'coding-master':
        return Math.min(userStats.totalCodingHours, achievement.requirement);
      default:
        return 0;
    }
  };

  // Check and update achievements
  React.useEffect(() => {
    const updatedAchievements = achievements.map(achievement => {
      const progress = getProgress(achievement);
      const shouldUnlock = progress >= achievement.requirement && !achievement.unlocked;
      
      return {
        ...achievement,
        progress,
        unlocked: achievement.unlocked || shouldUnlock,
        unlockedDate: shouldUnlock ? new Date().toISOString() : achievement.unlockedDate,
      };
    });

    const hasChanges = updatedAchievements.some((updated, index) => 
      updated.unlocked !== achievements[index].unlocked || 
      updated.progress !== achievements[index].progress
    );

    if (hasChanges) {
      onUpdateAchievements(updatedAchievements);
    }
  }, [userStats]);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;
  const completionPercentage = (unlockedCount / totalCount) * 100;

  const recentlyUnlocked = achievements
    .filter(a => a.unlocked && a.unlockedDate)
    .sort((a, b) => new Date(b.unlockedDate!).getTime() - new Date(a.unlockedDate!).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</h2>
        <p className="text-gray-600 dark:text-gray-400">Celebrate your coding milestones and progress</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Trophy className="h-8 w-8" />
            <div>
              <h3 className="text-xl font-semibold">Achievement Progress</h3>
              <p className="text-orange-100">Keep pushing your limits!</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">{unlockedCount}/{totalCount}</p>
            <p className="text-orange-100 text-sm">Unlocked</p>
          </div>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-3">
          <div
            className="bg-white h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <p className="text-center text-orange-100 text-sm mt-2">
          {completionPercentage.toFixed(1)}% Complete
        </p>
      </div>

      {/* Recently Unlocked */}
      {recentlyUnlocked.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span>Recently Unlocked</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentlyUnlocked.map((achievement) => {
              const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Trophy;
              return (
                <div
                  key={achievement.id}
                  className="flex items-center space-x-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
                >
                  <div className="bg-gradient-to-br from-yellow-500 to-orange-600 p-2 rounded-lg">
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{achievement.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {achievement.unlockedDate && new Date(achievement.unlockedDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* All Achievements */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">All Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => {
            const IconComponent = iconMap[achievement.icon as keyof typeof iconMap] || Trophy;
            const progressPercentage = (achievement.progress / achievement.requirement) * 100;
            
            return (
              <div
                key={achievement.id}
                className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                  achievement.unlocked
                    ? 'border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                }`}
              >
                {achievement.unlocked && (
                  <div className="absolute top-2 right-2">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full p-1">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-yellow-500 to-orange-600'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      <IconComponent className={`h-6 w-6 ${
                        achievement.unlocked ? 'text-white' : 'text-gray-500 dark:text-gray-400'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className={`font-semibold ${
                        achievement.unlocked
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm ${
                        achievement.unlocked
                          ? 'text-gray-700 dark:text-gray-300'
                          : 'text-gray-500 dark:text-gray-500'
                      }`}>
                        {achievement.description}
                      </p>
                      
                      <div className="mt-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-gray-600 dark:text-gray-400">Progress</span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {achievement.progress}/{achievement.requirement}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${
                              achievement.unlocked
                                ? 'bg-gradient-to-r from-yellow-500 to-orange-600'
                                : 'bg-gray-400 dark:bg-gray-500'
                            }`}
                            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                          />
                        </div>
                      </div>
                      
                      {achievement.unlocked && achievement.unlockedDate && (
                        <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                          Unlocked on {new Date(achievement.unlockedDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivational Section */}
      <div className="text-center bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-lg p-8 text-white">
        <Flame className="h-12 w-12 mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">Keep the Fire Burning! 🔥</h3>
        <p className="text-purple-100">
          Every line of code, every problem solved, every hour spent learning brings you closer to your goals.
          Your dedication is building something amazing!
        </p>
      </div>
    </div>
  );
};

export default Achievements;