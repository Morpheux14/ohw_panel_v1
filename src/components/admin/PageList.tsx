import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Copy, 
  Eye, 
  MoreVertical,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { getPages, deletePage, publishPage } from '../../services/cmsService';
import { Page } from '../../types/cms';
import { useAuth } from '../../context/AuthContext';

const PageList: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const loadPages = async () => {
      try {
        const pagesData = await getPages();
        setPages(pagesData);
      } catch (error) {
        console.error('Error loading pages:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, []);

  const handleDeletePage = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this page?')) return;
    
    try {
      await deletePage(id);
      setPages(pages.filter(page => page.id !== id));
    } catch (error) {
      console.error('Error deleting page:', error);
    }
  };

  const handlePublishPage = async (id: string) => {
    if (!currentUser) return;
    
    try {
      await publishPage(id, currentUser.uid);
      // Update the local state
      setPages(pages.map(page => 
        page.id === id 
          ? { ...page, status: 'published', publishedAt: new Date() } 
          : page
      ));
    } catch (error) {
      console.error('Error publishing page:', error);
    }
  };

  const handleDuplicatePage = (page: Page) => {
    navigate(`/admin/pages/new`, { state: { duplicate: page } });
  };

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (page.slug && page.slug.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <span className="flex items-center space-x-1 text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full text-xs">
            <CheckCircle size={12} />
            <span>Published</span>
          </span>
        );
      case 'draft':
        return (
          <span className="flex items-center space-x-1 text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full text-xs">
            <Clock size={12} />
            <span>Draft</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center space-x-1 text-gray-400 bg-gray-400/10 px-2 py-0.5 rounded-full text-xs">
            <AlertCircle size={12} />
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <header className="bg-dark-800 border-b border-dark-700 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Pages</h1>
          <button 
            onClick={() => navigate('/admin/pages/new')}
            className="flex items-center space-x-2 px-3 py-1.5 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
          >
            <Plus size={16} />
            <span>New Page</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-dark-800 border border-dark-700 rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-primary-500"
              placeholder="Search pages..."
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-dark-800 border border-dark-700 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : filteredPages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="bg-dark-800 p-4 rounded-full mb-4">
              <FileText size={32} className="text-gray-500" />
            </div>
            <h4 className="text-lg font-medium mb-2">No pages found</h4>
            <p className="text-gray-400 mb-4">Create your first page to get started</p>
            <button 
              onClick={() => navigate('/admin/pages/new')}
              className="px-3 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
            >
              <span className="flex items-center space-x-1">
                <Plus size={16} />
                <span>Create Page</span>
              </span>
            </button>
          </div>
        ) : (
          <div className="bg-dark-800 border border-dark-700 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left p-4">Title</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Last Updated</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPages.map((page) => (
                  <tr 
                    key={page.id} 
                    className="border-b border-dark-700 hover:bg-dark-700/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-dark-700 p-2 rounded">
                          <FileText size={16} className="text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium">{page.title}</p>
                          <p className="text-sm text-gray-400">/{page.slug}</p>
                        </div>
                        {page.isHomepage && (
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full text-xs">
                            Homepage
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(page.status)}
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-gray-400">
                        {page.updatedAt.toLocaleDateString()} at {page.updatedAt.toLocaleTimeString()}
                      </p>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => navigate(`/admin/pages/edit/${page.id}`)}
                          className="p-1 rounded hover:bg-dark-600 transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => window.open(`/preview/${page.slug}`, '_blank')}
                          className="p-1 rounded hover:bg-dark-600 transition-colors"
                          title="Preview"
                        >
                          <Eye size={16} />
                        </button>
                        <div className="relative">
                          <button 
                            onClick={() => setActiveDropdown(activeDropdown === page.id ? null : page.id)}
                            className="p-1 rounded hover:bg-dark-600 transition-colors"
                            title="More"
                          >
                            <MoreVertical size={16} />
                          </button>
                          
                          {activeDropdown === page.id && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-700 rounded-lg shadow-lg z-10"
                            >
                              <div className="py-1">
                                {page.status === 'draft' && (
                                  <button
                                    onClick={() => {
                                      handlePublishPage(page.id);
                                      setActiveDropdown(null);
                                    }}
                                    className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-dark-700 transition-colors"
                                  >
                                    <CheckCircle size={16} />
                                    <span>Publish</span>
                                  </button>
                                )}
                                <button
                                  onClick={() => {
                                    handleDuplicatePage(page);
                                    setActiveDropdown(null);
                                  }}
                                  className="flex items-center space-x-2 w-full px-4 py-2 text-left hover:bg-dark-700 transition-colors"
                                >
                                  <Copy size={16} />
                                  <span>Duplicate</span>
                                </button>
                                <button
                                  onClick={() => {
                                    handleDeletePage(page.id);
                                    setActiveDropdown(null);
                                  }}
                                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-red-500 hover:bg-dark-700 transition-colors"
                                >
                                  <Trash2 size={16} />
                                  <span>Delete</span>
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default PageList;
