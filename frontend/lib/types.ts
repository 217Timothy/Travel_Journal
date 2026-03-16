// 前端要輸出出去的
export interface Trip {
  id: number;
  title: string;
  location: string;
  description?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  owner_id: number;
  created_at: string;
  updated_at: string;
}

// 前端要輸入進來的 for create new trip
export interface CreateTripPayload {
  title: string;
  location: string;
  description?: string | null;
  start_date?: string | null;
  end_date?: string | null;
}

// 前端要輸入進來的 for update trip[id]
export interface UpdateTripPayload {
  title?: string | null;
  location?: string | null;
  description?: string | null;
  start_date?: string | null;
  end_date?: string | null;
}
