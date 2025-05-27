import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UploadFormInput = ({
  onSubmit,
}: {
  onSubmit: (event: React.FormEvent) => void;
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
          <Button type="submit">Upload</Button>
        </div>
      </form>
    </div>
  );
};

export default UploadFormInput;
