// ====================================================================
// API CONSTANTS - Các hằng số cho API
// ====================================================================

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER: "/api/v1/auth/register",
    LOGIN: "/api/v1/auth/login",
    LOGOUT: "/api/v1/auth/logout",
    REFRESH: "/api/v1/auth/refresh",
    PROFILE: "/api/v1/auth/profile",
    FORGOT_PASSWORD: "/api/v1/auth/forgot-password",
    RESET_PASSWORD: "/api/v1/auth/reset-password",
  },

  // Posts endpoints
  POSTS: {
    BASE: "/api/v1/posts",
    FEATURED: "/api/v1/posts/featured",
    LATEST: "/api/v1/posts/latest",
    TRENDING: "/api/v1/posts/trending",
    SEARCH: "/api/v1/posts/search",
    BY_SLUG: (slug: string) => `/api/v1/posts/slug/${slug}`,
    BY_ID: (id: string) => `/api/v1/posts/${id}`,
    RELATED: (id: string) => `/api/v1/posts/${id}/related`,
    VIEW: (id: string) => `/api/v1/posts/${id}/view`,
    LIKE: (id: string) => `/api/v1/posts/${id}/like`,
  },

  // Categories endpoints
  CATEGORIES: {
    BASE: "/api/v1/categories",
    POPULAR: "/api/v1/categories/popular",
    BY_SLUG: (slug: string) => `/api/v1/categories/slug/${slug}`,
    BY_ID: (id: string) => `/api/v1/categories/${id}`,
    POSTS: (id: string) => `/api/v1/categories/${id}/posts`,
  },

  // Tags endpoints
  TAGS: {
    BASE: "/api/v1/tags",
    POPULAR: "/api/v1/tags/popular",
    BY_SLUG: (slug: string) => `/api/v1/tags/slug/${slug}`,
    BY_ID: (id: string) => `/api/v1/tags/${id}`,
    POSTS: (id: string) => `/api/v1/tags/${id}/posts`,
  },

  // Comments endpoints
  COMMENTS: {
    BASE: "/api/v1/comments",
    BY_POST: (postId: string) => `/api/v1/posts/${postId}/comments`,
    BY_ID: (id: string) => `/api/v1/comments/${id}`,
    LIKE: (id: string) => `/api/v1/comments/${id}/like`,
  },

  // Users endpoints
  USERS: {
    BASE: "/api/v1/users",
    AUTHOR: "/api/v1/users/author",
    BY_ID: (id: string) => `/api/v1/users/${id}`,
    POSTS: (id: string) => `/api/v1/users/${id}/posts`,
    AVATAR: "/api/v1/users/avatar",
  },

  // Newsletter endpoints
  NEWSLETTER: {
    SUBSCRIBE: "/api/v1/newsletter/subscribe",
    UNSUBSCRIBE: "/api/v1/newsletter/unsubscribe",
    CONFIRM: (token: string) => `/api/v1/newsletter/confirm/${token}`,
  },

  // Contact endpoint
  CONTACT: "/api/v1/contact",

  // Analytics endpoints
  ANALYTICS: {
    BASE: "/api/v1/analytics",
    TRACK: "/api/v1/analytics/track",
  },

  // Upload endpoints
  UPLOAD: {
    SINGLE: "/api/v1/upload/single",
    MULTIPLE: "/api/v1/upload/multiple",
    DELETE: (filename: string) => `/api/v1/upload/${filename}`,
  },

  // SEO endpoints
  SEO: {
    SITEMAP: "/api/v1/sitemap",
    ROBOTS: "/api/v1/robots",
    RSS: "/api/v1/rss",
  },

  // Admin endpoints
  ADMIN: {
    POSTS: "/api/v1/admin/posts",
    CATEGORIES: "/api/v1/admin/categories",
    COMMENTS: "/api/v1/admin/comments",
    NEWSLETTER: "/api/v1/admin/newsletter",
  },
} as const

export const QUERY_KEYS = {
  POSTS: "posts",
  CATEGORIES: "categories",
  TAGS: "tags",
  COMMENTS: "comments",
  USERS: "users",
  NEWSLETTER: "newsletter",
  ANALYTICS: "analytics",
} as const

export const CACHE_TIMES = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 15 * 60 * 1000, // 15 minutes
  LONG: 30 * 60 * 1000, // 30 minutes
  VERY_LONG: 60 * 60 * 1000, // 1 hour
} as const
