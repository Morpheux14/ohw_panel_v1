import React, { useState } from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Quote, Code, Image, Link, Type } from 'lucide-react';
import { RichTextContent, RichTextBlock } from '../../../types/cms';

interface RichTextEditorProps {
  value: RichTextContent;
  onChange: (value: RichTextContent) => void;
  onSelectMedia: () => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, onSelectMedia }) => {
  const [activeBlock, setActiveBlock] = useState<string | null>(null);

  const addBlock = (type: RichTextBlock['type']) => {
    const newBlock: RichTextBlock = {
      id: `block-${Date.now()}`,
      type,
      content: '',
      ...(type === 'heading' ? { level: 2 } : {})
    };
    
    onChange({
      blocks: [...value.blocks, newBlock]
    });
    
    setActiveBlock(newBlock.id);
  };

  const updateBlock = (id: string, updates: Partial<RichTextBlock>) => {
    onChange({
      blocks: value.blocks.map(block => 
        block.id === id ? { ...block, ...updates } : block
      )
    });
  };

  const deleteBlock = (id: string) => {
    onChange({
      blocks: value.blocks.filter(block => block.id !== id)
    });
    
    if (activeBlock === id) {
      setActiveBlock(null);
    }
  };

  const moveBlock = (id: string, direction: 'up' | 'down') => {
    const blockIndex = value.blocks.findIndex(block => block.id === id);
    if (
      (direction === 'up' && blockIndex === 0) || 
      (direction === 'down' && blockIndex === value.blocks.length - 1)
    ) {
      return;
    }
    
    const newBlocks = [...value.blocks];
    const targetIndex = direction === 'up' ? blockIndex - 1 : blockIndex + 1;
    
    [newBlocks[blockIndex], newBlocks[targetIndex]] = 
      [newBlocks[targetIndex], newBlocks[blockIndex]];
    
    onChange({ blocks: newBlocks });
  };

  const renderBlockEditor = (block: RichTextBlock) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            className="w-full bg-dark-800 border border-dark-700 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500 min-h-[100px] resize-none"
            placeholder="Type your paragraph here..."
          />
        );
        
      case 'heading':
        return (
          <div className="space-y-2">
            <select
              value={block.level || 2}
              onChange={(e) => updateBlock(block.id, { level: Number(e.target.value) as any })}
              className="bg-dark-800 border border-dark-700 rounded-lg px-3 py-1 focus:outline-none focus:border-primary-500"
            >
              <option value={1}>Heading 1</option>
              <option value={2}>Heading 2</option>
              <option value={3}>Heading 3</option>
              <option value={4}>Heading 4</option>
              <option value={5}>Heading 5</option>
              <option value={6}>Heading 6</option>
            </select>
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateBlock(block.id, { content: e.target.value })}
              className="w-full bg-dark-800 border border-dark-700 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
              placeholder="Heading text..."
            />
          </div>
        );
        
      case 'list':
        return (
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            className="w-full bg-dark-800 border border-dark-700 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500 min-h-[100px] resize-none"
            placeholder="Enter list items, one per line..."
          />
        );
        
      case 'quote':
        return (
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            className="w-full bg-dark-800 border border-dark-700 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500 min-h-[80px] resize-none"
            placeholder="Enter quote text..."
          />
        );
        
      case 'image':
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={block.content}
                onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                className="flex-1 bg-dark-800 border border-dark-700 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
                placeholder="Image URL..."
                readOnly
              />
              <button
                onClick={onSelectMedia}
                className="px-3 py-2 bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
              >
                Browse
              </button>
            </div>
            <input
              type="text"
              value={block.alt || ''}
              onChange={(e) => updateBlock(block.id, { alt: e.target.value })}
              className="w-full bg-dark-800 border border-dark-700 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500"
              placeholder="Alt text..."
            />
          </div>
        );
        
      case 'code':
        return (
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            className="w-full bg-dark-800 border border-dark-700 rounded-lg px-3 py-2 focus:outline-none focus:border-primary-500 min-h-[120px] resize-none font-mono text-sm"
            placeholder="Enter code here..."
          />
        );
        
      default:
        return (
          <div className="text-gray-500">Unsupported block type</div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-dark-800 rounded-lg">
        <button
          onClick={() => addBlock('paragraph')}
          className="p-2 rounded hover:bg-dark-700 transition-colors"
          title="Paragraph"
        >
          <Type size={16} />
        </button>
        <button
          onClick={() => addBlock('heading')}
          className="p-2 rounded hover:bg-dark-700 transition-colors"
          title="Heading"
        >
          <span className="font-bold">H</span>
        </button>
        <button
          onClick={() => addBlock('list')}
          className="p-2 rounded hover:bg-dark-700 transition-colors"
          title="List"
        >
          <List size={16} />
        </button>
        <button
          onClick={() => addBlock('quote')}
          className="p-2 rounded hover:bg-dark-700 transition-colors"
          title="Quote"
        >
          <Quote size={16} />
        </button>
        <button
          onClick={() => addBlock('image')}
          className="p-2 rounded hover:bg-dark-700 transition-colors"
          title="Image"
        >
          <Image size={16} />
        </button>
        <button
          onClick={() => addBlock('code')}
          className="p-2 rounded hover:bg-dark-700 transition-colors"
          title="Code"
        >
          <Code size={16} />
        </button>
        
        <div className="h-6 w-px bg-dark-700 mx-1"></div>
        
        <button
          className="p-2 rounded hover:bg-dark-700 transition-colors"
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          className="p-2 rounded hover:bg-dark-700 transition-colors"
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <button
          className="p-2 rounded hover:bg-dark-700 transition-colors"
          title="Underline"
        >
          <Underline size={16} />
        </button>
        <button
          className="p-2 rounded hover:bg-dark-700 transition-colors"
          title="Link"
        >
          <Link size={16} />
        </button>
        
        <div className="h-6 w-px bg-dark-700 mx-1"></div>
        
        <button
          className="p-2 rounded hover:bg-dark-700 transition-colors"
          title="Align Left"
        >
          <AlignLeft size={16} />
        </button>
        <button
          className="p-2 rounded hover:bg-dark-700 transition-colors"
          title="Align Center"
        >
          <AlignCenter size={16} />
        </button>
        <button
          className="p-2 rounded hover:bg-dark-700 transition-colors"
          title="Align Right"
        >
          <AlignRight size={16} />
        </button>
        <button
          className="p-2 rounded hover:bg-dark-700 transition-colors"
          title="Justify"
        >
          <AlignJustify size={16} />
        </button>
      </div>

      {/* Content Blocks */}
      <div className="space-y-3">
        {value.blocks.length === 0 ? (
          <div className="border-2 border-dashed border-dark-700 rounded-lg p-6 text-center">
            <p className="text-gray-400 mb-4">No content blocks</p>
            <button 
              onClick={() => addBlock('paragraph')}
              className="px-3 py-1.5 bg-primary-500 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Add Paragraph
            </button>
          </div>
        ) : (
          value.blocks.map((block) => (
            <div 
              key={block.id}
              className={`border ${activeBlock === block.id ? 'border-primary-500' : 'border-dark-700'} rounded-lg overflow-hidden`}
            >
              <div 
                className={`p-2 flex justify-between items-center cursor-pointer ${activeBlock === block.id ? 'bg-dark-700' : 'bg-dark-800'}`}
                onClick={() => setActiveBlock(activeBlock === block.id ? null : block.id)}
              >
                <div className="flex items-center space-x-2">
                  {block.type === 'paragraph' && <Type size={14} />}
                  {block.type === 'heading' && <span className="font-bold text-sm">H{block.level}</span>}
                  {block.type === 'list' && <List size={14} />}
                  {block.type === 'quote' && <Quote size={14} />}
                  {block.type === 'image' && <Image size={14} />}
                  {block.type === 'code' && <Code size={14} />}
                  <span className="text-sm capitalize">{block.type}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      moveBlock(block.id, 'up');
                    }}
                    className="p-1 rounded hover:bg-dark-600"
                  >
                    ↑
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      moveBlock(block.id, 'down');
                    }}
                    className="p-1 rounded hover:bg-dark-600"
                  >
                    ↓
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteBlock(block.id);
                    }}
                    className="p-1 rounded hover:bg-dark-600 text-red-500"
                  >
                    ×
                  </button>
                </div>
              </div>

              {activeBlock === block.id && (
                <div className="p-3 bg-dark-700">
                  {renderBlockEditor(block)}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RichTextEditor;
