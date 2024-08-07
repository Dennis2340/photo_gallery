import { GalleryPage } from '@/components/Gallery';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react'

interface Photo {
    id: string;
    url: string;
    caption?: string;
  }
  
  interface Props {
    photos: Photo[];
  }
const mockPhotos: Photo[] = [
    { id: '1', url: 'https://images.unsplash.com/photo-1722872596164-b96e1f435cd5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D', caption: 'Photo 1' },
    { id: '2', url: 'https://images.unsplash.com/photo-1722872596164-b96e1f435cd5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D', caption: 'Photo 2' },
    { id: '3', url: 'https://images.unsplash.com/photo-1722872596164-b96e1f435cd5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D', caption: 'Photo 3' },
    { id: '4', url: 'https://images.unsplash.com/photo-1722872596164-b96e1f435cd5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D', caption: 'Photo 4' },
    { id: '5', url: 'https://images.unsplash.com/photo-1722872596164-b96e1f435cd5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D', caption: 'Photo 5' },
];
const Page = () => {

  return (
    <MaxWidthWrapper>
      <GalleryPage photos={mockPhotos} />
    </MaxWidthWrapper>
  );
}

export default Page