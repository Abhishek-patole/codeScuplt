import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton, SignIn, SignUp, useAuth } from '@clerk/clerk-react'
// import CodeStudio from './pages/CodeStudio'
import CodeStudioA from './pages/CodeStudioA'
import React from 'react'
import { useNavigate } from "react-router-dom";
import {  useClerk } from "@clerk/clerk-react";
import { Header } from "@/components/Homepage/Header";
import Index from './pages/Index'
import AlgorithmPlayer from './pages/AlgorithmPlayer';
import BubbleSort from './pages/sorting algorithm/BubbleSort';
import BinarySearch from './pages/sorting algorithm/BinarySearch';
import { AlgorithmShowcase } from './components/Homepage/AlgorithmShowcase';
import CodeStudioB from './pages/CodeStudioB';
import AlgoPage from './pages/algopage/AlgoPage';
import Stack from './pages/stack animation/Stack';
import Queue from './pages/queue/Queue';
import ScrollToTop from "./components/ScrollToTop";
import BinarySearchTree from './pages/BST/BinarySearchTree';
import Dijkstra from './pages/Dijkstra/Dijktra';
import Array from './pages/Array/Array';
import LinkedList from './pages/LinkedList/LinkedList';
// import JsEngine from "./pages/JS Engine/JsEngine"
import JsEngine from "./pages/JS Engine/JsEngine"

const App: React.FC = () => {
  
const navigate = useNavigate();
const clerk = useClerk();
const { isSignedIn } = useAuth();
const handleSignIn = () => {
  if (isSignedIn) {
    navigate("/codes"); 
  } else {
    clerk.openSignIn({ redirectUrl: "/codes" }); // <-- Redirect automatically after signing in
  }
};

const handleSignUp = () => {
  if (isSignedIn) {
    navigate("/codes"); 
  } else {
    clerk.openSignUp({ redirectUrl: "/codes" }); // <-- Redirect after signing up
  }
};
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', background: '#0F172A', color: '#E2E8F0', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          borderBottom: '1px solid #1E293B',
          background: '#1E293B',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        {/* Left side links */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
          <SignedIn>
            <Link to="/codes" style={linkStyle}>
              My Codes
            </Link>
          </SignedIn>
        </div>

        {/* Right side auth buttons */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in" style={buttonStyle}>
              Sign In
            </Link>
            <Link to="/sign-up" style={{ ...buttonStyle, background: '#22C55E' }}>
              Sign Up
            </Link>
          </SignedOut>
        </div>
      </nav>

       <ScrollToTop />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Index onSignIn={handleSignIn} onSignUp={handleSignUp} />} />
        <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
        
        <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />
       <Route path="/visualize/:algorithmId" element={<AlgorithmPlayer />} />
        <Route path="/visualize/algopage" element={<AlgoPage />} /> 

        {/* Datastructure*/}
        <Route path="/data-structures/arrays" element={<Array />} />
        <Route path="/data-structures/stacks" element={<Stack />} />
        <Route path="/data-structures/queues" element={<Queue />} />
        <Route path="/data-structures/linked-lists" element={<LinkedList />} />
        <Route path="/data-structures/trees" element={<BinarySearchTree />} />
        <Route path="/data-structures/graphs" element={<BinarySearch />} />
        <Route path="/data-structures/hashing" element={<BinarySearch />} />

        {/* Algorithm :- Searching */}
        <Route path="/algorithms/searching/binary-search" element={<BinarySearch />} />
        <Route path="/algorithms/searching/linear-search" element={<BinarySearch />} />
        
        <Route path="/algorithms/searching/bfs" element={<BinarySearch />} />
        
        {/* Algorithm :- Sorting */}
        <Route path="/algorithms/sorting/bubble-sort" element={<BubbleSort />} />
        <Route path="/algorithms/sorting/merge-sort" element={<BubbleSort />} />
        <Route path="/algorithms/sorting/quick-sort" element={<BubbleSort />} />
        <Route path="/algorithms/sorting/heap-sort" element={<BubbleSort />} />
        <Route path="/algorithms/sorting/insertion-sort" element={<BubbleSort />} />

        <Route path="/algorithms/pathfinding/dijkstra" element={<Dijkstra />} />
        
        
        <Route path="/JS-Engine" element={<JsEngine />} />
        {/* <Route path="/index" element={<Index/>} /> */}
        <Route
          path="/codes"
          element={
            <RequireAuth>
              <CodeStudioA />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

const Home: React.FC = () => (
  <div style={{ padding: 32 }}>
    <h1 style={{ fontSize: 28, marginBottom: 12 }}>Welcome</h1>
    <p style={{ fontSize: 16, color: '#94A3B8' }}>Sign in to create and edit your code files.</p>
  </div>
)

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded, isSignedIn } = useAuth()
  if (!isLoaded) return <div style={{ padding: 24 }}>Loading...</div>
  if (!isSignedIn) return <Navigate to="/sign-in" />
  return <>{children}</>
}

/* Styles */
const linkStyle: React.CSSProperties = {
  color: '#E2E8F0',
  textDecoration: 'none',
  fontSize: 16,
  padding: '6px 10px',
  borderRadius: 6,
  transition: 'background 0.2s',
}

const buttonStyle: React.CSSProperties = {
  background: '#3B82F6',
  color: '#F8FAFC',
  padding: '6px 12px',
  borderRadius: 6,
  textDecoration: 'none',
  fontSize: 15,
  fontWeight: 500,
  transition: 'background 0.2s',
}

export default App
