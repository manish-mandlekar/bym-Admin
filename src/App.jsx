import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Loader from "./Components/Loader";
import Header from "./Components/Header";
import Dashboard from "./Pages/Dashboard";
import CreateAccount from "./Pages/CreateAccount";
import Login from "./Pages/Login";
import Blogs from "./Pages/Blogs";
import CreateBlogs from "./Pages/CreateBlogs";
import EditBlog from "./Pages/EditBlog";
import Category from "./Pages/Category";
import { asyncLoadUser } from "./redux/userAction";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  useEffect(() => {
    dispatch(asyncLoadUser());
  }, []);
  if (loading) {
    return <Loader />;
  }

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
            <div className="container px-6 mx-auto">{children}</div>
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
          path="/category"
          element={
            <DefaultLayout>
              <Category />
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

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
