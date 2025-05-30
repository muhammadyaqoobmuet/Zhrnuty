import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UploadFormInput = ({
  onSubmit,
  isLoading,
}: {
  onSubmit: (event: React.FormEvent) => void;
  isLoading: boolean;
}) => {
  return (
    <div>
      <form className="flex flex-col" action="" onSubmit={onSubmit}>
        <div className="flex justify-end items-center gap-1.5 ">
          <Input
            id="file"
            type="file"
            name="file"
            accept="application/pdf"
            placeholder="upload your pdf"
            className=""
          />
          <Button disabled={isLoading} type="submit">
            {isLoading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadFormInput;
