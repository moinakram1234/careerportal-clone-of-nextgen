// tokenUtils.js

  // tokenUtils.js
  export const isTokenExpired = (token) => {
    const decoded = token; 
    if (!decoded.exp) {
      return false; // Token doesn't have an expiration time
    }
    const expirationDate = new Date(decoded.exp * 1000);
    return expirationDate < new Date();
  }
   