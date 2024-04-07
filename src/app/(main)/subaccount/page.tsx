import Unauthorized from "@/components/unauthorized";
import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: {
    state: string;
    code: string;
  };
}

const SubaccountMainPage = async ({ searchParams: { state, code } }: Props) => {
  const agencyId = await verifyAndAcceptInvitation();
  if (!agencyId) {
    return <Unauthorized />;
  }
  const user = await getAuthUserDetails();
  if (!user) return;

  const getFirstSubaccountWithAccess = user.Permissions.find(
    (permission) => permission.access == true
  );
  if (state) {
    const statePath = state.split("___")[0];
    const stateSubaccountid = state.split("___")[1];
    if (!stateSubaccountid) {
      return <Unauthorized />;
    }
    return redirect(
      `/subaccount/${stateSubaccountid}/${statePath}?code=${code}`
    );
  }
  if(getFirstSubaccountWithAccess){
    return redirect(`/subaccount/${getFirstSubaccountWithAccess.subAccountId}`)
  }
  return <Unauthorized/>;
};

export default SubaccountMainPage;
