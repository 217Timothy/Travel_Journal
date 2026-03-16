"use client";

import { useEffect, useState } from "react";
import { Plus, Plane, MapPin, Send } from "lucide-react";
import { tripService } from "@/lib/api";
import type { Trip } from "@/lib/types";
import { TripCard } from "../../components/trip/TripCard";
import Modal from "../../components/ui/Modal";
import DeleteModal from "../../components/ui/DeleteModal";

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState<Trip | null>(null);
  const [newTrip, setNewTrip] = useState({
    title: "",
    location: "",
  });

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const data = await tripService.getTrips();
      setTrips(data);
    } catch (err) {
      console.error("抓取失敗", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleCreate = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTrip.title.trim() || !newTrip.location.trim()) {
      setCreateError("旅程標題與地點不能為空");
      return;
    }

    try {
      setCreating(true);
      setCreateError(null);

      await tripService.createTrip({
        title: newTrip.title.trim(),
        location: newTrip.location.trim(),
      });
      setNewTrip({ title: "", location: "" });
      setIsModalOpen(false);
      fetchTrips();
    } catch (err) {
      console.error("建立旅程失敗", err);
      setCreateError("建立旅程失敗，請稍後再試");
    } finally {
      setCreating(false);
    }
  };

  const resetCreateForm = () => {
    setNewTrip({ title: "", location: "" });
    setCreateError(null);
  };

  const openCreateModal = () => {
    resetCreateForm();
    setIsModalOpen(true);
  };

  const closeCreateModal = () => {
    resetCreateForm();
    setIsModalOpen(false);
  };

  const openDeleteModal = (trip: Trip) => {
    setTripToDelete(trip);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (tripToDelete) {
      await tripService.deleteTrip(tripToDelete.id);
      setIsDeleteModalOpen(false);
      setTripToDelete(null);
      fetchTrips();
    }
  };

  return (
    <main className="min-h-screen bg-stone-100 text-stone-800">
      <section className="mx-auto max-w-5xl px-6 py-10 md:px-8 md:py-14">
        <header className="mb-10 border-b border-stone-300 pb-6">
          <div className="mb-3 flex items-center gap-2 text-stone-500">
            <Plane size={24} className="text-amber-600" />
            <span className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-600">
              Travel Journal
            </span>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-stone-900 md:text-5xl">
                My Journeys
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-600">
                像翻開一本旅行筆記，收集每一段路途、目的地與即將出發的念頭。
              </p>
            </div>

            <button
              onClick={openCreateModal}
              className="flex items-center gap-2 rounded-full border border-amber-400 bg-amber-400 px-8 py-3 font-medium shadow-sm shadow-amber-500/20 transition hover:bg-amber-500"
            >
              <Plus size={24} className="text-stone-700" />
              <span className="text-stone-800">開始新旅程</span>
            </button>
          </div>
        </header>

        {loading ? (
          <div className="rounded-3xl border border-stone-200 bg-white px-8 py-16 text-center shadow-sm">
            <p className="text-sm tracking-wide text-stone-500">正在翻開手帳</p>
          </div>
        ) : trips.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-stone-300 bg-white/80 px-8 py-20 text-center shadow-sm">
            <p className="text-base text-stone-700">目前還沒有行程</p>
            <p className="mt-3 text-sm leading-7 text-stone-500">
              點擊右上角，開始紀錄你的冒險。
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onDelete={() => openDeleteModal(trip)}
              />
            ))}
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={closeCreateModal}
          title="開啟新的冒險篇章"
        >
          <form onSubmit={handleCreate} className="space-y-6">
            {createError && (
              <p className="text-sm text-red-500">{createError}</p>
            )}
            <div>
              <label className="mb-2 block text-sm font-medium text-stone-600">
                旅程名稱
              </label>
              <input
                type="text"
                placeholder="為這趟旅程取一個名字"
                className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-stone-500"
                value={newTrip.title}
                onChange={(e) =>
                  setNewTrip({ ...newTrip, title: e.target.value })
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-stone-600">
                目的地
              </label>
              <div className="flex items-center gap-3 rounded-2xl border border-stone-300 bg-stone-50 px-4 transition focus-within:border-stone-500">
                <MapPin className="shrink-0 text-stone-500" size={18} />
                <input
                  type="text"
                  placeholder="地點..."
                  className="w-full bg-transparent py-3 text-stone-800 outline-none placeholder:text-stone-400"
                  value={newTrip.location}
                  onChange={(e) =>
                    setNewTrip({ ...newTrip, location: e.target.value })
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={creating}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 py-4 font-medium transition hover:bg-amber-500"
            >
              <Send size={18} className="text-stone-700" />
              <span className="text-stone-800">
                {creating ? "建立中..." : "確認建立"}
              </span>
            </button>
          </form>
        </Modal>

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          tripTitle={tripToDelete?.title || ""}
        />
      </section>
    </main>
  );
}
