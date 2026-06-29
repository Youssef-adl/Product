"use client";

import { SessionProvider } from "next-auth/react";

export const NextAuthProvider = ({ children }) => {
  return (
    <SessionProvider
      refetchInterval={0}
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  );
};
