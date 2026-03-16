"use client";

import Modal from "./Modal";
import { AlertTriangle, Trash2 } from "lucide-react";

interface DeleteModelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  tripTitle: string;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  tripTitle,
}: DeleteModelProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="刪除旅程記錄">
      <div className="flex flex-col items-center text-center space-y-6 w-full">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 animate-pulse">
          <AlertTriangle size={24} />
        </div>

        <div className="space-y-2">
          <p className="text-stone-1000 text-lg">
            確定要刪除
            <span className="text-stone-900 font-bold"> ”{tripTitle}“</span>
          </p>
          <p className="text-stone-700 text-sm">
            一旦刪除，這段旅程的所有景點紀錄將會永久消失。
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-3 pt-2">
          <button
            onClick={onClose}
            className="rounded-2xl border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
          >
            取消
          </button>

          <button
            onClick={onConfirm}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-600"
          >
            <Trash2 size={18} />
            確認刪除
          </button>
        </div>
      </div>
    </Modal>
  );
}
