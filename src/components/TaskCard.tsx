import { useState } from 'react';
import { Button } from './ui/button';
import { NudgeHalo } from './NudgeHalo';
import { HookTooltip } from './HookTooltip';
import { DollarSign, MessageSquare } from 'lucide-react';

interface TaskCardProps {
  id: string;
  title: string;
  onTitleChange: (id: string, title: string) => void;
  onConsult: (id: string) => void;
  onBudgetClick: (id: string) => void;
  showNudge?: boolean;
  showBudgetTooltip?: boolean;
}

export function TaskCard({ 
  id, 
  title, 
  onTitleChange, 
  onConsult, 
  onBudgetClick,
  showNudge = false,
  showBudgetTooltip = false
}: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showHookTooltip, setShowHookTooltip] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (showNudge) {
      setShowHookTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setShowHookTooltip(false);
  };

  return (
    <div 
      className="relative bg-white rounded-lg border-2 border-gray-200 p-4 hover:border-gray-300 transition-colors"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NudgeHalo show={showNudge} />
      
      <HookTooltip
        show={showHookTooltip && showNudge}
        message="经冬，这是一个非常棒的'产出 (Output)'目标！为了确保我们能达成它，Co-Fo 建议我们可以一起'商议'一下，把它转化为 1-3 个我们本周'可控'的'投入 (Input)' 任务？比如'完成 10 次客户访谈'？"
        actionText="与 Co-Fo 商议"
        onAction={() => onConsult(id)}
        position="top"
      />

      <input
        type="text"
        value={title}
        onChange={(e) => onTitleChange(id, e.target.value)}
        placeholder="[点击输入任务...]"
        className="w-full mb-3 p-2 border border-gray-200 rounded focus:outline-none focus:border-indigo-400 transition-colors"
      />

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onBudgetClick(id)}
            className="w-full"
          >
            <DollarSign className="w-4 h-4 mr-1" />
            关联预算
          </Button>
          
          <HookTooltip
            show={showBudgetTooltip}
            message="经冬，要'点亮'这个预算功能，我需要我们先去「钱」模块'商议'一下你的核心'预算池'。完成后，我就能在这里帮你自动追踪资源消耗。"
            position="bottom"
          />
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onConsult(id)}
        >
          <MessageSquare className="w-4 h-4 mr-1" />
          与 Co-Fo 商议
        </Button>
      </div>
    </div>
  );
}
