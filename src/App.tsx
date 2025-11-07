import { useState, useEffect } from 'react';
import { TaskCard } from './components/TaskCard';
import { CoFoSidebar } from './components/CoFoSidebar';
import { BudgetDashboard } from './components/BudgetDashboard';
import { AINotification } from './components/AINotification';
import { Button } from './components/ui/button';
import { Sparkles, Share2, LayoutGrid, Milestone, KanbanSquare } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  showNudge: boolean;
}

type View = 'nice' | 'milestone' | 'kanban';
type Scenario = 1 | 2 | 3 | 4 | 5;

export default function App() {
  const [currentView, setCurrentView] = useState<View>('nice');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarMessages, setSidebarMessages] = useState<Array<{ role: 'cofo' | 'user'; content: string }>>([]);
  const [sidebarScenario, setSidebarScenario] = useState<'welcome' | 'nudge' | 'none'>('none');
  
  // Scenario control
  const [currentScenario, setCurrentScenario] = useState<Scenario>(1);
  const [showBudgetTooltip, setShowBudgetTooltip] = useState(false);
  const [showAINotification, setShowAINotification] = useState(false);
  
  const [niceAreaTasks, setNiceAreaTasks] = useState<Task[]>([
    { id: '1', title: '', showNudge: false },
    { id: '2', title: '', showNudge: false },
    { id: '3', title: '', showNudge: false },
  ]);

  const [backlogTasks, setBacklogTasks] = useState<Task[]>([]);

  // Scenario 1: First entry with NICE philosophy coaching
  useEffect(() => {
    if (currentScenario === 1) {
      setIsSidebarOpen(true);
      setSidebarScenario('welcome');
      setSidebarMessages([
        {
          role: 'cofo',
          content: '经冬，欢迎来到你的"行动"工作台。在 Co-Fo，我们设定目标的方式有点不同。我们不追求 KPI 压力，而是使用 "NICE" 框架，帮助你聚焦于"可控" (Controllable) 和"赋能" (Energizing) 的行动。'
        },
        {
          role: 'cofo',
          content: '准备好尝试了吗？…… 让我们先一起商议并设定你的第一个"近期 (Near-term)"里程碑。'
        }
      ]);
    }
  }, [currentScenario]);

  const handleTitleChange = (id: string, title: string) => {
    setNiceAreaTasks(tasks =>
      tasks.map(task => {
        if (task.id === id) {
          // Scenario 2: AI semantic recognition triggers nudge
          const shouldShowNudge = currentScenario >= 2 && 
            (title.includes('收入') || title.includes('KPI') || title.includes('业绩'));
          
          return { ...task, title, showNudge: shouldShowNudge };
        }
        return task;
      })
    );
  };

  const handleConsult = (id: string) => {
    // Scenario 3: Consultation path
    const task = niceAreaTasks.find(t => t.id === id);
    if (task && task.showNudge) {
      setIsSidebarOpen(true);
      setSidebarScenario('nudge');
      setSidebarMessages([
        {
          role: 'cofo',
          content: `经冬，关于"${task.title}"这个目标... 这是一个非常棒的"产出 (Output)"目标！为了确保我们能达成它，我建议我们一起"商议"一下，把它转化为 1-3 个我们本周"可控"的"投入 (Input)"任务。比如"完成 10 次客户访谈"？我们可以"商议"一下，本周"可控的投入"应该是什么吗？`
        }
      ]);
    } else {
      setIsSidebarOpen(true);
      setSidebarScenario('none');
      setSidebarMessages([
        {
          role: 'cofo',
          content: '经冬，让我们一起商议一下这个任务。你希望如何推进它？'
        }
      ]);
    }
  };

  const handleBudgetClick = (id: string) => {
    // Scenario 4: Budget dependency tooltip
    if (currentScenario >= 4) {
      setShowBudgetTooltip(true);
      setTimeout(() => setShowBudgetTooltip(false), 5000);
    }
  };

  const handleScenarioChange = (scenario: Scenario) => {
    setCurrentScenario(scenario);
    setIsSidebarOpen(false);
    setShowBudgetTooltip(false);
    setShowAINotification(false);
    
    if (scenario === 1) {
      setNiceAreaTasks([
        { id: '1', title: '', showNudge: false },
        { id: '2', title: '', showNudge: false },
        { id: '3', title: '', showNudge: false },
      ]);
    } else if (scenario === 2 || scenario === 3) {
      setNiceAreaTasks([
        { id: '1', title: '本月收入 10 万', showNudge: true },
        { id: '2', title: '', showNudge: false },
        { id: '3', title: '', showNudge: false },
      ]);
    } else if (scenario === 5) {
      setShowAINotification(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30">
      {/* Scenario Switcher - For Demo Purposes */}
      <div className="fixed top-4 left-4 z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
        <div className="text-xs text-gray-500 mb-2">演示场景切换：</div>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              size="sm"
              variant={currentScenario === num ? 'default' : 'outline'}
              onClick={() => handleScenarioChange(num as Scenario)}
            >
              场景 {num}
            </Button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">规划与行动</h1>
          <p className="text-gray-600">你的动态行动工作台</p>
        </div>

        {/* View Switcher */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={currentView === 'nice' ? 'default' : 'outline'}
            onClick={() => setCurrentView('nice')}
            className="gap-2"
          >
            <LayoutGrid className="w-4 h-4" />
            NICE 视图 (默认)
          </Button>
          <Button
            variant={currentView === 'milestone' ? 'default' : 'outline'}
            onClick={() => setCurrentView('milestone')}
            className="gap-2"
          >
            <Milestone className="w-4 h-4" />
            里程碑视图
          </Button>
          <Button
            variant={currentView === 'kanban' ? 'default' : 'outline'}
            onClick={() => setCurrentView('kanban')}
            className="gap-2"
          >
            <KanbanSquare className="w-4 h-4" />
            看板视图
          </Button>
        </div>

        {/* Main Workspace - NICE View */}
        {currentView === 'nice' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Area: This Week's NICE Tasks */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-gray-900 mb-1">本周 NICE 任务区</h2>
                  <p className="text-sm text-gray-600">聚焦于 3-5 个可控、赋能的行动</p>
                </div>
                <Button variant="outline" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  分享我的周目标
                </Button>
              </div>

              <div className="grid gap-4">
                {niceAreaTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    onTitleChange={handleTitleChange}
                    onConsult={handleConsult}
                    onBudgetClick={handleBudgetClick}
                    showNudge={task.showNudge}
                    showBudgetTooltip={showBudgetTooltip && task.id === '1'}
                  />
                ))}
              </div>

              <Button variant="outline" className="w-full">
                + 添加更多任务卡槽
              </Button>
            </div>

            {/* Sidebar Area */}
            <div className="space-y-4">
              {/* Budget Overview */}
              <BudgetDashboard />

              {/* Backlog Pool */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-gray-900 mb-3">待办任务池 (Backlog)</h3>
                <p className="text-sm text-gray-500 mb-3">
                  从这里拖拽任务到本周 NICE 区
                </p>
                
                {backlogTasks.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p className="text-sm">暂无待办任务</p>
                    <p className="text-xs mt-1">任务会自动聚合到这里</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {backlogTasks.map((task) => (
                      <div
                        key={task.id}
                        className="p-3 bg-gray-50 rounded border border-gray-200 cursor-move"
                      >
                        {task.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Milestone View Placeholder */}
        {currentView === 'milestone' && (
          <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <Milestone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">里程碑视图</h3>
            <p className="text-gray-600">按时间线展示你的里程碑进展</p>
          </div>
        )}

        {/* Kanban View Placeholder */}
        {currentView === 'kanban' && (
          <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <KanbanSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">看板视图</h3>
            <p className="text-gray-600">使用看板管理你的任务流程</p>
          </div>
        )}
      </div>

      {/* Co-Fo Icon (Global) */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-lg flex items-center justify-center transition-colors z-30"
        aria-label="打开 Co-Fo 辅导"
      >
        <Sparkles className="w-6 h-6 text-white" />
      </button>

      {/* Co-Fo Sidebar */}
      <CoFoSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        messages={sidebarMessages}
        scenario={sidebarScenario}
      />

      {/* AI Notification - Scenario 5 */}
      <AINotification
        show={showAINotification}
        onClose={() => setShowAINotification(false)}
      />
    </div>
  );
}
