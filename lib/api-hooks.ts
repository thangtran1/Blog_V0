"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { API } from "./api-services"

// ====================================================================
// REACT QUERY HOOKS - Sử dụng trong components
// ====================================================================

// Posts Hooks - Sử dụng trong trang bài viết
export const useGetPosts = (query: string) => {
  return useQuery({
    queryKey: ["posts", query],
    queryFn: () => API.posts.fetchPosts(query),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useGetPostById = (id: string) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: () => API.posts.fetchPostById(id),
    enabled: !!id,
  })
}

export const useGetPostBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["posts", "slug", slug],
    queryFn: () => API.posts.fetchPostBySlug(slug),
    enabled: !!slug,
  })
}

export const useGetFeaturedPosts = (limit = 6) => {
  return useQuery({
    queryKey: ["posts", "featured", limit],
    queryFn: () => API.posts.fetchFeaturedPosts(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useGetTrendingPosts = (limit = 4) => {
  return useQuery({
    queryKey: ["posts", "trending", limit],
    queryFn: () => API.posts.fetchTrendingPosts(limit),
    staleTime: 15 * 60 * 1000, // 15 minutes
  })
}

// Categories Hooks - Sử dụng trong trang danh mục
export const useGetCategories = (query?: string) => {
  return useQuery({
    queryKey: ["categories", query],
    queryFn: () => API.categories.fetchCategories(query),
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

export const useGetCategoryBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["categories", "slug", slug],
    queryFn: () => API.categories.fetchCategoryBySlug(slug),
    enabled: !!slug,
  })
}

// Comments Hooks - Sử dụng trong trang chi tiết bài viết
export const useGetCommentsByPost = (postId: string, query?: string) => {
  return useQuery({
    queryKey: ["comments", postId, query],
    queryFn: () => API.comments.fetchCommentsByPost(postId, query),
    enabled: !!postId,
  })
}

export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: API.comments.createComment,
    onSuccess: (data, variables) => {
      // Invalidate comments for the post
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      })
    },
  })
}

// Newsletter Hook - Sử dụng trong footer
export const useSubscribeNewsletter = () => {
  return useMutation({
    mutationFn: API.newsletter.subscribe,
    onSuccess: () => {
      // Show success message
      console.log("Newsletter subscription successful!")
    },
    onError: (error) => {
      console.error("Newsletter subscription failed:", error)
    },
  })
}

// Contact Hook - Sử dụng trong trang liên hệ
export const useSendContact = () => {
  return useMutation({
    mutationFn: API.contact.send,
    onSuccess: () => {
      console.log("Contact message sent successfully!")
    },
    onError: (error) => {
      console.error("Failed to send contact message:", error)
    },
  })
}
