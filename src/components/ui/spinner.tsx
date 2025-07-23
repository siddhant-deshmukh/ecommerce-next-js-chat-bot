import { Loader2 } from 'lucide-react';
import React from 'react';

interface SpinnerProps extends React.SVGProps<SVGSVGElement> {
  size?: number; // Optional size prop
  color?: string; // Optional color prop, can be a Tailwind class like 'text-amber-500'
}

const Spinner: React.FC<SpinnerProps> = ({ size = 24, color = 'text-amber-500', className, ...props }) => {
  return (
    <Loader2
      className={`animate-spin ${color} ${className}`}
      size={size}
      {...props}
    />
  );
};

Spinner.displayName = 'Spinner';

export { Spinner };