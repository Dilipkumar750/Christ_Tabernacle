const API_BASE = import.meta.env?.VITE_API_BASE || 'http://localhost:5000/api';
// const API_BASE ='https://christ-tabernacle-backend-six.vercel.app';

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
export const getPublicPhotos = async (filter = '') => {
  const params = new URLSearchParams();
  if (typeof filter === 'string' && filter && filter !== 'All') {
    if (/^\d{4}$/.test(filter)) {
      params.append('year', filter);
    } else {
      params.append('category', filter);
    }
  } else if (typeof filter === 'object' && filter !== null) {
    if (filter.year && filter.year !== 'All') params.append('year', filter.year);
    if (filter.category && filter.category !== 'All') params.append('category', filter.category);
  }

  const res = await fetch(`${API_BASE}/photos?${params.toString()}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch photos');
  return data.data || [];
};

export const getAllPhotosAdmin = async (filter = '') => {
  const params = new URLSearchParams();
  if (typeof filter === 'string' && filter && filter !== 'All') {
    if (/^\d{4}$/.test(filter)) {
      params.append('year', filter);
    } else {
      params.append('category', filter);
    }
  } else if (typeof filter === 'object' && filter !== null) {
    if (filter.year && filter.year !== 'All') params.append('year', filter.year);
    if (filter.category && filter.category !== 'All') params.append('category', filter.category);
  }

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

/* ========================================================
   CHURCH MEMBERS APIS
======================================================== */
export const createMember = async (memberData) => {
  const res = await fetch(`${API_BASE}/members`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(memberData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to submit member details');
  return data;
};

export const getAllMembersAdmin = async (search = '', status = '', gender = '', baptized = '') => {
  const params = new URLSearchParams();
  if (search) params.append('search', search);
  if (status) params.append('status', status);
  if (gender) params.append('gender', gender);
  if (baptized) params.append('baptized', baptized);

  const res = await fetch(`${API_BASE}/members?${params.toString()}`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch church members');
  return data.data || [];
};

export const getMemberById = async (id) => {
  const res = await fetch(`${API_BASE}/members/${id}`, {
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to fetch member details');
  return data.data;
};

export const updateMember = async (id, memberData) => {
  const res = await fetch(`${API_BASE}/members/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(memberData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to update member');
  return data.data;
};

export const deleteMember = async (id) => {
  const res = await fetch(`${API_BASE}/members/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete member');
  return data;
};

export const toggleMemberStatus = async (id) => {
  const res = await fetch(`${API_BASE}/members/${id}/toggle-status`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to toggle member status');
  return data.data;
};

