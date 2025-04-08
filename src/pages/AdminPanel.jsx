import { useEffect, useState } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [branches, setBranches] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [branch, setBranch] = useState("");
  const [scheme, setScheme] = useState("");
  const [subject, setSubject] = useState("");

  const [branchdup, setBranchdup] = useState("");
  const [schemedup, setSchemedup] = useState("");
  const [subjectdup, setSubjectdup] = useState("");
  const [post, setPost] = useState({ title: "", pdfUrl: "" });

  const [step, setStep] = useState(1);

  useEffect(() => {
    axios.get("http://localhost:5001/api/branches").then((res) => {
      setBranches(res.data);
    });
    // console.log(branch);
  }, []);

  const handleBranchChange = (e) => {
    const selectedBranch = e.target.value;
    setBranch(selectedBranch);
    const selected = branches.find((b) => b.slug === selectedBranch);
    if (selected) {
      setSchemes(selected.Schemes);
    }
  };

  const handleSchemeChange = (e) => {
    const selectedScheme = e.target.value;
    setScheme(selectedScheme);
    const selected = schemes.find((s) => s.slug === selectedScheme);
    if (selected) {
      setSubjects(selected.subjects);
    }
  };

  const handleBranchSubmit = async () => {
    await axios.post("http://localhost:5001/api/branch", { name: branch });
    setStep(2);
  };

  const handleSchemeSubmit = async () => {
    await axios.post(`http://localhost:5001/api/branch/${branch}/scheme`, {
      schemeName: scheme,
    });
    setStep(3);
  };

  const handleSubjectSubmit = async () => {
    await axios.post(
      `http://localhost:5001/api/branch/${branch}/scheme/${scheme}/subject`,
      { subjectName: subject }
    );
    setStep(4);
  };

  const handlePostSubmit = async () => {
    await axios.post(
      `http://localhost:5001/api/branch/${branch}/scheme/${scheme}/subject/${subject
        .toLowerCase()
        .replace(/\s+/g, "-")}/post`,
      post
    );
    alert("Post added!");
    setStep(1);
    setBranch("");
    setScheme("");
    setSubject("");
    setPost({ title: "", pdfUrl: "" });
  };

  return (
    <div className="max-w-xl mx-auto p-4 mt-8 shadow-lg rounded-xl space-y-6 bg-black text-white">
      <h1 className="text-2xl font-bold text-center">Admin Panel</h1>
      <p className="text-md font-bold text-center">
        Don't use special characters. Use only letters and numbers.
      </p>

      {/* Step 1: Branch */}
      {step >= 1 && (
        <div className="space-y-2">
          {/* Choose a branch */}
          <label className="block font-semibold">Choose a branch:</label>
          <select
            className="w-full border p-2 rounded text-amber-800"
            value={branch}
            onChange={handleBranchChange}
          >
            <option value="">Choose a branch</option>
            {branches.map((b) => (
              <option key={b._id} value={b.slug}>
                {b.name}
              </option>
            ))}
          </select>

          {/* Next button if a branch is selected */}
          {branch && (
            <button
              className="bg-black border border-white text-white px-4 py-2 rounded"
              onClick={() => setStep(2)}
            >
              Next
            </button>
          )}

          {/* Create Branch section — hidden if branch is selected */}
          {!branch && (
            <>
              <p>or</p>
              <label className="block font-semibold">Create Branch</label>
              <input
                className="w-full border p-2 rounded text-white"
                placeholder="e.g., CSE"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              />
              <button
                className="bg-black border border-white text-white px-4 py-2 rounded"
                onClick={handleBranchSubmit}
              >
                Create Branch
              </button>
            </>
          )}
        </div>
      )}

      {/* Step 2: Scheme */}
      {step >= 2 && (
        <div className="space-y-2">
          <select
            className="w-full border p-2 rounded text-amber-800"
            value={scheme}
            onChange={handleSchemeChange}
          >
            <option value="">Choose a scheme</option>
            {schemes.map((s, i) => (
              <option key={i} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>

          {scheme && (
            <button
              className="bg-black border border-white text-white px-4 py-2 rounded"
              onClick={() => setStep(3)}
            >
              Next
            </button>
          )}
          {!scheme && (
            <>
              <p>or</p>
              <label className="block font-semibold">
                Add Scheme to Branch {branch}
              </label>
              <input
                className="w-full border p-2 rounded text-white"
                placeholder="e.g., 21Scheme"
                value={scheme}
                onChange={(e) => setScheme(e.target.value)}
              />
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleSchemeSubmit}
              >
                Add Scheme
              </button>
            </>
          )}
        </div>
      )}

      {/* Step 3: Subject */}
      {step >= 3 && (
        <div className="space-y-2">
          <select
            className="w-full border p-2 rounded text-amber-800"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">Choose a subject</option>
            {subjects.map((sub, i) => (
              <option key={i} value={sub.slug}>
                {sub.name}
              </option>
            ))}
          </select>

          {subject && (
            <button
              className="bg-black border border-white text-white px-4 py-2 rounded"
              onClick={() => setStep(4)}
            >
              Next
            </button>
          )}
          {!subject && (
            <>
              <p>or</p>
              <label className="block font-semibold">
                Add Subject to Scheme {scheme}
              </label>
              <input
                className="w-full border p-2 rounded text-white"
                placeholder="e.g., Engineering Chemistry"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleSubjectSubmit}
              >
                Add Subject
              </button>
            </>
          )}
        </div>
      )}

      {/* Step 4: Post */}
      {step >= 4 && (
        <div className="space-y-2">
          <label className="block font-semibold">
            Add Post to Subject {subject}
          </label>
          <input
            className="w-full border p-2 rounded text-white"
            placeholder="Post Title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
          <input
            className="w-full border p-2 rounded text-white"
            placeholder="PDF URL"
            value={post.pdfUrl}
            onChange={(e) => setPost({ ...post, pdfUrl: e.target.value })}
          />
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded"
            onClick={handlePostSubmit}
          >
            Add Post
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
