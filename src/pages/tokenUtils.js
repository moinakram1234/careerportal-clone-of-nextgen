// tokenUtils.js

const parseJwt = (token) => {
    if (!token) {
      return;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  };

  // tokenUtils.js
export const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  try {
   
    const decodedToken = parseJwt(token);
    const currentTimestamp = Math.floor(Date.now() / 1000);
    
    return decodedToken.exp && decodedToken.exp < currentTimestamp;
  } catch (error) {
    console.error('Error decoding or validating token:', error);
    return true;
  }
};
