import { Typography } from "./ui/typography";
import {
  Pagination,
  Navigation,
  Autoplay,
  Grid,
  Swiper as SwiperType,
} from "swiper";
import { useRef } from "react";
import { Icon } from "./ui/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/grid";
import "swiper/css";

const ReviewsComp = ({ reviewsData }: { reviewsData: any }) => {
  const swiperRef = useRef<SwiperType>();
  const formatDate = (dateTimeString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDate = new Date(dateTimeString).toLocaleString(
      "en-US",
      options
    );
    return formattedDate;
  };

  return (
    <div className="lg:w-7/12 w-full py-3  px-2 ">
      <div className="flex justify-between items-center mb-2">
        <Typography bold={"semibold"} size={"xl"}>
          Reviews{" "}
        </Typography>
        <div className="flex space-x-2 rtl:space-x-reverse h-fit items-center">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className=" p-1  border-2 border-slate-300 hover:bg-slate-200 hover:text-black text-slate-500 "
          >
            <Icon type="chevronLeftIcon" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className=" p-1  border-2 border-slate-300 hover:bg-slate-200 hover:text-black text-slate-500 "
          >
            <Icon type="chevronRightIcon" />
          </button>
        </div>
      </div>
      <Swiper
        spaceBetween={10}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, Grid]}
        grid={{
          rows: 3,
          fill: "row",
        }}
      >
        {reviewsData.map((reviewData: any) => (
          <SwiperSlide>
            <div className="flex justify-start py-4  bg-slate-50  rounded-lg px-4 w-full border border-slate-100">
              <div className="w-full">
                <div className="flex justify-between">
                  <Typography bold={"semibold"} className="" size={"sm"}>
                    {reviewData.user_details.name}
                  </Typography>
                  <div className="text-gray-400 sm:text-sm text-xs font-[300] ">
                    {formatDate(reviewData.created_at)}
                  </div>
                </div>
                <div className=" w-1/2 flex justify-start space-x-0.5 py-1 rtl:space-x-reverse ">
                  {Array(5).fill(
                    <Icon
                      type="starIcon"
                      className="fill-yellow-500 text-yellow-500"
                      sizes={"xs"}
                    />
                  )}
                </div>
                <div className=" my-2 ">
                  {reviewData.review ? (
                    reviewData.review
                  ) : (
                    <Typography
                      variant={"paragraph"}
                      size={"xs"}
                      className="italic"
                      bold={"light"}
                    >
                      No Comment
                    </Typography>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewsComp;
