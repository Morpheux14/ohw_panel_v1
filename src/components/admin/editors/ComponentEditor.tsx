import React from 'react';
import { Component, RichTextContent } from '../../../types/cms';
import RichTextEditor from './RichTextEditor';

interface ComponentEditorProps {
  component: Component;
  onChange: (updates: Partial<Component>) => void;
  onSelectMedia: () => void;
}

const ComponentEditor: React.FC<ComponentEditorProps> = ({ component, onChange, onSelectMedia }) => {
  const renderEditor = () => {
    switch (component.type) {
      case 'heading':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Heading Text</label>
              <input
                type="text"
                value={component.content || ''}
                onChange={(e) => onChange({ content: e.target.value })}
                className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
                placeholder="Enter heading text..."
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Heading Level</label>
              <select
                value={component.headingLevel || 'h2'}
                onChange={(e) => onChange({ headingLevel: e.target.value })}
                className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
              >
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
                <option value="h5">H5</option>
                <option value="h6">H6</option>
              </select>
            </div>
          </div>
        );
        
      case 'text':
        return (
          <div>
            <label className="block text-sm text-gray-400 mb-1">Text Content</label>
            <textarea
              value={component.content || ''}
              onChange={(e) => onChange({ content: e.target.value })}
              className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500 min-h-[100px] resize-none"
              placeholder="Enter text content..."
            />
          </div>
        );
        
      case 'image':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Image URL</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={component.content || ''}
                  onChange={(e) => onChange({ content: e.target.value })}
                  className="flex-1 bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
                  placeholder="Enter image URL..."
                  readOnly
                />
                <button
                  onClick={onSelectMedia}
                  className="px-3 py-2 bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Browse
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Alt Text</label>
              <input
                type="text"
                value={component.alt || ''}
                onChange={(e) => onChange({ alt: e.target.value })}
                className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
                placeholder="Enter alt text..."
              />
            </div>
          </div>
        );
        
      case 'video':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Video URL</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={component.content || ''}
                  onChange={(e) => onChange({ content: e.target.value })}
                  className="flex-1 bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
                  placeholder="Enter video URL..."
                />
                <button
                  onClick={onSelectMedia}
                  className="px-3 py-2 bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Browse
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Autoplay</label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="autoplay"
                  checked={component.autoplay || false}
                  onChange={(e) => onChange({ autoplay: e.target.checked })}
                  className="rounded bg-dark-800 border-dark-600 text-primary-500 focus:ring-primary-500"
                />
                <label htmlFor="autoplay" className="text-sm">Enable autoplay</label>
              </div>
            </div>
          </div>
        );
        
      case 'button':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Button Text</label>
              <input
                type="text"
                value={component.content || ''}
                onChange={(e) => onChange({ content: e.target.value })}
                className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
                placeholder="Enter button text..."
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Button URL</label>
              <input
                type="text"
                value={component.url || ''}
                onChange={(e) => onChange({ url: e.target.value })}
                className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
                placeholder="Enter button URL..."
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Button Style</label>
              <select
                value={component.buttonStyle || 'primary'}
                onChange={(e) => onChange({ buttonStyle: e.target.value })}
                className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="outline">Outline</option>
                <option value="text">Text Only</option>
              </select>
            </div>
          </div>
        );
        
      case 'card':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Card Title</label>
              <input
                type="text"
                value={component.title || ''}
                onChange={(e) => onChange({ title: e.target.value })}
                className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
                placeholder="Enter card title..."
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Card Content</label>
              <textarea
                value={component.content || ''}
                onChange={(e) => onChange({ content: e.target.value })}
                className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500 min-h-[100px] resize-none"
                placeholder="Enter card content..."
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Card Image</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={component.imageUrl || ''}
                  onChange={(e) => onChange({ imageUrl: e.target.value })}
                  className="flex-1 bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
                  placeholder="Enter image URL..."
                  readOnly
                />
                <button
                  onClick={onSelectMedia}
                  className="px-3 py-2 bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Browse
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'form':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Form Type</label>
              <select
                value={component.formType || 'contact'}
                onChange={(e) => onChange({ formType: e.target.value })}
                className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
              >
                <option value="contact">Contact Form</option>
                <option value="newsletter">Newsletter Signup</option>
                <option value="custom">Custom Form</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Submit Button Text</label>
              <input
                type="text"
                value={component.submitText || 'Submit'}
                onChange={(e) => onChange({ submitText: e.target.value })}
                className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
                placeholder="Enter submit button text..."
              />
            </div>
          </div>
        );
        
      case 'richText':
        const richTextContent = component.content as RichTextContent || { blocks: [] };
        return (
          <div>
            <label className="block text-sm text-gray-400 mb-1">Rich Text Content</label>
            <RichTextEditor
              value={richTextContent}
              onChange={(newContent) => onChange({ content: newContent })}
              onSelectMedia={onSelectMedia}
            />
          </div>
        );
        
      default:
        return (
          <div>
            <label className="block text-sm text-gray-400 mb-1">Content</label>
            <textarea
              value={typeof component.content === 'string' ? component.content : JSON.stringify(component.content, null, 2)}
              onChange={(e) => {
                try {
                  // Try to parse as JSON if it looks like JSON
                  if (e.target.value.trim().startsWith('{') || e.target.value.trim().startsWith('[')) {
                    const jsonContent = JSON.parse(e.target.value);
                    onChange({ content: jsonContent });
                  } else {
                    onChange({ content: e.target.value });
                  }
                } catch (error) {
                  // If not valid JSON, treat as string
                  onChange({ content: e.target.value });
                }
              }}
              className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500 min-h-[100px] resize-none"
              placeholder="Enter content..."
            />
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {renderEditor()}
      
      <div>
        <h4 className="text-sm text-gray-400 mb-2">Animation</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Type</label>
            <select
              value={component.animation?.type || 'none'}
              onChange={(e) => onChange({ 
                animation: { 
                  ...component.animation,
                  type: e.target.value === 'none' ? undefined : e.target.value as any
                } 
              })}
              className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary-500"
            >
              <option value="none">None</option>
              <option value="fade">Fade</option>
              <option value="slide">Slide</option>
              <option value="scale">Scale</option>
              <option value="rotate">Rotate</option>
            </select>
          </div>
          
          {component.animation?.type && (
            <div>
              <label className="block text-xs text-gray-500 mb-1">Duration (ms)</label>
              <input
                type="number"
                value={component.animation?.duration || 500}
                onChange={(e) => onChange({ 
                  animation: { 
                    ...component.animation,
                    duration: Number(e.target.value)
                  } 
                })}
                className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary-500"
                min="100"
                step="100"
              />
            </div>
          )}
          
          {component.animation?.type && (
            <div>
              <label className="block text-xs text-gray-500 mb-1">Delay (ms)</label>
              <input
                type="number"
                value={component.animation?.delay || 0}
                onChange={(e) => onChange({ 
                  animation: { 
                    ...component.animation,
                    delay: Number(e.target.value)
                  } 
                })}
                className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary-500"
                min="0"
                step="100"
              />
            </div>
          )}
        </div>
      </div>
      
      <div>
        <h4 className="text-sm text-gray-400 mb-2">Styles</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Margin</label>
            <input
              type="text"
              value={component.styles?.margin || ''}
              onChange={(e) => onChange({ 
                styles: { 
                  ...component.styles,
                  margin: e.target.value
                } 
              })}
              className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary-500"
              placeholder="e.g. 1rem 0"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Padding</label>
            <input
              type="text"
              value={component.styles?.padding || ''}
              onChange={(e) => onChange({ 
                styles: { 
                  ...component.styles,
                  padding: e.target.value
                } 
              })}
              className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary-500"
              placeholder="e.g. 1rem"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Text Color</label>
            <input
              type="text"
              value={component.styles?.color || ''}
              onChange={(e) => onChange({ 
                styles: { 
                  ...component.styles,
                  color: e.target.value
                } 
              })}
              className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary-500"
              placeholder="e.g. #ffffff"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Background</label>
            <input
              type="text"
              value={component.styles?.background || ''}
              onChange={(e) => onChange({ 
                styles: { 
                  ...component.styles,
                  background: e.target.value
                } 
              })}
              className="w-full bg-dark-800 border border-dark-600 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary-500"
              placeholder="e.g. #000000"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentEditor;
