import { useState, useEffect } from 'react';
import { useUpdateAboutUsBannerMutation } from '../../../services/naethitapi.ts';

// Interface for form and banner data
interface AboutBannerData {
  titleen: string;
  titlemy: string;
  abouten: string;
  aboutmy: string;
  blogtitleen: string;
  blogtitlemy: string;
  blogen: string;
  blogmy: string;
  introductionen: string;
  introductionmy: string;
  bannerbgimg?: string;
  backgroundblogimg?: string;
}

// Helper function to fetch existing banner data
const fetchExistingBanner = async (): Promise<AboutBannerData | null> => {
  try {
    const response = await fetch('https://naethitasanv2.onrender.com/api/pages/aboutbannergetall');
    if (!response.ok) throw new Error('Failed to fetch banner data');
    
    const result = await response.json();
    return result?.data || null;
  } catch (error) {
    console.error('Error fetching banner:', error);
    return null;
  }
};

const UpdateAboutUsBanner: React.FC = () => {
  const [updateBanner, { isLoading: isUpdating }] = useUpdateAboutUsBannerMutation();
  const [existingData, setExistingData] = useState<AboutBannerData | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<AboutBannerData>({
    titleen: '',
    titlemy: '',
    abouten: '',
    aboutmy: '',
    blogtitleen: '',
    blogtitlemy: '',
    blogen: '',
    blogmy: '',
    introductionen: '',
    introductionmy: '',
  });

  const [bannerBgImage, setBannerBgImage] = useState<File | null>(null);
  const [backgroundblogimg, setBackgroundBlogImg] = useState<File | null>(null);

  // Load existing data on mount
  useEffect(() => {
    const loadData = async () => {
      setIsFetching(true);
      const data = await fetchExistingBanner();
      if (data) {
        setExistingData(data);
        setFormData({
          titleen: data.titleen || '',
          titlemy: data.titlemy || '',
          abouten: data.abouten || '',
          aboutmy: data.aboutmy || '',
          blogtitleen: data.blogtitleen || '',
          blogtitlemy: data.blogtitlemy || '',
          blogen: data.blogen || '',
          blogmy: data.blogmy || '',
          introductionen: data.introductionen || '',
          introductionmy: data.introductionmy || '',
        });
      }
      setIsFetching(false);
    };
    loadData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const missingFields = Object.entries(formData)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      setError(`Please fill all required fields. Missing: ${missingFields.join(', ')}`);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (bannerBgImage) data.append('bannerbgimg', bannerBgImage);
    if (backgroundblogimg) data.append('backgroundblogimg', backgroundblogimg);

    try {
      await updateBanner(data).unwrap();
      alert('About Us banner updated successfully!');
      const updatedData = await fetchExistingBanner();
      if (updatedData) {
        setExistingData(updatedData);
        setBannerBgImage(null);
        setBackgroundBlogImg(null);
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.data?.message || 'Failed to update banner');
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!existingData) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p>Failed to load banner data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Update About Us Banner</h2>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
         {/* Section 1: Banner Content */}
         <div className="space-y-6 border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900">Banner Content</h3>
          
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About Text (English)*</label>
              <textarea
                name="abouten"
                value={formData.abouten}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About Text (Myanmar)*</label>
              <textarea
                name="aboutmy"
                value={formData.aboutmy}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Banner Background Image</label>
            {existingData.bannerbgimg && !bannerBgImage && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                <img 
                  src={existingData.bannerbgimg} 
                  alt="Current banner background" 
                  className="max-w-xs h-auto rounded-md border border-gray-200"
                />
                <p className="text-xs text-gray-500 mt-1">Upload new image to replace</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBannerBgImage(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {bannerBgImage && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">New image selected: {bannerBgImage.name}</p>
                <button
                  type="button"
                  onClick={() => setBannerBgImage(null)}
                  className="text-sm text-red-600 hover:text-red-800 mt-1"
                >
                  Remove selection
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Blog Content */}
        <div className="space-y-6 border-b border-gray-200 pb-6">
          <h3 className="text-lg font-medium text-gray-900">Blog Content</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title (English)*</label>
              <input
                type="text"
                name="blogtitleen"
                value={formData.blogtitleen}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title (Myanmar)*</label>
              <input
                type="text"
                name="blogtitlemy"
                value={formData.blogtitlemy}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blog Content (English)*</label>
              <textarea
                name="blogen"
                value={formData.blogen}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blog Content (Myanmar)*</label>
              <textarea
                name="blogmy"
                value={formData.blogmy}
                onChange={handleChange}
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blog Background Image</label>
            {existingData.backgroundblogimg && !backgroundblogimg && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                <img 
                  src={existingData.backgroundblogimg} 
                  alt="Current blog image" 
                  className="max-w-xs h-auto rounded-md border border-gray-200"
                />
                <p className="text-xs text-gray-500 mt-1">Upload new image to replace</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBackgroundBlogImg(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
            {backgroundblogimg && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">New image selected: {backgroundblogimg.name}</p>
                <button
                  type="button"
                  onClick={() => setBackgroundBlogImg(null)}
                  className="text-sm text-red-600 hover:text-red-800 mt-1"
                >
                  Remove selection
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Introduction */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-900">Introduction</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Introduction (English)*</label>
              <textarea
                name="introductionen"
                value={formData.introductionen}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Introduction (Myanmar)*</label>
              <textarea
                name="introductionmy"
                value={formData.introductionmy}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end pt-6 space-x-4">
          <button
            type="button"
            onClick={() => {
              if (existingData) {
                setFormData({
                  titleen: existingData.titleen || '',
                  titlemy: existingData.titlemy || '',
                  abouten: existingData.abouten || '',
                  aboutmy: existingData.aboutmy || '',
                  blogtitleen: existingData.blogtitleen || '',
                  blogtitlemy: existingData.blogtitlemy || '',
                  blogen: existingData.blogen || '',
                  blogmy: existingData.blogmy || '',
                  introductionen: existingData.introductionen || '',
                  introductionmy: existingData.introductionmy || '',
                });
                setBannerBgImage(null);
                setBackgroundBlogImg(null);
              }
            }}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Reset Form
          </button>
          <button
            type="submit"
            disabled={isUpdating}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {isUpdating ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating...
              </span>
            ) : 'Update Banner'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateAboutUsBanner;
