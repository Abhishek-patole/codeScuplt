import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LinkedListType } from '@/types/linkedList';
import { 
  BookOpen, 
  Clock, 
  Database, 
  Zap, 
  CheckCircle, 
  XCircle,
  ArrowRight,
  ArrowLeftRight,
  RotateCcw,
  RefreshCw
} from 'lucide-react';

interface TheorySectionProps {
  currentType: LinkedListType;
}

const theoryData = {
  singly: {
    icon: ArrowRight,
    name: 'Singly Linked List',
    gradient: 'bg-gradient-primary',
    description: 'A linear data structure where each node contains data and a reference to the next node.',
    characteristics: [
      'Unidirectional traversal (forward only)',
      'Dynamic size allocation',
      'No random access to elements',
      'Efficient insertion/deletion at beginning'
    ],
    timeComplexity: {
      insertion: 'O(1) at head, O(n) at tail/middle',
      deletion: 'O(1) at head, O(n) at tail/middle',
      search: 'O(n)',
      access: 'O(n)'
    },
    spaceComplexity: 'O(n)',
    advantages: [
      'Dynamic size',
      'Efficient memory utilization',
      'Easy insertion/deletion at beginning',
      'No memory waste'
    ],
    disadvantages: [
      'No random access',
      'Extra memory for pointers',
      'Poor cache locality',
      'Cannot traverse backwards'
    ],
    useCases: [
      'Implementation of stacks',
      'Undo functionality in applications',
      'Music playlists',
      'Browser history (forward only)'
    ]
  },
  doubly: {
    icon: ArrowLeftRight,
    name: 'Doubly Linked List',
    gradient: 'bg-gradient-secondary',
    description: 'Each node contains data and references to both the next and previous nodes.',
    characteristics: [
      'Bidirectional traversal',
      'Dynamic size allocation',
      'Extra pointer per node',
      'More flexible than singly linked list'
    ],
    timeComplexity: {
      insertion: 'O(1) at head/tail, O(n) at middle',
      deletion: 'O(1) at head/tail, O(n) at middle',
      search: 'O(n)',
      access: 'O(n)'
    },
    spaceComplexity: 'O(n) - extra space for prev pointers',
    advantages: [
      'Bidirectional traversal',
      'Efficient insertion/deletion at both ends',
      'Better for navigation applications',
      'Can delete node with only node reference'
    ],
    disadvantages: [
      'Extra memory for prev pointers',
      'More complex operations',
      'Poor cache locality',
      'Higher space overhead'
    ],
    useCases: [
      'Browser navigation (back/forward)',
      'Music player (prev/next)',
      'Undo/redo functionality',
      'LRU cache implementation'
    ]
  },
  circular: {
    icon: RotateCcw,
    name: 'Circular Linked List',
    gradient: 'bg-gradient-accent',
    description: 'The last node points back to the first node, forming a circular structure.',
    characteristics: [
      'Circular traversal possible',
      'No NULL pointers',
      'Can start from any node',
      'Useful for round-robin scheduling'
    ],
    timeComplexity: {
      insertion: 'O(1) at head, O(n) at tail/middle',
      deletion: 'O(1) at head, O(n) at tail/middle',
      search: 'O(n)',
      access: 'O(n)'
    },
    spaceComplexity: 'O(n)',
    advantages: [
      'No NULL pointers',
      'Can traverse entire list from any node',
      'Suitable for round-robin applications',
      'Memory efficient for cyclic data'
    ],
    disadvantages: [
      'Risk of infinite loops',
      'More complex insertion/deletion',
      'Difficult to detect end of list',
      'No clear starting/ending point'
    ],
    useCases: [
      'Round-robin CPU scheduling',
      'Multiplayer games (turn management)',
      'Circular buffers',
      'Josephus problem solution'
    ]
  },
  'doubly-circular': {
    icon: RefreshCw,
    name: 'Doubly Circular Linked List',
    gradient: 'bg-gradient-node',
    description: 'Combines features of doubly and circular linked lists with bidirectional circular connections.',
    characteristics: [
      'Bidirectional circular traversal',
      'No NULL pointers',
      'Two pointers per node',
      'Most flexible linked list variant'
    ],
    timeComplexity: {
      insertion: 'O(1) at head/tail, O(n) at middle',
      deletion: 'O(1) at head/tail, O(n) at middle',
      search: 'O(n)',
      access: 'O(n)'
    },
    spaceComplexity: 'O(n) - highest space overhead',
    advantages: [
      'Bidirectional traversal',
      'No NULL pointers',
      'Efficient operations at both ends',
      'Maximum flexibility'
    ],
    disadvantages: [
      'Highest memory overhead',
      'Most complex implementation',
      'Risk of infinite loops',
      'Complex pointer management'
    ],
    useCases: [
      'Advanced music players',
      'Complex navigation systems',
      'Game development (circular menus)',
      'Advanced undo/redo systems'
    ]
  }
};

export const TheorySection: React.FC<TheorySectionProps> = ({ currentType }) => {
  const theory = theoryData[currentType];
  const Icon = theory.icon;

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 animate-gradient-shift"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.15),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.15),transparent_40%),radial-gradient(circle_at_center,rgba(59,130,246,0.1),transparent_60%)]"></div>
      
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-tl from-secondary/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-56 h-56 bg-gradient-to-r from-accent/15 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <Card className="relative p-10 bg-gradient-to-br from-card/98 via-card/95 to-card/98 backdrop-blur-xl border-2 border-border/50 shadow-large space-y-10">
        {/* Header with Enhanced Styling */}
        <div className="text-center relative">
          {/* Decorative Lines */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent h-px top-1/2 blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent h-0.5 top-1/2"></div>
          
          {/* Main Title Badge */}
          <div className={`inline-flex items-center gap-4 px-10 py-5 rounded-3xl ${theory.gradient} text-white shadow-glow mb-8 relative z-10 backdrop-blur-sm border-2 border-white/30 hover:scale-105 transition-all duration-300 group`}>
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-lg group-hover:bg-white/30 transition-all"></div>
              <Icon className="h-8 w-8 drop-shadow-lg relative animate-pulse" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight drop-shadow-lg">{theory.name}</h2>
          </div>
          
          {/* Description with Enhanced Styling */}
          <p className="text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed font-medium px-6 py-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10">
            {theory.description}
          </p>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Characteristics */}
        <Card className="p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-2 border-primary/30 relative overflow-hidden shadow-glow-subtle hover:shadow-glow transition-all duration-500 group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-primary opacity-20 rounded-full -mr-20 -mt-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/20 to-transparent rounded-full -ml-16 -mb-16 blur-xl"></div>
          
          <h3 className="flex items-center gap-3 text-xl font-bold mb-6 text-foreground relative">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-large group-hover:scale-110 transition-transform duration-300">
              <Database className="h-6 w-6 text-white animate-pulse" />
            </div>
            <span className="bg-gradient-primary bg-clip-text text-transparent">Key Characteristics</span>
          </h3>
          
          <ul className="space-y-3 relative">
            {theory.characteristics.map((char, index) => (
              <li 
                key={index} 
                className="flex items-start gap-3 text-sm p-4 rounded-xl bg-gradient-to-r from-white/60 to-white/40 dark:from-black/40 dark:to-black/20 border-2 border-primary/20 hover:border-primary/40 hover:shadow-glow-subtle hover:scale-[1.02] transition-all duration-300 group/item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-1.5 bg-gradient-to-br from-primary to-primary/80 rounded-full shadow-medium group-hover/item:scale-110 transition-transform">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <span className="text-foreground/90 font-medium leading-relaxed">{char}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Time & Space Complexity */}
        <Card className="p-8 bg-gradient-to-br from-secondary/10 via-secondary/5 to-transparent border-2 border-secondary/30 relative overflow-hidden shadow-glow-subtle hover:shadow-glow transition-all duration-500 group">
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-secondary opacity-20 rounded-full -ml-18 -mb-18 blur-2xl group-hover:opacity-30 transition-opacity"></div>
          <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-secondary/20 to-transparent rounded-full -mr-14 -mt-14 blur-xl"></div>
          
          <h3 className="flex items-center gap-3 text-xl font-bold mb-6 text-foreground relative">
            <div className="p-3 bg-gradient-secondary rounded-xl shadow-large group-hover:scale-110 transition-transform duration-300">
              <Clock className="h-6 w-6 text-white animate-pulse" />
            </div>
            <span className="bg-gradient-secondary bg-clip-text text-transparent">Complexity Analysis</span>
          </h3>
          
          <div className="space-y-5 relative">
            <div className="p-5 bg-gradient-to-br from-white/70 to-white/50 dark:from-black/50 dark:to-black/30 rounded-2xl border-2 border-secondary/20 hover:border-secondary/40 hover:shadow-glow-subtle transition-all duration-300">
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-secondary rounded-full animate-pulse shadow-glow-subtle"></div>
                <span className="text-lg">Time Complexity</span>
              </h4>
              <div className="space-y-2.5">
                {Object.entries(theory.timeComplexity).map(([operation, complexity], index) => (
                  <div 
                    key={operation} 
                    className="flex justify-between items-center p-3 bg-gradient-to-r from-white/80 to-white/60 dark:from-black/60 dark:to-black/40 rounded-xl border border-secondary/20 hover:border-secondary/40 hover:scale-[1.02] transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-foreground/90 capitalize font-semibold">{operation}</span>
                    <Badge className="font-mono text-sm px-4 py-1.5 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/80 text-white border-0 shadow-medium hover:shadow-lg transition-shadow">
                      {complexity}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-5 bg-gradient-to-br from-white/70 to-white/50 dark:from-black/50 dark:to-black/30 rounded-2xl border-2 border-secondary/20 hover:border-secondary/40 hover:shadow-glow-subtle transition-all duration-300">
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-3">
                <div className="w-3 h-3 bg-gradient-secondary rounded-full animate-pulse shadow-glow-subtle"></div>
                <span className="text-lg">Space Complexity</span>
              </h4>
              <Badge className="font-mono text-base px-6 py-3 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/80 text-white border-0 shadow-large hover:shadow-xl transition-all hover:scale-105">
                {theory.spaceComplexity}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Advantages */}
        <Card className="p-8 bg-gradient-to-br from-success/15 via-success/8 to-transparent border-2 border-success/40 relative overflow-hidden shadow-glow-success hover:shadow-[0_8px_30px_-8px_rgba(34,197,94,0.3)] transition-all duration-500 group">
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-success/30 to-transparent rounded-full -mr-18 -mt-18 blur-2xl group-hover:opacity-40 transition-opacity"></div>
          <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-success/20 to-transparent rounded-full -ml-14 -mb-14 blur-xl"></div>
          
          <h3 className="flex items-center gap-3 text-xl font-bold mb-6 text-foreground relative">
            <div className="p-3 bg-gradient-to-br from-success to-success/80 rounded-xl shadow-large group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
              <CheckCircle className="h-6 w-6 text-white animate-pulse" />
            </div>
            <span className="bg-gradient-to-r from-success to-success/80 bg-clip-text text-transparent">Advantages</span>
          </h3>
          
          <ul className="space-y-3 relative">
            {theory.advantages.map((advantage, index) => (
              <li 
                key={index} 
                className="flex items-start gap-3 text-sm p-4 rounded-xl bg-gradient-to-r from-success/10 via-success/5 to-transparent border-2 border-success/30 hover:border-success/50 shadow-sm hover:shadow-glow-success hover:scale-[1.02] transition-all duration-300 group/item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-1.5 bg-gradient-to-br from-success to-success/80 rounded-full shadow-medium group-hover/item:scale-110 group-hover/item:rotate-12 transition-all">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <span className="text-foreground/90 font-medium leading-relaxed">{advantage}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Disadvantages */}
        <Card className="p-8 bg-gradient-to-br from-destructive/15 via-destructive/8 to-transparent border-2 border-destructive/40 relative overflow-hidden shadow-glow-destructive hover:shadow-[0_8px_30px_-8px_rgba(239,68,68,0.3)] transition-all duration-500 group">
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-destructive/30 to-transparent rounded-full -ml-18 -mb-18 blur-2xl group-hover:opacity-40 transition-opacity"></div>
          <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-destructive/20 to-transparent rounded-full -mr-14 -mt-14 blur-xl"></div>
          
          <h3 className="flex items-center gap-3 text-xl font-bold mb-6 text-foreground relative">
            <div className="p-3 bg-gradient-to-br from-destructive to-destructive/80 rounded-xl shadow-large group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300">
              <XCircle className="h-6 w-6 text-white animate-pulse" />
            </div>
            <span className="bg-gradient-to-r from-destructive to-destructive/80 bg-clip-text text-transparent">Disadvantages</span>
          </h3>
          
          <ul className="space-y-3 relative">
            {theory.disadvantages.map((disadvantage, index) => (
              <li 
                key={index} 
                className="flex items-start gap-3 text-sm p-4 rounded-xl bg-gradient-to-r from-destructive/10 via-destructive/5 to-transparent border-2 border-destructive/30 hover:border-destructive/50 shadow-sm hover:shadow-glow-destructive hover:scale-[1.02] transition-all duration-300 group/item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-1.5 bg-gradient-to-br from-destructive to-destructive/80 rounded-full shadow-medium group-hover/item:scale-110 group-hover/item:-rotate-12 transition-all">
                  <XCircle className="h-4 w-4 text-white" />
                </div>
                <span className="text-foreground/90 font-medium leading-relaxed">{disadvantage}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Use Cases */}
      <Card className="p-8 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border-2 border-accent/30 relative overflow-hidden shadow-glow-subtle hover:shadow-glow transition-all duration-500 group">
        <div className="absolute top-0 left-1/2 w-48 h-48 bg-gradient-accent opacity-15 rounded-full -ml-24 -mt-24 blur-3xl group-hover:opacity-25 transition-opacity"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-gradient-to-tl from-accent/20 to-transparent rounded-full -mr-20 -mb-20 blur-2xl"></div>
        
        <h3 className="flex items-center gap-3 text-xl font-bold mb-6 text-foreground relative">
          <div className="p-3 bg-gradient-accent rounded-xl shadow-large group-hover:scale-110 transition-transform duration-300">
            <BookOpen className="h-6 w-6 text-white animate-pulse" />
          </div>
          <span className="bg-gradient-accent bg-clip-text text-transparent">Real-World Applications</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          {theory.useCases.map((useCase, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 p-5 bg-gradient-to-r from-white/70 via-white/60 to-white/50 dark:from-black/50 dark:via-black/40 dark:to-black/30 rounded-2xl border-2 border-accent/30 hover:border-accent/50 shadow-sm hover:shadow-glow-subtle hover:scale-[1.03] transition-all duration-300 group/item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-4 h-4 bg-gradient-accent rounded-full shadow-medium group-hover/item:scale-125 group-hover/item:rotate-180 transition-all duration-500"></div>
              <span className="text-sm text-foreground/90 font-semibold leading-relaxed">{useCase}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Reference */}
      <Card className="p-10 bg-gradient-to-r from-primary/15 via-secondary/10 to-accent/15 border-2 border-primary/40 relative overflow-hidden shadow-glow hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.4)] transition-all duration-500 group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 animate-gradient-shift"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-primary opacity-10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:opacity-20 transition-opacity"></div>
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-gradient-secondary opacity-10 rounded-full -ml-28 -mb-28 blur-3xl group-hover:opacity-20 transition-opacity"></div>
        
        <div className="relative">
          <h3 className="text-3xl font-bold mb-6 text-transparent bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text animate-gradient-shift flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-primary via-secondary to-accent rounded-full animate-pulse"></div>
            Quick Reference Guide
          </h3>
          
          <div className="space-y-4">
            <div className="p-6 bg-gradient-to-br from-white/80 via-white/70 to-white/60 dark:from-black/60 dark:via-black/50 dark:to-black/40 rounded-2xl border-2 border-success/40 hover:border-success/60 shadow-glow-success hover:shadow-[0_6px_25px_-6px_rgba(34,197,94,0.3)] hover:scale-[1.01] transition-all duration-300 group/best">
              <p className="flex items-center gap-3 font-bold text-foreground mb-3 text-lg">
                <span className="text-2xl">🎯</span>
                <span className="bg-gradient-to-r from-success to-success/80 bg-clip-text text-transparent">Best for:</span>
              </p>
              <p className="text-foreground/90 leading-relaxed pl-10 font-medium">
                {theory.useCases[0]} and similar applications requiring <span className="font-bold text-primary">{currentType.includes('doubly') ? 'bidirectional' : 'unidirectional'}</span> traversal
                {currentType.includes('circular') && <span className="font-bold text-accent"> with circular operations</span>}.
              </p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-white/80 via-white/70 to-white/60 dark:from-black/60 dark:via-black/50 dark:to-black/40 rounded-2xl border-2 border-warning/40 hover:border-warning/60 shadow-sm hover:shadow-[0_6px_25px_-6px_rgba(234,179,8,0.3)] hover:scale-[1.01] transition-all duration-300 group/alt">
              <p className="flex items-center gap-3 font-bold text-foreground mb-3 text-lg">
                <span className="text-2xl">⚠️</span>
                <span className="bg-gradient-to-r from-warning to-warning/80 bg-clip-text text-transparent">Consider alternatives if:</span>
              </p>
              <p className="text-foreground/90 leading-relaxed pl-10 font-medium">
                You need <span className="font-bold text-secondary">random access</span> (use arrays) or <span className="font-bold text-destructive">frequent insertions in the middle</span> (consider balanced trees).
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Card>
    </div>
  );
};