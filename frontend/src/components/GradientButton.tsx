import React from 'react';

type GradientButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
};

export const GradientButton = ({ children, type = 'button', onClick }: GradientButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="relative group overflow-hidden cursor-pointer w-full justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      {children}
    </button>
  );
};
