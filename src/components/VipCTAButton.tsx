"use client";

import { MessageCircle } from "lucide-react";
import { trackLead } from "@/lib/meta-pixel";
import { VIP_GROUP_URL } from "@/lib/vip";

interface VipCTAButtonProps {
  label?: string;
  size?: "sm" | "lg";
  className?: string;
}

const SIZES = {
  sm: "px-4 py-2 text-sm",
  lg: "px-8 py-4 text-base sm:text-lg",
};

export function VipCTAButton({
  label = "Entrar no Grupo VIP",
  size = "sm",
  className = "",
}: VipCTAButtonProps) {
  if (!VIP_GROUP_URL) return null;

  return (
    <a
      href={VIP_GROUP_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackLead}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-green-500 font-bold text-white shadow-lg shadow-green-500/25 transition hover:scale-105 hover:bg-green-400 active:scale-95 ${SIZES[size]} ${className}`}
    >
      <MessageCircle size={size === "lg" ? 22 : 18} />
      {label}
    </a>
  );
}
