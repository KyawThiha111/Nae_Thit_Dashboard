import { useState } from "react";
import { useNavigate } from "react-router";
const BlogCreate = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    titleen: "",
    titlemy: "",
    descriptionen: "",
    descriptionmy: "",
    blogen: "",
    blogmy: "",
    postdate: "",
    timelength: "",
    catagory: "",
  });
  const [img, setImg] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement |HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!img) {
      setError("Please upload an image");
      return;
    }

    const requiredFields = ['titleen', 'titlemy', 'descriptionen', 'descriptionmy', 
                          'blogen', 'blogmy', 'postdate', 'timelength', 'catagory'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      setError(`Missing required fields: ${missingFields.join(', ')}`);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append("img", img);

    try {
      setLoading(true);
      const token = localStorage.getItem('admintoken');
      if (!token) throw new Error('No authentication token found');

      const response = await fetch("https://naethitasanv2.onrender.com/api/pages/blog", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Failed to create blog");
      }

      alert("Blog created successfully!");
      // Reset form after successful submission
      setFormData({
        titleen: "",
        titlemy: "",
        descriptionen: "",
        descriptionmy: "",
        blogen: "",
        blogmy: "",
        postdate: "",
        timelength: "",
        catagory: "",
      });
      setImg(null);
      navigate("/blogs")
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col gap-4 p-4 max-w-2xl mx-auto"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-bold mb-4">Create New Blog</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Title (English)*</label>
          <input
            type="text"
            name="titleen"
            value={formData.titleen}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Title (Myanmar)*</label>
          <input
            type="text"
            name="titlemy"
            value={formData.titlemy}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Description (English)*</label>
          <textarea
            name="descriptionen"
            value={formData.descriptionen}
            onChange={handleChange}
            className="w-full p-2 border rounded h-24"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description (Myanmar)*</label>
          <textarea
            name="descriptionmy"
            value={formData.descriptionmy}
            onChange={handleChange}
            className="w-full p-2 border rounded h-24"
            required
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Blog Content (English)*</label>
        <textarea
          name="blogen"
          value={formData.blogen}
          onChange={handleChange}
          className="w-full p-2 border rounded h-32"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Blog Content (Myanmar)*</label>
        <textarea
          name="blogmy"
          value={formData.blogmy}
          onChange={handleChange}
          className="w-full p-2 border rounded h-32"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 font-medium">Post Date*</label>
          <input
            type="date"
            name="postdate"
            value={formData.postdate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Time Length*</label>
          <input
            type="text"
            name="timelength"
            value={formData.timelength}
            onChange={handleChange}
            placeholder="e.g., 4mins"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Category*</label>
          <select
            name="catagory"
            value={formData.catagory}
            onChange={(e)=>handleChange(e)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="All">All</option>
            <option value="Community">Community</option>
            <option value="Volunteers">Volunteers</option>
            <option value="Research">Research</option>
            <option value="Partnerships">Partnerships</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block mb-1 font-medium">Image*</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImg(e.target.files?.[0] || null)}
          className="w-full p-2 border rounded"
          required
        />
        {img && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Selected: {img.name}</p>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:bg-blue-300"
      >
        {loading ? "Creating..." : "Create Blog"}
      </button>
    </form>
  );
};

export default BlogCreate;