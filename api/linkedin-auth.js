// LinkedIn OAuth - Step 1: Redirect user to LinkedIn login
export default function handler(req, res) {
  const clientId = process.env.LINKEDIN_CLIENT_ID;
  const redirectUri = encodeURIComponent(process.env.LINKEDIN_REDIRECT_URI);
  const scope = encodeURIComponent('openid profile w_member_social');
  const state = Math.random().toString(36).substring(7);

  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;

  res.redirect(authUrl);
}
