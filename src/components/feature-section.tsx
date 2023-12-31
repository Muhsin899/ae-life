import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Typography } from "./ui/typography";
import Image from "next/image";

interface featuresSectiondataProps {
  title: string;
  para: string;
  imageUrl: string;
}

const featuresSectiondata: featuresSectiondataProps[] = [
  {
    title: "Free Delivery",
    para: "For all orders over AED 29",
    imageUrl: "ecommerce-gift",
  },
  {
    title: "Easy Returns",
    para: "For all orders over AED 29",
    imageUrl: "ecommerce-return",
  },
  {
    title: "Secure payments",
    para: "For all orders over AED 29",
    imageUrl: "ecommerce-shield",
  },
  {
    title: "24/7 Support",
    para: "Dedicated Support",
    imageUrl: "ecommerce-phone",
  },
];

const FeatureSection = () => {
  return (
    <div className="md:flex hidden col-span-3 flex-col ml-auto space-y-7 h-fit w-full  px-5 pt-5 rounded-xl border-2 border-muted">
      {featuresSectiondata.map((item) => (
        <>
          <div className="flex items-center h-full space-x-3 rtl:space-x-reverse ">
            <Image
              alt={item.title}
              width={"25"}
              height={"25"}
              src={`https://www.lifepharmacy.com/images/svg/${item.imageUrl}.svg`}
            />

            <div className="space-y-1">
              <Typography variant={"lifeText"} size={"sm"} bold={"semibold"}>
                {item.title}
              </Typography>
              <Typography size={"xs"} variant={"paragraph"}>
                {item.para}
              </Typography>
            </div>
          </div>
          <hr className="text-slate-200 h-[1px] w-full" />
        </>
      ))}
    </div>
  );
};

const CategoriesSection = ({ categoriesData }: { categoriesData: any }) => {
  return (
    <div className=" overflow-hidden no-scrollbar whitespace-nowrap text-ellipsis mt-4">
      {categoriesData
        ? categoriesData.map((cat: any) => (
            <Link
              href={`/products?categories=${cat.slug}`}
              className={cn(
                buttonVariants({
                  variant: "categoryBtn",
                  size: "xs",
                  rounded: "md",
                }),
                "mr-2  "
              )}
            >
              <Typography variant={"lifeText"} size={"xs"} bold={"semibold"}>
                {cat.name}
              </Typography>
            </Link>
          ))
        : null}
    </div>
  );
};

export { FeatureSection, CategoriesSection };
