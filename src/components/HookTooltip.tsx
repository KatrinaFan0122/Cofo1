import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';

interface HookTooltipProps {
  show: boolean;
  message: string;
  actionText?: string;
  onAction?: () => void;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function HookTooltip({ 
  show, 
  message, 
  actionText, 
  onAction,
  position = 'top' 
}: HookTooltipProps) {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className={`absolute ${positionClasses[position]} z-50 max-w-sm`}
        >
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-700 mb-3">{message}</p>
            {actionText && onAction && (
              <Button 
                onClick={onAction}
                size="sm"
                className="w-full"
              >
                {actionText}
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
