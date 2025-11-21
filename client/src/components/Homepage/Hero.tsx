import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Code2, Zap } from "lucide-react";
import { CodeVisualization } from "./CodeVisualization";

interface HeroProps {
  onGetStarted: () => void;
   onViewDemo: () => void; 
}

export const Hero = ({ onGetStarted, onViewDemo }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card"></div>
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float"></div>
      <div 
        className="absolute bottom-32 right-16 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float" 
        style={{ animationDelay: '1s' }}
      ></div>
      <div 
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/30 rounded-full blur-xl animate-float" 
        style={{ animationDelay: '2s' }}
      ></div>

      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-gradient-glass backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 text-sm">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-foreground">Visualize Code Like Never Before</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="bg-gradient-hero bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
                Codesculpt
              </span>
              <br />
              <span className="text-foreground">
                Sculpting the Logic 
                <br />
                Behind Your Code
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Transform your understanding of programming with step-by-step code execution visualization 
              and interactive algorithm animations. Master data structures and algorithms through immersive learning.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button 
                variant="hero" 
                size="lg"
                onClick={onGetStarted}
                className="text-lg px-8 py-6 h-auto group"
              >
                <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                Start Visualizing
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="glass" 
                size="lg"
                onClick={onViewDemo}
                className="text-lg px-8 py-6 h-auto"
              >
                <Code2 className="h-5 w-5" />
                View Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 text-center lg:text-left">
              <div>
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Algorithms</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">100K+</div>
                <div className="text-sm text-muted-foreground">Visualizations</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Learning</div>
              </div>
            </div>
          </div>

          {/* Right Content - Code Visualization */}
          <div className="relative animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <CodeVisualization />
          </div>
        </div>
      </div>
    </section>
  );
};