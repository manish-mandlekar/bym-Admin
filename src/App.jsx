import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Dashboard from "./Pages/Dashboard";
import CreateAccount from "./Pages/CreateAccount";
import Forms from "./Pages/Forms";
import Login from "./Pages/Login";
import Blogs from "./pages/Blogs";
import CreateBlogs from "./Pages/CreateBlogs";
import EditBlog from "./Pages/EditBlog";

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
      <Route 
          path="/login" 
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          } 
        />
         <Route 
          path="/blogs" 
          element={
            <DefaultLayout>
              <Blogs />
            </DefaultLayout>
          } 
        />
        <Route 
          path="/createBlog" 
          element={
            <DefaultLayout>
              <CreateBlogs />
            </DefaultLayout>
          } 
        />
       
     
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

      
      
        <Route 
          path="/create-account" 
          element={
            <AuthLayout>
              <CreateAccount />
            </AuthLayout>
          } 
        />
        <Route 
          path="/editBlog" 
          element={
            <DefaultLayout>
              <EditBlog />
            </DefaultLayout>
          } 
        />

<Route 
    path="*" 
    element={<Navigate to="/login" replace />} 
  />
      </Routes>
    </BrowserRouter>
  );
}

export default App;