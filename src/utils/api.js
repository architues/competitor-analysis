const BASE_URL = import.meta.env.VITE_API_BASE || 'https://api.okayreport.com';

export const apiCall = async (endpoint, method = 'GET', body = null) => {
    // 1. Prepare Headers
    const headers = {
        'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('okayreport_token');
    const workspaceId = localStorage.getItem('okayreport_ws');

    // 2. Auth Logic
    // If it's a login/signup/public endpoint, skip auth headers
    const isAuthEndpoint = endpoint.includes('/auth/');

    if (token && !isAuthEndpoint) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (workspaceId && !isAuthEndpoint) {
        headers['X-Workspace-Id'] = workspaceId;
    }

    // 3. Make Request
    const config = {
        method,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    // Ensure endpoint has leading slash
    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    try {
        const response = await fetch(`${BASE_URL}/api/v1${normalizedEndpoint}`, config);

        // 4. Handle Response
        if (!response.ok) {
            // Try to parse error message from JSON
            let errorMessage = 'Something went wrong';
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData.error || errorMessage;
            } catch (e) {
                // If text response isn't JSON
                errorMessage = response.statusText;
            }
            throw new Error(errorMessage);
        }

        // Return parsed JSON for success
        return await response.json();
    } catch (error) {
        console.error('API Call Failed:', error);
        throw error;
    }
};
