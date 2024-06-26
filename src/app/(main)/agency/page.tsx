import { AgencyDetails } from "@/components/forms/agency-details";
import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs";
import { Plan } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: { plan: Plan; code: string; state: string };
}) => {
  const authUser = await currentUser();
  if (!authUser) return redirect("/sign-in");

  const agencyId = await verifyAndAcceptInvitation();

  //get user details
  const user = await getAuthUserDetails();

  if (agencyId && user) {
    if (user.role === "SUBACCOUNT_GUEST" || user.role === "SUBACCOUNT_USER") {
      return redirect("/subaccount");
    } else if (user.role === "AGENCY_OWNER" || user.role === "AGENCY_ADMIN") {
      if (searchParams.plan) {
        return redirect(
          `/agency/${agencyId}/billing?plan=${searchParams.plan}`
        );
      }
      if (searchParams.state) {
        const params = searchParams.state.split("___");
        const statePath = params[0];
        const stateAgencyId = params[1];
        if (!stateAgencyId) {
          return <div>Not Authorized</div>;
        }
        return redirect(
          `/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`
        );
      } else return redirect(`/agency/${agencyId}`);
    } else return <div>Not Authorized</div>;
  }

  return (
    <div className="flex justify-center items-center mt-4">
      <div className="max-w-[850px] border-[1px] p-4 rounded-xl">
        <h1 className="text-3xl mb-4">Create An Agency</h1>
        <AgencyDetails
          data={{ companyEmail: authUser.emailAddresses[0].emailAddress }}
        />
      </div>
    </div>
  );
};

export default Page;
