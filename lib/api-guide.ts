"use client"

import type React from "react"

/**
 * ====================================================================
 * TỔNG HỢP HƯỚNG DẪN CALL API TỪ FRONTEND
 * ====================================================================
 *
 * File này bao gồm tất cả các cách thức call API từ Frontend:
 * - Fetch API (Native JavaScript)
 * - Axios Library
 * - React Query/TanStack Query
 * - SWR
 * - Next.js API Routes
 * - Error Handling
 * - Authentication
 * - Best Practices
 */

// ====================================================================
// 1. FETCH API - NATIVE JAVASCRIPT
// ====================================================================

/**
 * Basic Fetch API Usage
 */
export class FetchAPI {
  private baseURL: string
  private defaultHeaders: HeadersInit

  constructor(baseURL = "https://api.example.com") {
    this.baseURL = baseURL
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  }

  // GET Request
  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "GET",
        headers: { ...this.defaultHeaders, ...options?.headers },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("GET request failed:", error)
      throw error
    }
  }

  // POST Request
  async post<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "POST",
        headers: { ...this.defaultHeaders, ...options?.headers },
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("POST request failed:", error)
      throw error
    }
  }

  // PUT Request
  async put<T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "PUT",
        headers: { ...this.defaultHeaders, ...options?.headers },
        body: data ? JSON.stringify(data) : undefined,
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("PUT request failed:", error)
      throw error
    }
  }

  // DELETE Request
  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "DELETE",
        headers: { ...this.defaultHeaders, ...options?.headers },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("DELETE request failed:", error)
      throw error
    }
  }

  // Upload File
  async uploadFile<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<T> {
    try {
      const formData = new FormData()
      formData.append("file", file)

      if (additionalData) {
        Object.keys(additionalData).forEach((key) => {
          formData.append(key, additionalData[key])
        })
      }

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: "POST",
        body: formData,
        // Don't set Content-Type header for FormData
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("File upload failed:", error)
      throw error
    }
  }
}

// ====================================================================
// 2. AXIOS LIBRARY
// ====================================================================

/**
 * Axios Configuration và Usage
 */
import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios"

export class AxiosAPI {
  private instance: AxiosInstance

  constructor(baseURL = "https://api.example.com") {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })

    // Request Interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem("authToken")
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        console.log("Request sent:", config)
        return config
      },
      (error) => {
        console.error("Request error:", error)
        return Promise.reject(error)
      },
    )

    // Response Interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log("Response received:", response)
        return response
      },
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem("authToken")
          window.location.href = "/login"
        }

        console.error("Response error:", error)
        return Promise.reject(error)
      },
    )
  }

  // GET Request
  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.get<T>(endpoint, config)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // POST Request
  async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.post<T>(endpoint, data, config)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // PUT Request
  async put<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.put<T>(endpoint, data, config)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // DELETE Request
  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.instance.delete<T>(endpoint, config)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Upload with Progress
  async uploadWithProgress<T>(endpoint: string, file: File, onProgress?: (progress: number) => void): Promise<T> {
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await this.instance.post<T>(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            onProgress?.(progress)
          }
        },
      })

      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Error Handler
  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message
      return new Error(message)
    }
    return error
  }
}

// ====================================================================
// 3. REACT QUERY / TANSTACK QUERY
// ====================================================================

/**
 * React Query Hooks và Configuration
 */
import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query"
import { useState, useEffect } from "react"

// Query Client Configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 3,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
})

// API Service for React Query
export class ReactQueryAPI {
  private api: AxiosAPI

  constructor() {
    this.api = new AxiosAPI()
  }

  // Custom Hooks for GET requests
  useGetPosts() {
    return useQuery({
      queryKey: ["posts"],
      queryFn: () => this.api.get<Post[]>("/posts"),
      staleTime: 5 * 60 * 1000,
    })
  }

  useGetPost(id: string) {
    const [postId, setPostId] = useState(id)
    const { data, isLoading, error } = useQuery({
      queryKey: ["posts", postId],
      queryFn: () => this.api.get<Post>(`/posts/${postId}`),
      enabled: !!postId, // Only run if id exists
    })

    useEffect(() => {
      setPostId(id)
    }, [id])

    return { data, isLoading, error }
  }

  useGetCategories() {
    return useQuery({
      queryKey: ["categories"],
      queryFn: () => this.api.get<Category[]>("/categories"),
    })
  }

  // Custom Hooks for Mutations
  useCreatePost() {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (newPost: CreatePostData) => this.api.post<Post>("/posts", newPost),
      onSuccess: (data) => {
        // Invalidate and refetch posts
        queryClient.invalidateQueries({ queryKey: ["posts"] })

        // Optionally add the new post to the cache
        queryClient.setQueryData(["posts", data.id], data)
      },
      onError: (error) => {
        console.error("Failed to create post:", error)
      },
    })
  }

  useUpdatePost() {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: UpdatePostData }) => this.api.put<Post>(`/posts/${id}`, data),
      onSuccess: (data, variables) => {
        // Update the specific post in cache
        queryClient.setQueryData(["posts", variables.id], data)

        // Invalidate posts list
        queryClient.invalidateQueries({ queryKey: ["posts"] })
      },
    })
  }

  useDeletePost() {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: (id: string) => this.api.delete(`/posts/${id}`),
      onSuccess: (_, deletedId) => {
        // Remove from cache
        queryClient.removeQueries({ queryKey: ["posts", deletedId] })

        // Invalidate posts list
        queryClient.invalidateQueries({ queryKey: ["posts"] })
      },
    })
  }

  // Infinite Query for Pagination
  useGetPostsInfinite() {
    return useQuery({
      queryKey: ["posts", "infinite"],
      queryFn: ({ pageParam = 1 }) => this.api.get<PaginatedResponse<Post>>(`/posts?page=${pageParam}&limit=10`),
      getNextPageParam: (lastPage) => {
        return lastPage.hasNextPage ? lastPage.page + 1 : undefined
      },
      initialPageParam: 1,
    })
  }
}

// ====================================================================
// 4. SWR (Stale-While-Revalidate)
// ====================================================================

/**
 * SWR Hooks và Configuration
 */
import useSWR, { SWRConfig, mutate } from "swr"

// SWR Fetcher function
const fetcher = async (url: string) => {
  const api = new AxiosAPI()
  return api.get(url)
}

// SWR Configuration
export const SWRProvider = ({ children }: { children: React.ReactNode }) => (
  <SWRConfig
    value={{
      fetcher,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 0,
      dedupingInterval: 2000,
      errorRetryCount: 3,
      onError: (error) => {
        console.error("SWR Error:", error)
      },
    }}
  >
    {children}
  </SWRConfig>
)

// Custom SWR Hooks
export class SWRAPI {
  // GET Hooks
  static useGetPosts() {
    const { data, error, isLoading, mutate } = useSWR<Post[]>("/posts")

    return {
      posts: data,
      isLoading,
      isError: error,
      refresh: mutate,
    }
  }

  static useGetPost(id: string) {
    const { data, error, isLoading } = useSWR<Post>(
      id, // Conditional fetching
    )

    return {
      post: data,
      isLoading,
      isError: error,
    }
  }

  // Mutation with SWR
  static async createPost(newPost: CreatePostData) {
    const api = new AxiosAPI()

    try {
      const createdPost = await api.post<Post>("/posts", newPost)

      // Mutate the posts list to include the new post
      mutate("/posts", (currentPosts: Post[] = []) => [...currentPosts, createdPost], false)

      return createdPost
    } catch (error) {
      throw error
    }
  }

  static async updatePost(id: string, updateData: UpdatePostData) {
    const api = new AxiosAPI()

    try {
      const updatedPost = await api.put<Post>(`/posts/${id}`, updateData)

      // Update both the individual post and the posts list
      mutate(`/posts/${id}`, updatedPost, false)
      mutate(
        "/posts",
        (currentPosts: Post[] = []) => currentPosts.map((post) => (post.id === id ? updatedPost : post)),
        false,
      )

      return updatedPost
    } catch (error) {
      throw error
    }
  }

  static async deletePost(id: string) {
    const api = new AxiosAPI()

    try {
      await api.delete(`/posts/${id}`)

      // Remove from cache
      mutate(`/posts/${id}`, undefined, false)
      mutate("/posts", (currentPosts: Post[] = []) => currentPosts.filter((post) => post.id !== id), false)
    } catch (error) {
      throw error
    }
  }
}

// ====================================================================
// 5. NEXT.JS API ROUTES
// ====================================================================

/**
 * Next.js API Routes và Client-side calling
 */
export class NextJSAPI {
  private baseURL: string

  constructor() {
    this.baseURL = process.env.NODE_ENV === "production" ? "https://yourdomain.com" : "http://localhost:3000"
  }

  // Call Next.js API Route
  async callAPIRoute<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.baseURL}/api${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
        },
        ...options,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API Route call failed:", error)
      throw error
    }
  }

  // Server Actions (Next.js 13+ App Router)
  async callServerAction<T>(action: (formData: FormData) => Promise<T>, formData: FormData): Promise<T> {
    try {
      return await action(formData)
    } catch (error) {
      console.error("Server Action failed:", error)
      throw error
    }
  }
}

// ====================================================================
// 6. ERROR HANDLING
// ====================================================================

/**
 * Comprehensive Error Handling
 */
export class APIError extends Error {
  public status: number
  public code: string
  public details?: any

  constructor(message: string, status = 500, code = "UNKNOWN_ERROR", details?: any) {
    super(message)
    this.name = "APIError"
    this.status = status
    this.code = code
    this.details = details
  }
}

export class ErrorHandler {
  static handle(error: any): APIError {
    // Axios Error
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500
      const message = error.response?.data?.message || error.message
      const code = error.response?.data?.code || "AXIOS_ERROR"
      return new APIError(message, status, code, error.response?.data)
    }

    // Fetch Error
    if (error instanceof TypeError && error.message.includes("fetch")) {
      return new APIError("Network error occurred", 0, "NETWORK_ERROR")
    }

    // Custom API Error
    if (error instanceof APIError) {
      return error
    }

    // Generic Error
    return new APIError(error.message || "An unknown error occurred", 500, "UNKNOWN_ERROR")
  }

  static async handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new APIError(
        errorData.message || `HTTP error! status: ${response.status}`,
        response.status,
        errorData.code || "HTTP_ERROR",
        errorData,
      )
    }
    return response.json()
  }
}

// ====================================================================
// 7. AUTHENTICATION
// ====================================================================

/**
 * Authentication Helper
 */
export class AuthAPI {
  private api: AxiosAPI
  private tokenKey = "authToken"
  private refreshTokenKey = "refreshToken"

  constructor() {
    this.api = new AxiosAPI()
  }

  // Login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.api.post<AuthResponse>("/auth/login", credentials)

      // Store tokens
      localStorage.setItem(this.tokenKey, response.accessToken)
      if (response.refreshToken) {
        localStorage.setItem(this.refreshTokenKey, response.refreshToken)
      }

      return response
    } catch (error) {
      throw ErrorHandler.handle(error)
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await this.api.post("/auth/logout")
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      // Always clear local storage
      localStorage.removeItem(this.tokenKey)
      localStorage.removeItem(this.refreshTokenKey)
    }
  }

  // Refresh Token
  async refreshToken(): Promise<string> {
    try {
      const refreshToken = localStorage.getItem(this.refreshTokenKey)
      if (!refreshToken) {
        throw new Error("No refresh token available")
      }

      const response = await this.api.post<{ accessToken: string }>("/auth/refresh", {
        refreshToken,
      })

      localStorage.setItem(this.tokenKey, response.accessToken)
      return response.accessToken
    } catch (error) {
      // If refresh fails, logout user
      this.logout()
      throw ErrorHandler.handle(error)
    }
  }

  // Get current token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken()
  }
}

// ====================================================================
// 8. TYPES & INTERFACES
// ====================================================================

/**
 * TypeScript Interfaces
 */
export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  category: string
  tags: string[]
  createdAt: string
  updatedAt: string
  published: boolean
}

export interface CreatePostData {
  title: string
  content: string
  excerpt: string
  category: string
  tags: string[]
  published?: boolean
}

export interface UpdatePostData extends Partial<CreatePostData> {}

export interface Category {
  id: string
  name: string
  description: string
  slug: string
  postCount: number
}

export interface PaginatedResponse<T> {
  data: T[]
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken?: string
  user: {
    id: string
    email: string
    name: string
    role: string
  }
}

// ====================================================================
// 9. USAGE EXAMPLES
// ====================================================================

/**
 * Usage Examples trong React Components
 */

// Example 1: Using Fetch API
export const FetchExample = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const api = new FetchAPI()
        const data = await api.get<Post[]>("/posts")
        setPosts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}

// Example 2: Using React Query
export const ReactQueryExample = () => {
  const api = new ReactQueryAPI()
  const { data: posts, isLoading, error } = api.useGetPosts()
  const createPostMutation = api.useCreatePost()

  const handleCreatePost = async (postData: CreatePostData) => {
    try {
      await createPostMutation.mutateAsync(postData)
      alert("Post created successfully!")
    } catch (error) {
      alert("Failed to create post")
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <button
        onClick={() =>
          handleCreatePost({
            title: "New Post",
            content: "Post content",
            excerpt: "Post excerpt",
            category: "tech",
            tags: ["react", "api"],
          })
        }
        disabled={createPostMutation.isPending}
      >
        {createPostMutation.isPending ? "Creating..." : "Create Post"}
      </button>

      {posts?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}

// Example 3: Using SWR
export const SWRExample = () => {
  const { posts, isLoading, isError, refresh } = SWRAPI.useGetPosts()

  const handleCreatePost = async () => {
    try {
      await SWRAPI.createPost({
        title: "New Post",
        content: "Post content",
        excerpt: "Post excerpt",
        category: "tech",
        tags: ["swr", "api"],
      })
      refresh() // Refresh the data
    } catch (error) {
      alert("Failed to create post")
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error occurred</div>

  return (
    <div>
      <button onClick={handleCreatePost}>Create Post</button>
      {posts?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}

// ====================================================================
// 10. BEST PRACTICES
// ====================================================================

/**
 * BEST PRACTICES SUMMARY:
 *
 * 1. ERROR HANDLING:
 *    - Always wrap API calls in try-catch
 *    - Use consistent error handling across the app
 *    - Provide meaningful error messages to users
 *
 * 2. LOADING STATES:
 *    - Show loading indicators during API calls
 *    - Disable buttons during mutations to prevent double-submission
 *    - Use skeleton screens for better UX
 *
 * 3. CACHING:
 *    - Use React Query or SWR for automatic caching
 *    - Implement proper cache invalidation strategies
 *    - Consider stale-while-revalidate patterns
 *
 * 4. AUTHENTICATION:
 *    - Store tokens securely (consider httpOnly cookies for sensitive apps)
 *    - Implement automatic token refresh
 *    - Handle 401 errors gracefully
 *
 * 5. PERFORMANCE:
 *    - Implement request deduplication
 *    - Use pagination for large datasets
 *    - Consider implementing infinite scrolling
 *
 * 6. TYPESCRIPT:
 *    - Define proper interfaces for all API responses
 *    - Use generic types for reusable API functions
 *    - Leverage TypeScript for better developer experience
 *
 * 7. TESTING:
 *    - Mock API calls in tests
 *    - Test error scenarios
 *    - Use MSW (Mock Service Worker) for integration tests
 *
 * 8. SECURITY:
 *    - Validate and sanitize all user inputs
 *    - Use HTTPS in production
 *    - Implement proper CORS policies
 *    - Never expose sensitive data in client-side code
 */

// Export all classes for easy usage
export const APIClasses = {
  FetchAPI,
  AxiosAPI,
  ReactQueryAPI,
  SWRAPI,
  NextJSAPI,
  AuthAPI,
  ErrorHandler,
}

// Default export
export default APIClasses
