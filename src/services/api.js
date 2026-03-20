// src/services/api.js
// =============================================
// Service Layer: Abstraksi komunikasi dengan API
// Menggunakan Axios untuk HTTP Request
// =============================================

import axios from "axios";

/* =================================================
   1. MEMBUAT INSTANCE AXIOS
   Instance ini menjadi client utama untuk API
================================================= */

const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com", // URL dasar API
  timeout: 10000, // batas waktu request 10 detik
  headers: {
    "Content-Type": "application/json", // format data JSON
  },
});


/* =================================================
   2. REQUEST INTERCEPTOR
   Menangkap request sebelum dikirim ke server
   Biasanya digunakan untuk logging atau auth token
================================================= */

apiClient.interceptors.request.use(
  (config) => {

    // contoh output:
    // [API] GET /products
    console.log(`[API] ${config.method.toUpperCase()} ${config.url}`);

    return config; // request dilanjutkan ke server
  },

  (error) => {
    return Promise.reject(error);
  }
);


/* =================================================
   3. RESPONSE INTERCEPTOR
   Menangkap response dari server
   Digunakan untuk menangani error global
================================================= */

apiClient.interceptors.response.use(

  // jika response sukses
  (response) => {
    return response;
  },

  // jika terjadi error
  (error) => {

    if (error.response) {

      // server merespon tapi status error
      console.error(
        `[API Error] ${error.response.status}: ${error.response.statusText}`
      );

    } else if (error.request) {

      // request terkirim tapi tidak ada response
      console.error("[API Error] No response received");

    }

    return Promise.reject(error);
  }
);


/* =================================================
   4. API FUNCTIONS
   Fungsi-fungsi untuk mengambil data dari API
================================================= */

// Mengambil semua produk
export const getProducts = async () => {

  const response = await apiClient.get("/products");

  return response.data;
};


// Mengambil satu produk berdasarkan ID
export const getProductById = async (id) => {

  const response = await apiClient.get(`/products/${id}`);

  return response.data;
};


// Mengambil produk berdasarkan kategori
export const getProductsByCategory = async (category) => {

  const response = await apiClient.get(`/products/category/${category}`);

  return response.data;
};


// Mengambil semua kategori produk
export const getCategories = async () => {

  const response = await apiClient.get("/products/categories");

  return response.data;
};


// export instance axios jika ingin dipakai langsung
export default apiClient;