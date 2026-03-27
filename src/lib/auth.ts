const ADMIN_PASSWORD_HASH = 'e085555d0508bda571a2841552e58e7efb7b4c680564d8be31b3b56b080ad162';
const SESSION_DURATION = 60 * 60 * 24; // 24 hours

const validTokens = new Set<string>();

async function sha256(text: string): Promise<string> {
	const data = new TextEncoder().encode(text);
	const hash = await crypto.subtle.digest('SHA-256', data);
	return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, '0')).join('');
}

export function generateToken(): string {
	const bytes = new Uint8Array(32);
	crypto.getRandomValues(bytes);
	return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export async function checkPassword(password: string): Promise<boolean> {
	const hash = await sha256(password);
	return hash === ADMIN_PASSWORD_HASH;
}

export function addToken(token: string): void {
	validTokens.add(token);
}

export function removeToken(token: string): void {
	validTokens.delete(token);
}

export function isValidToken(token: string | undefined): boolean {
	return !!token && validTokens.has(token);
}

export { SESSION_DURATION };
