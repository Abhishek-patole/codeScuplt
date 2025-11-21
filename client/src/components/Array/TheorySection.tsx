import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Zap, Database, Cpu } from "lucide-react";

export const TheorySection = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
          Array Theory & Concepts
        </h2>
        <div className="h-1 bg-gradient-primary rounded-full w-48 mx-auto" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* What is an Array */}
        <Card className="glass-morphism border-0 shadow-element">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent">
              <Database className="h-5 w-5" />
              What is an Array?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              An array is a fundamental data structure that stores elements in a contiguous memory location. 
              Each element can be accessed directly using its index.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Linear Structure</Badge>
              <Badge variant="secondary">Random Access</Badge>
              <Badge variant="secondary">Fixed Size</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Time Complexity */}
        <Card className="glass-morphism border-0 shadow-element">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent">
              <Clock className="h-5 w-5" />
              Time Complexity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Access by Index:</span>
                <Badge className="bg-arrayElement-success">O(1)</Badge>
              </div>
              <div className="flex justify-between">
                <span>Search Element:</span>
                <Badge className="bg-arrayElement-warning">O(n)</Badge>
              </div>
              <div className="flex justify-between">
                <span>Insert/Delete:</span>
                <Badge className="bg-arrayElement-error">O(n)</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Array Operations */}
        <Card className="glass-morphism border-0 shadow-element">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent">
              <Zap className="h-5 w-5" />
              Common Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong className="text-foreground">Traversal:</strong> Visiting each element sequentially</li>
              <li>• <strong className="text-foreground">Insertion:</strong> Adding elements at specific positions</li>
              <li>• <strong className="text-foreground">Deletion:</strong> Removing elements from positions</li>
              <li>• <strong className="text-foreground">Update:</strong> Modifying existing element values</li>
              <li>• <strong className="text-foreground">Search:</strong> Finding elements by value or condition</li>
            </ul>
          </CardContent>
        </Card>

        {/* Memory Layout */}
        <Card className="glass-morphism border-0 shadow-element">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent">
              <Cpu className="h-5 w-5" />
              Memory Layout
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              Arrays store elements in consecutive memory addresses, enabling fast random access 
              but making insertion/deletion expensive due to element shifting.
            </p>
            <div className="bg-muted/20 rounded-lg p-3 font-mono text-sm">
              <div>Base Address: 1000</div>
              <div>arr[0] → 1000 + (0 × 4) = 1000</div>
              <div>arr[1] → 1000 + (1 × 4) = 1004</div>
              <div>arr[2] → 1000 + (2 × 4) = 1008</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advantages & Disadvantages */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-morphism border-0 shadow-element">
          <CardHeader>
            <CardTitle className="text-arrayElement-success">Advantages</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Fast random access O(1)</li>
              <li>• Memory efficient</li>
              <li>• Cache-friendly</li>
              <li>• Simple implementation</li>
              <li>• Supports multiple data types</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-0 shadow-element">
          <CardHeader>
            <CardTitle className="text-arrayElement-error">Disadvantages</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Fixed size (in most languages)</li>
              <li>• Expensive insertion/deletion</li>
              <li>• Memory waste if not fully used</li>
              <li>• Elements must be same type</li>
              <li>• No built-in bounds checking</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Real-world Applications */}
      <Card className="glass-morphism border-0 shadow-element">
        <CardHeader>
          <CardTitle className="bg-gradient-accent bg-clip-text text-transparent">
            Real-world Applications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold text-primary mb-2">Gaming</h4>
              <p className="text-sm text-muted-foreground">Game boards, inventory systems, score tracking</p>
            </div>
            <div>
              <h4 className="font-semibold text-secondary mb-2">Graphics</h4>
              <p className="text-sm text-muted-foreground">Pixel data, matrices for transformations</p>
            </div>
            <div>
              <h4 className="font-semibold text-accent mb-2">Databases</h4>
              <p className="text-sm text-muted-foreground">Indexing, lookup tables, caching systems</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};