// LinkedIn Post - called from marketing.html when user clicks "Post to LinkedIn"
// Uses Vercel KV REST API (no npm package needed)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'No content to post' });
  }

  try {
    const kvUrl = process.env.KV_REST_API_URL;
    const kvToken = process.env.KV_REST_API_TOKEN;

    const [tokenRes, userRes] = await Promise.all([
      fetch(`${kvUrl}/get/linkedin_token`, { headers: { Authorization: `Bearer ${kvToken}` } }),
      fetch(`${kvUrl}/get/linkedin_user_id`, { headers: { Authorization: `Bearer ${kvToken}` } })
    ]);

    const tokenData = await tokenRes.json();
    const userData = await userRes.json();
    const token = tokenData.result;
    const userId = userData.result;

    if (!token || !userId) {
      return res.status(401).json({ error: 'LinkedIn not connected', needsAuth: true });
    }

    const postRes = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify({
        author: `urn:li:person:${userId}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: text.trim() },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: { 'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC' }
      })
    });

    if (postRes.ok) {
      return res.json({ success: true, message: 'Posted to LinkedIn successfully' });
    }

    const errData = await postRes.json();
    console.error('LinkedIn post error:', errData);
    return res.status(500).json({ error: 'Failed to post', details: errData });

  } catch (err) {
    console.error('LinkedIn post exception:', err);
    return res.status(500).json({ error: 'Server error' });
  }
      }
