import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "./Dashboard";
import CreateAccount from "./CreateAccount";
import Forms from "./Forms";
import Login from "./Login";

function App() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Layout for pages with sidebar and header
  const DefaultLayout = ({ children }) => (
    <div className={isDark ? "dark" : ""}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar isSideMenuOpen={isSideMenuOpen} />
        <div className="flex flex-col flex-1">
          <Header
            toggleSideMenu={toggleSideMenu}
            toggleTheme={toggleTheme}
            isDark={isDark}
          />
          <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );

  // Layout for auth pages
  const AuthLayout = ({ children }) => (
    <div className={isDark ? "dark" : ""}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col flex-1 items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* Pages with DefaultLayout */}
        <Route 
          path="/" 
          element={
            <DefaultLayout>
              <Dashboard />
            </DefaultLayout>
          } 
        />
        <Route 
          path="/forms" 
          element={
            <DefaultLayout>
              <Forms />
            </DefaultLayout>
          } 
        />

        {/* Pages with AuthLayout */}
        <Route 
          path="/login" 
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          } 
        />
        <Route 
          path="/create-account" 
          element={
            <AuthLayout>
              <CreateAccount />
            </AuthLayout>
          } 
        />

        {/* Fallback route */}
        <Route 
          path="*" 
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;