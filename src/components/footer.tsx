import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Typography, typographyVariants } from "./ui/typography";
import { Button, buttonVariants } from "./ui/button";
import { Input } from "./ui/input";
import { Icon } from "./ui/icons";
import { cn } from "@/lib/utils";
export default function Footer() {
  const { pathname } = useRouter();
  const { t } = useLanguage();
  return (
    <>
      <div
        className={
          "z-10 mx-auto " + `${pathname === "/" ? " block" : "md:block hidden"}`
        }
      >
        <div className="lg:py-8 sm:py-5 py-4 bg-white border-y">
          <div className="container-page flex justify-around md:text-3xl sm:text-2xl text-xl">
            <div>
              <div className="text-center font-[500]">
                {t.footer.top_part.n26}
              </div>
              <Typography variant={"paragraph"} size={"sm"} bold={"semibold"}>
                {t.footer.top_part.years_of_trust}
              </Typography>
            </div>
            <div>
              <div className="text-center font-[500] ">
                {t.footer.top_part.n25M}
              </div>
              <Typography variant={"paragraph"} size={"sm"} bold={"semibold"}>
                {t.footer.top_part.orders_delivered}
              </Typography>
            </div>
            <div>
              <div className="text-center font-[500]">
                {t.footer.top_part.n375}
              </div>
              <Typography variant={"paragraph"} size={"sm"} bold={"semibold"}>
                {t.footer.top_part.stores}
              </Typography>
            </div>
          </div>
        </div>
        <div className="bg-sub-img">
          <div className="grid md:grid-cols-2 grid-cols-1 max-w-[1450px] px-[10px] mx-auto gap-x-10 py-3">
            <div className="py-6">
              <Typography
                variant={"secondary"}
                alignment={"horizontalCenter"}
                className="mb-7 text-[14px]"
              >
                Subscribe For The Latest Discount & Trends
              </Typography>
              <div className="    flex space-y-0">
                <Input
                  buttonRight={
                    <Button
                      className="rtl:rounded-r-none rounded-l-none !h-full"
                      rounded={"full"}
                      size={"lg"}
                      iconRight={
                        <Icon
                          type="rightArrowIcon"
                          sizes={"sm"}
                          variant={"inputIconRight"}
                        />
                      }
                    >
                      Subscribe
                    </Button>
                  }
                  placeholder="Enter your email Address"
                  id="email"
                  rounded={"full"}
                />
              </div>
            </div>
            <div className="  h-full md:order-none order-first py-6">
              <div className="text-center font-semibold text-xl text-white mb-3">
                Download App
              </div>
              <div className="flex max-w-sm mx-auto space-x-2 rtl:space-x-reverse mt-auto items-center justify-center">
                <Link href={"https://e-life.me/ios-download"}>
                  <Image
                    src="https://www.lifepharmacy.com/images/appstore.svg"
                    className="w-full"
                    alt="AppStore"
                    width={100}
                    height={100}
                  />
                </Link>
                <Link href={"https://e-life.me/android-download"}>
                  <Image
                    src="https://www.lifepharmacy.com/images/playstore.svg"
                    className="w-full"
                    alt="AppStore"
                    width={100}
                    height={100}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-gray ">
          <div className="py-4  sm:py-6  max-w-[1450px] mx-auto px-[10px]">
            <div className="md:flex md:justify-between space-x-5 rtl:space-x-reverse">
              <div className="mb-6 md:mb-0 space-y-5 block  justify-between md:justify-normal ">
                <div>
                  <Link href="/" className="flex items-center mb-4">
                    <Image
                      src="/images/logos/life-logo.svg"
                      className="h-10 mr-3"
                      alt=" Logo"
                      width={250}
                      height={250}
                    />
                  </Link>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: t.footer.bottom_part.life_address,
                    }}
                    className={cn(
                      typographyVariants({
                        variant: "paragraph",
                        bold: "light",
                      }),
                      "space-y-5"
                    )}
                  />
                </div>

                <div className="rounded-lg shadow-sm flex space-x-1 rtl:space-x-reverse px-4 py-2 bg-white h-fit w-fit">
                  <div className="my-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="w-7 h-7"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                    </svg>
                  </div>
                  <div className=" text-center ">
                    <p className="pb-1 text-sm">Got Question? Call us 24/7</p>
                    <Link
                      className="text-primary text-xl text-center"
                      href={"tel:+97143441122"}
                    >
                      {" "}
                      04 344 11 22
                    </Link>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-5 text-xs md:text-sm md:grid-cols-3 ">
                <div>
                  <Typography bold={"bold"} className="mb-3" size={"lg"}>
                    {t.footer.bottom_part.know_us.title}
                  </Typography>
                  <ul className=" space-y-2">
                    <li>
                      <Link
                        href="https://www.lifepharmacy.com/about"
                        className={buttonVariants({
                          variant: "footerLink",
                        })}
                      >
                        {t.footer.bottom_part.know_us.about_life_store}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.lifepharmacy.com/contact"
                        className={buttonVariants({
                          variant: "footerLink",
                        })}
                      >
                        {t.footer.bottom_part.know_us.contact_us}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <Typography size={"lg"} bold={"bold"} className="mb-3">
                    {t.footer.bottom_part.our_policies.title}
                  </Typography>
                  <ul className="text-gray-600  space-y-2">
                    <li>
                      <Link
                        href="https://www.lifepharmacy.com/refund-policy"
                        className={buttonVariants({
                          variant: "footerLink",
                        })}
                      >
                        {t.footer.bottom_part.our_policies.refund_policy}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.lifepharmacy.com/shipping-terms"
                        className={buttonVariants({
                          variant: "footerLink",
                        })}
                      >
                        {t.footer.bottom_part.our_policies.ship_terms}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.lifepharmacy.com/privacy-policy"
                        className={buttonVariants({
                          variant: "footerLink",
                        })}
                      >
                        {t.footer.bottom_part.our_policies.pandp}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.lifepharmacy.com/terms-and-conditions"
                        className={buttonVariants({
                          variant: "footerLink",
                        })}
                      >
                        {t.footer.bottom_part.our_policies.tandc}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <Typography size={"lg"} bold={"bold"} className="mb-3">
                    {t.footer.bottom_part.shop_by_cat.title}
                  </Typography>
                  <ul className=" space-y-2">
                    <li>
                      <Link
                        href="https://www.lifepharmacy.com/beauty-care"
                        className={buttonVariants({
                          variant: "footerLink",
                        })}
                      >
                        Beauty Care
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.lifepharmacy.com/sports-nutrition"
                        className={buttonVariants({
                          variant: "footerLink",
                        })}
                      >
                        Sports Nutrition
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.lifepharmacy.com/nutrition-supplements"
                        className={buttonVariants({
                          variant: "footerLink",
                        })}
                      >
                        Nutrition & Supplements
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.lifepharmacy.com/home-healthcare"
                        className={buttonVariants({
                          variant: "footerLink",
                        })}
                      >
                        Home Healthcare
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.lifepharmacy.com/mother-baby-care"
                        className={buttonVariants({
                          variant: "footerLink",
                        })}
                      >
                        Mother & Baby Care
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.lifepharmacy.com/personal-care"
                        className={buttonVariants({
                          variant: "footerLink",
                        })}
                      >
                        Personal Care
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.lifepharmacy.com/medicines"
                        className={buttonVariants({
                          variant: "footerLink",
                        })}
                      >
                        Medicines
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <Typography size={"lg"} bold={"bold"} className="mb-3">
                    {t.footer.bottom_part.useful_links.title}
                  </Typography>

                  <ul className="text-gray-600  space-y-2">
                    <li>
                      <Link
                        href="https://www.lifepharmacy.com/brands"
                        className={buttonVariants({
                          variant: "footerLink",
                        })}
                      >
                        {t.footer.bottom_part.useful_links.browse_by_brands}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.lifepharmacy.com/sitemap"
                        className={buttonVariants({
                          variant: "footerLink",
                        })}
                      >
                        {t.footer.bottom_part.useful_links.site_map}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.lifepharmacy.com/offers"
                        className={buttonVariants({
                          variant: "footerLink",
                        })}
                      >
                        {t.footer.bottom_part.useful_links.offers_coupons}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.lifepharmacy.com/appointments"
                        className={buttonVariants({
                          variant: "footerLink",
                        })}
                      >
                        {t.footer.bottom_part.useful_links.appointments}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <Typography size={"lg"} bold={"bold"} className="mb-3">
                    {t.footer.bottom_part.my_account.title}
                  </Typography>

                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="https://www.lifepharmacy.com/dashboard"
                        className={buttonVariants({
                          variant: "footerLink",
                        })}
                      >
                        {t.footer.bottom_part.my_account.loginorsignup}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.lifepharmacy.com/dashboard"
                        className={buttonVariants({
                          variant: "footerLink",
                        })}
                      >
                        {t.footer.bottom_part.my_account.view_cart}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.lifepharmacy.com/wishlist"
                        className={buttonVariants({
                          variant: "footerLink",
                        })}
                      >
                        {t.footer.bottom_part.my_account.my_wish_list}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <div className="bg-[url('https://www.lifepharmacy.com/images/home/subscribe-2.jpg')]  py-2">
          <div className="flex space-x-3 rtl:space-x-reverse justify-center ">
            <Link
              href={"https://www.facebook.com/lifepharmacyme/"}
              className="border border-white rounded-full p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="w-6 h-6 fill-white hover:fill-blue-500 transition-colors duration-200"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </Link>
            <Link
              href={"https://twitter.com/lifepharmacyme"}
              className="border border-white rounded-full p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="w-6 h-6 fill-white hover:fill-blue-500 transition-colors duration-200"
                viewBox="0 0 16 16"
              >
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
              </svg>
            </Link>
            <Link
              href={"https://ae.linkedin.com/company/lifepharmacy"}
              className="border border-white rounded-full p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="w-6 h-6 fill-white hover:fill-blue-500 transition-colors duration-200"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
              </svg>
            </Link>
            <Link
              href={"https://www.instagram.com/lifepharmacyme/"}
              className="border border-white rounded-full p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="w-6 h-6 fill-white hover:fill-blue-500 transition-colors duration-200"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="max-w-[1450px] px-[10px] mx-auto">
          <div className="flex justify-between py-5 border-b border-muted">
            <div className="flex items-center justify-between">
              <div className="md:text-base text-sm text-gray-500 sm:text-center font-[300] ">
                © 2023{" "}
                <Link
                  href="https://lifepharmacy.com/"
                  className="hover:underline"
                >
                  Life Pharmacy
                </Link>
                . All Rights Reserved.
              </div>
            </div>
            <img
              src="https://www.lifepharmacy.com/images/payment-method.svg"
              alt="payment-method"
            />
          </div>
          {pathname === "/" ? (
            <div className="py-5">
              <section className="space-y-2 py-2">
                <Typography type="h2" bold={"semibold"} size={"lg"}>
                  Live Healthy with Life Pharmacy – First Omni-Channel Pharmacy
                  & Healthcare Retailer in Middle East.
                </Typography>
                <Typography
                  bold={"light"}
                  size={"linkText"}
                  variant={"paragraph"}
                >
                  Our Heritage:{"  "} Life Pharmacy started its journey in 1996
                  with a strong impulse to provide state-of-the-art experience
                  in healthcare retail. Starting with one store, Life Pharmacy
                  in UAE has 300+ retail outlets consisting of Pharmacies,
                  Healthcare Hypermarkets, Health and Wellness stores catering
                  to an average annual customer base of more than ten million
                  walk-ins. Life Pharmacy is also the number one Online pharmacy
                  in UAE. Life Pharmacy app and website are widely used by users
                  across UAE for all their health, fitness & lifestyle needs.
                </Typography>
              </section>
              <section className=" space-y-2  py-2">
                <Typography type="h2" bold={"semibold"} size={"lg"}>
                  USPs of Life Pharmacy
                </Typography>
                <ul className="ol-footer !list-disc list-inside">
                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong>Life Pharmacy Mobile App:</strong> {"  "}Available
                      on Android and iOS App Store, Life Pharmacy app is a one
                      stop destination for everything from vitamins to beauty
                      care to sports nutrition to baby care products.
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong>Largest pharmacy network in UAE:</strong> {"  "}
                      With 300+ stores in UAE, Life Pharmacy has been named as
                      the largest pharmacy network in UAE. The healthcare group
                      aims to expand the number of outlets and increasing
                      presence to five times the current store count in the
                      coming 4 years and increase the current store count to
                      1500 by end of 2025.
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Omni-channel Experience:</strong> {"  "}Life
                      Pharmacy has successfully connected the world of online
                      and offline with its innovative omni-channel retail
                      technologies. Users can now shop wherever they choose, be
                      it at one of our retail stores, call, or on their mobile
                      devices.
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Widest range of products:</strong> {"  "}Shop
                      from a wide range of vitamins, sports supplements, beauty
                      care products, makeup, baby care products and more at Life
                      Pharmacy.
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Top Brands:</strong>
                      {"  "}
                      Life Pharmacy brings all the top brands in healthcare,
                      fitness, beauty & more. Shop Sunshine Nutrition, Trister,
                      Cetaphil, Bioderma, Mustela, Sebamed, Solgar, and other
                      brands on Life Pharmacy online.
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong>Free Delivery: </strong>
                      {"  "}
                      Free delivery is available on Life Pharmacy website and
                      app on a large number of products.
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong>30 minutes delivery: </strong>
                      {"  "}
                      Shop on Life Pharmacy app or website and get your products
                      delivered in less than 30 minutes. Available on select
                      range of products.
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong>Detailed information on products: </strong>
                      {"  "}
                      Life Pharmacy provides users expert advice on products
                      through a proper description of ingredients, usage etc.
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong>Value for money:</strong>
                      {"  "}
                      The online pharmacy in UAE brings the best deals and
                      biggest savings on the most sought after brands.
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong>Easy Payment Options: </strong>
                      {"  "}
                      Shop using your credit or debit cards. Or add to your
                      wallet and save big.
                    </Typography>
                  </li>
                </ul>
              </section>
              <section className="space-y-2 py-2">
                <Typography type="h2" bold={"semibold"} size={"lg"}>
                  Achievements & Awards
                </Typography>
                <ol className="ol-footer list-[number] list-inside">
                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> DSF 2010 Innovation Award: </strong>
                      {"  "}
                      LIFE received the DSF 2010 Innovation Award in the
                      category of Best Retail- Customer Service.
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong>Retail ME Awards </strong>
                    </Typography>
                    <ul className="list-disc list-inside">
                      <li>
                        <Typography
                          bold={"light"}
                          size={"linkText"}
                          variant={"paragraph"}
                          type="span"
                        >
                          Retail ME Awards in the category of Healthcare &
                          Beauty for 2011
                        </Typography>
                      </li>
                      <li>
                        <Typography
                          bold={"light"}
                          size={"linkText"}
                          variant={"paragraph"}
                          type="span"
                        >
                          Most Admired Store Manager for the year 2012
                        </Typography>
                      </li>
                      <li>
                        <Typography
                          bold={"light"}
                          size={"linkText"}
                          variant={"paragraph"}
                          type="span"
                        >
                          Most Admired Retail Pharmacy for the consecutive years
                          from 2013 – 2015
                        </Typography>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Super Brands:</strong>
                      {"  "}
                      LIFE achieved the coveted Super Brands status successfully
                      for the past eight consecutive years from 2011-2018.{" "}
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Wide of range of Products:</strong>
                      {"  "}
                      Life Pharmacy boasts of the widest range of product
                      categories sold in physical stores, website and app. Shop
                      for everything from Vitamins, Sports Nutrition, Beauty
                      Care, Baby Care, Medicines, Personal Care and Makeup. Get
                      exclusive deals and save big when you shop on Life app and
                      website.{" "}
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Vitamin C: </strong>
                      {"  "}
                      Vitamin C is a strong antioxidant that helps boost your
                      blood antioxidants levels and increases immunity. Get
                      vitamin c tablets and effervescents in UAE from Life
                      Pharmacy online.{" "}
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Multivitamin: </strong>
                      {"  "}
                      Multivitamins, as the name suggests, include a host of
                      vitamins to give you complete nutrition, thus increasing
                      your immunity to fight off infections. Score deals on best
                      multivitamins in UAE.{" "}
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Omega 3: </strong>
                      {"  "}
                      For good immunity and strength add Omega 3 capsules in
                      your daily routine.{" "}
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Fish Oil: </strong>
                      {"  "}
                      Whether its inflammation issues in the body or to build up
                      endurance, fish oil capsules in UAE are the best pick.{" "}
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Vitamin & Nutrition:</strong>
                      {"  "}
                      Get the complete range of vitamin and nutrition at one
                      destination. Get Vitamin A-K, Multivitamins, and Minerals
                      like iron & calcium. Choose from top vitamin brands like
                      Sunshine Nutrition, Vitabiotics, Solgar, Nutritionl etc.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Biotin & Collagen:</strong>
                      {"  "}
                      Biotin tablets are for good for hair, skin and nails.
                      Biotin supplements are must have hair vitamins in Dubai
                      for hair growth. Collagen supplements help in keeping away
                      the harmful effects of skin ageing.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Calcium: </strong>
                      {"  "}
                      Give your bones the right strength with Calcium in your
                      diet. Osteocare calcium supplements, one of the most known
                      supplements are available on Life Pharmacy online in
                      Dubai, Abu Dhabi and overall UAE.
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Vitamins for kids:</strong>
                      {"  "}
                      Children require a host of vitamins and minerals to help
                      them in their growing years. Shop from a wide range of
                      vitamins and minerals recommended by pharmacists for your
                      little ones.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Zinc supplements:</strong>
                      {"  "}
                      Zinc is an essential micronutrient that is crucial to
                      almost every aspect of your health.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Iron supplements:</strong>
                      {"  "}
                      Shop from a wide range of iron supplements available on
                      Life Pharmacy online.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Beauty care:</strong>
                      {"  "}
                      Find best skin care products on Life Pharmacy online. Also
                      the number one destination for everything you need for
                      hair care, face cleansers, natural & organic products,
                      skin conditions like acne, eczema and skin ageing.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Hair care:</strong>
                      {"  "}
                      Shop for best hair care products in UAE on Life Pharmacy
                      app and website. Choose from products for all hair types
                      like dry hair treatment, best hair conditioner, and hair
                      coloring. Stop hair loss with the use of pharmacist
                      recommended products.
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Skin care: </strong>
                      {"  "}
                      Shop a variety of skin care products like cleansers,
                      moisturizers, face wash from best skincare brands like
                      Cetaphil oily skin cleanser, Bioderma micellar water, OGX
                      shampoo and more.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Beauty supplements: </strong>
                      {"  "}
                      Beauty from inside. The best skin supplements cure hair &
                      skin problems from inside out.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Acne Skin Care: </strong>
                      {"  "}
                      Are you suffering from Acne? The best acne skin care
                      starts here. Choose from a wide range of acne treatments
                      that will help your face say goodbye to acne scars and
                      spots.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Are you suffering from Acne? </strong>
                      {"  "}
                      The best acne skin care starts here. Choose from a wide
                      range of acne treatments that will help your face say
                      goodbye to acne scars and spots.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Eczema skin care: </strong>
                      {"  "}
                      Eczema is a skin condition that causes rashes, itching and
                      discomfort. Say goodbye to eczema with creams like
                      Cetaphil eczema cream.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Skin ageing: </strong>
                      {"  "}
                      Reverse the effects of skin ageing with various organic as
                      well as skin treatment, both recommended by our
                      pharmacists.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Sun care: </strong>
                      {"  "}
                      With long summers in UAE, it is imperative to keep your
                      skin safe with the use of sun screen.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Home Health care: </strong>
                      {"  "}
                      Keeping a check on your health vitals is one of the best
                      ways to stay healthy. From daily use health devices like
                      thermometers, BP monitors, glucometers to bigger devices
                      like wheelchairs, hospital beds etc., Life Pharmacy has it
                      all.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Thermometer: </strong>
                      {"  "}
                      Found in every home, Thermometer helps measure body
                      temperature for possible fever, flu etc.
                    </Typography>
                  </li>
                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> BP monitor: </strong>
                      {"  "}A much needed device to prevent the occurrence of
                      any upcoming lifestyle diseases, Blood Pressure Monitors
                      should be present in every home. Choose from BP Monitors
                      from several brands like Trister, Geratherm etc.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Glucometer: </strong>
                      {"  "}
                      The number one device used by Diabetics is Glucometer or
                      Glucose Monitor. Shop Glucometer, test strips and vitamins
                      for Diabetics on Life Pharmacy online.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Cholesterol & uric acid test meter: </strong>
                      {"  "}
                      Cholesterol & Uric Acid Test Meters help determine the
                      uric acid production and removal from the body. This in
                      turn helps you stay away from several lifestyle diseases.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Pulse Oximeter: </strong>
                      {"  "}
                      Pulse Oximeter tells your oxygen saturation levels along
                      with your heart rate. Just One click to find the best
                      Pulse Oximeter in town.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Pulse Oximeter: </strong>
                      {"  "}
                      Pulse Oximeter tells your oxygen saturation levels along
                      with your heart rate. Just One click to find the best
                      Pulse Oximeter in town.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Mother& Baby care: </strong>
                      {"  "}
                      Everything your baby wants and deserves. From top brand
                      baby foods to diapers to bath & body care, both parents
                      and kids love the range of products on offer.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Baby Food:</strong>
                      {"  "}
                      Infant formula milk or baby food is a must for growing up
                      kids to meet their dietary requirements. Available for all
                      stages and all top brands like Similac, Pediasure, Nestle
                      and more.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Baby Care:</strong>
                      {"  "}
                      Baby skin care deserves extra care to ensure that it is
                      free from rashes and baby eczema. Baby sunscreen is a must
                      to save their sensitive skin during the host summers. Shop
                      for popular baby brands like Mustela, Sebamed, Bebederm
                      etc. on Life Pharmacy online in UAE.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Baby Diapers:</strong>
                      {"  "}
                      Affordable and best diapers with highest safety standards.
                      Shop for Pampers & Huggies diapers
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Mother supplements:</strong>
                      {"  "}
                      After pregnancy most women are likely deficient, so they
                      will require prenatal vitamins to replenish themselves.
                      Pregnacare, folic acid and other supplements are available
                      to help mothers at all stages of pregnancy.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Mask & Sanitizers: </strong>
                      {"  "}
                      Stay safe with a regular use of masks and sanitizers.
                      Choose from a wide range of masks like disposable masks,
                      n95 masks and more.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Personal care and preventive care: </strong>
                      {"  "}
                      Personal care and preventive care: Build a shield against
                      Infections
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Antiseptic lotion: </strong>
                      {"  "}
                      Antiseptic lotions are a must have in every household to
                      protect against common cuts, wounds etc.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Burn relief: </strong>
                      {"  "}
                      Burn relief products are another must-have for every
                      household.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Oral care: </strong>
                      {"  "}
                      Choose from a wide range of toothbrush, electric
                      toothbrush, toothpaste, floss, from all top brands like
                      Oral B, Colgate, Sensodyne etc.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Sports Nutrition: </strong>
                      {"  "}
                      Are you into fitness? Then you are at the right place for
                      your protein supplements, mass gainers, whey proteins,
                      amino acids, pre & post workout supplements and more.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Whey proteins: </strong>
                      {"  "}
                      Whey proteins are an excellent source of protein. It is
                      derived from protein part of milk and is full of Amino
                      acids. Shop for Whey proteins from Muscle Core, Optimum
                      Nutrition, Muscle Tech, Dymatize and more.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Protein Bars</strong>
                      {"  "}
                      Grab a protein bar on the go and get an immediate release
                      of energy. Available in multiple flavours.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Mass grainers:</strong>
                      {"  "}
                      Get the best of weight and mass gainers at Life Pharmacy.
                      Choose from a wide range of brands and flavours.
                    </Typography>
                  </li>

                  <li>
                    <Typography
                      bold={"light"}
                      size={"linkText"}
                      variant={"paragraph"}
                      type="span"
                    >
                      <strong> Dietary supplements:</strong>
                      {"  "}
                      Having a healthy amount of muscle allows you to perform
                      your best during exercise and daily life. You likely want
                      to be sure you’re getting the most out of it.
                    </Typography>
                  </li>
                </ol>
                <div className="py-5">
                  <Typography
                    bold={"light"}
                    size={"linkText"}
                    variant={"paragraph"}
                    type="span"
                  >
                    Life Pharmacy is definitely the number one destination for
                    everything in health, fitness, vitamins and baby care
                    products. Download the Life Pharmacy app on Android
                    Playstore and iOS Appstore to stay tuned for the biggest
                    deals of the day.
                  </Typography>
                </div>
              </section>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
