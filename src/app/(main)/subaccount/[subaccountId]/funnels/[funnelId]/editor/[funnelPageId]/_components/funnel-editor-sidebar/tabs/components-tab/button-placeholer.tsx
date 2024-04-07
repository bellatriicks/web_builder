import { EditorBtns } from "@/lib/constants";
import { LucideBoxSelect, TypeIcon } from "lucide-react";
import React from "react";

interface Props {}

const ButtonPlaceholder = (props: Props) => {
  const handleDragState = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };
  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDragState(e, "button");
      }}
      className=" h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <div className="text-muted-foreground border rounded-md p-4 font-semibold">
        Button
      </div>
    </div>
  );
};

export default ButtonPlaceholder;
