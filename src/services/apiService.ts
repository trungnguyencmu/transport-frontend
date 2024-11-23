const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://your-api-endpoint.com';

class ApiService {
  private token: string | null = null;
  private currentUser: any | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('authToken', token); // Persist token in localStorage
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('authToken'); // Retrieve token from localStorage
    }
    return this.token;
  }

  setCurrentUser(currentUser: string) {
    this.currentUser = currentUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser)); // Persist token in localStorage
  }

  getCurrentUser(): any {
    if (!this.currentUser) {
      const tmp: string | null = localStorage.getItem('currentUser'); // Retrieve token from localStorage
      if(tmp === null) return null
      this.currentUser = JSON.parse(tmp)
    }
    return this.currentUser;
  }


  clearToken() {
    this.token = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  }

  async get(endpoint: string, params?: Record<string, any>) {
    const url = new URL(`${API_BASE_URL}/${endpoint}`);
    if (params) {
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }

    const headers = this.getHeaders();
    const response = await fetch(url.toString(), { method: 'GET', headers });
    return this.handleResponse(response);
  }

  async post(endpoint: string, body?: Record<string, any>) {
    const headers = this.getHeaders();
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    return this.handleResponse(response);
  }

  private getHeaders(): Headers {
    const headers: Headers = new Headers({ 'Content-Type': 'application/json' });
    const token = this.getToken();
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'An error occurred');
    }
    return response.json();
  }
}

export const apiService = new ApiService();
