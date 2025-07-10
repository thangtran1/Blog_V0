import axios from "axios";

// ====================================================================
// API BASE CONFIGURATION
// ====================================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9000";

// Axios instance configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ====================================================================
// TYPESCRIPT INTERFACES
// ====================================================================

export interface IBackendRes<T> {
  error?: string | string[];
  message: string;
  statusCode: number | string;
  data?: T;
}

export interface IModelPaginate<T> {
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: T[];
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  bio?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  author: IUser | string;
  category: ICategory | string;
  tags: ITag[];
  status: "draft" | "published" | "archived";
  views: number;
  likes: number;
  readTime: number;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface ICategory {
  _id: string;
  name: string;
  image: string;
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ITag {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  postCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface IComment {
  _id: string;
  content: string;
  author: IUser | string;
  post: IPost | string;
  parentId?: string;
  replies?: IComment[];
  likes: number;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface INewsletter {
  _id: string;
  email: string;
  isActive: boolean;
  subscribedAt: string;
}

export interface IContact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface IAnalytics {
  _id: string;
  type: "page_view" | "post_view" | "search" | "download";
  resource: string;
  userId?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

// ====================================================================
// AUTH API SERVICES - Trang đăng nhập/đăng ký
// ====================================================================

export const callRegister = (userData: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => {
  return apiClient.post<IBackendRes<{ user: IUser; access_token: string }>>(
    "/api/v1/auth/register",
    userData
  );
};

export const callLogin = (credentials: { email: string; password: string }) => {
  return apiClient.post<IBackendRes<{ user: IUser; access_token: string }>>(
    "/api/v1/auth/login",
    credentials
  );
};

export const callLogout = () => {
  return apiClient.post<IBackendRes<string>>("/api/v1/auth/logout");
};

export const callRefreshToken = () => {
  return apiClient.get<IBackendRes<{ access_token: string }>>(
    "/api/v1/auth/refresh"
  );
};

export const callForgotPassword = (email: string) => {
  return apiClient.post<IBackendRes<string>>("/api/v1/auth/forgot-password", {
    email,
  });
};

export const callResetPassword = (token: string, password: string) => {
  return apiClient.post<IBackendRes<string>>("/api/v1/auth/reset-password", {
    token,
    password,
  });
};

export const callGetProfile = () => {
  return apiClient.get<IBackendRes<IUser>>("/api/v1/auth/profile");
};

export const callUpdateProfile = (userData: Partial<IUser>) => {
  return apiClient.patch<IBackendRes<IUser>>("/api/v1/auth/profile", userData);
};

// ====================================================================
// POSTS API SERVICES - Trang bài viết, chi tiết bài viết
// ====================================================================

// Lấy danh sách bài viết - Trang "Tất cả bài viết" (/posts)
export const callFetchPosts = (query: string) => {
  return apiClient.get<IBackendRes<IModelPaginate<IPost>>>(
    `/api/v1/posts?${query}`
  );
};

// Lấy bài viết theo ID - Trang chi tiết bài viết (/posts/[id])
export const callFetchPostById = (id: string) => {
  return apiClient.get<IBackendRes<IPost>>(`/api/v1/posts/${id}`);
};

// Lấy bài viết theo slug - Trang chi tiết bài viết (/posts/[slug])
export const callFetchPostBySlug = (slug: string) => {
  return apiClient.get<IBackendRes<IPost>>(`/api/v1/posts/slug/${slug}`);
};

// Lấy bài viết liên quan - Trang chi tiết bài viết
export const callFetchRelatedPosts = (postId: string, limit = 5) => {
  return apiClient.get<IBackendRes<IPost[]>>(
    `/api/v1/posts/${postId}/related?limit=${limit}`
  );
};

// Lấy bài viết nổi bật - Trang chủ (/)
export const callFetchFeaturedPosts = (limit = 6) => {
  return apiClient.get<IBackendRes<IPost[]>>(
    `/api/v1/posts/featured?limit=${limit}`
  );
};

// Lấy bài viết mới nhất - Trang chủ (/)
export const callFetchLatestPosts = (limit = 10) => {
  return apiClient.get<IBackendRes<IPost[]>>(
    `/api/v1/posts/latest?limit=${limit}`
  );
};

// Lấy bài viết trending - Trang chủ (/)
export const callFetchTrendingPosts = (limit = 4) => {
  return apiClient.get<IBackendRes<IPost[]>>(
    `/api/v1/posts/trending?limit=${limit}`
  );
};

// Tìm kiếm bài viết - Trang tìm kiếm (/search)
export const callSearchPosts = (
  query: string,
  filters?: {
    category?: string;
    tags?: string[];
    author?: string;
    dateFrom?: string;
    dateTo?: string;
  }
) => {
  const params = new URLSearchParams({ q: query });
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.append(key, value);
        }
      }
    });
  }
  return apiClient.get<IBackendRes<IModelPaginate<IPost>>>(
    `/api/v1/posts/search?${params.toString()}`
  );
};

// Tăng view count - Trang chi tiết bài viết
export const callIncrementPostView = (postId: string) => {
  return apiClient.patch<IBackendRes<{ views: number }>>(
    `/api/v1/posts/${postId}/view`
  );
};

// Like/Unlike bài viết - Trang chi tiết bài viết
export const callTogglePostLike = (postId: string) => {
  return apiClient.patch<IBackendRes<{ likes: number; isLiked: boolean }>>(
    `/api/v1/posts/${postId}/like`
  );
};

// ====================================================================
// CATEGORIES API SERVICES - Trang danh mục
// ====================================================================

// Lấy tất cả danh mục - Trang danh mục (/categories)
export const callFetchCategories = () => {
  return apiClient.get<IBackendRes<ICategory[]>>("/categories");
};

// Lấy danh mục theo ID - Trang danh mục chi tiết (/categories/[id])
export const callFetchCategoryById = (id: string) => {
  return apiClient.get<IBackendRes<ICategory>>(`/categories/${id}`);
};

// Lấy danh mục theo slug - Trang danh mục chi tiết (/categories/[slug])
export const callFetchCategoryBySlug = (slug: string) => {
  return apiClient.get<IBackendRes<ICategory>>(
    `/api/v1/categories/slug/${slug}`
  );
};

// Lấy bài viết theo danh mục - Trang danh mục chi tiết (/categories/[slug])
export const callFetchPostsByCategory = (categoryId: string, query: string) => {
  return apiClient.get<IBackendRes<IModelPaginate<IPost>>>(
    `/api/v1/categories/${categoryId}/posts?${query}`
  );
};

// Lấy danh mục phổ biến - Sidebar, Footer
export const callFetchPopularCategories = (limit = 10) => {
  return apiClient.get<IBackendRes<ICategory[]>>(
    `/api/v1/categories/popular?limit=${limit}`
  );
};

// ====================================================================
// TAGS API SERVICES - Trang tag, sidebar
// ====================================================================

// Lấy tất cả tags - Sidebar, trang quản lý
export const callFetchTags = (query?: string) => {
  return apiClient.get<IBackendRes<ITag[]>>(
    `/api/v1/tags${query ? `?${query}` : ""}`
  );
};

// Lấy tag theo ID
export const callFetchTagById = (id: string) => {
  return apiClient.get<IBackendRes<ITag>>(`/api/v1/tags/${id}`);
};

// Lấy tag theo slug - Trang tag chi tiết (/tags/[slug])
export const callFetchTagBySlug = (slug: string) => {
  return apiClient.get<IBackendRes<ITag>>(`/api/v1/tags/slug/${slug}`);
};

// Lấy bài viết theo tag - Trang tag chi tiết (/tags/[slug])
export const callFetchPostsByTag = (tagId: string, query: string) => {
  return apiClient.get<IBackendRes<IModelPaginate<IPost>>>(
    `/api/v1/tags/${tagId}/posts?${query}`
  );
};

// Lấy tags phổ biến - Sidebar
export const callFetchPopularTags = (limit = 20) => {
  return apiClient.get<IBackendRes<ITag[]>>(
    `/api/v1/tags/popular?limit=${limit}`
  );
};

// ====================================================================
// COMMENTS API SERVICES - Trang chi tiết bài viết
// ====================================================================

// Lấy comments của bài viết - Trang chi tiết bài viết (/posts/[id])
export const callFetchCommentsByPost = (postId: string, query?: string) => {
  return apiClient.get<IBackendRes<IModelPaginate<IComment>>>(
    `/api/v1/posts/${postId}/comments${query ? `?${query}` : ""}`
  );
};

// Tạo comment mới - Trang chi tiết bài viết
export const callCreateComment = (commentData: {
  content: string;
  postId: string;
  parentId?: string;
}) => {
  return apiClient.post<IBackendRes<IComment>>("/api/v1/comments", commentData);
};

// Cập nhật comment - Trang chi tiết bài viết
export const callUpdateComment = (commentId: string, content: string) => {
  return apiClient.patch<IBackendRes<IComment>>(
    `/api/v1/comments/${commentId}`,
    {
      content,
    }
  );
};

// Xóa comment - Trang chi tiết bài viết
export const callDeleteComment = (commentId: string) => {
  return apiClient.delete<IBackendRes<string>>(`/api/v1/comments/${commentId}`);
};

// Like/Unlike comment - Trang chi tiết bài viết
export const callToggleCommentLike = (commentId: string) => {
  return apiClient.patch<IBackendRes<{ likes: number; isLiked: boolean }>>(
    `/api/v1/comments/${commentId}/like`
  );
};

// ====================================================================
// USERS API SERVICES - Trang tác giả, profile
// ====================================================================

// Lấy thông tin tác giả - Trang về tác giả (/about)
export const callFetchAuthorInfo = () => {
  return apiClient.get<IBackendRes<IUser>>("/api/v1/users/author");
};

// Lấy user theo ID - Trang profile user
export const callFetchUserById = (id: string) => {
  return apiClient.get<IBackendRes<IUser>>(`/api/v1/users/${id}`);
};

// Lấy bài viết của user - Trang profile user
export const callFetchPostsByUser = (userId: string, query: string) => {
  return apiClient.get<IBackendRes<IModelPaginate<IPost>>>(
    `/api/v1/users/${userId}/posts?${query}`
  );
};

// Cập nhật avatar - Trang profile
export const callUpdateAvatar = (formData: FormData) => {
  return apiClient.patch<IBackendRes<{ avatar: string }>>(
    "/api/v1/users/avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// ====================================================================
// NEWSLETTER API SERVICES - Footer, popup
// ====================================================================

// Đăng ký newsletter - Footer, popup
export const callSubscribeNewsletter = (email: string) => {
  return apiClient.post<IBackendRes<INewsletter>>(
    "/api/v1/newsletter/subscribe",
    {
      email,
    }
  );
};

// Hủy đăng ký newsletter - Email unsubscribe link
export const callUnsubscribeNewsletter = (email: string, token?: string) => {
  return apiClient.post<IBackendRes<string>>("/api/v1/newsletter/unsubscribe", {
    email,
    token,
  });
};

// Xác nhận đăng ký newsletter - Email confirmation
export const callConfirmNewsletter = (token: string) => {
  return apiClient.get<IBackendRes<string>>(
    `/api/v1/newsletter/confirm/${token}`
  );
};

// ====================================================================
// CONTACT API SERVICES - Trang liên hệ
// ====================================================================

// Gửi liên hệ - Trang liên hệ (/contact)
export const callSendContact = (contactData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  return apiClient.post<IBackendRes<IContact>>("/api/v1/contact", contactData);
};

// ====================================================================
// ANALYTICS API SERVICES - Tracking, thống kê
// ====================================================================

// Track page view - Mọi trang
export const callTrackPageView = (
  page: string,
  metadata?: Record<string, any>
) => {
  return apiClient.post<IBackendRes<string>>("/api/v1/analytics/track", {
    type: "page_view",
    resource: page,
    metadata,
  });
};

// Track post view - Trang chi tiết bài viết
export const callTrackPostView = (
  postId: string,
  metadata?: Record<string, any>
) => {
  return apiClient.post<IBackendRes<string>>("/api/v1/analytics/track", {
    type: "post_view",
    resource: postId,
    metadata,
  });
};

// Track search - Trang tìm kiếm
export const callTrackSearch = (query: string, results: number) => {
  return apiClient.post<IBackendRes<string>>("/api/v1/analytics/track", {
    type: "search",
    resource: query,
    metadata: { results },
  });
};

// Lấy thống kê tổng quan - Dashboard (nếu có)
export const callFetchAnalytics = (query?: string) => {
  return apiClient.get<
    IBackendRes<{
      totalViews: number;
      totalPosts: number;
      totalComments: number;
      totalSubscribers: number;
      popularPosts: IPost[];
      recentActivity: IAnalytics[];
    }>
  >(`/api/v1/analytics${query ? `?${query}` : ""}`);
};

// ====================================================================
// MEDIA/UPLOAD API SERVICES - Upload ảnh, file
// ====================================================================

// Upload single file - Editor, profile
export const callUploadFile = (file: File, folder = "general") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  return apiClient.post<
    IBackendRes<{
      url: string;
      filename: string;
      size: number;
      mimetype: string;
    }>
  >("/api/v1/upload/single", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Upload multiple files - Gallery, attachments
export const callUploadMultipleFiles = (files: File[], folder = "general") => {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  formData.append("folder", folder);

  return apiClient.post<
    IBackendRes<
      Array<{
        url: string;
        filename: string;
        size: number;
        mimetype: string;
      }>
    >
  >("/api/v1/upload/multiple", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Delete file - Cleanup
export const callDeleteFile = (filename: string) => {
  return apiClient.delete<IBackendRes<string>>(`/api/v1/upload/${filename}`);
};

// ====================================================================
// SITEMAP & SEO API SERVICES - SEO, robots.txt
// ====================================================================

// Lấy sitemap - /sitemap.xml
export const callFetchSitemap = () => {
  return apiClient.get<string>("/api/v1/sitemap");
};

// Lấy robots.txt - /robots.txt
export const callFetchRobots = () => {
  return apiClient.get<string>("/api/v1/robots");
};

// Lấy RSS feed - /rss.xml
export const callFetchRSSFeed = () => {
  return apiClient.get<string>("/api/v1/rss");
};

// ====================================================================
// ADMIN API SERVICES - Trang quản trị (nếu có)
// ====================================================================

// Tạo bài viết mới - Admin panel
export const callCreatePost = (postData: Partial<IPost>) => {
  return apiClient.post<IBackendRes<IPost>>("/api/v1/admin/posts", postData);
};

// Cập nhật bài viết - Admin panel
export const callUpdatePost = (postId: string, postData: Partial<IPost>) => {
  return apiClient.patch<IBackendRes<IPost>>(
    `/api/v1/admin/posts/${postId}`,
    postData
  );
};

// Xóa bài viết - Admin panel
export const callDeletePost = (postId: string) => {
  return apiClient.delete<IBackendRes<string>>(`/api/v1/admin/posts/${postId}`);
};

// Tạo danh mục mới - Admin panel
export const callCreateCategory = (categoryData: Partial<ICategory>) => {
  return apiClient.post<IBackendRes<ICategory>>(
    "/api/v1/admin/categories",
    categoryData
  );
};

// Cập nhật danh mục - Admin panel
export const callUpdateCategory = (
  categoryId: string,
  categoryData: Partial<ICategory>
) => {
  return apiClient.patch<IBackendRes<ICategory>>(
    `/api/v1/admin/categories/${categoryId}`,
    categoryData
  );
};

// Xóa danh mục - Admin panel
export const callDeleteCategory = (categoryId: string) => {
  return apiClient.delete<IBackendRes<string>>(
    `/api/v1/admin/categories/${categoryId}`
  );
};

// Quản lý comments - Admin panel
export const callFetchAllComments = (query: string) => {
  return apiClient.get<IBackendRes<IModelPaginate<IComment>>>(
    `/api/v1/admin/comments?${query}`
  );
};

// Duyệt comment - Admin panel
export const callApproveComment = (commentId: string) => {
  return apiClient.patch<IBackendRes<IComment>>(
    `/api/v1/admin/comments/${commentId}/approve`
  );
};

// Từ chối comment - Admin panel
export const callRejectComment = (commentId: string) => {
  return apiClient.patch<IBackendRes<IComment>>(
    `/api/v1/admin/comments/${commentId}/reject`
  );
};

// Quản lý newsletter subscribers - Admin panel
export const callFetchNewsletterSubscribers = (query: string) => {
  return apiClient.get<IBackendRes<IModelPaginate<INewsletter>>>(
    `/api/v1/admin/newsletter?${query}`
  );
};

// Gửi newsletter - Admin panel
export const callSendNewsletter = (newsletterData: {
  subject: string;
  content: string;
  recipients?: string[];
}) => {
  return apiClient.post<IBackendRes<string>>(
    "/api/v1/admin/newsletter/send",
    newsletterData
  );
};

// ====================================================================
// EXPORT ALL API FUNCTIONS
// ====================================================================

export const API = {
  // Auth
  auth: {
    register: callRegister,
    login: callLogin,
    logout: callLogout,
    refreshToken: callRefreshToken,
    forgotPassword: callForgotPassword,
    resetPassword: callResetPassword,
    getProfile: callGetProfile,
    updateProfile: callUpdateProfile,
  },

  // Posts
  posts: {
    fetchPosts: callFetchPosts,
    fetchPostById: callFetchPostById,
    fetchPostBySlug: callFetchPostBySlug,
    fetchRelatedPosts: callFetchRelatedPosts,
    fetchFeaturedPosts: callFetchFeaturedPosts,
    fetchLatestPosts: callFetchLatestPosts,
    fetchTrendingPosts: callFetchTrendingPosts,
    searchPosts: callSearchPosts,
    incrementView: callIncrementPostView,
    toggleLike: callTogglePostLike,
  },

  // Categories
  categories: {
    fetchCategories: callFetchCategories,
    fetchCategoryById: callFetchCategoryById,
    fetchCategoryBySlug: callFetchCategoryBySlug,
    fetchPostsByCategory: callFetchPostsByCategory,
    fetchPopularCategories: callFetchPopularCategories,
  },

  // Tags
  tags: {
    fetchTags: callFetchTags,
    fetchTagById: callFetchTagById,
    fetchTagBySlug: callFetchTagBySlug,
    fetchPostsByTag: callFetchPostsByTag,
    fetchPopularTags: callFetchPopularTags,
  },

  // Comments
  comments: {
    fetchCommentsByPost: callFetchCommentsByPost,
    createComment: callCreateComment,
    updateComment: callUpdateComment,
    deleteComment: callDeleteComment,
    toggleLike: callToggleCommentLike,
  },

  // Users
  users: {
    fetchAuthorInfo: callFetchAuthorInfo,
    fetchUserById: callFetchUserById,
    fetchPostsByUser: callFetchPostsByUser,
    updateAvatar: callUpdateAvatar,
  },

  // Newsletter
  newsletter: {
    subscribe: callSubscribeNewsletter,
    unsubscribe: callUnsubscribeNewsletter,
    confirm: callConfirmNewsletter,
  },

  // Contact
  contact: {
    send: callSendContact,
  },

  // Analytics
  analytics: {
    trackPageView: callTrackPageView,
    trackPostView: callTrackPostView,
    trackSearch: callTrackSearch,
    fetchAnalytics: callFetchAnalytics,
  },

  // Media
  media: {
    uploadFile: callUploadFile,
    uploadMultipleFiles: callUploadMultipleFiles,
    deleteFile: callDeleteFile,
  },

  // SEO
  seo: {
    fetchSitemap: callFetchSitemap,
    fetchRobots: callFetchRobots,
    fetchRSSFeed: callFetchRSSFeed,
  },

  // Admin
  admin: {
    posts: {
      create: callCreatePost,
      update: callUpdatePost,
      delete: callDeletePost,
    },
    categories: {
      create: callCreateCategory,
      update: callUpdateCategory,
      delete: callDeleteCategory,
    },
    comments: {
      fetchAll: callFetchAllComments,
      approve: callApproveComment,
      reject: callRejectComment,
    },
    newsletter: {
      fetchSubscribers: callFetchNewsletterSubscribers,
      send: callSendNewsletter,
    },
  },
};

export default API;
