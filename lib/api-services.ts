import axios from "axios";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log("🚀 ~ NEXT_PUBLIC_API_URL TEST:", NEXT_PUBLIC_API_URL);
// Axios instance configuration
const apiClient = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
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

export interface IPost {
  _id: string;
  title: string;
  status: string;
  introduction: string;
  content: string;
  category: ICategory;
  readingTime: number;
  image: string;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ISubCategory {
  _id: string;
  title: string;
  category: string | ICategory;
}

export interface ICategory {
  _id: string;
  name: string;
  isActive: boolean;
  image: string;
  description: string;
  content: string;
  slug?: string;
  posts?: ISubCategory[];
  totalPost: number;
  createdAt: string;
  updatedAt: string;
}

export interface IAllPost {
  _id: string;
  title: string;
  image?: string;
  status: string;
  introduction: string;
  content?: string;
  readingTime: number;
  category: ICategory;
  createdAt: string;
  updatedAt: string;
  isFeatured?: boolean;
}

export interface IPostByCategory {
  _id: string;
  title: string;
  status: string;
  introduction?: string;
  content?: string;
  image?: string;
  category: ICategory;
  readingTime?: number;
  createdAt: string;
  updatedAt?: string;
  __v?: number;
}

export interface IAboutMe {
  _id?: string;
  title: string;
  content: string;
  location: string;
  yearsOfExperience: number;
  favorites: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISkillMe {
  _id: string;
  title: string;
  image: string;
  level: string;
  specialties: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ILifesMe {
  _id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
export interface IExpensiveMe {
  _id: string;
  title: string;
  subTitle: string;
  time: string;
  content: string;
  skills: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IConnectMe {
  _id: string;
  title: string;
  link: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICV {
  _id: string;
  fileName: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// ====================================================================
// USERS API SERVICES - Trang tác giả, profile
// ====================================================================

// API ABOUT ME

export const callFetchAboutAuthor = () => {
  return apiClient.get<IAboutMe>(`/about-me`);
};
export const callDeleteAboutAuthor = () => {
  return apiClient.delete<string>(`/about-me`);
};
export const callCreateAboutAuthor = (aboutMeData: Partial<IAboutMe>) => {
  return apiClient.post<IAboutMe>("/about-me", aboutMeData);
};
export const callUpdateAboutAuthor = (aboutMeData: Partial<IAboutMe>) => {
  return apiClient.patch<IAboutMe>(`/about-me`, aboutMeData);
};

// API SKILLS

export const callFetchSkillsAuthor = () => {
  return apiClient.get<ISkillMe[]>(`/skills`);
};
export const callUpdateSkill = (skill: ISkillMe) => {
  return apiClient.put<ISkillMe>(`/skills/${skill._id}`, skill);
};
export const callCreateSkill = (data: ISkillMe) => {
  return apiClient.post("/skills", data);
};
export const callDeleteSkill = (id: string) => {
  return apiClient.delete(`/skills/${id}`);
};

// API LIFE

export const callFetchLifeAuthor = () => {
  return apiClient.get<ILifesMe[]>(`/life`);
};
export const callCreateLife = (data: ILifesMe) => {
  return apiClient.post("/life", data);
};
export const callUpdateLife = (id: string, data: Partial<ILifesMe>) => {
  return apiClient.put<ILifesMe>(`/life/${id}`, data);
};
export const callDeleteLife = (id: string) => {
  return apiClient.delete(`/life/${id}`);
};
export const callDeleteCategory = (id: string) => {
  return apiClient.delete(`/categories/${id}`);
};
export const callUpdateCategories = (id: string, data: Partial<ICategory>) => {
  return apiClient.patch<ICategory>(`/categories/${id}`, data);
};

export const callCreateCategories = (categoryData: Partial<ICategory>) => {
  return apiClient.post<ICategory>("/categories", categoryData);
};

export const callFetchPostAuthor = () => {
  return apiClient.get<IAllPost[]>(`/posts`);
};

export const callCreatePost = (categoryData: Partial<IPostByCategory>) => {
  return apiClient.post<ICategory>("/posts", categoryData);
};

export const callUpdatePosts = (id: string, data: Partial<IAllPost>) => {
  return apiClient.put<ICategory>(`/posts/${id}`, data);
};

export const callFetchPostBySlugCategory = (slug: string) => {
  return apiClient.get<IPostByCategory[]>(`/posts/by-category/${slug}`);
};

export const callFetchPostById = (id: string) => {
  return apiClient.get<IPost>(`/posts/${id}`);
};

export const callFetchRecentPosts = (limit = 5) => {
  return apiClient.get<IPost[]>(`/posts/recent?limit=${limit}`);
};

// API EXPENSIVE

export const callUpdateExpensive = (
  id: string,
  data: Partial<IExpensiveMe>
) => {
  return apiClient.put<IExpensiveMe>(`/expensive/${id}`, data);
};
export const callDeleteExpensive = (id: string) => {
  return apiClient.delete(`/expensive/${id}`);
};
export const callCreateExpensive = (data: Partial<IExpensiveMe>) => {
  return apiClient.post<IExpensiveMe>("/expensive", data);
};
export const callFetchExpensiveAuthor = () => {
  return apiClient.get<IExpensiveMe[]>(`/expensive`);
};

// API CONNECT

export const callFetchConnectAuthor = () => {
  return apiClient.get<IConnectMe[]>(`/connect`);
};
export const callCreateConnect = (data: Partial<IConnectMe>) => {
  return apiClient.post<IConnectMe>("/connect", data);
};
export const callUpdateConnect = (id: string, data: Partial<IConnectMe>) => {
  return apiClient.put<IConnectMe>(`/connect/${id}`, data);
};
export const callDeleteConnect = (id: string) => {
  return apiClient.delete(`/connect/${id}`);
};

// Lấy tất cả danh mục - Trang danh mục (/categories)
export const callFetchCategories = () => {
  return apiClient.get<ICategory[]>("/categories");
};

// Lấy danh mục theo ID - Trang danh mục chi tiết (/categories/[id])
export const callFetchCategoryById = (id: string) => {
  return apiClient.get<ICategory>(`/categories/${id}`);
};

export const callDeletePost = (postId: string) => {
  return apiClient.delete<string>(`/posts/${postId}`);
};

// CV

export const callFetchCV = () => {
  return apiClient.get<ICV | null>(`/cv`);
};
export const callDeleteCV = (id: string) => {
  return apiClient.delete<void>(`/cv/${id}`);
};
export const callUploadCV = (formData: FormData) => {
  return apiClient.post<ICV>("/cv", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
