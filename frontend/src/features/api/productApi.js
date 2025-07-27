import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const PRODUCT_API = `${import.meta.env.VITE_BACKEND_URL}/api/products`;

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: PRODUCT_API, credentials: "include" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/all-products",
    }),

    getProduct: builder.query({
      query: (id) => `/${id}`,
    }),

    createProduct: builder.mutation({
      query: (product) => ({
        url: "/post-product",
        method: "POST",
        credentials: "include",
        body: product,
      }),
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...product }) => ({
        url: `/${id}`,
        method: "PUT",
        credentials: "include",
        body: product,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
