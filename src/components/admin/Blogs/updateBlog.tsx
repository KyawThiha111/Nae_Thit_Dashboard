import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useUpdateBlogPostMutation } from '../../../services/naethitapi.ts';

const UpdateBlogPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [updateBlogPost, { isLoading }] = useUpdateBlogPostMutation();
  
  const [formData, setFormData] = useState({
    titleen: '',
    titlemy: '',
    descriptionen: '',
    descriptionmy: '',
    blogen: '',
    blogmy: '',
    postdate: '',
    timelength: '',
    catagory: '',
  });
  
  const [image, setImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState('');
  const [error, setError] = useState('');

  // Fetch existing blog data
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`https://naethitasanv2.onrender.com/api/pages/bloggetsingleupdate/${postId}`);
        const data = await response.json();
        
        if (data.success && data.blog) {
          const blog = data.blog;
          setFormData({
            titleen: blog.titleen,
            titlemy: blog.titlemy,
            descriptionen: blog.descriptionen,
            descriptionmy: blog.descriptionmy,
            blogen: blog.blogen,
            blogmy: blog.blogmy,
            postdate: blog.postdate.split('T')[0], // Format date for input
            timelength: blog.timelength,
            catagory: blog.category || '',
          });
          setExistingImage(blog.image);
        }
      } catch (err) {
        console.error('Failed to fetch blog:', err);
        setError('Failed to load blog data');
      }
    };

    fetchBlogData();
  }, [postId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    
    // Only append image if a new one was selected
    if (image) {
      data.append('img', image);
    }

    try {
      await updateBlogPost({ id: postId, data }).unwrap();
      alert('Blog updated successfully!');
      navigate('/admin/blogs'); // Redirect to blog list
    } catch (err: any) {
      console.error(err);
      setError(err?.data?.message || 'Failed to update blog');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Blog Post</h2>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title (English)*</label>
            <input
              type="text"
              name="titleen"
              value={formData.titleen}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title (Myanmar)*</label>
            <input
              type="text"
              name="titlemy"
              value={formData.titlemy}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
          {existingImage && !image && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Current Image:</p>
              <img 
                src={existingImage} 
                alt="Current blog" 
                className="max-w-xs h-auto rounded-md border border-gray-200"
              />
              <p className="text-xs text-gray-500 mt-1">Upload new image to replace</p>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          {image && (
            <div className="mt-2">
              <p className="text-sm text-gray-600">New image selected: {image.name}</p>
              <button
                type="button"
                onClick={() => setImage(null)}
                className="text-sm text-red-600 hover:text-red-800 mt-1"
              >
                Remove selection
              </button>
            </div>
          )}
        </div>

        {/* Rest of your form fields (same as CreateBlog) */}
        {/* ... */}

        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={() => navigate('/admin/blogs')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </span>
            ) : 'Update Blog'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlogPost;