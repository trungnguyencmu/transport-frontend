import { jwtDecode } from 'jwt-decode'; // Use the named export from jwt-decode

export const isTokenValid = (token: string): boolean => {
  try {
    const decoded: { issued_at: number } = jwtDecode(token); // Decode the token
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    return decoded?.issued_at >= currentTime; // Check if the token is still valid
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};
