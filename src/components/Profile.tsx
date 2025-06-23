import React, { useState } from 'react';
import { User, Edit3, Save, X, Github, Linkedin, Globe, Calendar, Code, Target } from 'lucide-react';
import { UserStats } from '../types';

interface ProfileProps {
  userStats: UserStats;
}

const Profile: React.FC<ProfileProps> = ({ userStats }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Fire Storm Developer',
    bio: 'Passionate developer on a journey to master the art of coding',
    location: 'Earth, Tech Universe',
    githubUrl: '',
    linkedinUrl: '',
    portfolioUrl: '',
    joinDate: '2024-01-01',
  });

  const handleSave = () => {
    // Here you would typically save to localStorage or a database
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to previous values
    setIsEditing(false);
  };

  const statsData = [
    {
      label: 'LeetCode Problems',
      value: userStats.totalLeetCodeProblems,
      icon: Target,
      color: 'bg-blue-500',
    },
    {
      label: 'Current Streak',
      value: `${userStats.currentStreak} days`,
      icon: Calendar,
      color: 'bg-orange-500',
    },
    {
      label: 'Coding Hours',
      value: `${userStats.totalCodingHours}h`,
      icon: Code,
      color: 'bg-green-500',
    },
    {
      label: 'Projects Completed',
      value: userStats.completedProjects,
      icon: Github,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h2>
        <p className="text-gray-600 dark:text-gray-400">Your coding journey at a glance</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Cover Background */}
        <div className="h-32 bg-gradient-to-r from-orange-500 via-red-600 to-pink-600 relative">
          <div className="absolute inset-0 bg-black/20" />
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors"
          >
            {isEditing ? <X className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
          </button>
        </div>

        {/* Profile Content */}
        <div className="px-6 pb-6">
          {/* Avatar */}
          <div className="flex justify-center -mt-16 mb-4">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-full shadow-lg border-4 border-white dark:border-gray-800">
              <User className="h-16 w-16 text-white" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="text-center mb-6">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  className="text-2xl font-bold text-center w-full bg-transparent border-b-2 border-orange-500 focus:outline-none text-gray-900 dark:text-white"
                />
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 resize-none"
                  rows={3}
                />
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  placeholder="Location"
                />
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{profileData.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md mx-auto">{profileData.bio}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{profileData.location}</p>
              </>
            )}
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4 mb-6">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
                <input
                  type="url"
                  value={profileData.githubUrl}
                  onChange={(e) => setProfileData(prev => ({ ...prev, githubUrl: e.target.value }))}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  placeholder="GitHub URL"
                />
                <input
                  type="url"
                  value={profileData.linkedinUrl}
                  onChange={(e) => setProfileData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  placeholder="LinkedIn URL"
                />
                <input
                  type="url"
                  value={profileData.portfolioUrl}
                  onChange={(e) => setProfileData(prev => ({ ...prev, portfolioUrl: e.target.value }))}
                  className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  placeholder="Portfolio URL"
                />
              </div>
            ) : (
              <>
                {profileData.githubUrl && (
                  <a
                    href={profileData.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </a>
                )}
                {profileData.linkedinUrl && (
                  <a
                    href={profileData.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {profileData.portfolioUrl && (
                  <a
                    href={profileData.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Globe className="h-4 w-4" />
                    <span>Portfolio</span>
                  </a>
                )}
              </>
            )}
          </div>

          {/* Save/Cancel Buttons */}
          {isEditing && (
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 px-6 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Journey Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Coding Journey</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
            <div className="bg-green-500 p-2 rounded-full">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Started Fire Storm Journey</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(profileData.joinDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {userStats.totalLeetCodeProblems > 0 && (
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg">
              <div className="bg-blue-500 p-2 rounded-full">
                <Target className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">First LeetCode Problem</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">The journey of a thousand problems begins with one</p>
              </div>
            </div>
          )}

          {userStats.completedProjects > 0 && (
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
              <div className="bg-purple-500 p-2 rounded-full">
                <Github className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">First Project Completed</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">From idea to reality - you're a builder!</p>
              </div>
            </div>
          )}

          {userStats.currentStreak >= 7 && (
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
              <div className="bg-orange-500 p-2 rounded-full">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Week Streak Achieved</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Consistency is the key to mastery</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="text-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-xl shadow-lg p-8 text-white">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">💡 Developer Wisdom</h3>
          <blockquote className="text-lg italic mb-4">
            "The best time to plant a tree was 20 years ago. The second best time is now. 
            The same goes for learning to code."
          </blockquote>
          <p className="text-purple-200">Keep coding, keep growing, keep igniting your potential! 🔥</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;