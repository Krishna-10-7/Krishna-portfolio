import React, { useState, useRef } from 'react';

const ImageUpload = ({ currentImage, onImageUploaded, folder = 'images' }) => {
    const [preview, setPreview] = useState(currentImage || '');
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image must be smaller than 5MB');
            return;
        }

        setError('');

        // Read file as base64
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
            onImageUploaded(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUrlInput = (e) => {
        const url = e.target.value;
        setPreview(url);
        if (url) {
            onImageUploaded(url);
        }
    };

    return (
        <div className="image-upload">
            <div className="image-preview">
                {preview ? (
                    <img src={preview} alt="Preview" />
                ) : (
                    <div className="no-image">No image</div>
                )}
            </div>

            <div className="upload-controls">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    style={{ display: 'none' }}
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="upload-btn"
                >
                    Upload Image
                </button>

                <span className="or-divider">or</span>

                <input
                    type="url"
                    placeholder="Enter image URL"
                    value={preview && !preview.startsWith('data:') ? preview : ''}
                    onChange={handleUrlInput}
                    className="url-input"
                />
            </div>

            {error && <div className="upload-error">{error}</div>}
        </div>
    );
};

export default ImageUpload;
