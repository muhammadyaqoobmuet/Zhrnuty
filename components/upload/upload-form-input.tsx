import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, File, X, CheckCircle2 } from "lucide-react";

interface UploadFormInputProps {
  onSubmit: (event: React.FormEvent) => void;
  isLoading: boolean;
}

const UploadFormInput: React.FC<UploadFormInputProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      onSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Upload Area */}
        <div
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ease-in-out
            ${
              dragActive
                ? "border-blue-500 bg-blue-50/50 scale-[1.02]"
                : selectedFile
                  ? "border-green-500 bg-green-50/50"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50/50"
            }
            ${isLoading ? "pointer-events-none opacity-60" : "cursor-pointer"}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !selectedFile && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            id="file"
            type="file"
            name="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
            disabled={isLoading}
          />

          {selectedFile ? (
            <div className="space-y-3">
              <div className="flex items-center justify-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900 truncate max-w-xs mx-auto">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
                className="h-8 px-3 text-black bg-orange-300/20 hover:bg-orange-400/40 transition-all duration-200 ease-in hover:text-black rounded-lg "
              >
                <X className="w-4 h-4 mr-1" />
                Remove
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div
                  className={`p-4 rounded-full transition-colors duration-200 ${
                    dragActive ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  <Upload
                    className={`w-8 h-8 transition-colors duration-200 ${
                      dragActive ? "text-blue-600" : "text-gray-600"
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Upload your PDF
                </h3>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    Drag and drop your file here, or{" "}
                    <span className="font-medium text-blue-600">browse</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF files only • Max 8MB
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!selectedFile || isLoading}
          className="w-full h-12 text-base font-medium transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <File className="w-4 h-4" />
              <span>Analyze PDF ✨</span>
            </div>
          )}
        </Button>

        {/* Help Text */}
        <p className="text-xs text-center text-gray-500 px-4">
          By uploading, you agree to our terms. Your data is processed securely
          and never stored permanently.
        </p>
      </form>
    </div>
  );
};

export default UploadFormInput;
