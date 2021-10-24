class Auth {
  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   */
  static authenticateUser(token: string): void {
    window.localStorage.setItem('token', token);
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated(): boolean {
    return window.localStorage.getItem('token') !== null;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser(): void {
    window.localStorage.removeItem('token');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken(): string | null {
    return window.localStorage.getItem('token');
  }
}

export default Auth;
