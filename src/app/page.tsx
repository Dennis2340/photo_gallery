import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome to the Class Photo Gallery</h1>
        <Link href="/universities" className={
          buttonVariants({ size: "lg", className: "mt-5"})}>
          Select University <ArrowRight className='ml-1.5 h-5 w-5'/>
        </Link>
      </div>
    </div>

    </MaxWidthWrapper>
  );
}
