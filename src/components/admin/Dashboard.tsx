import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Image, Settings, Users, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const cards = [
    {
      title: 'Pages',
      description: 'Manage website pages',
      icon: <FileText size={24} />,
      color: 'bg-blue-500/20 text-blue-400',
      link: '/admin/pages'
    },
    {
      title: 'Media',
      description: 'Manage images and videos',
      icon: <Image size={24} />,
      color: 'bg-purple-500/20 text-purple-400',
      link: '/admin/media'
    },
    {
      title: 'Users',
      description: 'Manage user accounts',
      icon: <Users size={24} />,
      color: 'bg-green-500/20 text-green-400',
      link: '/admin/users'
    },
    {
      title: 'Settings',
      description: 'Configure website settings',
      icon: <Settings size={24} />,
      color: 'bg-yellow-500/20 text-yellow-400',
      link: '/admin/settings'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <header className="bg-dark-800 border-b border-dark-700 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">OHW Solutions Admin</h1>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium">{currentUser?.email}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-full bg-dark-700 hover:bg-dark-600 transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-800 border border-dark-700 rounded-xl p-6 hover:border-primary-500 transition-colors cursor-pointer"
              onClick={() => navigate(card.link)}
            >
              <div className={`${card.color} p-3 rounded-lg inline-block mb-4`}>
                {card.icon}
              </div>
              <h3 className="text-lg font-medium mb-1">{card.title}</h3>
              <p className="text-gray-400 text-sm">{card.description}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 bg-dark-800 border border-dark-700 rounded-xl p-6">
          <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-dark-700 rounded-lg">
              <div className="bg-blue-500/20 text-blue-400 p-2 rounded">
                <FileText size={16} />
              </div>
              <div>
                <p className="text-sm">Homepage was updated</p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-dark-700 rounded-lg">
              <div className="bg-purple-500/20 text-purple-400 p-2 rounded">
                <Image size={16} />
              </div>
              <div>
                <p className="text-sm">New media uploaded</p>
                <p className="text-xs text-gray-400">Yesterday</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-dark-700 rounded-lg">
              <div className="bg-green-500/20 text-green-400 p-2 rounded">
                <Users size={16} />
              </div>
              <div>
                <p className="text-sm">New user registered</p>
                <p className="text-xs text-gray-400">3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
