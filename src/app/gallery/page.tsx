import { GalleryPage } from '@/components/Gallery';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react'
import { Suspense } from 'react'
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
    <Suspense>
    <MaxWidthWrapper>
      <GalleryPage initialPhotos={[]} />
    </MaxWidthWrapper>
    </Suspense>
  );
}

export default Page