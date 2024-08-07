import React, { useState } from 'react';
import { useUploadThing } from '@/lib/uploadthing';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { Photo } from './Gallery';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

interface UploadPhotoFormProps {
  onPhotoUploaded: (photo: Photo) => void;
  universityId: string | string[];
  year: string | string[];
}

const UploadPhotoForm: React.FC<UploadPhotoFormProps> = ({ onPhotoUploaded, universityId, year }) => {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>('');
  const { startUpload, isUploading } = useUploadThing('freePlanUploader');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const res = await startUpload([file]);
      const [responseFile] = res || [];
      const photo = { id: responseFile.customId, url: responseFile.url, caption };

      // Save photo to the database
      await fetch('/api/photos', {
        method: 'POST',
        body: JSON.stringify({
          url: responseFile.url,
          caption,
          classId: `${universityId}-${year}`
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      onPhotoUploaded(photo);
    }
  };

  return (
    <div className="mb-4 p-4 bg-gray-50 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Upload Photo</h3>
      <div className="flex flex-col items-start">
        <Label htmlFor="photo" className="mb-2">Photo</Label>
        <Input 
          id="photo" 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="mb-2"
        />
        <Label htmlFor="caption" className="mb-2">Caption</Label>
        <Input 
          id="caption" 
          type="text" 
          value={caption} 
          onChange={(e) => setCaption(e.target.value)} 
          className="mb-2"
        />
        <Button onClick={handleUpload} className='mt-2' disabled={isUploading}>
          Upload {isUploading && <Loader2 className='h-4 w-4 animate-spin'/> }
        </Button>
      </div>
    </div>
  );
};

const UploadButton: React.FC<UploadPhotoFormProps> = ({ onPhotoUploaded, universityId, year }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <>
        <Dialog open={isOpen} onOpenChange={(v) => {
            if(!v){
                setIsOpen(v)
            }
        }}>
         <DialogTrigger asChild onClick={() => setIsOpen(true)}>
            <Button>Upload  Image</Button>
         </DialogTrigger>

         <DialogContent>
            <UploadPhotoForm 
            onPhotoUploaded={onPhotoUploaded}
            year={year}
             universityId={universityId}
            />
        </DialogContent>

        </Dialog>
        </>
    )
}
export default UploadButton;
