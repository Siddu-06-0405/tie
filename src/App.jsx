import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import BlogSingle from "./pages/BlogSingle";
import SubjectSingle from "./pages/SubjectSingle";
import RecentSingle from "./pages/RecentSingle";
// import BranchSingle from "./pages/BranchSingle";
import AdminCreate from "./pages/AdminCreate";
import BlogList from "./pages/BlogList";
import BranchList from "./pages/BranchList";
import SubjectList from "./pages/SubjectList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import AboutUs from "./pages/AboutUs";
import Recent from "./pages/Recent";

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
          <Route
            path="/categories/:branchSlug/:subjectSlug/:slug"
            element={<SubjectSingle />}
          />
          <Route
            path="/branch/:slug"
            element={<BranchList />}
          />
          <Route
            path="/categories/:branchSlug/:slug"
            element={<SubjectList />}
          />
          <Route path="/admin-create" element={<AdminCreate />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/home/" element={<Recent />} />
          <Route path="/home/:slug" element={<RecentSingle />} />
          <Route path="/" element={<Home />} />
          <Route path="/about/" element={<AboutUs />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;