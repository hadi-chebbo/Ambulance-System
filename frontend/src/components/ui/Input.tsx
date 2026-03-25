import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  leftIcon,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          className={[
            'w-full rounded-lg border px-3 py-2.5 text-sm text-gray-900 bg-white',
            'placeholder:text-gray-400 outline-none transition-all duration-150',
            'focus:ring-2 focus:ring-red-500 focus:border-red-500',
            error ? 'border-red-400 bg-red-50' : 'border-gray-300',
            leftIcon ? 'pl-10' : '',
            className,
          ].join(' ')}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};