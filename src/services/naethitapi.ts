import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// Types
interface BlogPost {
  id: string;
  titleen: string;
  titlemy: string;
  descriptionen: string;
  descriptionmy: string;
  blogen: string;
  blogmy: string;
  postdate: string;
  timelength: string;
  catagory: string;
  imageUrl?: string;
}

interface AboutUsBanner {
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
  blogimg?: string;
}

// API Slice
export const adminApiSlice = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://naethitasanv2.onrender.com/api/pages',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('admintoken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['BlogPost', 'AboutUsBanner'],
  endpoints: (builder) => ({
    // Blog Endpoints POST
    createBlogPost: builder.mutation<BlogPost, FormData>({
      query: (formData) => ({
        url: '/blog',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['BlogPost'],
    }),
    
updateBlogPost: builder.mutation<BlogPost, { id: any; data: FormData }>({
  query: ({ id, data }) => ({
    url: `/blog/${id}`,
    method: 'PUT',
    body: data,
  }),
  invalidatesTags: ['BlogPost'],
}),
    // About Us Banner Endpoint
    updateAboutUsBanner: builder.mutation<AboutUsBanner, FormData>({
      query: (formData) => ({
        url: '/aboutbanner',
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['AboutUsBanner'],
    }),
  }),
});

// Export hooks for usage in components
export const { 
  useCreateBlogPostMutation,
  useUpdateBlogPostMutation,
  useUpdateAboutUsBannerMutation 
} = adminApiSlice;