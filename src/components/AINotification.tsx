import { motion } from 'motion/react';
import { Sparkles, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface AINotificationProps {
  show: boolean;
  onClose: () => void;
}

export function AINotification({ show, onClose }: AINotificationProps) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 max-w-md bg-white rounded-lg shadow-2xl border-2 border-indigo-200 overflow-hidden z-50"
    >
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 border-b">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <span className="text-sm text-indigo-900">Co-Fo 陪伴提醒</span>
        </div>
        <h3 className="text-gray-900">我们是否在'完成客户访谈'上遇到了卡点？</h3>
      </div>

      <div className="p-4">
        <div className="flex items-start gap-2 mb-4">
          <Clock className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
          <p className="text-sm text-gray-700 leading-relaxed">
            经冬，我注意到'完成客户访谈'停留了一段时间。这完全正常。是遇到预期外的困难了吗？还是我们当时的优先级判断需要调整？如果需要，我们可以随时重新'商议'一下路径。
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onClose} className="flex-1">
            稍后处理
          </Button>
          <Button size="sm" className="flex-1">
            与 Co-Fo 商议
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
