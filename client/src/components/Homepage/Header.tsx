import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, Code, Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react"; // ✅ added

interface HeaderProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

export const Header = ({ onSignIn, onSignUp }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Code className="h-8 w-8 text-primary animate-glow" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Code<span className="text-primary">sculpt</span>
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Sculpting the Logic Behind Your Code
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a href="#algorithms" className="text-foreground hover:text-primary transition-colors">
              Algorithms
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              About
            </a>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <SignedOut> {/* ✅ wrap SignIn/GetStarted */}
              <Button 
                variant="ghost" 
                onClick={onSignIn}
                className="hover:bg-primary/10"
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
              <Button 
                variant="hero" 
                onClick={onSignUp}
                className="shadow-primary"
              >
                <UserPlus className="h-4 w-4" />
                Get Started
              </Button>
            </SignedOut>

            <SignedIn> {/* ✅ show UserButton if signed in */}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4 animate-slide-up">
            <nav className="flex flex-col gap-4 mb-4">
              <a 
                href="#features" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#algorithms" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Algorithms
              </a>
              <a 
                href="#about" 
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
            </nav>
            <div className="flex flex-col gap-3">
              <SignedOut> {/* ✅ wrap mobile SignIn/GetStarted */}
                <Button 
                  variant="ghost" 
                  onClick={onSignIn}
                  className="justify-start hover:bg-primary/10"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
                <Button 
                  variant="hero" 
                  onClick={onSignUp}
                >
                  <UserPlus className="h-4 w-4" />
                  Get Started
                </Button>
              </SignedOut>

              <SignedIn> {/* ✅ mobile UserButton */}
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
