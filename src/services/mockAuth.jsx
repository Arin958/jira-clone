// src/services/mockAuth.js

// Mock user database
let mockUsers = [
  {
    id: "1",
    email: "demo@example.com",
    password: "password123",
    name: "Demo User",
    role: "user",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin User",
    role: "admin",
    createdAt: new Date().toISOString()
  }
];


const generateToken = (user) => {
  const payload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    exp: Date.now() + 24 * 60 * 60 * 1000,
    iat: Date.now()
  };
  const token = btoa(JSON.stringify(payload));
  return `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${token}.dummy-signature`;
};

const verifyToken = (token) => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch (error) {
    console.log('Error verifying token:', error);
    return null;
  }
};

// Session management
export const setSession = (user, token) => {
  sessionStorage.setItem('auth_token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
  sessionStorage.setItem('login_time', Date.now().toString());
};

export const clearSession = () => {
  sessionStorage.removeItem('auth_token');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('login_time');
};

export const getSession = () => {
  const token = sessionStorage.getItem('auth_token');
  const userStr = sessionStorage.getItem('user');
  
  if (!token || !userStr) return null;
  
  const payload = verifyToken(token);
  if (!payload) {
    clearSession();
    return null;
  }
  
  return {
    user: JSON.parse(userStr),
    token: token,
    payload: payload
  };
};


export const isAuthenticated = () => {
  return getSession() !== null;
};

export const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(
        u => u.email === email && u.password === password
      );
      
      if (user) {
        const userWithoutPassword = Object.fromEntries(
          Object.entries(user).filter(([key]) => key !== 'password')
        );
        const token = generateToken(userWithoutPassword);
        setSession(userWithoutPassword, token);
        
        resolve({
          success: true,
          user: userWithoutPassword,
          token: token,
          message: "Login successful"
        });
      } else {
        reject({ 
          success: false, 
          error: "Invalid email or password" 
        });
      }
    }, 500);
  });
};

export const register = async (email, password, name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingUser = mockUsers.find(u => u.email === email);
      
      if (existingUser) {
        reject({ success: false, error: "User already exists" });
        return;
      }
      
      const newUser = {
        id: String(mockUsers.length + 1),
        email,
        password,
        name,
        role: "user",
        createdAt: new Date().toISOString()
      };
      
      mockUsers = [...mockUsers, newUser];
      
      const userWithoutPassword = Object.fromEntries(
        Object.entries(newUser).filter(([key]) => key !== 'password')
      );
      const token = generateToken(userWithoutPassword);
      setSession(userWithoutPassword, token);
      
      resolve({
        success: true,
        user: userWithoutPassword,
        token: token,
        message: "Registration successful"
      });
    }, 500);
  });
};

export const logout = () => {
  clearSession();
  return { success: true };
};

export const getCurrentUser = () => {
  const session = getSession();
  return session ? session.user : null;
};

export const getToken = () => {
  return sessionStorage.getItem('auth_token');
};

// Default export for backward compatibility
export default {
  login,
  register,
  logout,
  isAuthenticated,
  getCurrentUser,
  getToken,
  getSession,
  setSession,
  clearSession
};