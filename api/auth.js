export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'Authorization code is missing' });
    }

    const clientId = process.env.VITE_GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    
    // Dynamically construct the redirect URI based on the environment.
    const redirectUri = process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}/auth/callback.html`
        : 'http://localhost:5173/auth/callback.html';

    try {
        // 1. Exchange authorization code for access token
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code,
                client_id: clientId,
                client_secret: clientSecret,
                redirect_uri: redirectUri,
                grant_type: 'authorization_code',
            }),
        });

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
            console.error('Error from Google token endpoint:', tokenData.error_description);
            return res.status(400).json({ error: 'Failed to exchange code for token', details: tokenData.error_description });
        }

        const accessToken = tokenData.access_token;

        // 2. Use access token to get user info
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const userData = await userResponse.json();

        if (!userResponse.ok) {
            return res.status(userResponse.status).json({ error: 'Failed to fetch user info' });
        }

        // 3. Send user data back to the client
        res.status(200).json({
            name: userData.name,
            email: userData.email,
            avatar: userData.picture,
        });

    } catch (error) {
        console.error('Internal server error during auth:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}