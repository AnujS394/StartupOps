import { CheckCircle2, Circle, Clock, Plus, Filter, Search, X, Calendar, User, Tag } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'high' | 'medium' | 'low';
  assignee: string;
  dueDate: string;
  tags: string[];
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete user authentication flow',
    description: 'Implement OAuth2 and JWT token management',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Michael Chen',
    dueDate: '2026-02-10',
    tags: ['Engineering', 'Backend'],
  },
  {
    id: '2',
    title: 'Design new dashboard mockups',
    description: 'Create high-fidelity designs for the analytics dashboard',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Lisa Wang',
    dueDate: '2026-02-09',
    tags: ['Product', 'Design'],
  },
  {
    id: '3',
    title: 'Set up CI/CD pipeline',
    description: 'Configure GitHub Actions for automated deployment',
    status: 'todo',
    priority: 'medium',
    assignee: 'Tom Brown',
    dueDate: '2026-02-12',
    tags: ['Engineering', 'DevOps'],
  },
  {
    id: '4',
    title: 'Write blog post on product launch',
    description: 'Announce new features and improvements',
    status: 'done',
    priority: 'medium',
    assignee: 'Jessica Lee',
    dueDate: '2026-02-05',
    tags: ['Marketing', 'Content'],
  },
  {
    id: '5',
    title: 'Conduct user interviews',
    description: 'Interview 10 users about the new feature',
    status: 'todo',
    priority: 'low',
    assignee: 'Sarah Martinez',
    dueDate: '2026-02-15',
    tags: ['Product', 'Research'],
  },
];

export function Tasks() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showCreatePanel, setShowCreatePanel] = useState(false);

  const tasksByStatus = {
    todo: mockTasks.filter(t => t.status === 'todo'),
    'in-progress': mockTasks.filter(t => t.status === 'in-progress'),
    done: mockTasks.filter(t => t.status === 'done'),
  };

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Main Task Board */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl mb-2">Task Management</h1>
              <p className="text-muted-foreground">
                Organize and track work across your entire team
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search tasks..." className="pl-9 w-64" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
              <Button onClick={() => {
                setShowCreatePanel(true);
                setSelectedTask(null);
              }}>
                <Plus className="w-4 h-4 mr-2" />
                New Task
              </Button>
            </div>
          </div>

          {/* Kanban Board */}
          <div className="grid grid-cols-3 gap-6">
            {/* To Do */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Circle className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-medium">To Do</h3>
                  <Badge variant="outline" className="text-xs">{tasksByStatus.todo.length}</Badge>
                </div>
              </div>
              <div className="space-y-3">
                {tasksByStatus.todo.map(task => (
                  <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} />
                ))}
              </div>
            </div>

            {/* In Progress */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <h3 className="text-sm font-medium">In Progress</h3>
                  <Badge variant="outline" className="text-xs">{tasksByStatus['in-progress'].length}</Badge>
                </div>
              </div>
              <div className="space-y-3">
                {tasksByStatus['in-progress'].map(task => (
                  <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} />
                ))}
              </div>
            </div>

            {/* Done */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <h3 className="text-sm font-medium">Done</h3>
                  <Badge variant="outline" className="text-xs">{tasksByStatus.done.length}</Badge>
                </div>
              </div>
              <div className="space-y-3">
                {tasksByStatus.done.map(task => (
                  <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      {(selectedTask || showCreatePanel) && (
        <div className="w-96 border-l border-border bg-card p-6 overflow-y-auto">
          <div className="flex items-start justify-between mb-6">
            <h3>{selectedTask ? 'Task Details' : 'Create New Task'}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setSelectedTask(null);
                setShowCreatePanel(false);
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm mb-2 block">Title</label>
              <Input
                defaultValue={selectedTask?.title}
                placeholder="Task title..."
              />
            </div>

            <div>
              <label className="text-sm mb-2 block">Description</label>
              <Textarea
                defaultValue={selectedTask?.description}
                placeholder="Add a description..."
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm mb-2 block">Status</label>
              <Select defaultValue={selectedTask?.status || 'todo'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm mb-2 block">Priority</label>
              <Select defaultValue={selectedTask?.priority || 'medium'}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm mb-2 block">Assignee</label>
              <Select defaultValue={selectedTask?.assignee}>
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Michael Chen">Michael Chen</SelectItem>
                  <SelectItem value="Lisa Wang">Lisa Wang</SelectItem>
                  <SelectItem value="Tom Brown">Tom Brown</SelectItem>
                  <SelectItem value="Jessica Lee">Jessica Lee</SelectItem>
                  <SelectItem value="Sarah Martinez">Sarah Martinez</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm mb-2 block">Due Date</label>
              <Input type="date" defaultValue={selectedTask?.dueDate} />
            </div>

            <div>
              <label className="text-sm mb-2 block">Tags</label>
              <div className="flex flex-wrap gap-2">
                {selectedTask?.tags.map((tag, i) => (
                  <Badge key={i} variant="outline">{tag}</Badge>
                ))}
                <Button variant="outline" size="sm">
                  <Plus className="w-3 h-3 mr-1" />
                  Add Tag
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex gap-2">
              <Button className="flex-1">
                {selectedTask ? 'Save Changes' : 'Create Task'}
              </Button>
              {selectedTask && (
                <Button variant="outline">Delete</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TaskCard({ task, onClick }: { task: Task; onClick: () => void }) {
  return (
    <Card
      className="p-4 cursor-pointer hover:shadow-md transition-all"
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-medium leading-snug">{task.title}</h4>
          <Badge
            variant="outline"
            className={`text-xs flex-shrink-0 ${
              task.priority === 'high'
                ? 'border-destructive/20 bg-destructive/5 text-destructive'
                : task.priority === 'medium'
                ? 'border-warning/20 bg-warning/5 text-warning'
                : 'border-muted-foreground/20 bg-muted text-muted-foreground'
            }`}
          >
            {task.priority}
          </Badge>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2">
          {task.description}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{task.assignee.split(' ')[0]}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(task.dueDate).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {task.tags.slice(0, 2).map((tag, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
