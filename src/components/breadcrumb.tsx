import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Icon } from "./ui/icons";
import { useRouter } from "next/router";
import { Typography } from "./ui/typography";
import { useMemo } from "react";

const BreadCrumb = () => {


  function unslugify(slug: string) {
    return slug.toLowerCase().replace(/-/g, " ");
  }

  const router = useRouter();


  const breadCrumbList = useMemo(() => {
    const path = router.asPath.split("?")[0];


    const { categories, collections, brands } = router.query;

    const asPathNestedRoutes = path
      .split("/")
      .filter((segment) => segment !== "" && segment !== "category");

    let crumbList = asPathNestedRoutes.map((segment, indx) =>
      segment === "product"
        ? { url: "/products", title: "Products" }
        : segment === "brand"
        ? { url: "/brands", title: "Brands" }
        : (categories || collections || brands) ||
          !(asPathNestedRoutes.length - 1 === indx)
        ? {
            url: `${path.split(segment)[0]}/${segment}`,
            title: unslugify(segment),
          }
        : {
            url: null,
            title: unslugify(segment),
          }
    );

    const queries = ["brands", "categories", "collections"];

    queries.map((query) => {
      if (router.query[query]) {
        crumbList = [
          ...crumbList,
          {
            url: null,
            title: unslugify((router.query[query] || "").toString()),
          },
        ];
      }
    });

    return [{ url: "/", title: "Home" }, ...crumbList];
  }, [router.asPath, router.query]);


  return (
    <div>
      <nav className="py-3 px-2 border-b border-slate-100 ">
        <ol className="flex items-center">
          {breadCrumbList.map((breadCrumb) =>
            breadCrumb?.url !== null ? (
              <li className="flex  rtl:space-x-reverse items-center capitalize">
                <Link
                  href={`${breadCrumb.url}`}
                  className={buttonVariants({
                    variant: "breadCrumbLink",
                  })}
                >
                  {breadCrumb.title}
                </Link>
                <Icon
                  type="chevronRightIcon"
                  sizes={"xs"}
                  className="mx-1.5 text-slate-500 sm:text-linkText text-sm"
                />
              </li>
            ) : (
              <li className="flex items-center">
                <div className={"text-black"}>
                  <Typography
                    bold={"light"}
                    className="capitalize "
                    size={"linkText"}
                  >
                    {breadCrumb.title}
                  </Typography>
                </div>
              </li>
            )
          )}
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumb;
