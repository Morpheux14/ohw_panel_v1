import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, Eye, ArrowLeft, Plus, Trash2, ChevronDown, ChevronUp, Move } from 'lucide-react';
import { Page, Section, Component } from '../../types/cms';
import { getPage, updatePage, createPage } from '../../services/cmsService';
import { useAuth } from '../../context/AuthContext';
import RichTextEditor from './editors/RichTextEditor';
import ComponentEditor from './editors/ComponentEditor';
import MediaSelector from './MediaSelector';

const PageBuilder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [showMediaSelector, setShowMediaSelector] = useState(false);

  useEffect(() => {
    const loadPage = async () => {
      if (id === 'new') {
        // Create a new page template
        setPage({
          id: 'new',
          title: 'New Page',
          slug: 'new-page',
          status: 'draft',
          sections: [],
          isHomepage: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: currentUser?.uid || '',
          updatedBy: currentUser?.uid || ''
        });
      } else if (id) {
        try {
          const pageData = await getPage(id);
          if (pageData) {
            setPage(pageData);
          } else {
            navigate('/admin/pages');
          }
        } catch (error) {
          console.error('Error loading page:', error);
        }
      }
      setLoading(false);
    };

    loadPage();
  }, [id, navigate, currentUser]);

  const handleSave = async () => {
    if (!page || !currentUser) return;
    
    setSaving(true);
    try {
      if (page.id === 'new') {
        const newPage = await createPage(
          {
            title: page.title,
            slug: page.slug,
            description: page.description,
            metaTitle: page.metaTitle,
            metaDescription: page.metaDescription,
            sections: page.sections,
            isHomepage: page.isHomepage,
            status: 'draft'
          },
          currentUser.uid
        );
        navigate(`/admin/pages/edit/${newPage.id}`);
      } else {
        await updatePage(
          page.id,
          {
            title: page.title,
            slug: page.slug,
            description: page.description,
            metaTitle: page.metaTitle,
            metaDescription: page.metaDescription,
            sections: page.sections,
            isHomepage: page.isHomepage
          },
          currentUser.uid
        );
      }
    } catch (error) {
      console.error('Error saving page:', error);
    } finally {
      setSaving(false);
    }
  };

  const addSection = () => {
    if (!page) return;
    
    const newSection: Section = {
      id: `section-${Date.now()}`,
      type: 'custom',
      layout: 'contained',
      components: [],
      order: page.sections.length
    };
    
    setPage({
      ...page,
      sections: [...page.sections, newSection]
    });
    
    setActiveSection(newSection.id);
  };

  const updateSection = (sectionId: string, updates: Partial<Section>) => {
    if (!page) return;
    
    setPage({
      ...page,
      sections: page.sections.map(section => 
        section.id === sectionId ? { ...section, ...updates } : section
      )
    });
  };

  const deleteSection = (sectionId: string) => {
    if (!page) return;
    
    setPage({
      ...page,
      sections: page.sections.filter(section => section.id !== sectionId)
    });
    
    if (activeSection === sectionId) {
      setActiveSection(null);
    }
  };

  const addComponent = (sectionId: string) => {
    if (!page) return;
    
    const newComponent: Component = {
      id: `component-${Date.now()}`,
      type: 'text',
      content: 'New component',
      order: page.sections.find(s => s.id === sectionId)?.components.length || 0
    };
    
    setPage({
      ...page,
      sections: page.sections.map(section => 
        section.id === sectionId 
          ? { ...section, components: [...section.components, newComponent] } 
          : section
      )
    });
    
    setActiveComponent(newComponent.id);
  };

  const updateComponent = (sectionId: string, componentId: string, updates: Partial<Component>) => {
    if (!page) return;
    
    setPage({
      ...page,
      sections: page.sections.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              components: section.components.map(component => 
                component.id === componentId 
                  ? { ...component, ...updates } 
                  : component
              ) 
            } 
          : section
      )
    });
  };

  const deleteComponent = (sectionId: string, componentId: string) => {
    if (!page) return;
    
    setPage({
      ...page,
      sections: page.sections.map(section => 
        section.id === sectionId 
          ? { 
              ...section, 
              components: section.components.filter(component => component.id !== componentId) 
            } 
          : section
      )
    });
    
    if (activeComponent === componentId) {
      setActiveComponent(null);
    }
  };

  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    if (!page) return;
    
    const sectionIndex = page.sections.findIndex(s => s.id === sectionId);
    if (
      (direction === 'up' && sectionIndex === 0) || 
      (direction === 'down' && sectionIndex === page.sections.length - 1)
    ) {
      return;
    }
    
    const newSections = [...page.sections];
    const targetIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1;
    
    [newSections[sectionIndex], newSections[targetIndex]] = 
      [newSections[targetIndex], newSections[sectionIndex]];
    
    // Update order
    newSections.forEach((section, index) => {
      section.order = index;
    });
    
    setPage({
      ...page,
      sections: newSections
    });
  };

  const moveComponent = (sectionId: string, componentId: string, direction: 'up' | 'down') => {
    if (!page) return;
    
    const section = page.sections.find(s => s.id === sectionId);
    if (!section) return;
    
    const componentIndex = section.components.findIndex(c => c.id === componentId);
    if (
      (direction === 'up' && componentIndex === 0) || 
      (direction === 'down' && componentIndex === section.components.length - 1)
    ) {
      return;
    }
    
    const newComponents = [...section.components];
    const targetIndex = direction === 'up' ? componentIndex - 1 : componentIndex + 1;
    
    [newComponents[componentIndex], newComponents[targetIndex]] = 
      [newComponents[targetIndex], newComponents[componentIndex]];
    
    // Update order
    newComponents.forEach((component, index) => {
      component.order = index;
    });
    
    updateSection(sectionId, { components: newComponents });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Page not found</h2>
          <button 
            onClick={() => navigate('/admin/pages')}
            className="px-4 py-2 bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Back to Pages
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-dark-800 border-b border-dark-700 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/admin/pages')}
            className="p-2 rounded-lg hover:bg-dark-700 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <input
              type="text"
              value={page.title}
              onChange={(e) => setPage({ ...page, title: e.target.value })}
              className="bg-transparent text-xl font-bold border-b border-transparent hover:border-dark-600 focus:border-primary-500 focus:outline-none px-1 py-0.5"
              placeholder="Page Title"
            />
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Slug:</span>
              <input
                type="text"
                value={page.slug}
                onChange={(e) => setPage({ ...page, slug: e.target.value.replace(/\s+/g, '-').toLowerCase() })}
                className="bg-transparent border-b border-transparent hover:border-dark-600 focus:border-primary-500 focus:outline-none px-1 py-0.5"
                placeholder="page-slug"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => navigate(`/preview/${page.slug}`)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-dark-700 hover:bg-dark-600 transition-colors"
          >
            <Eye size={16} />
            <span>Preview</span>
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-primary-500 hover:bg-primary-600 transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Page Builder */}
        <div className="w-2/3 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {page.sections.length === 0 ? (
              <div className="border-2 border-dashed border-dark-700 rounded-xl p-12 text-center">
                <h3 className="text-xl font-medium mb-4">This page is empty</h3>
                <p className="text-gray-400 mb-6">Start building your page by adding a section</p>
                <button 
                  onClick={addSection}
                  className="px-4 py-2 bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Add Section
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {page.sections.map((section) => (
                  <motion.div 
                    key={section.id}
                    layoutId={section.id}
                    className={`border ${activeSection === section.id ? 'border-primary-500' : 'border-dark-700'} rounded-xl overflow-hidden`}
                  >
                    {/* Section Header */}
                    <div 
                      className={`p-3 flex justify-between items-center cursor-pointer ${activeSection === section.id ? 'bg-dark-800' : 'bg-dark-900'}`}
                      onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                    >
                      <div className="flex items-center space-x-2">
                        <Move size={16} className="text-gray-500" />
                        <span className="font-medium">
                          {section.title || `Section ${section.order + 1}`}
                        </span>
                        <span className="text-xs text-gray-500 px-2 py-0.5 bg-dark-700 rounded-full">
                          {section.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            moveSection(section.id, 'up');
                          }}
                          className="p-1 rounded hover:bg-dark-700"
                        >
                          <ChevronUp size={16} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            moveSection(section.id, 'down');
                          }}
                          className="p-1 rounded hover:bg-dark-700"
                        >
                          <ChevronDown size={16} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSection(section.id);
                          }}
                          className="p-1 rounded hover:bg-dark-700 text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform ${activeSection === section.id ? 'rotate-180' : ''}`} 
                        />
                      </div>
                    </div>

                    {/* Section Content */}
                    {activeSection === section.id && (
                      <div className="p-4 bg-dark-800 border-t border-dark-700">
                        {/* Section Settings */}
                        <div className="mb-4 grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">Section Title</label>
                            <input
                              type="text"
                              value={section.title || ''}
                              onChange={(e) => updateSection(section.id, { title: e.target.value })}
                              className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
                              placeholder="Section Title"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">Section Type</label>
                            <select
                              value={section.type}
                              onChange={(e) => updateSection(section.id, { type: e.target.value as any })}
                              className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
                            >
                              <option value="hero">Hero</option>
                              <option value="services">Services</option>
                              <option value="technology">Technology</option>
                              <option value="innovation">Innovation</option>
                              <option value="timeline">Timeline</option>
                              <option value="clients">Clients</option>
                              <option value="cta">CTA</option>
                              <option value="contact">Contact</option>
                              <option value="custom">Custom</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">Layout</label>
                            <select
                              value={section.layout}
                              onChange={(e) => updateSection(section.id, { layout: e.target.value as any })}
                              className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
                            >
                              <option value="full">Full Width</option>
                              <option value="contained">Contained</option>
                              <option value="split">Split</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-1">Background Color</label>
                            <input
                              type="text"
                              value={section.backgroundColor || ''}
                              onChange={(e) => updateSection(section.id, { backgroundColor: e.target.value })}
                              className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
                              placeholder="#000000 or transparent"
                            />
                          </div>
                        </div>

                        {/* Components */}
                        <div className="space-y-3">
                          <h4 className="font-medium">Components</h4>
                          
                          {section.components.length === 0 ? (
                            <div className="border-2 border-dashed border-dark-700 rounded-lg p-6 text-center">
                              <p className="text-gray-400 mb-4">No components in this section</p>
                              <button 
                                onClick={() => addComponent(section.id)}
                                className="px-3 py-1.5 bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
                              >
                                Add Component
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              {section.components.map((component) => (
                                <motion.div 
                                  key={component.id}
                                  layoutId={component.id}
                                  className={`border ${activeComponent === component.id ? 'border-primary-500' : 'border-dark-700'} rounded-lg overflow-hidden`}
                                >
                                  <div 
                                    className={`p-2 flex justify-between items-center cursor-pointer ${activeComponent === component.id ? 'bg-dark-700' : 'bg-dark-800'}`}
                                    onClick={() => setActiveComponent(activeComponent === component.id ? null : component.id)}
                                  >
                                    <div className="flex items-center space-x-2">
                                      <Move size={14} className="text-gray-500" />
                                      <span className="text-sm">
                                        {component.type.charAt(0).toUpperCase() + component.type.slice(1)}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                      <button 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          moveComponent(section.id, component.id, 'up');
                                        }}
                                        className="p-1 rounded hover:bg-dark-600"
                                      >
                                        <ChevronUp size={14} />
                                      </button>
                                      <button 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          moveComponent(section.id, component.id, 'down');
                                        }}
                                        className="p-1 rounded hover:bg-dark-600"
                                      >
                                        <ChevronDown size={14} />
                                      </button>
                                      <button 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          deleteComponent(section.id, component.id);
                                        }}
                                        className="p-1 rounded hover:bg-dark-600 text-red-500"
                                      >
                                        <Trash2 size={14} />
                                      </button>
                                      <ChevronDown 
                                        size={14} 
                                        className={`transition-transform ${activeComponent === component.id ? 'rotate-180' : ''}`} 
                                      />
                                    </div>
                                  </div>

                                  {activeComponent === component.id && (
                                    <div className="p-3 bg-dark-700 border-t border-dark-600">
                                      <div className="mb-3">
                                        <label className="block text-sm text-gray-400 mb-1">Component Type</label>
                                        <select
                                          value={component.type}
                                          onChange={(e) => updateComponent(section.id, component.id, { type: e.target.value as any })}
                                          className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
                                        >
                                          <option value="heading">Heading</option>
                                          <option value="text">Text</option>
                                          <option value="image">Image</option>
                                          <option value="video">Video</option>
                                          <option value="button">Button</option>
                                          <option value="card">Card</option>
                                          <option value="form">Form</option>
                                          <option value="richText">Rich Text</option>
                                          <option value="custom">Custom</option>
                                        </select>
                                      </div>

                                      <ComponentEditor
                                        component={component}
                                        onChange={(updates) => updateComponent(section.id, component.id, updates)}
                                        onSelectMedia={() => setShowMediaSelector(true)}
                                      />
                                    </div>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          )}

                          <button 
                            onClick={() => addComponent(section.id)}
                            className="flex items-center space-x-1 text-sm text-primary-400 hover:text-primary-300 transition-colors"
                          >
                            <Plus size={16} />
                            <span>Add Component</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}

                <button 
                  onClick={addSection}
                  className="flex items-center space-x-2 px-4 py-2 border-2 border-dashed border-dark-700 rounded-xl w-full justify-center hover:border-primary-500 hover:text-primary-400 transition-colors"
                >
                  <Plus size={20} />
                  <span>Add Section</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Properties Panel */}
        <div className="w-1/3 bg-dark-800 border-l border-dark-700 p-4 overflow-y-auto">
          <h3 className="text-lg font-medium mb-4">Page Properties</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Meta Title</label>
              <input
                type="text"
                value={page.metaTitle || ''}
                onChange={(e) => setPage({ ...page, metaTitle: e.target.value })}
                className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
                placeholder="Meta Title"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Meta Description</label>
              <textarea
                value={page.metaDescription || ''}
                onChange={(e) => setPage({ ...page, metaDescription: e.target.value })}
                className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500 h-24 resize-none"
                placeholder="Meta Description"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea
                value={page.description || ''}
                onChange={(e) => setPage({ ...page, description: e.target.value })}
                className="w-full bg-dark-900 border border-dark-700 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500 h-24 resize-none"
                placeholder="Page Description"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isHomepage"
                checked={page.isHomepage}
                onChange={(e) => setPage({ ...page, isHomepage: e.target.checked })}
                className="rounded bg-dark-900 border-dark-700 text-primary-500 focus:ring-primary-500"
              />
              <label htmlFor="isHomepage" className="text-sm">Set as Homepage</label>
            </div>
          </div>
        </div>
      </div>

      {/* Media Selector Modal */}
      {showMediaSelector && (
        <MediaSelector
          onSelect={(media) => {
            // Handle media selection
            setShowMediaSelector(false);
          }}
          onClose={() => setShowMediaSelector(false)}
        />
      )}
    </div>
  );
};

export default PageBuilder;
