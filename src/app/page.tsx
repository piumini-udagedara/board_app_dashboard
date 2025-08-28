"use client";
import { Providers } from "./providers";
import BoardApp from "@/pages/BoardApp";
import { DashboardWithSidebar } from "@/components/DashboardWithSidebar";

export default function HomePage() {
  return (
    <Providers>
      <DashboardWithSidebar>
        <BoardApp />
      </DashboardWithSidebar>
    </Providers>
  );
}

