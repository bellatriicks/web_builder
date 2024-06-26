import { db } from "@/lib/db";
import EditorProvider from "@/providers/editor/editor-provider";
import { redirect } from "next/navigation";
import React from "react";
import EditorNavigation from "./_components/funnel-editor-navigation";
import EditorSidebar from "./_components/funnel-editor-sidebar";
import Editor from "./_components/funnel-editor";

interface Props {
  params: {
    subaccountId: string;
    funnelId: string;
    funnelPageId: string;
  };
}

const EditorPage = async ({ params }: Props) => {
  const funnelPageDetails = await db.funnelPage.findFirst({
    where: {
      id: params.funnelPageId,
    },
  });
  if (!funnelPageDetails) {
    return redirect(
      `/subaccount/${params.subaccountId}/funnels/${params.funnelId}`
    );
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-y-auto overflow-x-hidden">
      <EditorProvider
        subaccountId={params.subaccountId}
        funnelId={params.funnelId}
        pageDetails={funnelPageDetails}
      >
        <EditorNavigation
          subaccountId={params.subaccountId}
          funnelId={params.funnelId}
          funnelPageDetails={funnelPageDetails}
        />
        <div className="h-full flex justify-center">
          <Editor funnelPageId={params.funnelPageId} />
        </div>
        <EditorSidebar subaccountId={params.subaccountId} />
      </EditorProvider>
    </div>
  );
};

export default EditorPage;
