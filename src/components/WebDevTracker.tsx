import React, { useState } from 'react';
import { Globe, Plus, Clock, BookOpen, TrendingUp } from 'lucide-react';
import { WebDevEntry } from '../types';
import { WEB_TECHNOLOGIES } from '../utils/constants';

interface WebDevTrackerProps {
  entries: WebDevEntry[];
  onAddEntry: (entry: Omit<WebDevEntry, 'id'>) => void;
}

const WebDevTracker: React.FC<WebDevTrackerProps> = ({ entries, onAddEntry }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    technology: 'React',
    concept: '',
    practiceTime: 1,
    project: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEntry(formData);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      technology: 'React',
      concept: '',
      practiceTime: 1,
      project: '',
      notes: '',
    });
    setShowForm(false);
  };

  const totalHours = entries.reduce((sum, entry) => sum + entry.practiceTime, 0);
  const thisWeek = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return entryDate >= weekAgo;
  });
  const weeklyHours = thisWeek.reduce((sum, entry) => sum + entry.practiceTime, 0);

  const technologyStats = entries.reduce((acc, entry) => {
    acc[entry.technology] = (acc[entry.technology] || 0) + entry.practiceTime;
    return acc;
  }, {} as Record<string, number>);

  const topTechnologies = Object.entries(technologyStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 6);

  const getTechColor = (tech: string) => {
    const colors = {
      'React': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'JavaScript': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'TypeScript': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      'HTML': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'CSS': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'Node.js': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Vue': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
      'Angular': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    } as Record<string, string>;
    return colors[tech] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Web Development Tracker</h2>
          <p className="text-gray-600 dark:text-gray-400">Track your web development learning journey</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
          <span>Add Entry</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalHours}h</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">This Week</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{weeklyHours}h</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-green-500 to-teal-600 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Technologies</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{Object.keys(technologyStats).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Progress */}
      {topTechnologies.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Technology Focus</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topTechnologies.map(([technology, hours]) => (
              <div key={technology} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className={`px-2 py-1 rounded text-sm font-medium ${getTechColor(technology)}`}>
                  {technology}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full"
                      style={{ width: `${Math.min((hours / Math.max(...Object.values(technologyStats))) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-10 text-right">{hours}h</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Entry Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Add Web Dev Entry</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Practice Time (hours)
                  </label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={formData.practiceTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, practiceTime: parseFloat(e.target.value) }))}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Technology
                  </label>
                  <select
                    value={formData.technology}
                    onChange={(e) => setFormData(prev => ({ ...prev, technology: e.target.value }))}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  >
                    {WEB_TECHNOLOGIES.map(tech => (
                      <option key={tech} value={tech}>{tech}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Concept/Topic
                  </label>
                  <input
                    type="text"
                    value={formData.concept}
                    onChange={(e) => setFormData(prev => ({ ...prev, concept: e.target.value }))}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="e.g., React Hooks, CSS Grid, REST APIs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project (Optional)
                </label>
                <input
                  type="text"
                  value={formData.project}
                  onChange={(e) => setFormData(prev => ({ ...prev, project: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  placeholder="What project did you work on?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  rows={3}
                  placeholder="What did you learn? Any challenges or breakthroughs?"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 px-4 rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  Add Entry
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Entries List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Entries</h3>
        {entries.length === 0 ? (
          <div className="text-center py-8">
            <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No web development entries yet. Start tracking your learning!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.slice(-10).reverse().map((entry) => (
              <div key={entry.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {entry.practiceTime}h
                      </span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getTechColor(entry.technology)}`}>
                      {entry.technology}
                    </span>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{entry.concept}</h4>
                {entry.project && (
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Project: {entry.project}</p>
                )}
                {entry.notes && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">{entry.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WebDevTracker;