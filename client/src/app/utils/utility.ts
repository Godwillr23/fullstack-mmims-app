// Set, Get and Remove token localStorage

export function getToken(): string | null {
  if (typeof window !== 'undefined' && localStorage) {
    return localStorage.getItem('token');
  }
  return null;
}

export function setToken(token: string): void {
  if (typeof window !== 'undefined' && localStorage) {
    localStorage.setItem('token', token);
  }
}

export function removeToken(): void {
  if (typeof window !== 'undefined' && localStorage) {
    localStorage.removeItem('token');
  }
}

// Set, Get and Remove UserId localStorage

export function getUserId(): string | null {
  if (typeof window !== 'undefined' && localStorage) {
    return localStorage.getItem('userId');
  }
  return null;
}

export function setUserId(token: string): void {
  if (typeof window !== 'undefined' && localStorage) {
    localStorage.setItem('userId', token);
  }
}

export function removeUserId(): void {
  if (typeof window !== 'undefined' && localStorage) {
    localStorage.removeItem('userId');
  }
}