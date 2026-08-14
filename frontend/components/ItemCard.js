import Link from "next/link";
import Badge from "@/components/Badge";
import { categoryLabel, statusLabel, typeLabel } from "@/lib/constants";

const TYPE_VARIANT = {
  bepul: "emerald",
  almashish: "sky",
  xayriya: "rose",
};

const STATUS_VARIANT = {
  mavjud: "emerald",
  band: "amber",
  berildi: "zinc",
};

export default function ItemCard({ item }) {
  return (
    <Link
      href={`/items/${item._id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-emerald-900/40 dark:bg-emerald-950/20"
    >
      <div className="flex h-40 items-center justify-center overflow-hidden bg-emerald-50 dark:bg-emerald-900/20">
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <span className="text-4xl">📦</span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={TYPE_VARIANT[item.type]}>{typeLabel(item.type)}</Badge>
          <Badge variant="zinc">{categoryLabel(item.category)}</Badge>
          {item.status && item.status !== "mavjud" && (
            <Badge variant={STATUS_VARIANT[item.status]}>
              {statusLabel(item.status)}
            </Badge>
          )}
        </div>

        <h3 className="line-clamp-2 text-base font-semibold text-emerald-950 dark:text-emerald-50">
          {item.title}
        </h3>

        <div className="mt-auto flex flex-col gap-1 text-sm text-emerald-900/70 dark:text-emerald-100/70">
          <span className="flex items-center gap-1.5">
            📍 {item.district}
          </span>
          <span className="flex items-center gap-1.5">
            👤 {item.ownerName} · {item.ownerContact}
          </span>
        </div>
      </div>
    </Link>
  );
}
