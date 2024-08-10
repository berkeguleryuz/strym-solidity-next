import { IconPhotoUp } from "@tabler/icons-react";
import Image from "next/image";
import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

interface FileWithPreview extends File {
  preview: string;
}
interface CustomImageUploaderProps {
  onImagesChange?: (images: FileWithPreview[]) => void;
}

const CustomImageUploader: React.FC<CustomImageUploaderProps> = ({
  onImagesChange,
}) => {
  const [images, setImages] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newImages = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ) as FileWithPreview[];

      setImages((prevImages) => {
        const updatedImages = [...prevImages, ...newImages];
        if (onImagesChange) {
          onImagesChange(updatedImages);
        }
        return updatedImages;
      });
    },
    [onImagesChange],
  );

  const removeImage = (file: FileWithPreview) => {
    setImages((prevImages) => {
      const updatedImages = prevImages.filter((image) => image !== file);
      if (onImagesChange) {
        onImagesChange(updatedImages);
      }
      return updatedImages;
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*" as any,
    multiple: false,
  });

  useEffect(() => {
    return () => images.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [images]);

  return (
    <div className="">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg flex flex-row items-center justify-center w-full p-6 text-center ${
          isDragActive ? "bg-blue-50" : "bg-white"
        }`}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div>
            <div className="flex flex-col space-y-3 items-center justify-center">
              <IconPhotoUp width={32} height={32} />
              <p>
                Drag and drop profile picture here, or click to select image
              </p>
            </div>
            <div className="mt-4 flex flex-row items-center justify-center gap-4">
              {images.map((file) => (
                <div key={file.name} className="relative">
                  <Image
                    src={file.preview}
                    alt="Preview"
                    height={200}
                    width={200}
                    className="object-cover w-full h-32 rounded-md"
                  />
                  <button
                    onClick={() => removeImage(file)}
                    className="absolute -top-1 right-2 text-3xl text-white rounded-full p-1">
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomImageUploader;
