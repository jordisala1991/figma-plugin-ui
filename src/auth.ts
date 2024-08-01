import { AuthOptions } from 'next-auth'
import { OAuthConfig } from 'next-auth/providers/oauth'

type FigmaProfile = {
  id: string
  handle: string
  email: string
  img_url: string
}

const figma: OAuthConfig<FigmaProfile> = {
  id: "figma",
  name: "Figma",
  type: "oauth",
  authorization: {
    url: "https://www.figma.com/oauth",
    params: {
      scope: "files:read",
      response_type: "code",
      state: 'state',
    },
  },
  token: {
    url: "https://www.figma.com/api/oauth/token",
    async request(context) {
      const provider = context.provider;
      const res = await fetch(
        `https://www.figma.com/api/oauth/token?client_id=${provider.clientId}&client_secret=${provider.clientSecret}&redirect_uri=${provider.callbackUrl}&code=${context.params.code}&grant_type=authorization_code`,
        { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      const json = await res.json();
      return { tokens: json };
    },
  },
  userinfo: "https://api.figma.com/v1/me",
  profile(profile) {
    return {
      id: profile.id,
      name: `${profile.handle}`,
      email: profile.email,
      image: profile.img_url,
    };
  },
  clientId: process.env.FIGMA_ID,
  clientSecret: process.env.FIGMA_SECRET,
};

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [figma],
}
