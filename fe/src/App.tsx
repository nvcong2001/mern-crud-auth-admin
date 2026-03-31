import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/inidex";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ThemeProvider from "./contexts/ThemeProvider";
import CategoriesPage from "./pages/Categories";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="category" element={<CategoriesPage />} />
              <Route path="products" element={<Products />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
