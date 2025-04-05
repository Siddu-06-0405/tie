import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;

  useEffect(() => {
    axios.get("http://localhost:5001/api/blogs").then((res) => setBlogs(res.data));
  }, []);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-white">Category Articles</h2>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {currentBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-black border border-gray-700 rounded p-4 flex flex-col justify-between shadow hover:shadow-xl transition-all h-[400px]"
          >
            <div className="text-xs text-gray-400 mb-2">ARTICLES</div>

            <div className="flex flex-col gap-2 flex-1">
              <Link
                to={`/vtu-updates/articles-vtu-updates/${blog.slug}`}
                className="text-lg font-bold text-blue-500 hover:underline"
              >
                {blog.title}
              </Link>

              <p className="text-gray-200 text-sm line-clamp-5">
                {blog.description}
              </p>
            </div>

            <div className="text-xs text-gray-500 mt-4 pt-2 border-t border-gray-700">
              classverse / {new Date(blog.createdAt).toDateString()}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
      {currentPage == totalPages && (
          <button
            onClick={() => goToPage(currentPage - 1)}
            className="px-4 py-1 text-sm rounded bg-blue-700 text-white hover:bg-blue-800"
          >
            ← Previous
          </button>
        )}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            className={`px-3 py-1 rounded text-sm ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => goToPage(currentPage + 1)}
            className="px-4 py-1 text-sm rounded bg-blue-700 text-white hover:bg-blue-800"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogList;
