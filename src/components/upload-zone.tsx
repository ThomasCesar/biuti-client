import { useRef, useState } from "react";
import { ImageIcon } from "lucide-react";
interface UploadZoneProps {
  onFile: (file: File) => void;
}

export function UploadZone({ onFile }: UploadZoneProps) {
  const [, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) onFile(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      className="relative cursor-pointer rounded-2xl border-3 border-dashed p-5 text-center"
    >
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleChange} />
      <div className="flex flex-col items-center gap-5">
        <div className="flex h-15 w-15 items-center justify-center rounded-2xl bg-muted" >
          <ImageIcon size={36} strokeWidth={1.5} />
        </div>
        <p className="text-base"> Drop your photo here </p>
        <p className="text-sm text-muted-foreground text-left">
          Or click to browse ·JPG, PNG, WEBP.
          <br />Best results with a clear face photo in natural light.
        </p>
      </div>
    </div>
  );
}
