// const API_BASE = import.meta.env?.VITE_API_BASE || 'http://localhost:5000/api';
const API_BASE ='https://christ-tabernacle-backend-six.vercel.app';

// Helper for authorized headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('ct_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/* ========================================================
   AUTH APIS
======================================================== */
export const authLogin = async (username, password) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
};

export const authGetMe = async () => {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch admin profile');
  return data;
};

export const authGetStats = async () => {
  const res = await fetch(`${API_BASE}/auth/stats`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch dashboard stats');
  return data;
};

export const authChangePassword = async (currentPassword, newPassword) => {
  const res = await fetch(`${API_BASE}/auth/change-password`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to change password');
  return data;
};

/* ========================================================
   FILE UPLOAD API
======================================================== */
export const uploadImageFile = async (file) => {
  const token = localStorage.getItem('ct_admin_token');
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'File upload failed');
  return data; // { success: true, url: 'http://...' }
};

export const uploadPPTFile = async (file) => {
  const token = localStorage.getItem('ct_admin_token');
  const formData = new FormData();
  formData.append('ppt', file);

  const res = await fetch(`${API_BASE}/upload/ppt`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'PPT upload failed');
  return data; // { success: true, url: 'http://...' }
};

/* ========================================================
   HERO SLIDES APIS
======================================================== */
export const getPublicHeroSlides = async () => {
  const res = await fetch(`${API_BASE}/hero`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch hero slides');
  return data.data || [];
};

export const getAllHeroSlidesAdmin = async () => {
  const res = await fetch(`${API_BASE}/hero/all`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch hero slides');
  return data.data || [];
};

export const createHeroSlide = async (slideData) => {
  const res = await fetch(`${API_BASE}/hero`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(slideData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create hero slide');
  return data.data;
};

export const updateHeroSlide = async (id, slideData) => {
  const res = await fetch(`${API_BASE}/hero/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(slideData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update hero slide');
  return data.data;
};

export const deleteHeroSlide = async (id) => {
  const res = await fetch(`${API_BASE}/hero/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete hero slide');
  return data;
};

export const toggleHeroSlide = async (id) => {
  const res = await fetch(`${API_BASE}/hero/${id}/toggle`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to toggle hero slide status');
  return data.data;
};

/* ========================================================
   TESTIMONIALS APIS
======================================================== */
export const getPublicTestimonials = async (category = '', search = '') => {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (search) params.append('search', search);

  const res = await fetch(`${API_BASE}/testimonials?${params.toString()}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch testimonials');
  return data.data || [];
};

export const getAllTestimonialsAdmin = async (category = '', status = '') => {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (status) params.append('status', status);

  const res = await fetch(`${API_BASE}/testimonials/all?${params.toString()}`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch testimonials');
  return data.data || [];
};

export const createTestimonial = async (testimonyData) => {
  const res = await fetch(`${API_BASE}/testimonials`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(testimonyData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to create testimony');
  return data.data;
};

export const updateTestimonial = async (id, testimonyData) => {
  const res = await fetch(`${API_BASE}/testimonials/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(testimonyData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update testimony');
  return data.data;
};

export const deleteTestimonial = async (id) => {
  const res = await fetch(`${API_BASE}/testimonials/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete testimony');
  return data;
};

export const toggleApproveTestimonial = async (id) => {
  const res = await fetch(`${API_BASE}/testimonials/${id}/toggle-approve`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to toggle approval');
  return data.data;
};

/* ========================================================
   PHOTOS / GALLERY APIS
======================================================== */
export const getPublicPhotos = async (category = '') => {
  const params = new URLSearchParams();
  if (category) params.append('category', category);

  const res = await fetch(`${API_BASE}/photos?${params.toString()}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch photos');
  return data.data || [];
};

export const getAllPhotosAdmin = async (category = '') => {
  const params = new URLSearchParams();
  if (category) params.append('category', category);

  const res = await fetch(`${API_BASE}/photos/all?${params.toString()}`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch photos');
  return data.data || [];
};

export const createPhoto = async (photoData) => {
  const res = await fetch(`${API_BASE}/photos`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(photoData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to add photo');
  return data.data;
};

export const updatePhoto = async (id, photoData) => {
  const res = await fetch(`${API_BASE}/photos/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(photoData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update photo');
  return data.data;
};

export const deletePhoto = async (id) => {
  const res = await fetch(`${API_BASE}/photos/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete photo');
  return data;
};

/* ========================================================
   WORSHIP SONGS & LYRICS APIS
======================================================== */
export const getPublicSongs = async (language = '', search = '') => {
  const params = new URLSearchParams();
  if (language) params.append('language', language);
  if (search) params.append('search', search);

  const res = await fetch(`${API_BASE}/songs?${params.toString()}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch worship songs');
  return data.data || [];
};

export const getSongById = async (id) => {
  const res = await fetch(`${API_BASE}/songs/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch song');
  return data.data;
};

export const getAllSongsAdmin = async (language = '', search = '') => {
  const params = new URLSearchParams();
  if (language) params.append('language', language);
  if (search) params.append('search', search);

  const res = await fetch(`${API_BASE}/songs/all?${params.toString()}`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch songs');
  return data.data || [];
};

export const createSong = async (songData) => {
  const res = await fetch(`${API_BASE}/songs`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(songData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to save song');
  return data.data;
};

export const updateSong = async (id, songData) => {
  const res = await fetch(`${API_BASE}/songs/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(songData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update song');
  return data.data;
};

export const deleteSong = async (id) => {
  const res = await fetch(`${API_BASE}/songs/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete song');
  return data;
};
