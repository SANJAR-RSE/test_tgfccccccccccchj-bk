"use client";

import { useCallback, useEffect, useState } from "react";
import { getPoints } from "@/lib/api";
import { DISTRICTS } from "@/lib/constants";
import PointCard from "@/components/PointCard";
import { LoadingState, ErrorState, EmptyState } from "@/components/StateViews";

export default function PointsPage() {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [district, setDistrict] = useState("");

  const load = useCallback((activeDistrict) => {
    setLoading(true);
    setError("");
    getPoints(activeDistrict ? { district: activeDistrict } : {})
      .then((data) => setPoints(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Punktlarni yuklab bo'lmadi."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load(district);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [district]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div>
        <h1 className="text-3xl font-bold text-emerald-950 dark:text-emerald-50">
          Qayta ishlash punktlari
        </h1>
        <p className="mt-1 text-sm text-emerald-900/70 dark:text-emerald-100/70">
          Yaqiningizdagi qayta ishlash va saralash punktlarini toping.
        </p>
      </div>

      {/* Filter */}
      <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-white p-4 sm:flex-row sm:items-center dark:border-emerald-900/40 dark:bg-emerald-950/20">
        <label className="flex flex-1 flex-col gap-1 text-xs font-medium text-emerald-900/70 sm:max-w-xs dark:text-emerald-100/70">
          Tuman
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm text-emerald-950 outline-none focus:border-emerald-500 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-50"
          >
            <option value="">Barcha tumanlar</option>
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>

        {district && (
          <button
            onClick={() => setDistrict("")}
            className="text-sm font-medium text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-300 sm:ml-auto"
          >
            Filtrni tozalash
          </button>
        )}
      </div>

      {/* Content */}
      <div className="mt-8">
        {loading && <LoadingState label="Punktlar yuklanmoqda..." />}

        {!loading && error && (
          <ErrorState message={error} onRetry={() => load(district)} />
        )}

        {!loading && !error && points.length === 0 && (
          <EmptyState
            title="Punktlar topilmadi"
            description="Boshqa tumanni tanlab ko'ring."
            icon="♻️"
          />
        )}

        {!loading && !error && points.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {points.map((point) => (
              <PointCard key={point._id} point={point} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
