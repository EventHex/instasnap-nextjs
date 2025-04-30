'use client'
import React, { useState, useRef, useCallback, useEffect } from 'react';
import NavFooter from '../components/navfooter';
import { UploadCloud, X, CheckCircle, AlertCircle, Clock, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Button from '../components/button'; // Assuming Button component exists and works

const MAX_FILES = 10;

// --- Mock Data for Previously Uploaded Images --- 
// Replace this with actual API call in useEffect
const mockUploadedImages = [
    { id: 'img101', url: 'https://picsum.photos/seed/uploaded1/200/200', status: 'pending' },
    { id: 'img102', url: 'https://picsum.photos/seed/uploaded2/200/300', status: 'approved' },
    { id: 'img103', url: 'https://picsum.photos/seed/uploaded3/300/200', status: 'pending' },
    { id: 'img104', url: 'https://picsum.photos/seed/uploaded4/250/250', status: 'approved' },
];


const ContributePage = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState({ message: '', type: '' }); // type: 'success' or 'error'
    const [uploadedImages, setUploadedImages] = useState([]); // State for previously uploaded images
    const [isLoadingUploads, setIsLoadingUploads] = useState(true); // Loading state for uploads section
    const fileInputRef = useRef(null);

    // --- Fetch Previously Uploaded Images (Placeholder) --- 
    useEffect(() => {
        setIsLoadingUploads(true);
        // Simulate fetching data from API
        setTimeout(() => { 
            // Replace with: fetch('/api/my-uploads').then(res => res.json()).then(data => setUploadedImages(data))
            setUploadedImages(mockUploadedImages);
            setIsLoadingUploads(false);
        }, 1500); // Simulate network delay
    }, []);
    // --- End Fetch Logic --- 

    // Clean up preview URLs when component unmounts or previews change
    useEffect(() => {
        return () => {
            previews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [previews]);

    const handleFileChange = useCallback((event) => {
        const files = Array.from(event.target.files || []);
        setUploadStatus({ message: '', type: '' }); // Clear previous status

        const newFiles = files.filter(file => file.type.startsWith('image/'));
        const totalFiles = selectedFiles.length + newFiles.length;

        if (totalFiles > MAX_FILES) {
            setUploadStatus({ message: `You can only select up to ${MAX_FILES} photos.`, type: 'error' });
            // Keep existing files, don't add new ones exceeding the limit
            event.target.value = null; // Clear the input
            return;
        }
        
        const combinedFiles = [...selectedFiles, ...newFiles];
        setSelectedFiles(combinedFiles);

        const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviewUrls]);
        
        event.target.value = null; // Clear the input for subsequent selections

    }, [selectedFiles]);

    const handleRemovePreview = useCallback((indexToRemove) => {
        setPreviews(prev => {
            const newPreviews = prev.filter((_, index) => index !== indexToRemove);
            URL.revokeObjectURL(prev[indexToRemove]); // Clean up the specific URL
            return newPreviews;
        });
        setSelectedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    }, []);

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;
        setIsUploading(true);
        setUploadStatus({ message: '', type: '' });

        console.log("Uploading files:", selectedFiles);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate upload delay
        
        // --- Start Placeholder API Interaction --- 
        // Simulate getting back data from the server after upload
        const newUploadedImagesData = selectedFiles.map((file, index) => ({
            id: `new_${Date.now()}_${index}`,
            // Use a placeholder/mock URL instead of the temporary blob URL
            url: `https://picsum.photos/seed/new_${Date.now()}_${index}/200/200`, 
            status: 'pending' // New uploads are pending
        }));
        // Prepend new uploads to the displayed list
        setUploadedImages(prev => [...newUploadedImagesData, ...prev]);
        // --- End Placeholder API Interaction --- 

        setUploadStatus({ message: 'Upload successful! Photos are pending review.', type: 'success' });
        setSelectedFiles([]); 
        // Now it's safe to clear previews and revoke the blob URLs
        previews.forEach(url => URL.revokeObjectURL(url)); // Explicitly revoke here
        setPreviews([]); 

        setIsUploading(false);
    };

    // Helper to render status badge
    const renderStatusBadge = (status) => {
        switch (status) {
            case 'pending':
                return (
                    <span className="absolute top-1 left-1 bg-yellow-500 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full flex items-center shadow">
                        <Clock size={10} className="mr-1" /> Pending
                    </span>
                );
            case 'approved':
                return (
                    <span className="absolute top-1 left-1 bg-green-600 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-full flex items-center shadow">
                       <CheckCircle size={10} className="mr-1"/> Approved
                    </span>
                );
            // Add case for 'rejected' if needed
            default:
                return null;
        }
    };

    // --- DEBUG LOG --- 
    console.log("Rendering 'Your Uploads' with state:", uploadedImages);
    // --- END DEBUG LOG ---

    return (
        <div className="flex flex-col min-h-screen">
            {/* Optional Header can go here */}
            <div className="flex-grow p-4 md:p-6 mb-[70px] overflow-y-auto"> {/* Adjust margin for footer */}
                <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">Contribute Your Photos</h1>
                <p className="text-center text-gray-600 mb-6 text-sm">Upload up to {MAX_FILES} photos. Approved photos will appear in the public gallery.</p>

                {/* Upload Area */} 
                <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-6 cursor-pointer hover:border-blue-500 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => fileInputRef.current?.click()} // Trigger hidden input
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*" // Accept only image files
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={isUploading} // Disable while uploading
                    />
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-700 font-medium">Click or drag & drop to upload</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB (Max {MAX_FILES} files)</p>
                </div>

                {/* Upload Status Messages */} 
                {uploadStatus.message && (
                    <div className={`p-3 rounded-md mb-4 text-sm ${uploadStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} flex items-center`}>
                         {uploadStatus.type === 'success' ? <CheckCircle className="w-5 h-5 mr-2" /> : <AlertCircle className="w-5 h-5 mr-2" />}
                         {uploadStatus.message}
                    </div>
                )}

                {/* Previews Section */} 
                {previews.length > 0 && (
                     <div className="mb-6">
                        <h2 className="text-lg font-medium mb-3 text-gray-700">Selected ({previews.length}/{MAX_FILES})</h2>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                            {previews.map((previewUrl, index) => (
                                <div key={index} className="relative aspect-square rounded-md overflow-hidden border border-gray-200 group">
                                    <Image 
                                        src={previewUrl}
                                        alt={`Preview ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                    <button 
                                        onClick={() => !isUploading && handleRemovePreview(index)} // Prevent removal during upload
                                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 opacity-75 group-hover:opacity-100 hover:bg-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Remove image"
                                        disabled={isUploading}
                                    >
                                        <X size={14} strokeWidth={3} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Upload Button */} 
                 {selectedFiles.length > 0 && (
                    <Button 
                        onClick={handleUpload}
                        disabled={isUploading}
                        className="w-full md:w-auto px-8 mt-4"
                        icon={!isUploading ? <UploadCloud size={18} className="mr-2"/> : null}
                    >
                       {isUploading ? (
                           <>
                             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                             </svg>
                              Uploading...
                           </>
                       ) : (
                           `Upload ${selectedFiles.length} Photo${selectedFiles.length > 1 ? 's' : ''}`
                       )}
                    </Button>
                 )}

                {/* Your Uploads Section */}
                <div className="mt-6">
                    <h2 className="text-lg font-medium mb-3 text-gray-700">Your Uploads</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {uploadedImages.map((image) => (
                            <div key={image.id} className="relative aspect-square rounded-md overflow-hidden border border-gray-200 group">
                                <Image 
                                    src={image.url} 
                                    alt={`Uploaded ${image.id}`}
                                    fill
                                    className="object-cover bg-gray-100"
                                />
                                 {/* Status Badge */}
                                 {renderStatusBadge(image.status)}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            {/* Footer */}
            <div className="sticky bottom-0 z-10 w-full bg-white border-t border-gray-100">
                <NavFooter />
            </div>
        </div>
    );
};

export default ContributePage;
