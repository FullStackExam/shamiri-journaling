export const fetchCSRFToken = async (): Promise<string> => {
    const response = await fetch("/api/auth/csrf", {
      method: "GET",
      credentials: "include", // Include cookies
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch CSRF token");
    }
  
    const data = await response.json();
    return data.csrfToken;
  };
  