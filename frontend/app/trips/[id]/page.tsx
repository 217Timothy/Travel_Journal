"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Calendar,
  MapPin,
  Plus,
  PencilLine,
  Save,
  X,
} from "lucide-react";
import { tripService } from "@/lib/api";
import type { Trip } from "@/lib/types";

interface TripFormData {
  title: string;
  location: string;
  description: string;
  start_date: string;
  end_date: string;
}

export default function TripDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<TripFormData>({
    title: "",
    location: "",
    description: "",
    start_date: "",
    end_date: "",
  });

  const fetchTrip = async () => {
    try {
      const data = await tripService.getTrip(id);
      setTrip(data);
    } catch (err) {
      console.error("Failed to fetch trip", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!Number.isNaN(id)) {
      fetchTrip();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditStart = () => {
    if (!trip) return;

    setFormData({
      title: trip.title ?? "",
      location: trip.location ?? "",
      description: trip.description ?? "",
      start_date: trip.start_date ?? "",
      end_date: trip.end_date ?? "",
    });

    setIsEditing(true);
  };

  const handleCancel = () => {
    if (!trip) return;

    setFormData({
      title: trip.title ?? "",
      location: trip.location ?? "",
      description: trip.description ?? "",
      start_date: trip.start_date ?? "",
      end_date: trip.end_date ?? "",
    });

    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!trip) return;
    if (!formData.title.trim()) return;
    if (!formData.location.trim()) return;

    try {
      setSaving(true);

      const updatedTrip = await tripService.updateTrip(trip.id, {
        title: formData.title.trim(),
        location: formData.location.trim(),
        description: formData.description.trim() || undefined,
        start_date: formData.start_date || undefined,
        end_date: formData.end_date || undefined,
      });

      setTrip(updatedTrip);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update trip:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-100 text-stone-800">
      <section className="mx-auto max-w-5xl px-6 py-10 md:px-8 md:py-14">
        <header className="mb-8 flex items-center justify-between border-b border-stone-300 pb-5">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-sm text-stone-500 transition hover:text-stone-800"
          >
            <ChevronLeft size={20} />
            <span>返回旅程列表</span>
          </button>

          <p className="text-xs uppercase tracking-[0.22em] text-stone-400">
            <span className="block">Your Journey</span>
            <span className="block font-mono text-stone-500">
              TRIP_ID {trip?.id}
            </span>
          </p>
        </header>

        {loading ? (
          <div className="rounded-3xl border border-stone-200 bg-white px-8 py-16 text-center shadow-sm">
            <p className="text-sm tracking-wide text-stone-500">
              正在翻閱這一頁旅程...
            </p>
          </div>
        ) : !trip ? (
          <div className="rounded-3xl border border-dashed border-stone-300 bg-white/80 px-8 py-16 text-center shadow-sm">
            <p className="text-lg font-medium text-stone-700">找不到這段旅程</p>
            <p className="mt-3 text-sm leading-7 text-stone-500">
              這一頁似乎遺失了，請返回旅程列表再試一次。
            </p>
          </div>
        ) : (
          <div className="rounded-[2rem] border border-stone-200 bg-white px-7 py-8 shadow-sm md:px-10 md:py-10">
            {/* 主資訊區 */}
            <section className="rounded-[2rem] border border-stone-200 bg-white px-7 py-8 shadow-sm md:px-10 md:py-10">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-400">
                    Travel Journal
                  </p>

                  {!isEditing ? (
                    <h1 className="text-4xl font-semibold tracking-tight text-stone-900 md:text-5xl">
                      {trip.title}
                    </h1>
                  ) : (
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-3xl font-semibold tracking-tight text-stone-900 outline-none transition focus:border-stone-500 md:text-4xl"
                      placeholder="旅程名稱"
                    />
                  )}
                </div>

                {!isEditing ? (
                  <button
                    onClick={handleEditStart}
                    className="inline-flex items-center gap-2 rounded-full border border-amber-400 bg-amber-400 px-5 py-2.5 text-sm font-medium text-stone-900 transition hover:bg-amber-500"
                  >
                    <PencilLine size={16} />
                    <span>編輯</span>
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancel}
                      className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
                    >
                      <X size={16} />
                      <span>取消</span>
                    </button>

                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2.5 text-sm font-medium transition hover:bg-amber-500 disabled:opacity-60"
                    >
                      <Save size={16} className="text-stone-700" />
                      <span className="text-stone-800">
                        {saving ? "儲存中..." : "儲存"}
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {!isEditing ? (
                <div className="mt-5 flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600">
                    <MapPin size={15} className="text-amber-700" />
                    <span>{trip.location}</span>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-600">
                    <Calendar size={15} className="text-amber-700" />
                    <span>
                      {trip.start_date || "未設定開始日期"} {" — "}
                      {trip.end_date || "未設定結束日期"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-stone-600">
                      地點
                    </label>

                    <div className="flex items-center gap-3 rounded-2xl border border-stone-300 bg-stone-50 px-4 transition focus-within:border-stone-500">
                      <MapPin className="shrink-0 text-stone-500" size={18} />
                      <input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full bg-transparent py-3 text-stone-800 outline-none placeholder:text-stone-400"
                        placeholder="輸入目的地"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-stone-600">
                      開始日期
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-800 outline-none transition focus:border-stone-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-stone-600">
                      結束日期
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-stone-800 outline-none transition focus:border-stone-500"
                    />
                  </div>
                </div>
              )}

              <div className="mt-8 border-t border-stone-200 pt-6">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-stone-400">
                  Notes
                </h2>
              </div>
              {!isEditing ? (
                <p className="max-w-3xl text-sm leading-8 text-stone-600">
                  {trip.description || "這段旅程還沒有補上描述。"}
                </p>
              ) : (
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="寫下一點關於這趟旅程的想法..."
                  className="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm leading-7 text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-stone-500"
                />
              )}
            </section>

            {/* Itinerary 區塊 */}
            <section className="rounded-[2rem] border border-stone-200 bg-white px-7 py-8 shadow-sm md:px-10">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
                    你的行程
                  </h2>
                  <p className="mt-2 text-sm text-stone-500">
                    在這裡安排每日的路線、景點與備註。
                  </p>
                </div>

                <button className="inline-flex items-center gap-2 rounded-full border border-amber-400 bg-amber-400 px-5 py-2.5 text-sm font-medium text-stone-900 transition hover:bg-amber-500">
                  <Plus size={16} />
                  <span>新增行程</span>
                </button>
              </div>

              <div className="rounded-3xl border border-dashed border-stone-300 bg-stone-50 px-6 py-12 text-center">
                <p className="text-base font-medium text-stone-700">
                  尚未加入行程項目
                </p>
                <p className="mt-3 text-sm leading-7 text-stone-500">
                  你的旅行計畫會從這裡慢慢長出來。
                </p>
              </div>
            </section>

            {/* Memories 區塊 */}
            <section className="rounded-[2rem] border border-stone-200 bg-white px-7 py-8 shadow-sm md:px-10">
              <div className="mb-5">
                <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
                  回憶
                </h2>
                <p className="mt-2 text-sm text-stone-500">
                  之後你可以在這裡收集照片與旅途片段。
                </p>
              </div>

              <div className="rounded-3xl border border-dashed border-stone-300 bg-stone-50 px-6 py-12 text-center">
                <p className="text-base font-medium text-stone-700">
                  目前還沒有照片
                </p>
                <p className="mt-3 text-sm leading-7 text-stone-500">
                  留下影像之後，這一頁會更像一本真正的旅行手帳。
                </p>
              </div>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}
