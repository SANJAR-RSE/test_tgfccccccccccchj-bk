import Badge from "@/components/Badge";
import { pointTypeLabel } from "@/lib/constants";

export default function PointCard({ point }) {
  const hasLocation =
    point.location &&
    typeof point.location.lat === "number" &&
    typeof point.location.lng === "number";

  const mapsUrl = hasLocation
    ? `https://www.google.com/maps?q=${point.location.lat},${point.location.lng}`
    : `https://www.google.com/maps?q=${encodeURIComponent(point.address || point.name)}`;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-emerald-900/40 dark:bg-emerald-950/20">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={point.type === "qayta_ishlash" ? "emerald" : "sky"}>
          {pointTypeLabel(point.type)}
        </Badge>
        <Badge variant="zinc">📍 {point.district}</Badge>
      </div>

      <h3 className="text-base font-semibold text-emerald-950 dark:text-emerald-50">
        {point.name}
      </h3>

      <p className="text-sm text-emerald-900/70 dark:text-emerald-100/70">
        {point.address}
      </p>

      <p className="text-sm text-emerald-900/70 dark:text-emerald-100/70">
        🕒 {point.workingHours}
      </p>

      {Array.isArray(point.acceptedMaterials) && point.acceptedMaterials.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {point.acceptedMaterials.map((material) => (
            <span
              key={material}
              className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
            >
              {material}
            </span>
          ))}
        </div>
      )}

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        🗺️ Xaritada ko&apos;rish
      </a>
    </div>
  );
}
