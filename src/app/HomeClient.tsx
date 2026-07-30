"use client";

import React from "react";
import { HeaderNav } from "@/components/global/HeaderNav";
import { MenuDrawer } from "@/components/global/MenuDrawer";
import { CartDrawer } from "@/components/global/CartDrawer";

/* ═══════════════════════════════════════════════════════════
   KODŌ — Home Client Shell
   Client-side interactive layer mounted inside the Homepage.
   Contains the navigation bar, overlays, and cart drawer.
   ═══════════════════════════════════════════════════════════ */

export function HomeClient() {
  return (
    <>
      <HeaderNav />
      <MenuDrawer />
      <CartDrawer />
    </>
  );
}
