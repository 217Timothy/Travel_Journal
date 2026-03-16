import axios from "axios";
import type { Trip, CreateTripPayload, UpdateTripPayload } from "./types";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

// 自動帶入登入後的 Token
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const tripService = {
  getTrips: async (): Promise<Trip[]> => {
    const response = await api.get("/trips/");
    return response.data;
  },

  getTrip: async (trip_id: number): Promise<Trip> => {
    const response = await api.get(`/trips/${trip_id}`);
    return response.data;
  },

  createTrip: async (data: CreateTripPayload): Promise<Trip> => {
    console.log("tripService.createTrip data:", data);
    const response = await api.post("/trips/", data);
    return response.data;
  },

  updateTrip: async (
    trip_id: number,
    data: UpdateTripPayload,
  ): Promise<Trip> => {
    const response = await api.patch(`/trips/${trip_id}`, data);
    return response.data;
  },

  deleteTrip: async (trip_id: number): Promise<void> => {
    await api.delete(`/trips/${trip_id}`);
  },
};
