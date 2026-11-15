import React from "react";
import type { Metadata } from "next";
import { CheckoutClient } from "./CheckoutClient";
import { resolveCommerceMode } from "@/config/commerce";

export const metadata: Metadata = {
  title: "Checkout",
  description:
    "Complete your KODŌ architectural fragrance order securely.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>;
}) {
  const params = await searchParams;
  const mode = resolveCommerceMode();
  const isCanceled = params.canceled === "1";

  return <CheckoutClient mode={mode} isCanceled={isCanceled} />;
}
