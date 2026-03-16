"use client";

import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/30 p-4 backdrop-blur-[2px]">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
          <div>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-stone-900">
              {title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="bg-stone-50/60 px-6 py-6">{children}</div>
      </div>
    </div>
  );
}
