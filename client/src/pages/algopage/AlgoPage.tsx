import { Database, Cpu, TreePine, Network, Hash, BarChart3, Search, GitBranch, Sparkles, Code2, Layers3, Zap, Brain, Globe, ArrowRight, Play } from 'lucide-react';
import { NavigationCard } from '@/components/AlgoPage/NavigationCard';
import { Button } from '@/components/ui/button';

const AlgoPage = () => {
  const dataStructures = [
    { name: 'Arrays', path: '/data-structures/arrays', description: 'Sequential data storage', icon: <Layers3 size={20} /> },
    { name: 'Stacks', path: '/data-structures/stacks', description: 'LIFO data structure', icon: <Database size={20} /> },
    { name: 'Queues', path: '/data-structures/queues', description: 'FIFO data structure', icon: <ArrowRight size={20} /> },
    { name: 'Linked Lists', path: '/data-structures/linked-lists', description: 'Dynamic node-based lists', icon: <GitBranch size={20} /> },
    { name: 'Trees', path: '/data-structures/trees', description: 'Hierarchical data structure', icon: <TreePine size={20} /> },
    // { name: 'Graphs', path: '/data-structures/graphs', description: 'Connected nodes and edges', icon: <Network size={20} /> },
    // { name: 'Hashing', path: '/data-structures/hashing', description: 'Key-value fast access', icon: <Hash size={20} /> }
  ];

  const sortingAlgorithms = [
    { name: 'Bubble Sort', path: '/algorithms/sorting/bubble-sort', description: 'Simple comparison-based sort', icon: <BarChart3 size={20} /> },
    // { name: 'Merge Sort', path: '/algorithms/sorting/merge-sort', description: 'Divide and conquer approach', icon: <GitBranch size={20} /> },
    // { name: 'Quick Sort', path: '/algorithms/sorting/quick-sort', description: 'Efficient pivot-based sort', icon: <Zap size={20} /> },
    // { name: 'Heap Sort', path: '/algorithms/sorting/heap-sort', description: 'Binary heap based sorting', icon: <TreePine size={20} /> },
    // { name: 'Insertion Sort', path: '/algorithms/sorting/insertion-sort', description: 'Building sorted array', icon: <ArrowRight size={20} /> }
  ];

  const searchingAlgorithms = [
    { name: 'Linear Search', path: '/algorithms/searching/linear-search', description: 'Sequential element search', icon: <Search size={20} /> },
    { name: 'Binary Search', path: '/algorithms/searching/binary-search', description: 'Efficient sorted array search', icon: <Search size={20} /> },
    // { name: 'Depth-First Search', path: '/algorithms/searching/dfs', description: 'Graph traversal algorithm', icon: <TreePine size={20} /> },
    // { name: 'Breadth-First Search', path: '/algorithms/searching/bfs', description: 'Level-wise graph traversal', icon: <Network size={20} /> }
  ];

  const pathfindingAlgorithms = [
    { name: 'Dijkstra\'s Algorithm', path: '/algorithms/pathfinding/dijkstra', description: 'Shortest path algorithm', icon: <Globe size={20} /> },
    // { name: 'A* Algorithm', path: '/algorithms/pathfinding/astar', description: 'Heuristic pathfinding', icon: <Brain size={20} /> },
    // { name: 'Bellman-Ford', path: '/algorithms/pathfinding/bellman-ford', description: 'Negative weight handling', icon: <GitBranch size={20} /> },
    // { name: 'Floyd-Warshall', path: '/algorithms/pathfinding/floyd-warshall', description: 'All pairs shortest path', icon: <Network size={20} /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 animate-gradient-shift bg-[length:200%_200%]"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          {/* Main Title with Animation */}
          <div className="mb-8 animate-bounce-in">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="relative">
                <Sparkles className="w-12 h-12 text-accent animate-scale-pulse" />
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl animate-pulse-glow"></div>
              </div>
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent">
                AlgoViz
              </h1>
              <div className="relative">
                <Code2 className="w-12 h-12 text-secondary animate-scale-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute inset-0 bg-secondary/20 rounded-full blur-xl animate-pulse-glow" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
            
            <h2 className="text-2xl md:text-4xl font-semibold text-white/90 mb-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Interactive Visualization Studio
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
            Master Data Structures & Algorithms through stunning visual experiences
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.9s' }}>
            <Button size="lg" className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 animate-pulse-glow group">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Start Learning
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
              <Brain className="w-5 h-5 mr-2" />
              Explore Algorithms
            </Button>
          </div>

          {/* Floating Icons */}
          <div className="absolute top-20 left-10 animate-float" style={{ animationDelay: '1s' }}>
            <Database className="w-8 h-8 text-white/40" />
          </div>
          <div className="absolute top-32 right-16 animate-float" style={{ animationDelay: '2s' }}>
            <TreePine className="w-10 h-10 text-white/30" />
          </div>
          <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: '3s' }}>
            <Network className="w-6 h-6 text-white/50" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Data Structures Section */}
        <div className="mb-20">
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <Database className="w-10 h-10 text-primary animate-scale-pulse" />
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg animate-pulse-glow"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Data Structures
              </h2>
            </div>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
              Discover how data is organized, stored, and accessed in computer memory through interactive visualizations
            </p>
          </div>
          
          <div className="animate-bounce-in" style={{ animationDelay: '0.2s' }}>
            <NavigationCard
              title="Data Structures"
              items={dataStructures}
              icon={<Database />}
              gradient="hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 hover:shadow-glow"
            />
          </div>
        </div>

        {/* Algorithms Section */}
        <div className="space-y-16">
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <Cpu className="w-10 h-10 text-secondary animate-scale-pulse" />
                <div className="absolute inset-0 bg-secondary/20 rounded-full blur-lg animate-pulse-glow"></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
                Algorithms
              </h2>
            </div>
            <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
              Master problem-solving techniques through step-by-step visual demonstrations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-bounce-in" style={{ animationDelay: '0.4s' }}>
              <NavigationCard
                title="Sorting Algorithms"
                items={sortingAlgorithms}
                icon={<BarChart3 />}
                gradient="hover:bg-gradient-to-br hover:from-secondary/10 hover:to-accent/10 hover:shadow-glow"
              />
            </div>

            <div className="animate-bounce-in" style={{ animationDelay: '0.6s' }}>
              <NavigationCard
                title="Searching Algorithms"
                items={searchingAlgorithms}
                icon={<Search />}
                gradient="hover:bg-gradient-to-br hover:from-accent/10 hover:to-primary/10 hover:shadow-glow"
              />
            </div>
          </div>

          <div className="animate-bounce-in" style={{ animationDelay: '0.8s' }}>
            <NavigationCard
              title="Pathfinding Algorithms"
              items={pathfindingAlgorithms}
              icon={<GitBranch />}
              gradient="hover:bg-gradient-to-br hover:from-primary/10 hover:to-secondary/10 hover:shadow-glow"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group text-center p-8 bg-card/50 backdrop-blur-sm rounded-2xl shadow-card border border-border/50 hover:shadow-glow transition-all duration-500 animate-bounce-in hover:scale-105" style={{ animationDelay: '1s' }}>
            <div className="relative mb-6 flex justify-center">
              <div className="text-4xl animate-float">🎯</div>
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">Interactive Learning</h3>
            <p className="text-muted-foreground">
              Step through algorithms with visual feedback, controls, and real-time interaction
            </p>
          </div>
          
          <div className="group text-center p-8 bg-card/50 backdrop-blur-sm rounded-2xl shadow-card border border-border/50 hover:shadow-glow transition-all duration-500 animate-bounce-in hover:scale-105" style={{ animationDelay: '1.2s' }}>
            <div className="relative mb-6 flex justify-center">
              <div className="text-4xl animate-float" style={{ animationDelay: '1s' }}>⚡</div>
              <div className="absolute inset-0 bg-secondary/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">Real-time Visualization</h3>
            <p className="text-muted-foreground">
              Watch algorithms execute with smooth animations and dynamic visual effects
            </p>
          </div>
          
          <div className="group text-center p-8 bg-card/50 backdrop-blur-sm rounded-2xl shadow-card border border-border/50 hover:shadow-glow transition-all duration-500 animate-bounce-in hover:scale-105" style={{ animationDelay: '1.4s' }}>
            <div className="relative mb-6 flex justify-center">
              <div className="text-4xl animate-float" style={{ animationDelay: '2s' }}>📚</div>
              <div className="absolute inset-0 bg-accent/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">Educational Excellence</h3>
            <p className="text-muted-foreground">
              Perfect for students, educators, and coding enthusiasts at all levels
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgoPage;