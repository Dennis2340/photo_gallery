"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import UploadButton from './UploadPhotoForm';
import Skeleton from 'react-loading-skeleton'
import { Loader2 } from 'lucide-react';

export interface Photo {
  id: string | null;
  url: string;
  caption?: string;
}

interface Props {
  initialPhotos: Photo[];
}

export const GalleryPage: React.FC<Props> = ({ initialPhotos }) => {
  const searchParams = useSearchParams();
  const classId = searchParams.get('classId');
  const [galleryPhotos, setGalleryPhotos] = useState<Photo[]>(initialPhotos);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const fetchPhotos = async () => {
        try {
            if (classId) {
            setIsLoading(false)
            const res = await fetch(`/api/photo?classId=${classId}`);
            if (res.ok) {
                const photos = await res.json();
                setGalleryPhotos(photos);
            }
        }
        } catch (error) {
            console.log(error)
        }finally{
            setIsLoading(false)
        }
      };

    fetchPhotos();
  }, [classId]);

  const handlePhotoUploaded = (newPhoto: Photo) => {
    setGalleryPhotos(prevPhotos => [...prevPhotos, newPhoto]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-1">
      <h1 className="text-4xl font-bold mb-8">Gallery</h1>
      <div className='ml-auto mb-4'>
        <UploadButton
          onPhotoUploaded={handlePhotoUploaded}
          classId={classId || ''}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {isLoading ? (
        //   Array.from({ length: 8 }).map((_, index) => (
        //     <Skeleton key={index} className="w-full h-64" />
        //   ))
        <div className='flex flex-col justify-center items-center'>
            <Loader2 className='h-10 w-10 animate-spin'/>
        </div>
        ) : (
          galleryPhotos.map((photo) => (
            <div key={photo.id} className="relative">
              {/*  eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.caption || 'Photo'}
                width={500}
                height={'auto'}
                className="w-full h-auto rounded-lg shadow-lg"
              />
              {photo.caption && (
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center py-2 rounded-b-lg">
                  {photo.caption}
                </div>
              )}
            </div>
          ))
        )}

      </div>
    </div>
  );
};
