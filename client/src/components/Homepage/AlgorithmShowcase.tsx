import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

import {
  Search,
  ArrowUpDown,
  Network,
  TreePine,
  BarChart3,
  Shuffle,
  Play,
  Timer,
  TrendingUp,
  List
} from "lucide-react";

const algorithms = [
  {
    id: "binary-search",
    name: "Binary Search",
    category: "Search",
    icon: Search,
    description: "Efficiently find elements in sorted arrays with O(log n) complexity",
    complexity: {
      time: "O(log n)",
      space: "O(1)"
    },
    difficulty: "Easy",
    color: "primary"
  },
  // {
  //   id: "merge-sort",
  //   name: "Merge Sort",
  //   category: "Sorting",
  //   icon: ArrowUpDown,
  //   description: "Divide and conquer sorting algorithm with guaranteed O(n log n) performance",
  //   complexity: {
  //     time: "O(n log n)",
  //     space: "O(n)"
  //   },
  //   difficulty: "Medium",
  //   color: "accent"
  // },
  {
  id: "bubble-sort",
  name: "Bubble Sort",
  category: "Sorting",
  icon: BarChart3, // you can swap this with a better icon if you like
  description: "Simple comparison-based sorting algorithm with O(n²) worst-case complexity",
  complexity: {
    time: "O(n²)",
    space: "O(1)"
  },
  difficulty: "Easy",
  color: "primary"
},
  {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    category: "Graph",
    icon: Network,
    description: "Find shortest paths in weighted graphs with non-negative edge weights",
    complexity: {
      time: "O(V² + E)",
      space: "O(V)"
    },
    difficulty: "Hard",
    color: "primary"
  },
  // {
  //   id: "binary-tree",
  //   name: "Binary Tree Traversal",
  //   category: "Tree",
  //   icon: TreePine,
  //   description: "Explore tree structures with inorder, preorder, and postorder traversals",
  //   complexity: {
  //     time: "O(n)",
  //     space: "O(h)"
  //   },
  //   difficulty: "Medium",
  //   color: "accent"
  // },
  {
  id: "queue",
  name: "Queue Operations",
  category: "Linear Data Structure",
  icon: List, // or use another Lucide icon like "List" if you prefer
  description: "Understand enqueue and dequeue operations in a First-In-First-Out (FIFO) structure",
  complexity: {
    time: "O(1) for enqueue/dequeue",
    space: "O(n)"
  },
  difficulty: "Easy",
  color: "blue"
},

  {
    id: "quick-sort",
    name: "Quick Sort",
    category: "Sorting",
    icon: BarChart3,
    description: "Fast average-case sorting with in-place partitioning",
    complexity: {
      time: "O(n log n)",
      space: "O(log n)"
    },
    difficulty: "Medium",
    color: "primary"
  },
  // {
  //   id: "dfs-bfs",
  //   name: "DFS & BFS",
  //   category: "Graph",
  //   icon: Shuffle,
  //   description: "Fundamental graph traversal algorithms for exploring connected components",
  //   complexity: {
  //     time: "O(V + E)",
  //     space: "O(V)"
  //   },
  //   difficulty: "Easy",
  //   color: "accent"
  // }
  {
  id: "stack",
  name: "Stack",
  category: "Data Structure",
  icon: Shuffle, // you can import an appropriate icon like from lucide-react or material-icons
  description: "Linear data structure that follows LIFO (Last In, First Out) principle",
  complexity: {
    time: "O(1)",
    space: "O(n)"
  },
  difficulty: "Easy",
  color: "secondary"
},
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy": return "bg-green-500/20 text-green-400 border-green-500/30";
    case "Medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "Hard": return "bg-red-500/20 text-red-400 border-red-500/30";
    default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

export const AlgorithmShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Search", "Sorting", "Graph", "Tree"];

  const filteredAlgorithms = selectedCategory === "All"
    ? algorithms
    : algorithms.filter(algo => algo.category === selectedCategory);

  const navigate = useNavigate(); // get navigate function

  const handleVisualize = (algoId: string) => {
    navigate(`/visualize/${algoId}`);
    console.log(`Click : ${algoId}`)
  };
  return (
    <section id="algorithms" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-gradient-glass backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 text-sm">
            <Network className="h-4 w-4 text-primary" />
            <span className="text-foreground">Interactive Learning</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Master Popular
            <br />
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              DSA Algorithms
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Explore and understand the most important algorithms in computer science
            with step-by-step visualizations and interactive examples.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "hero" : "glass"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Algorithms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredAlgorithms.map((algorithm, index) => (
            <Card
              key={algorithm.id}
              className="group bg-card/80 backdrop-blur-md border border-border hover:shadow-glass hover:scale-105 transition-all duration-500 overflow-hidden animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-${algorithm.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <algorithm.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge
                    variant="outline"
                    className={`${getDifficultyColor(algorithm.difficulty)} font-medium`}
                  >
                    {algorithm.difficulty}
                  </Badge>
                </div>

                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {algorithm.name}
                </CardTitle>
                <CardDescription className="text-accent font-medium">
                  {algorithm.category}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {algorithm.description}
                </p>

                {/* Complexity Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Timer className="h-3 w-3 text-primary" />
                      <span className="text-xs text-muted-foreground">Time</span>
                    </div>
                    <div className="font-mono text-sm text-foreground">
                      {algorithm.complexity.time}
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="h-3 w-3 text-accent" />
                      <span className="text-xs text-muted-foreground">Space</span>
                    </div>
                    <div className="font-mono text-sm text-foreground">
                      {algorithm.complexity.space}
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="w-full group/btn hover:bg-primary/10 border border-border hover:border-primary/30"
                  onClick={() => handleVisualize(algorithm.id)} // navigate to visualization page
                >
                  <Play className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                  Visualize Algorithm
                </Button>

              </CardContent>

              {/* Hover effect overlay */}
              <div className={`absolute inset-0 bg-gradient-${algorithm.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up">
          {[
            { label: "Algorithms", value: "50+", icon: Network },
            { label: "Visualizations", value: "100K+", icon: Play },
            { label: "Code Examples", value: "500+", icon: BarChart3 },
            { label: "Learning Paths", value: "25+", icon: TreePine }
          ].map((stat, index) => (
            <Card
              key={index}
              className="bg-gradient-glass backdrop-blur-md border border-white/20 p-6 text-center hover:scale-105 transition-transform duration-300"
            >
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-24 left-16 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-24 right-16 w-28 h-28 bg-primary/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1.5s' }}></div>
    </section>
  );
};