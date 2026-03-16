"use client";

import Link from "next/link";
import type { Trip } from "@/lib/types";
import { Trash2, MapPin, ChevronRight } from "lucide-react";

interface TripCardProps {
  trip: Trip;
  onDelete: () => void;
}

export function TripCard({ trip, onDelete }: TripCardProps) {
  return (
    <article className="group flex w-full items-stretch overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link
        href={`/trips/${trip.id}`}
        className="flex flex-1 items-center justify-between p-6 md:p-7"
      >
        <div className="min-w-0">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-400">
            Journey
          </p>

          <h3 className="text-2xl font-semibold tracking-tight text-stone-900 transition group-hover:text-stone-700">
            {trip.title}
          </h3>

          <div className="mt-3 flex items-center gap-2 text-sm text-stone-500">
            <MapPin size={16} className="text-stone-400" />
            <span className="truncate">{trip.location || "未設定地點"}</span>
          </div>

          {(trip.start_date || trip.end_date) && (
            <p className="mt-3 text-sm text-stone-400">
              {trip.start_date || "—"} {" — "} {trip.end_date || "—"}
            </p>
          )}
        </div>

        <ChevronRight
          size={18}
          className="ml-6 shrink-0 text-stone-400 transition group-hover:translate-x-1 group-hover:text-stone-600"
        />
      </Link>

      <div className="flex items-center border-l border-stone-200 px-4 md:px-5">
        <button
          onClick={(e) => {
            e.preventDefault();
            onDelete();
          }}
          className="rounded-2xl p-3 text-stone-400 transition hover:bg-red-50 hover:text-red-500"
          aria-label="Delete trip"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </article>
  );
}
