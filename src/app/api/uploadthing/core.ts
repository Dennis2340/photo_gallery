import { createUploadthing, type FileRouter } from "uploadthing/next";
import { db } from "@/db";

export const maxDuration = 300;

const f = createUploadthing();

const middleware = async () => {

  
};

const onUploadComplete = async ({ metadata, file }: {
  metadata: Awaited<ReturnType<typeof middleware>>;
  file: { key: string; name: string; url: string };
}) => {
  
  try {
    
  
  } catch (error:any) {
    console.error("Error:", error.message);
     new Response(JSON.stringify({message: error.message}))
  }
};

export const ourFileRouter: FileRouter = {
  freePlanUploader: f({
    pdf: { maxFileSize: "1GB" },
    image: { maxFileSize: "1GB" },
    video: { maxFileSize: "1GB" },
    audio: { maxFileSize: "1GB" }
  })
    .onUploadComplete(onUploadComplete),

  proPlanUploader: f({ 
    pdf: { maxFileSize: "1GB" }, 
    image: { maxFileSize: "1GB" },
    video: { maxFileSize: "32MB" },
    audio: { maxFileSize: "16GB" }
  })
    .onUploadComplete(onUploadComplete),
};

export type OurFileRouter = typeof ourFileRouter;
