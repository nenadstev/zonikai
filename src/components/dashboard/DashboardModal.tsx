"use client";

import { X } from "lucide-react";

type Props = {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function DashboardModal({ title, onClose, children, footer }: Props) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-xl border border-border bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="text-sm font-bold">{title}</h3>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 hover:bg-surface" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && <div className="border-t border-border px-5 py-4">{footer}</div>}
      </div>
    </div>
  );
}
