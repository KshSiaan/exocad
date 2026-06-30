import { Upload } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Page() {
  return (
    <main className="">
      <h2 className="text-xl font-bold text-foreground mb-4">
        Current Hero Image
      </h2>
      <Image
        src="/img/bwink_med_02_single_04-ezgif.com-jpg-to-webp-converter.webp"
        alt="Current Hero Image"
        width={800}
        height={400}
        className="rounded-lg border border-border/60 mb-6 h-[40dvh] object-contain"
      />
      <h2 className="text-xl font-bold text-foreground mb-4">
        Upload Hero Image
      </h2>
      <button
        type="button"
        className="w-full border-2 border-dashed border-border/60 rounded-xl p-10 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
        // onClick={mockAddFile}
      >
        <Upload className="size-8 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium text-sm text-foreground">
          Drop files here or click to upload
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          STL, OBJ, DCM, ZIP — Max 500 MB per file
        </p>
      </button>
    </main>
  );
}
