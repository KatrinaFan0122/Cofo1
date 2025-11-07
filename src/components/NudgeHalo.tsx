import { motion } from 'motion/react';

interface NudgeHaloProps {
  show: boolean;
}

export function NudgeHalo({ show }: NudgeHaloProps) {
  if (!show) return null;

  return (
    <motion.div
      className="absolute inset-0 rounded-lg pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.4)',
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{
          boxShadow: [
            '0 0 0 2px rgba(99, 102, 241, 0.4)',
            '0 0 0 4px rgba(99, 102, 241, 0.2)',
            '0 0 0 2px rgba(99, 102, 241, 0.4)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}
