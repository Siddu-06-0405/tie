import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import BlogSingle from "./pages/BlogSingle";
import AdminCreate from "./pages/AdminCreate";
import BlogList from "./pages/BlogList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <div className="w-screen">
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/category/vtu-updates/articles-vtu-updates/"
            element={<BlogList />}
          />
          <Route
            path="/vtu-updates/articles-vtu-updates/:slug"
            element={<BlogSingle />}
          />
          <Route path="/admin-create" element={<AdminCreate />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;