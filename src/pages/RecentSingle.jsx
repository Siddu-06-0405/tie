// pages/BlogSingle.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SubjectSingle = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/single-subject-post/${slug}`)
      .then((res) => {setBlog(res.data);
        // console.log(res);
      });
  }, [slug]);

  const getEmbedUrl = (url) => {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? `https://drive.google.com/file/d/${match[1]}/preview` : null;
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <p className="text-2xl font-bold mb-2 text-black">{blog.title}</p>
      <p className="text-sm text-gray-500 mb-4">
        EasyTech / {new Date(blog.createdAt).toDateString()} / 
      </p>
      <div className="mb-4 leading-relaxed whitespace-pre-line text-justify text-black">
        {blog.description}
      </div>
      {getEmbedUrl(blog.pdfUrl) && (
        <iframe
          src={getEmbedUrl(blog.pdfUrl)}
          width="50%"
          height="600px"
          className="border rounded"
        ></iframe>
      )}
    </div>
  );
};

export default SubjectSingle;