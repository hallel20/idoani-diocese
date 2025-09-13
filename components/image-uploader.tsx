"use client";

import React, { useState, useTransition, useMemo } from 'react';
import { uploadFileAction } from "@/lib/actions";

// --- TYPE DEFINITIONS ---
interface ImageUploadProps {
    imageUrl: string | null;
    setImageUrl: (url: string | null) => void;
}


// --- CLIENT COMPONENT ---
export function ImageUpload({ imageUrl, setImageUrl }: ImageUploadProps) {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Create a temporary URL for client-side preview
        const tempPreviewUrl = URL.createObjectURL(file);
        setPreviewUrl(tempPreviewUrl);
        setError(null);

        startTransition(async () => {
            const formData = new FormData();
            formData.append('file', file);

            const result = await uploadFileAction(formData);

            if (result.success && result.url) {
                setImageUrl(result.url);
                setPreviewUrl(null); // Clear preview as the final image is now set
            } else {
                setError(result.error || 'An unknown error occurred.');
                setPreviewUrl(null); // Clear preview on failure
            }
        });
        
        // Reset file input to allow uploading the same file again
        if (event.target) {
            event.target.value = '';
        }
    };
    
    const handleRemoveImage = () => {
        setImageUrl(null);
        setPreviewUrl(null);
        setError(null);
    }

    const currentImage = useMemo(() => previewUrl || imageUrl, [previewUrl, imageUrl]);

    return (
        <div className="font-sans w-full max-w-md my-4">
            <div className={`relative flex items-center justify-center w-full h-64 border-2 border-dashed rounded-lg transition-colors
                ${error ? 'border-[hsl(0_84.2%_60.2%)]' : 'border-[hsl(214.3_31.8%_91.4%)]'}
                ${!currentImage ? 'hover:border-[hsl(270_50%_40%)] bg-[hsl(210_40%_98%)]' : ''}
            `}>
                {currentImage ? (
                    <>
                        <img 
                            src={currentImage} 
                            alt="Upload preview" 
                            className="object-cover w-full h-full rounded-md" 
                        />
                        <div className="absolute inset-0 bg-black/70 bg-opacity-0 hover:bg-opacity-40 transition-opacity flex items-center justify-center rounded-md">
                           <div className="opacity-0 hover:opacity-100 transition-opacity">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="px-4 py-2 text-sm font-semibold text-black bg-white rounded-md shadow-sm hover:bg-gray-100"
                                >
                                    Change
                                </button>
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="ml-2 p-2 text-white bg-red-600 rounded-full shadow-sm hover:bg-red-700"
                                    aria-label="Remove image"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                           </div>
                        </div>
                    </>
                ) : (
                    <div 
                        className="text-center cursor-pointer p-4"
                        onClick={() => !isPending && fileInputRef.current?.click()}
                        onKeyDown={(e) => { if(e.key === 'Enter') fileInputRef.current?.click()}}
                        role="button"
                        tabIndex={0}
                    >
                        <UploadIcon className="mx-auto h-12 w-12 text-[hsl(215.4_16.3%_46.9%)]" />
                        <p className="mt-2 text-sm text-[hsl(210_25%_7.8431%)]">
                            <span className="font-semibold text-[hsl(270_50%_40%)]">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-[hsl(215.4_16.3%_46.9%)]">PNG, JPG, GIF up to 10MB</p>
                    </div>
                )}
                
                {isPending && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-lg">
                        <SpinnerIcon />
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/gif"
                    disabled={isPending}
                />
            </div>
            {error && <p className="mt-2 text-sm text-[hsl(0_84.2%_60.2%)]">{error}</p>}
        </div>
    );
}

const UploadIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
);

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

const SpinnerIcon = () => (
    <svg className="animate-spin h-8 w-8 text-[hsl(270_50%_40%)]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
