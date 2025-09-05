export async function genVerificationCode(): Promise<string> {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown';
    const now = new Date();
    // Asia/Seoul 날짜기준 YYYYMMDD
    const y = now.getFullYear();
    const m = (now.getMonth() + 1).toString().padStart(2, '0');
    const d = now.getDate().toString().padStart(2, '0');
    const dateStr = `${y}${m}${d}`;
    const seed = `${dateStr}:${ua.slice(0, 20)}`;

    const enc = new TextEncoder().encode(seed);
    const digest = await crypto.subtle.digest('SHA-256', enc);
    const hashArray = Array.from(new Uint8Array(digest));
    const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return `${dateStr}-${hex.slice(0, 10).toUpperCase()}`;
}
