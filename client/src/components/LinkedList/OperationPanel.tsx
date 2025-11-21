import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LinkedListType } from '@/types/linkedList';
import { Plus, Minus, ArrowLeft, ArrowRight, ArrowDown } from 'lucide-react';

interface OperationPanelProps {
  onInsert: (position: 'beginning' | 'end' | 'middle', value: number, index?: number) => void;
  onDelete: (position: 'beginning' | 'end' | 'middle', index?: number) => void;
  disabled: boolean;
  listType: LinkedListType;
}

export const OperationPanel: React.FC<OperationPanelProps> = ({
  onInsert,
  onDelete,
  disabled,
  listType
}) => {
  const [insertValue, setInsertValue] = useState<string>('');
  const [insertPosition, setInsertPosition] = useState<'beginning' | 'end' | 'middle'>('end');
  const [insertIndex, setInsertIndex] = useState<string>('');
  const [deletePosition, setDeletePosition] = useState<'beginning' | 'end' | 'middle'>('beginning');
  const [deleteIndex, setDeleteIndex] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'insert' | 'delete'>('insert');

  const handleInsert = () => {
    const value = parseInt(insertValue);
    if (!isNaN(value)) {
      if (insertPosition === 'middle') {
        const index = parseInt(insertIndex);
        if (!isNaN(index) && index >= 0) {
          onInsert(insertPosition, value, index);
          setInsertValue('');
          setInsertIndex('');
        }
      } else {
        onInsert(insertPosition, value);
        setInsertValue('');
      }
    }
  };

  const handleDelete = () => {
    if (deletePosition === 'middle') {
      const index = parseInt(deleteIndex);
      if (!isNaN(index) && index >= 0) {
        onDelete(deletePosition, index);
        setDeleteIndex('');
      }
    } else {
      onDelete(deletePosition);
    }
  };

  return (
    <Card className="p-6 bg-card border-border shadow-medium">
      <div className="space-y-6">
        {/* Tab Selector */}
        <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
          <Button
            variant={activeTab === 'insert' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('insert')}
            className={`flex-1 ${activeTab === 'insert' ? 'bg-gradient-primary text-white' : ''}`}
          >
            <Plus className="h-4 w-4 mr-2" />
            Insert Node
          </Button>
          <Button
            variant={activeTab === 'delete' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('delete')}
            className={`flex-1 ${activeTab === 'delete' ? 'bg-gradient-to-r from-destructive to-destructive/80 text-white' : ''}`}
          >
            <Minus className="h-4 w-4 mr-2" />
            Delete Node
          </Button>
        </div>

        {activeTab === 'insert' ? (
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Plus className="h-5 w-5 text-success" />
              Insert Node
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="insert-value">Node Value</Label>
                <Input
                  id="insert-value"
                  type="number"
                  placeholder="Enter value..."
                  value={insertValue}
                  onChange={(e) => setInsertValue(e.target.value)}
                  disabled={disabled}
                  className="bg-input border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="insert-position">Position</Label>
                <Select
                  value={insertPosition}
                  onValueChange={(value: 'beginning' | 'end' | 'middle') => setInsertPosition(value)}
                  disabled={disabled}
                >
                  <SelectTrigger className="bg-input border-border focus:border-primary">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginning">
                      <div className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Beginning
                      </div>
                    </SelectItem>
                    <SelectItem value="end">
                      <div className="flex items-center gap-2">
                        <ArrowRight className="h-4 w-4" />
                        End
                      </div>
                    </SelectItem>
                    <SelectItem value="middle">
                      <div className="flex items-center gap-2">
                        <ArrowDown className="h-4 w-4" />
                        Middle
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {insertPosition === 'middle' && (
              <div className="space-y-2">
                <Label htmlFor="insert-index">Index Position</Label>
                <Input
                  id="insert-index"
                  type="number"
                  placeholder="Enter index (0, 1, 2...)"
                  value={insertIndex}
                  onChange={(e) => setInsertIndex(e.target.value)}
                  disabled={disabled}
                  className="bg-input border-border focus:border-primary"
                />
              </div>
            )}

            <Button
              onClick={handleInsert}
              disabled={disabled || insertValue === '' || (insertPosition === 'middle' && insertIndex === '')}
              className="w-full bg-gradient-to-r from-success to-success/80 hover:from-success/90 hover:to-success/70 text-white border-none shadow-glow-success"
            >
              <Plus className="h-4 w-4 mr-2" />
              Insert Node
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Minus className="h-5 w-5 text-destructive" />
              Delete Node
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="delete-position">Position</Label>
              <Select
                value={deletePosition}
                onValueChange={(value: 'beginning' | 'end' | 'middle') => setDeletePosition(value)}
                disabled={disabled}
              >
                <SelectTrigger className="bg-input border-border focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginning">Beginning</SelectItem>
                  <SelectItem value="end">End</SelectItem>
                  <SelectItem value="middle">Middle</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {deletePosition === 'middle' && (
              <div className="space-y-2">
                <Label htmlFor="delete-index">Index Position</Label>
                <Input
                  id="delete-index"
                  type="number"
                  placeholder="Enter index (0, 1, 2...)"
                  value={deleteIndex}
                  onChange={(e) => setDeleteIndex(e.target.value)}
                  disabled={disabled}
                  className="bg-input border-border focus:border-primary"
                />
              </div>
            )}

            <Button
              onClick={handleDelete}
              disabled={disabled || (deletePosition === 'middle' && deleteIndex === '')}
              className="w-full bg-gradient-to-r from-destructive to-destructive/80 hover:from-destructive/90 hover:to-destructive/70 text-white border-none shadow-glow-destructive"
            >
              <Minus className="h-4 w-4 mr-2" />
              Delete Node
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};