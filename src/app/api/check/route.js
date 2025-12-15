import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const ip = searchParams.get('ip');

    if (!ip) {
        return NextResponse.json({ success: false, message: 'Missing IP address' }, { status: 400 });
    }

    // Configuration
    const apiKey = process.env.IPQS_KEY || '8MTz4bdtuAiPWUniQGDGQnf3t015WKZU'; // Fallback for dev if env not set
    const strictness = 1;
    const allowPublicAccessPoints = 'true';
    const fast = 'true'; // Often good to add for speed
    const mobile = 'true'; // Ensure mobile check is on

    // Construct URL
    // "https://www.ipqualityscore.com/api/json/ip/" + key + "/" + ip_address + "?..."
    const baseUrl = `https://www.ipqualityscore.com/api/json/ip/${apiKey}/${ip}`;
    const queryParams = new URLSearchParams({
        strictness: strictness.toString(),
        allow_public_access_points: allowPublicAccessPoints,
        fast: fast,
        mobile: mobile,
        // We can also pass user_agent and language if we want to forward them from the client request
        // For now, let's keep it simple or extract headers
    });

    // Extract optional headers for better accuracy
    const userAgent = request.headers.get('user-agent') || '';
    const language = request.headers.get('accept-language') || '';

    queryParams.append('user_agent', userAgent);
    queryParams.append('user_language', language);

    try {
        const apiUrl = `${baseUrl}?${queryParams.toString()}`;
        const res = await fetch(apiUrl);

        if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error('IPQS API Error:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch IP data' }, { status: 500 });
    }
}
