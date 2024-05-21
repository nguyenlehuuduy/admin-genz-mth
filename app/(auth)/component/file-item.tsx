import Image from "next/image";
import { Button } from "primereact/button";
import React from "react";

type Props = {
  onChange: (data: File | undefined) => void;
  defaultImageUrl?: string;
  defaultFile?: File;
  defaultAction?: boolean;
};

export default function FileUploadItem(props: Props) {
  const [removeDefaultImage, setRemoveDefaultImage] = React.useState<boolean>(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (props.defaultFile) {
      setSelectedFile(props.defaultFile);
    }
  }, [props.defaultFile]);

  const imageSrcUrl = React.useMemo(() => {
    if (selectedFile) {
      return URL.createObjectURL(selectedFile);
    }
    if (props.defaultImageUrl && !removeDefaultImage) {
      return props.defaultImageUrl;
    }
    return null;
  }, [selectedFile, props.defaultImageUrl, removeDefaultImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      props.onChange(file);
      if (!props.defaultAction) {
        setSelectedFile(file);
      }
    }
  };

  const handleFileDelete = () => {
    setSelectedFile(null);
    setRemoveDefaultImage(true);
    props.onChange(undefined);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (!props.defaultAction) {
        setSelectedFile(file);
      }
      props.onChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col gap-2 w-fit">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      {!imageSrcUrl && (
        <>
          <div
            className="border-dashed border-round p-5 border-gray-300 rounded-xl w-44 h-44 flex flex-column align-items-center"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            <Image
              alt="icon"
              src={"/layout/images/file-upload.svg"}
              width={70}
              height={70}
              style={{ width: "auto", height: "auto" }}
            />
            <label className="cursor-pointer">kéo & thả hình ảnh</label>

          </div>
        </>
      )}
      {imageSrcUrl && (
        <>
          <div className="flex justify-center items-center border-dashed border-2 border-gray-300 rounded-xl bg-gray-100 p-2">
            <Image
              alt="preview"
              src={imageSrcUrl}
              width={450}
              height={150}
              style={{ width: "auto", height: "auto" }}
              className="object-contain"
            />
          </div>
          <Button label="hủy" onClick={handleFileDelete} />
        </>
      )}
    </div>
  );
}
