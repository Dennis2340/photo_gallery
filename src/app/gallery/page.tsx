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

const Page = () => {

  return (
    <MaxWidthWrapper>
      <GalleryPage initialPhotos={[]} />
    </MaxWidthWrapper>
  );
}

export default Page