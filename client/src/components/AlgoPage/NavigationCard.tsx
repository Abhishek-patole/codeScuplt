import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface NavigationItem {
  name: string;
  path: string;
  description?: string;
  icon?: React.ReactNode;
}

interface NavigationCardProps {
  title: string;
  items: NavigationItem[];
  icon: React.ReactNode;
  gradient: string;
}

export function NavigationCard({ title, items, icon, gradient }: NavigationCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <Card className={`bg-card/70 backdrop-blur-sm shadow-card border border-border/50 hover:border-primary/30 transition-all duration-500 transform hover:scale-[1.02] ${gradient}`}>
      <div className="p-8">
        {/* Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between text-left group"
        >
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="text-primary text-3xl transform group-hover:scale-110 transition-transform duration-300 animate-scale-pulse">
                {icon}
              </div>
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary transition-all duration-300">
              {title}
            </h3>
          </div>
          
          <div className="text-muted-foreground group-hover:text-primary transition-all duration-300 transform group-hover:scale-110">
            {isOpen ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
          </div>
        </button>

        {/* Dropdown Content */}
        {isOpen && (
          <div className="mt-8 space-y-4 animate-slide-down">
            {items.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => handleItemClick(item.path)}
                className="w-full justify-start text-left p-5 h-auto bg-background/30 hover:bg-primary/10 hover:text-primary border border-border/30 hover:border-primary/30 rounded-xl transition-all duration-300 group transform hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center gap-4 w-full">
                  {item.icon && (
                    <div className="text-primary/70 group-hover:text-primary transition-colors duration-300 transform group-hover:scale-110">
                      {item.icon}
                    </div>
                  )}
                  <div className="flex flex-col items-start gap-2 flex-1">
                    <span className="font-semibold text-lg group-hover:text-primary transition-colors duration-300">{item.name}</span>
                    {item.description && (
                      <span className="text-sm text-muted-foreground group-hover:text-muted-foreground/90 transition-colors duration-300">
                        {item.description}
                      </span>
                    )}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}