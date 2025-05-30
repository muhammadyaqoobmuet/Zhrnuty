"use client";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import {
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Dialog,
  DialogFooter,
} from "@/components/ui/dialog";
import { deleteSummaryAction } from "@/actions/summary-actions";
import { toast } from "sonner";

const DeleteButton = ({ summaryId }: { summaryId: string }) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  console.log(summaryId);
  const handleDelete = async () => {
    // delete summary
    startTransition(async () => {
      const results = await deleteSummaryAction({ summaryId });
      if (!results.success) {
        toast.error("something wrong deleting", {
          description: results?.message,
        });
      }

      toast.success("Summary Deleted 🎉🎉", {
        description: "Summary got Deleted",
      });

      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="p-2 bg-transparent">
        <Button
          asChild
          className="text-gray-400 bg-gray-50 hover:text-rose-700 hover:bg-gray-100 hover:border-gray-950"
          variant={"ghost"}
          size="icon"
        >
          <Trash2 className="w-6 h-6 " />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Summary </DialogTitle>
          <DialogDescription>
            are you sure to delete summary , becuase this action cant be undo!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isPending}
            className="bg-gray-200 hover:border hover:border-gray-400  hover:bg-gray200 hover:text-gray-950"
            variant="ghost"
            onClick={() => setOpen(!open)}
          >
            Cancel
          </Button>
          <Button
            disabled={isPending}
            className="bg-gray-800   border border-gray-400  hover:bg-gray200 text-gray-100 hover:text-gray-200"
            variant="ghost"
            onClick={handleDelete}
          >
            {isPending ? "Deleting...." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteButton;
