import NextAuth, { NextAuthOptions } from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak"

export const authConfig: NextAuthOptions = {
  // adapter,
  debug: process.env.NODE_ENV !== "production",
  theme: {
    logo: "https://next-auth.js.org/img/logo/logo-sm.png",
    brandColor: "#1786fb",
  },
  providers: [
    KeycloakProvider({ clientId: process.env.KEYCLOAK_ID, clientSecret: process.env.KEYCLOAK_SECRET, issuer: process.env.KEYCLOAK_ISSUER }),
  ],
  callbacks: {
    async redirect({ url }) {
      if (url.startsWith('/signout-provider')) {
        // sign out from auth provider
        const redirectUri = url.split('redirect_uri=')[1];
        return `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout?redirect_uri=${redirectUri}`;
      } else return url;
    },
  }
  // debug: process.env.NODE_ENV !== "production",
}

export default NextAuth(authConfig)
