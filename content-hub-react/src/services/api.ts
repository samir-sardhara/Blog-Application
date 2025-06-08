
const API_BASE_URL = 'http://localhost:1111';

export interface UserDto {
 
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface BlogDto {
  title: string;
  content: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  createdDate: string;
  updatedDate: string;
  user: User;
}

export interface BlogPage {
  content: Blog[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

// Auth API
export const authAPI = {
  register: async (userData: UserDto): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error('Registration failed');
    }
    
    return response.json();
  },

  login: async (loginData: LoginDto): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    return response.json();
  },
};

// Blog API
export const blogAPI = {
  createBlog: async (blogData: BlogDto, userId: number): Promise<Blog> => {
    const response = await fetch(`${API_BASE_URL}/create-blog/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create blog');
    }
    
    return response.json();
  },

  getBlogById: async (id: number): Promise<Blog> => {
    const response = await fetch(`${API_BASE_URL}/single-blog/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch blog');
    }
    
    return response.json();
  },

  getAllBlogsByUserId: async (userId: number, page: number = 0, size: number = 5): Promise<BlogPage> => {
    const response = await fetch(`${API_BASE_URL}/all-blog/${userId}?page=${page}&pageSize=${size}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    
    return response.json();
  },

  updateBlog: async (id: number, blogData: BlogDto): Promise<Blog> => {
    const response = await fetch(`${API_BASE_URL}/update-blog/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(blogData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update blog');
    }
    
    return response.json();
  },

  deleteBlog: async (id: number): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/delete-blog/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete blog');
    }
    
    return response.text();
  },
};
