// features/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  username: string;
  email: string;
  name: string;
  birthDate: string;
  gender: string;
  description?: string;
}

interface SignupRequest {
  username: string;
  email: string;
  password: string;
  name: string;
  birthDate: string;
  gender: string;
  description?: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  username: string;
}

interface ProfileResponse {
    username: string;
    email: string;
    password: string;
    name: string;
    birthDate: string;
    gender: string;
    description?: string;
}

interface UpdateProfileRequest {
    username?: string;
    email: string;
    password?: string;
    name: string;
    birthDate?: string;
    gender?: string;
    description?: string;
}

export const apiSlice = createApi({
  reducerPath: "api",
  // baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/", credentials: 'include',  }),
  baseQuery: fetchBaseQuery({ baseUrl: "https://yolo-task.onrender.com/", credentials: 'include',  }),
  endpoints: (builder) => ({
    signup: builder.mutation<void, SignupRequest>({
      query: (userData) => ({
        url: "auth/signup",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
    getProfile: builder.query<ProfileResponse, void>({
        query: () => "user/profile",
        transformErrorResponse: (response) => {
          console.error("Get profile error:", response);
          return response;
        },
      }),
    updateProfile: builder.mutation<void, UpdateProfileRequest>({
      query: (updatedData) => ({
        url: "user/profile",
        method: "PUT",
        body: updatedData,
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = apiSlice;