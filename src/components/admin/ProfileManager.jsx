import React from 'react';
import { useData } from '../../context/DataContext';
import ImageUpload from './ImageUpload';

const ProfileManager = () => {
    const { profileImage, updateProfileImage } = useData();

    const handleImageUpdate = (imageUrl) => {
        updateProfileImage(imageUrl);
    };

    return (
        <div className="profile-manager">
            <h2>Profile Settings</h2>

            <div className="profile-section">
                <h3>Profile Picture</h3>
                <p className="section-desc">
                    Upload a new profile picture or provide a URL
                </p>

                <ImageUpload
                    currentImage={profileImage}
                    onImageUploaded={handleImageUpdate}
                    folder="profile"
                />
            </div>

            <div className="profile-info">
                <h3>Profile Information</h3>
                <p className="section-desc">
                    Edit your personal info in the ContentLoader.jsx file, or implement
                    editable fields here for a full CMS experience.
                </p>

                <div className="info-display">
                    <div className="info-row">
                        <span className="label">Name:</span>
                        <span className="value">Krishna Pandey</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Title:</span>
                        <span className="value">Software Engineer</span>
                    </div>
                    <div className="info-row">
                        <span className="label">Email:</span>
                        <span className="value">kp66158@gmail.com</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileManager;
