import getAppointmentsList from "@/lib/getAppointmentsList";
import { GetStaticProps } from "next";
import { appoinment } from "../../../types/types";
import { Typography } from "@/components/ui/typography";
import Image from "next/image";
import Link from "next/link";

const Appointments = ({
  appointmentsListData,
}: {
  appointmentsListData: appoinment[];
}) => {
  return (
    <div>
      <div className="text-black container-page-items  ">
        <Typography bold={"light"} size={"xl"} className="py-3">
          Avaialable Appointments
        </Typography>

        <hr className=" border-slate-200 " />
        <div className="space-y-3 py-3">
          {appointmentsListData.map((appData) => (
            <Link href={`/appointments/${appData.slug}`} className=" block">
              {appData.images.banner ? (
                <Image
                  src={appData.images.banner}
                  height={450}
                  width={1440}
                  className=" rounded-2xl"
                  alt={appData.name}
                />
              ) : (
                <div className=" flex items-center justify-center  min-h-[330px] bg-slate-100 rounded-2xl">
                  <Typography
                    bold={"bold"}
                    size={"xxl"}
                    alignment={"horizontalCenter"}
                  >
                    {appData.name}
                  </Typography>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res = await getAppointmentsList();
  return {
    props: {
      appointmentsListData: res.data.appointments,
    },
  };
};

export default Appointments;
