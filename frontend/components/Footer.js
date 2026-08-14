import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-emerald-50/60 dark:border-emerald-900/40 dark:bg-emerald-950/20">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-lg font-bold text-emerald-800 dark:text-emerald-200">
            <span className="text-2xl">🌱</span>
            Eco Tashkent
          </div>
          <p className="mt-3 max-w-xs text-sm text-emerald-900/70 dark:text-emerald-100/70">
            Shahar ekologiyasi va buyumlar almashinuvi ekotizimi. Kerak
            bo&apos;lmagan buyumlarga yangi hayot bering, tabiatga g&apos;amxo&apos;rlik
            qiling.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
            Havolalar
          </p>
          <ul className="mt-3 space-y-2 text-sm text-emerald-900/70 dark:text-emerald-100/70">
            <li>
              <Link href="/items" className="hover:text-emerald-700 dark:hover:text-emerald-300">
                Buyumlar
              </Link>
            </li>
            <li>
              <Link href="/points" className="hover:text-emerald-700 dark:hover:text-emerald-300">
                Qayta ishlash punktlari
              </Link>
            </li>
            <li>
              <Link href="/items/new" className="hover:text-emerald-700 dark:hover:text-emerald-300">
                Buyum qo&apos;shish
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
            Telegram bot
          </p>
          <p className="mt-3 text-sm text-emerald-900/70 dark:text-emerald-100/70">
            Botimiz orqali ham buyum joylashingiz mumkin.
          </p>
          <a
            href="https://t.me/eco_tashkent_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            ✈️ @eco_tashkent_bot
          </a>
        </div>
      </div>

      <div className="border-t border-emerald-100 px-4 py-4 text-center text-xs text-emerald-900/60 sm:px-6 dark:border-emerald-900/40 dark:text-emerald-100/60">
        © {new Date().getFullYear()} Eco Tashkent — hackathon loyihasi
      </div>
    </footer>
  );
}
