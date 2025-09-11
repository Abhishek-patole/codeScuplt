import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut, UserButton, SignIn, SignUp, useAuth } from '@clerk/clerk-react'
// import CodeStudio from './pages/CodeStudio'
import CodeStudioA from './pages/CodeStudioA'
import React from 'react'

const App: React.FC = () => {
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

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />
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
