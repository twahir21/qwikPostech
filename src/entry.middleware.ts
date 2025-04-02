import type { RequestHandler } from "@builder.io/qwik-city";

export const onRequest: RequestHandler = ({ cookie, redirect, url }) => {
  console.log("Middleware triggered for:", url.pathname); // Debugging
  
  // Allow public access to auth pages
  if (url.pathname.startsWith("/auth")) {
    console.log("Public auth route, skipping auth check.");
    return;
  }

  // Read auth_token from cookies
  const authToken = cookie.get("auth_token");

  if (!authToken) {
    console.log("No auth_token found. Redirecting to /auth");
    throw redirect(302, "/auth");
  } else {
    console.log("Auth token found:", authToken);
  }
};
