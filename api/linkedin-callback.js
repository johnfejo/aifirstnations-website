// LinkedIn OAuth - Step 2: Handle callback, store token via Vercel KV REST API
export default async function handler(req, res) {
  const { code, error } = req.query;

  if (error) {
    return res.redirect('/marketing.html?linkedin=error');
  }

  try {
    const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      })
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return res.redirect('/marketing.html?linkedin=error');
    }
    const profileRes = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` }
    });
    const profile = await profileRes.json();
    const kvUrl = process.env.KV_REST_API_URL;
    const kvToken = process.env.KV_REST_API_TOKEN;
    const ttl = tokenData.expires_in || 5184000;
    await fetch(`${kvUrl}/set/linkedin_token/${encodeURIComponent(tokenData.access_token)}?ex=${ttl}`, {
      headers: { Authorization: `Bearer ${kvToken}` }
    });
    await fetch(`${kvUrl}/set/linkedin_user_id/${encodeURIComponent(profile.sub)}`, {
      headers: { Authorization: `Bearer ${kvToken}` }
    });
    res.redirect('/marketing.html?linkedin=connected');
  } catch (err) {
    console.error('LinkedIn callback error:', err);
    res.redirect('/marketing.html?linkedin=error');
  }
                }
