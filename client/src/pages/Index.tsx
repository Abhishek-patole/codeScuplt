
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Homepage/Header";
import { Hero } from "@/components/Homepage/Hero";
import { Features } from "@/components/Homepage/Features";
import { AlgorithmShowcase } from "@/components/Homepage/AlgorithmShowcase";
import { useClerk } from "@clerk/clerk-react";

interface IndexProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

const Index = ({ onSignIn, onSignUp }: IndexProps) => {
     const navigate = useNavigate();
    const handleViewDemo = () => {
    navigate("/visualize/algopage"); 
    // 👆 Example: Go directly to BubbleSort demo
    // Or navigate("/visualize/demo") if you want a general demo page
  };
  // const clerk = useClerk(); // Get Clerk instance
  // const navigate = useNavigate();

  // const handleSignIn = () => {
  //   clerk.openSignIn(); // opens the SignIn modal
  // };

  // const handleSignUp = () => {
  //   clerk.openSignUp(); // opens the SignUp modal
  // };

  // const handleGetStarted = () => {
  //   clerk.openSignUp();
  //   // navigate("/codes"); // optional: go to dashboard after signup
  // };

  return (
    <div className="min-h-screen bg-background">
      <Header onSignIn={onSignIn} onSignUp={onSignUp} />
      <Hero onGetStarted={onSignUp} onViewDemo={handleViewDemo}/>
      <Features />
      <AlgorithmShowcase />

      <footer className="py-8 border-t border-border bg-card/50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2024 Codesculpt. Sculpting the Logic Behind Your Code.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
