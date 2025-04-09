// pages/BlogSingle.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BranchList = () => {
  const { slug } = useParams();
  console.log(slug);

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/branch/${slug}`).then((res) => {
      setBlog(res.data);
      console.log(res);
    });
  }, [slug]);

  if (!blog) return <div>Loading...</div>;

  console.log(blog);

  return (
    <div className="p-4">
      <div className="flex justify-center text-3xl font-bold p-26 bg-[#f2f5f7] text-[#192a3d] text-nowrap">
        {blog.branchName}
      </div>

      <div>
        {blog.schemes.map((scheme) => (
          <div key={scheme.schemeSlug} className="mb-6">
            <p className="text-4xl font-bold text-center text-[#192A3D]">
              {scheme.schemeName}
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {scheme.subjects.map((subject) => (
                <a href={`/categories/${slug}/${subject.slug}`}>
                  <button
                    key={subject.slug}
                    className="px-4 py-2
                    text-white rounded shadow"
                  >
                    {subject.name}
                  </button>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchList;