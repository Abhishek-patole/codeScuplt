import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Code, 
  Play, 
  Brain, 
  Zap, 
  Target, 
  BookOpen,
  ArrowRight,
  Activity,
  Layers,
  GitBranch
} from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Step-by-Step Code Execution",
    description: "Watch your code come alive with detailed step-by-step execution visualization. Understand every line, every variable change, and every function call.",
    color: "primary",
    delay: "0ms"
  },
  {
    icon: Brain,
    title: "Algorithm Visualization",
    description: "Master data structures and algorithms with interactive animations. From sorting algorithms to graph traversals, see how they work in real-time.",
    color: "accent",
    delay: "200ms"
  },
  {
    icon: Activity,
    title: "Performance Analytics",
    description: "Track time and space complexity with visual performance metrics. Understand the efficiency of your algorithms at a glance.",
    color: "primary",
    delay: "400ms"
  },
  {
    icon: Layers,
    title: "Multi-Language Support",
    description: "Visualize code in Python, JavaScript, Java, C++, and more. Our universal engine adapts to your preferred programming language.",
    color: "accent",
    delay: "600ms"
  },
  {
    icon: GitBranch,
    title: "Interactive Learning Paths",
    description: "Follow curated learning paths from beginner to advanced. Each path includes hands-on exercises and real-world examples.",
    color: "primary",
    delay: "800ms"
  },
  {
    icon: Target,
    title: "Instant Debugging",
    description: "Identify bugs and logical errors instantly with our intelligent debugging assistant. Get suggestions and fixes in real-time.",
    color: "accent",
    delay: "1000ms"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-card/50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-gradient-glass backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 text-sm">
            <Zap className="h-4 w-4 text-accent" />
            <span className="text-foreground">Powerful Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Master Programming
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From basic syntax to complex algorithms, our comprehensive suite of tools 
            helps you understand, visualize, and master programming concepts.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group bg-card/80 backdrop-blur-md border border-border hover:shadow-glass hover:scale-105 transition-all duration-500 overflow-hidden animate-scale-in"
              style={{ animationDelay: feature.delay }}
            >
              <CardHeader className="relative">
                <div className={`w-12 h-12 rounded-lg bg-gradient-${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
              
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center animate-slide-up" style={{ animationDelay: '1200ms' }}>
          <Card className="bg-gradient-glass backdrop-blur-md border border-white/20 shadow-glass max-w-4xl mx-auto p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h3 className="text-2xl font-bold mb-2">Ready to Transform Your Coding Journey?</h3>
                <p className="text-muted-foreground">
                  Join thousands of developers who are already using Codesculpt to master programming.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="hero" size="lg" className="group">
                  <BookOpen className="h-5 w-5" />
                  Explore Features
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="glass" size="lg">
                  <Play className="h-5 w-5" />
                  Watch Demo
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-32 right-16 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-32 left-16 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};