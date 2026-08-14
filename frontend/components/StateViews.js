export function LoadingState({ label = "Yuklanmoqda..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-emerald-700">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}

export function ErrorState({
  message = "Nimadir xato ketdi.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-6 py-14 text-center dark:border-red-900/40 dark:bg-red-950/30">
      <div className="text-3xl">⚠️</div>
      <p className="max-w-md text-sm font-medium text-red-700 dark:text-red-300">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 rounded-full bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          Qayta urinish
        </button>
      )}
    </div>
  );
}

export function EmptyState({
  title = "Hech narsa topilmadi",
  description = "",
  icon = "🌿",
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/60 px-6 py-16 text-center dark:border-emerald-800 dark:bg-emerald-950/20">
      <div className="text-4xl">{icon}</div>
      <p className="text-base font-semibold text-emerald-900 dark:text-emerald-100">
        {title}
      </p>
      {description && (
        <p className="max-w-sm text-sm text-emerald-700/80 dark:text-emerald-300/80">
          {description}
        </p>
      )}
    </div>
  );
}
