"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getItem } from "@/lib/api";
import { categoryLabel, statusLabel, typeLabel } from "@/lib/constants";
import Badge from "@/components/Badge";
import { LoadingState, ErrorState } from "@/components/StateViews";

const TYPE_VARIANT = { bepul: "emerald", almashish: "sky", xayriya: "rose" };
const STATUS_VARIANT = { mavjud: "emerald", band: "amber", berildi: "zinc" };

export default function ItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    if (!id) return;
    setLoading(true);
    setError("");
    getItem(id)
      .then(setItem)
      .catch((err) => setError(err.message || "Buyumni topib bo'lmadi."))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <button
        onClick={() => router.back()}
        className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-300"
      >
        ← Orqaga
      </button>

      <div className="mt-6">
        {loading && <LoadingState label="Buyum yuklanmoqda..." />}

        {!loading && error && (
          <ErrorState message={error} onRetry={load} />
        )}

        {!loading && !error && item && (
          <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm dark:border-emerald-900/40 dark:bg-emerald-950/20">
            <div className="flex h-64 items-center justify-center bg-emerald-50 dark:bg-emerald-900/20">
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-6xl">📦</span>
              )}
            </div>

            <div className="flex flex-col gap-5 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={TYPE_VARIANT[item.type]}>
                  {typeLabel(item.type)}
                </Badge>
                <Badge variant="zinc">{categoryLabel(item.category)}</Badge>
                {item.status && (
                  <Badge variant={STATUS_VARIANT[item.status]}>
                    {statusLabel(item.status)}
                  </Badge>
                )}
              </div>

              <h1 className="text-2xl font-bold text-emerald-950 sm:text-3xl dark:text-emerald-50">
                {item.title}
              </h1>

              <p className="whitespace-pre-line text-emerald-900/80 dark:text-emerald-100/80">
                {item.description}
              </p>

              <dl className="grid gap-4 rounded-xl bg-emerald-50/60 p-4 sm:grid-cols-2 dark:bg-emerald-900/20">
                <Info label="Tuman" value={item.district} icon="📍" />
                {item.createdAt && (
                  <Info
                    label="Joylashtirilgan sana"
                    value={new Date(item.createdAt).toLocaleDateString("uz-UZ")}
                    icon="🗓️"
                  />
                )}
              </dl>

              <div className="rounded-xl border border-emerald-200 bg-white p-5 dark:border-emerald-800 dark:bg-emerald-950/40">
                <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                  Kontakt ma&apos;lumoti
                </p>
                <p className="mt-2 text-lg font-semibold text-emerald-950 dark:text-emerald-50">
                  👤 {item.ownerName}
                </p>
                <p className="mt-1 text-emerald-800 dark:text-emerald-200">
                  ☎️ {item.ownerContact}
                </p>
              </div>

              <Link
                href="/items"
                className="self-start rounded-full border-2 border-emerald-600 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-900/30"
              >
                Ro&apos;yxatga qaytish
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Info({ label, value, icon }) {
  return (
    <div>
      <dt className="text-xs font-medium text-emerald-700/70 dark:text-emerald-300/70">
        {icon} {label}
      </dt>
      <dd className="mt-0.5 text-sm font-semibold text-emerald-950 dark:text-emerald-50">
        {value}
      </dd>
    </div>
  );
}
