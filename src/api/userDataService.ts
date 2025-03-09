// src/userDataService.ts

export interface UserData {
  url: string;
  username: string;
  password: string;
}

export const saveUserData = (userData: UserData): void => {
  localStorage.setItem("userData", JSON.stringify(userData));
};

export const getUserData = (): UserData | null => {
  const storedData = localStorage.getItem("userData");
  return storedData ? JSON.parse(storedData) : null;
};

export const clearUserData = (): void => {
  localStorage.removeItem("userData");
};
