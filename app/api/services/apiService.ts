import { API_PRIVATE_URL, SESSION_KEY_VALUE } from '@/app/lib/constant';

const API_PATH = process.env.API_PRIVATE_URL || API_PRIVATE_URL;
const SESSION_KEY = 'Authorization';

export interface ApiResponse {
    status: number;
    headers: Headers;
    response: any;
}

export interface ApiErrorData {
    message: string;
}

export async function callGetRequest(url: string) {
    const sessionKey = SESSION_KEY_VALUE;
    const res = await fetch(`${API_PATH}${url}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${sessionKey || process.env.SESSION_KEY}` },
        cache: 'no-store'
    });
    const jo = await res.json();

    return { status: res.status, headers: res.headers, response: jo };
}

export async function submitMultiForm(url: string, formData: FormData) {
    const sessionKey = SESSION_KEY_VALUE;
    const res = await fetch(`${API_PATH}${url}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${sessionKey || process.env.SESSION_KEY}` },
        body: formData
    });
    const jo = await res.json();
    return { status: res.status, headers: res.headers, response: jo };
}

export async function callPostRequest(url: string, body: any) {
    const sessionKey = SESSION_KEY_VALUE;
    const res = await fetch(`${API_PATH}${url}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${sessionKey || process.env.SESSION_KEY}`
        },
        body: JSON.stringify(body)
    });
    const jo = await res.json();
    return { status: res.status, headers: res.headers, response: jo };
}

export async function callPutRequest<Response, Request>(
    url: string,
    body: Request
): Promise<{
    status: number;
    headers: Headers;
    response: Response;
}> {
    const sessionKey = undefined;
    const headers: HeadersInit = [['Content-Type', 'application/json']];
    if (sessionKey) {
        headers.push(['Cookie', `${SESSION_KEY}=${sessionKey}`]);
    }

    const res = await fetch(`${API_PATH}${url}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body)
    });
    const jo = await res.json();

    return { status: res.status, headers: res.headers, response: jo };
}
