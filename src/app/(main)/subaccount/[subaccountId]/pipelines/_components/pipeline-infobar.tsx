"use client";
import CreatePipelineForm from "@/components/forms/create-pipeline-form";
import CustomModal from "@/components/global/custom-modal";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useModal } from "@/providers/modal-provider";
import { Pipeline } from "@prisma/client";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  subAccountId: string;
  pipelines: Pipeline[];
  pipelineId: string;
};

const PipelineInfoBar = ({ pipelineId, pipelines, subAccountId }: Props) => {
  console.log(pipelines);
  const { setOpen: setOpenModal, setClose } = useModal();

  const handleClickCreatePipeline = () => {
    setOpenModal(
      <CustomModal
        title="Create A Pipeline"
        subheading="Pipelines allows you to group tickets into lanes and track your business processes all in one place."
      >
        <CreatePipelineForm subAccountId={subAccountId} />
      </CustomModal>
    );
  };

  return (
    <div>
      <div className="flex items-end gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-[200px] justify-between"
            >
              {pipelines?.find((pipeline) => pipeline.id === pipelineId)
                ?.name || "Select a pipeline..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            {pipelines?.map((pipeline) => (
              <Link
                className="flex gap-1 p-2 hover:bg-primary rounded-md w-full"
                key={pipeline.id}
                href={`/subaccount/${subAccountId}/pipelines/${pipeline.id}`}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    pipelineId === pipeline.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {pipeline.name}
              </Link>
            ))}
            <Button
              variant="secondary"
              className="flex gap-2 w-full mt-4"
              onClick={handleClickCreatePipeline}
            >
              <Plus size={15} />
              Create Pipeline
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default PipelineInfoBar;
