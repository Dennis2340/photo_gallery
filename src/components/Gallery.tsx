"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import UploadButton from './UploadPhotoForm';

export interface Photo {
  id: string | null;
  url: string;
  caption?: string;
}

interface Props {
  photos: Photo[];
}



export const GalleryPage: React.FC<Props> = ({ photos }) => {
  const params = useParams();
  const { universityId, year, name } = params
  console.log(universityId, year, name)

  // i will have to use this state
  const [galleryPhotos, setGalleryPhotos] = useState<Photo[]>(photos);

  const handlePhotoUploaded = (newPhoto: Photo) => {
    setGalleryPhotos(prevPhotos => [...prevPhotos, newPhoto]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">{name} Gallery</h1>
       
      <div className='ml-auto mb-4'>
        <UploadButton
            onPhotoUploaded={handlePhotoUploaded} 
            universityId={universityId} 
            year={year} 
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div key={photo.id} className="relative">
            {/* // eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.url}
              alt={photo.caption || 'Photo'}
              width={300}
              height={300}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            {photo.caption && (
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2 rounded-b-lg">
                {photo.caption}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};