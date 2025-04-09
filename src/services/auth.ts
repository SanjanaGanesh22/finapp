// This is a mock authentication service
// In a real application, you would connect this to a backend API

interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
}

// Mock database
let users: User[] = [];

export const authService = {
  // Register a new user
  register: async (name: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
    // Check if user already exists
    if (users.some(user => user.email === email)) {
      return { success: false, message: 'User already exists' };
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      isVerified: true, // Set to true by default for now
    };

    users.push(newUser);

    return { success: true, message: 'Registration successful. You can now login.' };
  },

  // Login user
  login: async (email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> => {
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // In a real app, you would verify the password here
    return { success: true, message: 'Login successful', user };
  },

  // Verify email
  verifyEmail: async (email: string, verificationCode: string): Promise<{ success: boolean; message: string }> => {
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // In a real app, you would verify the code here
    // For demo purposes, we'll just mark the user as verified
    user.isVerified = true;

    return { success: true, message: 'Email verified successfully' };
  },

  // Resend verification email
  resendVerification: async (email: string): Promise<{ success: boolean; message: string }> => {
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    if (user.isVerified) {
      return { success: false, message: 'Email already verified' };
    }

    // In a real app, you would send a new verification email here
    console.log(`Verification email would be resent to ${email}`);

    return { success: true, message: 'Verification email sent' };
  }
}; 