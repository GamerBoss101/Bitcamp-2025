"use client";

import React, { useState } from "react";

export default function ProfilePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Generate a preview URL for the image
    }
  };

  return (
    <main className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-6">Profile Picture</h1>
      <div className="flex flex-col items-center gap-4">
        {(
          <img
            alt="Profile Preview"
            className="w-32 h-32 rounded-full object-cover border border-gray-300"
          />
        )}
        {uploadMessage && <p className="text-sm text-gray-600">{uploadMessage}</p>}
      </div>
    </main>
  );
}
