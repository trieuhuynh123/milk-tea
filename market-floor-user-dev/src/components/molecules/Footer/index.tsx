"use client";

import React, { useEffect } from "react";
import useConfig from "@/hooks/useConfig";
import Logo from "@/components/atom/Logo";

interface IFooterSectionProps {}

const FooterSection: React.FC<IFooterSectionProps> = () => {
  const { tenantConfigs, getTenantConfig } = useConfig();

  useEffect(() => {
    getTenantConfig();
  }, []);

  return (
    <div className="flex w-full flex-col items-center border-t border-t-secondary-600 bg-secondary-500 px-3 py-14 text-[13px] md:px-10">
      <div className="flex w-full max-w-[1570px] flex-shrink-0 flex-col md:flex-row">
        <div className="w-full md:w-1/3">
          <div className="mt-3 pr-[30%]">
            <Logo variant="secondary" />
            <p className="flex-wrap font-bold text-secondary-900">
              {tenantConfigs?.fullDescription}
            </p>
            <div className="mt-2 flex gap-4 py-6"></div>
          </div>
        </div>
        <div className="mt-12 w-full md:mt-0 md:w-2/3">
          <div className="grid w-full grid-cols-2 gap-x-2 gap-y-6 sm:grid-cols-4">
            <div className="w-full">
              <p className="text-sm font-bold text-primary-500">About Us</p>
              <ul className="mt-6 space-y-1.5 font-normal sm:space-y-2">
                <li>
                  <a
                    href=""
                    target="_blank"
                    className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  >
                    Company Information
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  >
                    Charity
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  >
                    Terms & Polices
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  >
                    Investor Relations
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  >
                    News & Blog
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  >
                    Explore Our Brands
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full">
              <p className="text-sm font-bold text-primary-500">Work with us</p>
              <ul className="mt-6 space-y-1.5 font-normal sm:space-y-2">
                <li>
                  <a
                    href=""
                    target="_blank"
                    className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  >
                    Join Now
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  >
                    Member Privileges
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  >
                    Membership Terms
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  >
                    Seller Forums
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  >
                    Affiliates & Creators
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full">
              <p className="text-sm font-bold text-primary-500">Help</p>
              <ul className="mt-6 space-y-1.5 font-normal sm:space-y-2">
                <li>
                  <a
                    href=""
                    target="_blank"
                    className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  >
                    Get Help
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  >
                    Market Floor
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  >
                    Market Floor
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full">
              <p className="text-sm font-bold text-primary-500">
                Customer Service
              </p>
              <ul className="mt-6 space-y-1.5 font-normal sm:space-y-2">
                <li>
                  <a
                    href=""
                    target="_blank"
                    className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  >
                    Order Status
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  >
                    Return & Exchanges
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  >
                    Return Policy
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  >
                    Gift Cards
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href=""
                    target="_blank"
                    className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  >
                    Product Recalls
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-14 w-full max-w-[1570px] flex-shrink-0">
        <div className="mt-1 flex w-full flex-col items-center justify-between gap-6 gap-x-4 pt-2 font-normal md:flex-row">
          <div className="flex flex-col md:flex-row">
            <p className="text-secondary-900 md:mt-0">
              © 2021-2024 {tenantConfigs?.companyLegalName} LLC
            </p>
            <ul className="flex gap-2 md:ml-10">
              <li>
                <a
                  className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  href="/policies/privacy-policy"
                >
                  Privacy Policy
                </a>
              </li>
              <span>•</span>
              <li>
                <a
                  className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  href="/policies/terms-of-service"
                >
                  Term of Service
                </a>
              </li>
              <span>•</span>
              <li>
                <a
                  className="text-secondary-900 hover:text-secondary-800 hover:underline"
                  href="/policies/cookie-policy"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="flex gap-1 [&>img]:h-6 [&>img]:rounded-[4px] [&>img]:border">
              <img
                src="https://res.cloudinary.com/dqzslqcl5/image/upload/v1703407220/__payment-methods-svgs/xeh4dwk8mjqaehgperlz.svg"
                alt=""
                className="h-8 w-auto flex-shrink-0 bg-white"
              />
              <img
                src="https://res.cloudinary.com/dqzslqcl5/image/upload/v1703407221/__payment-methods-svgs/znx4ynge3p28clhf2reh.svg"
                alt=""
                className="h-8 w-auto flex-shrink-0 bg-white"
              />
              <img
                src="https://res.cloudinary.com/dqzslqcl5/image/upload/v1703407219/__payment-methods-svgs/iffynyy3itlamkdtecis.svg"
                alt=""
                className="h-8 w-auto flex-shrink-0 bg-white"
              />
              <img
                src="https://res.cloudinary.com/dqzslqcl5/image/upload/v1703407220/__payment-methods-svgs/wfoq5p7tbhrh9znel2gw.svg"
                alt=""
                className="h-8 w-auto flex-shrink-0 bg-white"
              />
              <img
                src="https://res.cloudinary.com/dqzslqcl5/image/upload/v1703407220/__payment-methods-svgs/ykulpvpijkq87wnconw6.svg"
                alt=""
                className="h-8 w-auto flex-shrink-0 bg-white"
              />
              <img
                src="https://res.cloudinary.com/dqzslqcl5/image/upload/v1703407221/__payment-methods-svgs/wgtvzgzdjrl5cnywyjp4.svg"
                alt=""
                className="h-8 w-auto flex-shrink-0 bg-white"
              />
              <img
                src="https://res.cloudinary.com/dqzslqcl5/image/upload/v1703407223/__payment-methods-svgs/phz8qrtpikc6ao8at4fy.svg"
                alt=""
                className="h-8 w-auto flex-shrink-0 bg-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
