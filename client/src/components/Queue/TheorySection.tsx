import { BookOpen, ArrowRight, Clock, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const TheorySection = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Queue Data Structure Theory</h2>
        <p className="text-muted-foreground">
          Understanding the fundamentals of FIFO (First In, First Out) operations
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* What is a Queue */}
        <Card className="theory-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <BookOpen className="h-5 w-5" />
              What is a Queue?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              A queue is a linear data structure that follows the FIFO (First In, First Out) principle.
            </p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Elements are added at the rear (enqueue)</li>
              <li>• Elements are removed from the front (dequeue)</li>
              <li>• Like a real-world queue or line</li>
            </ul>
          </CardContent>
        </Card>

        {/* Operations */}
        <Card className="theory-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent">
              <ArrowRight className="h-5 w-5" />
              Key Operations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium">Enqueue</span>
              </div>
              <p className="text-xs text-muted-foreground ml-4">
                Add element to the rear of the queue
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                <span className="text-sm font-medium">Dequeue</span>
              </div>
              <p className="text-xs text-muted-foreground ml-4">
                Remove element from the front of the queue
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Time Complexity */}
        <Card className="theory-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Clock className="h-5 w-5" />
              Time Complexity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Enqueue</span>
                <span className="text-sm font-mono text-green-400">O(1)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Dequeue</span>
                <span className="text-sm font-mono text-green-400">O(1)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Search</span>
                <span className="text-sm font-mono text-orange-400">O(n)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications */}
        <Card className="theory-card md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Database className="h-5 w-5" />
              Real-World Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium text-primary">Operating Systems</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Process scheduling</li>
                  <li>• Print queue management</li>
                  <li>• Keyboard buffer</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-accent">Web Development</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Request handling</li>
                  <li>• Task queues</li>
                  <li>• Event processing</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-green-400">Algorithms</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Breadth-First Search</li>
                  <li>• Level order traversal</li>
                  <li>• Cache implementation</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-orange-400">Real Life</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Waiting lines</li>
                  <li>• Call center systems</li>
                  <li>• Buffer in streaming</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FIFO Principle */}
      <Card className="theory-card">
        <CardHeader>
          <CardTitle className="text-center text-2xl">FIFO Principle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-8 py-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-green-500/20 border-2 border-green-500 flex items-center justify-center mb-2">
                <ArrowRight className="h-8 w-8 text-green-400" />
              </div>
              <p className="text-sm font-medium">First In</p>
            </div>
            <div className="flex-1 h-px bg-gradient-to-r from-green-500 to-orange-500"></div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center mb-2">
                <ArrowRight className="h-8 w-8 text-orange-400" />
              </div>
              <p className="text-sm font-medium">First Out</p>
            </div>
          </div>
          <p className="text-center text-muted-foreground text-sm">
            The first element added to the queue will be the first one to be removed
          </p>
        </CardContent>
      </Card>
    </div>
  );
};