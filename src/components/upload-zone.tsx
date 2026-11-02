import { useRef, useState } from "react";
import { ImageIcon } from "lucide-react";
import { BASE_URL_UPLOADS } from "@/lib/api";

interface UploadZoneProps {
  initialImageUrl?: string;
  onLoadFile?: (file: File) => void;
}

export function UploadImageZone({ initialImageUrl, onLoadFile }: UploadZoneProps) {

  const [imageUrl, setImageUrl] = useState<string | undefined>(initialImageUrl || undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      if (onLoadFile) {
        onLoadFile(file);
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="relative cursor-pointer rounded-2xl border-3 border-dashed text-center h-[30vh]"
    >
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
      {
        imageUrl ?
          (
            <img
              src={imageUrl}
              alt="Your uploaded photo"
              className="rounded-md w-full h-full object-contain object-top"
            />
          ) :
          (
            <div className="flex flex-col items-center justify-center gap-5 h-full">
              <div className="flex h-15 w-15 items-center justify-center rounded-2xl bg-muted" >
                <ImageIcon size={36} strokeWidth={1.5} />
              </div>
              <p className="text-base"> Drop your photo here </p>
              <p className="text-sm text-muted-foreground text-left">
                Or click to browse ·JPG, PNG, WEBP.
              </p>
            </div>
          )
      }
    </div>
  );
}
