"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { getItems } from "@/lib/api";
import { CATEGORIES, DISTRICTS, TYPES } from "@/lib/constants";
import ItemCard from "@/components/ItemCard";
import { LoadingState, ErrorState, EmptyState } from "@/components/StateViews";

const EMPTY_FILTERS = { category: "", type: "", district: "" };

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const load = useCallback((activeFilters) => {
    setLoading(true);
    setError("");
    getItems(activeFilters)
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message || "Buyumlarni yuklab bo'lmadi."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const hasActiveFilters =
    filters.category || filters.type || filters.district;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-emerald-950 dark:text-emerald-50">
            Buyumlar
          </h1>
          <p className="mt-1 text-sm text-emerald-900/70 dark:text-emerald-100/70">
            Bepul, almashish yoki xayriya uchun qo&apos;yilgan buyumlar
            ro&apos;yxati.
          </p>
        </div>

        <Link
          href="/items/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          + Buyum qo&apos;shish
        </Link>
      </div>

      {/* Filters */}
      <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-white p-4 sm:flex-row sm:flex-wrap sm:items-center dark:border-emerald-900/40 dark:bg-emerald-950/20">
        <FilterSelect
          label="Kategoriya"
          value={filters.category}
          onChange={(v) => updateFilter("category", v)}
          options={CATEGORIES}
        />
        <FilterSelect
          label="Turi"
          value={filters.type}
          onChange={(v) => updateFilter("type", v)}
          options={TYPES}
        />
        <FilterSelect
          label="Tuman"
          value={filters.district}
          onChange={(v) => updateFilter("district", v)}
          options={DISTRICTS.map((d) => ({ value: d, label: d }))}
        />

        {hasActiveFilters && (
          <button
            onClick={() => setFilters(EMPTY_FILTERS)}
            className="text-sm font-medium text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-300 sm:ml-auto"
          >
            Filtrlarni tozalash
          </button>
        )}
      </div>

      {/* Content */}
      <div className="mt-8">
        {loading && <LoadingState label="Buyumlar yuklanmoqda..." />}

        {!loading && error && (
          <ErrorState message={error} onRetry={() => load(filters)} />
        )}

        {!loading && !error && items.length === 0 && (
          <EmptyState
            title="Hozircha buyumlar yo'q"
            description="Filtrlarni o'zgartirib ko'ring yoki birinchi bo'lib buyum qo'shing."
          />
        )}

        {!loading && !error && items.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="flex flex-1 flex-col gap-1 text-xs font-medium text-emerald-900/70 sm:min-w-[160px] dark:text-emerald-100/70">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm text-emerald-950 outline-none focus:border-emerald-500 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-50"
      >
        <option value="">Barchasi</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
