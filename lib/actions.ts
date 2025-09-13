"use server"

export async function uploadFileAction(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {    const file = formData.get('file') as File;
    if (!file || file.size === 0) {
        return { success: false, error: 'No file provided.' };
    }

    const uploadUrl = process.env.UPLOAD_URL;
    const apiKey = process.env.UPLOAD_API_KEY;

    if (!uploadUrl || !apiKey) {
        console.error('UPLOAD_URL or UPLOAD_API_KEY is not configured on the server.');
        return { success: false, error: 'Server configuration error.' };
    }
    
    const forwardFormData = new FormData();
    forwardFormData.append('file', file);
    
    try {
        const response = await fetch(uploadUrl, {
            method: 'POST',
            headers: {
                'X-API-Key': apiKey,
            },
            body: forwardFormData,
        });

        const result = await response.json();

        if (!response.ok) {
            return { success: false, error: result.error || 'File upload failed.' };
        }

        return { success: true, url: result.url };

    } catch (error) {
        console.error('Upload fetch error:', error);
        return { success: false, error: 'An unexpected error occurred.' };
    }
}