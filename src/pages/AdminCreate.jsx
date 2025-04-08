// pages/AdminCreate.jsx
import { useState } from 'react';
import axios from 'axios';

const AdminCreate = () => {
  const [form, setForm] = useState({ title: '', description: '', pdfUrl: '', slug: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/api/blogs', form);
    alert('Posted!');
  };

  return (
    <>
    <h1 className='text-black'>Blog</h1>
      <form onSubmit={handleSubmit} className="p-4 space-y-3 text-black">
        <input name="title" placeholder="Title" onChange={handleChange} className="border p-2 w-full" />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="border p-20 w-full" />
        <input name="pdfUrl" placeholder="Google Drive PDF URL" onChange={handleChange} className="border p-2 w-full" />
        <input name="slug" placeholder="Slug " onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-black px-4 py-2 rounded">Submit</button>
      </form>
    </>
  );
};

export default AdminCreate;