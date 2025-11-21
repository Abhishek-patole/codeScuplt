import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Zap, Info, Target } from 'lucide-react';

export const AlgorithmInfo: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Algorithm Overview */}
      <Card className="glass-panel border-border/30">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Info className="w-5 h-5" />
            Dijkstra's Algorithm
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Dijkstra's algorithm finds the shortest path between cities in a weighted graph. 
            It systematically explores the city network, always choosing the next closest unvisited city.
          </p>
          
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">How it works:</h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">1</Badge>
                <span>Start at the source city with distance 0</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">2</Badge>
                <span>Visit the unvisited city with the smallest distance</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">3</Badge>
                <span>Update distances to neighboring cities</span>
              </div>
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="w-6 h-6 p-0 flex items-center justify-center text-xs">4</Badge>
                <span>Repeat until destination is reached</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complexity Analysis */}
      <Card className="glass-panel border-border/30">
        <CardHeader>
          <CardTitle className="text-secondary flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Complexity Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Time Complexity</span>
              </div>
              <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                O((V + E) log V)
              </Badge>
              <p className="text-xs text-muted-foreground">
                V = cities, E = roads
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Space Complexity</span>
              </div>
              <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                O(V)
              </Badge>
              <p className="text-xs text-muted-foreground">
                For distance array
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">Performance:</h4>
            <div className="space-y-1 text-xs text-muted-foreground">
              <div>• Optimal for non-negative edge weights</div>
              <div>• Guarantees shortest path</div>
              <div>• More efficient than Bellman-Ford for this use case</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="glass-panel border-border/30">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Target className="w-5 h-5" />
            City States
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full city-node unvisited"></div>
              <span>Unvisited</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full city-node current"></div>
              <span>Current</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full city-node visited"></div>
              <span>Visited</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full city-node path"></div>
              <span>Shortest Path</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};