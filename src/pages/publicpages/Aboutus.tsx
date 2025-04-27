import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLanguageStore } from '../../Zustand_Store/languagestore.ts';
interface VisionMission {
  emoji: string;
  title: string;
  text: string;
}

interface AboutData {
  bannerbgPhoto: string;
  header: string;
  description: string;
  storyBlog: string;
  vision: VisionMission;
  mission: VisionMission;
}

interface ApiResponse {
  success: boolean;
  data: AboutData;
}

const AboutUs: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const serverURL = "https://naethitasanv2.onrender.com"
  const {language} = useLanguageStore()
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `https://naethitasanv2.onrender.com/api/pages/aboutbanner?lang=${language}`
        );
        setAboutData(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, [language]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-8">
        <p className="text-red-500 text-lg">Error loading content: {error}</p>
      </div>
    );
  }

  if (!aboutData) {
    return null;
  }
  const bannerImageUrl = `${serverURL}${aboutData.bannerbgPhoto}`;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans text-gray-800">
      {/* Hero Banner */}
      <div 
        className="relative h-96 md:h-[500px] bg-cover bg-center flex items-center justify-center mb-12 md:mb-20 rounded-xl overflow-hidden"
        style={{ 
            backgroundImage: `url('${bannerImageUrl}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
      >
        <div className="absolute inset-0 bg-opacity-50"></div>
        <div className="relative z-10 text-center px-6 py-12  bg-opacity-60 rounded-lg max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {aboutData.header}
          </h1>
          <p className="text-lg md:text-xl text-gray-100">
            {aboutData.description}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-12 md:pb-20">
        {/* Our Story Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 relative pb-2">
            Our Story
            <span className="absolute bottom-0 left-0 w-20 h-1 bg-blue-500"></span>
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line">
              {aboutData.storyBlog}
            </p>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision Card */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
            <div className="text-4xl mb-4">{aboutData.vision.emoji}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {aboutData.vision.title}
            </h3>
            <p className="text-gray-600">{aboutData.vision.text}</p>
          </div>

          {/* Mission Card */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-green-500">
            <div className="text-4xl mb-4">{aboutData.mission.emoji}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {aboutData.mission.title}
            </h3>
            <p className="text-gray-600">{aboutData.mission.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;