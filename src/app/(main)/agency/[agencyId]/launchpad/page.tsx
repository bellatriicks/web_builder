import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { CheckCheckIcon, CheckCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  params: {
    agencyId: string;
  };
  searchParams: {
    code: string;
  };
}

const LaunchPad = async ({ params, searchParams }: Props) => {
  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
  });
  if (!agencyDetails) return;
  const allDetailsExist =
    agencyDetails.address &&
    agencyDetails.address &&
    agencyDetails.agencyLogo &&
    agencyDetails.city &&
    agencyDetails.companyEmail &&
    agencyDetails.companyPhone &&
    agencyDetails.country &&
    agencyDetails.name &&
    agencyDetails.state &&
    agencyDetails.zipCode;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-full max-w-[800px]">
        <Card>
          <CardHeader>
            <CardTitle>Let&apos;s get started</CardTitle>
            <CardDescription>
              Follow the steps below to get your account setup
            </CardDescription>
            <CardContent className="flex flex-col gap-4">
              <div className="flex p-4 rounded-lg gap-2 justify-between items-center w-full border">
                <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                  <Image
                    src={"/appstore.png"}
                    alt="app logo"
                    height={80}
                    width={80}
                    className="rounded-md object-contain"
                  />
                  <p>Save the website as a shortcut on your mobile devices</p>
                </div>
                <Button>Start</Button>
              </div>
              <div className="flex p-4 rounded-lg gap-2 justify-between items-center w-full border">
                <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                  <Image
                    src={"/stripelogo.png"}
                    alt="app logo"
                    height={80}
                    width={80}
                    className="rounded-md object-contain"
                  />
                  <p>
                    Connect your stripe account to accept payment and see your
                    dashboard
                  </p>
                </div>
                <Button>Start</Button>
              </div>
              <div className="flex p-4 rounded-lg gap-2 justify-between items-center w-full border">
                <div className="flex md:items-center gap-4 flex-col md:!flex-row">
                  <Image
                    src={agencyDetails?.agencyLogo || ""}
                    alt="app logo"
                    height={80}
                    width={80}
                    className="rounded-md object-contain"
                  />
                  <p>Fill in all your business details</p>
                </div>
                {!allDetailsExist ? (
                  <Link href={`/agency/${params.agencyId}/settings`} className="bg-primary py-2 px-4 rounded-md text-white">
                    Start
                  </Link>
                ) : (
                  <CheckCircleIcon size={40} className="text-primary p-2  flex-shrink-0" />
                )}
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default LaunchPad;
