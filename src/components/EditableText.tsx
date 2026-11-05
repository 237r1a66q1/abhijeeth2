import React, { useRef, useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';

interface EditableTextProps {
  value: string;
  onChange: (val: string) => void;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  multiline?: boolean;
  placeholder?: string;
  isEditMode: boolean;
  onEnterEditMode?: () => void;
  showIcon?: boolean;
  style?: React.CSSProperties;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  as = 'span',
  className = '',
  multiline = false,
  placeholder = 'Type here...',
  isEditMode,
  onEnterEditMode,
  showIcon = true,
  style,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  // Sync internal text with value prop when not actively focused
  useEffect(() => {
    if (elementRef.current && document.activeElement !== elementRef.current) {
      if (elementRef.current.innerText !== value) {
        elementRef.current.innerText = value || '';
      }
    }
  }, [value]);

  const handleInput = () => {
    if (elementRef.current) {
      const text = elementRef.current.innerText;
      onChange(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
      elementRef.current?.blur();
    }
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (elementRef.current) {
      const text = elementRef.current.innerText;
      onChange(text);
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isEditMode && onEnterEditMode) {
      onEnterEditMode();
    }
    setTimeout(() => {
      elementRef.current?.focus();
    }, 50);
  };

  const Tag = as as React.ElementType;

  const editStateClasses = isEditMode
    ? 'outline-dashed outline-1 outline-pink-300 hover:outline-pink-500 focus:outline-2 focus:outline-pink-500 bg-pink-50/40 rounded px-1 cursor-text transition-all duration-150 min-w-[20px]'
    : 'hover:outline-dashed hover:outline-1 hover:outline-pink-200/60 rounded cursor-pointer transition-all duration-150';

  return (
    <span className="relative inline-block group/editable max-w-full">
      <Tag
        key={value}
        ref={elementRef as unknown as React.Ref<HTMLElement>}
        contentEditable={isEditMode || isEditing}
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onDoubleClick={handleDoubleClick}
        style={style}
        data-placeholder={placeholder}
        className={`${className} ${editStateClasses} inline-block select-text break-words`}
        title={
          isEditMode
            ? 'Click to edit this text directly'
            : 'Double-click to edit this text directly'
        }
      >
        {value}
      </Tag>

      {/* Tiny pencil indicator */}
      {isEditMode && showIcon && (
        <span
          className="inline-flex items-center ml-1 text-pink-400 opacity-60 group-hover/editable:opacity-100 group-hover/editable:text-pink-600 transition-opacity select-none pointer-events-none align-middle"
          title="Directly editable text"
        >
          <Pencil className="w-3 h-3 inline-block" />
        </span>
      )}
    </span>
  );
};
