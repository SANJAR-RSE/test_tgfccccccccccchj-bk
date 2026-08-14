import Link from "next/link";

const FEATURES = [
  {
    icon: "🎁",
    title: "Bepul / Almashish",
    description:
      "Ishlatmayotgan texnika, mebel, kitob va boshqa buyumlaringizni bepul bering yoki kerakli narsaga almashing.",
  },
  {
    icon: "💚",
    title: "Xayriya",
    description:
      "Buyumlaringizni muhtoj oilalarga yoki xayriya tashkilotlariga yetkazishga yordam bering.",
  },
  {
    icon: "♻️",
    title: "Qayta ishlash punktlari",
    description:
      "Yaqiningizdagi qayta ishlash va saralash punktlarini xaritada toping — plastik, qog'oz, shisha va boshqalar uchun.",
  },
];

const STEPS = [
  {
    step: "1",
    title: "Buyum joylashtiring",
    description: "Kerak bo'lmagan buyumingiz haqida qisqacha ma'lumot kiriting.",
  },
  {
    step: "2",
    title: "Bog'lanishadi",
    description: "Qiziqqan odamlar sizning kontakt ma'lumotingiz orqali bog'lanadi.",
  },
  {
    step: "3",
    title: "Muhitni asrang",
    description: "Buyum chiqindiga aylanish o'rniga yana xizmat qiladi.",
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-white to-white dark:from-emerald-950/40 dark:via-[#0c1712] dark:to-[#0c1712]">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl dark:bg-emerald-800/20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-40 left-[-10%] h-72 w-72 rounded-full bg-lime-200/50 blur-3xl dark:bg-lime-800/10"
        />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            🌍 Toshkent uchun eko-tashabbus
          </span>

          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-emerald-950 sm:text-5xl md:text-6xl dark:text-emerald-50">
            Eco Tashkent — Shahar ekologiyasi va buyumlar almashinuvi
          </h1>

          <p className="max-w-2xl text-lg text-emerald-900/70 sm:text-xl dark:text-emerald-100/70">
            Ishlatilmayotgan buyumlaringizga yangi hayot bering: bepul bering,
            almashing yoki xayriya qiling. Shahringizdagi qayta ishlash
            punktlarini toping va tabiatga g&apos;amxo&apos;rlik qiling.
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/items"
              className="rounded-full bg-emerald-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
            >
              Buyumlarni ko&apos;rish
            </Link>
            <Link
              href="/points"
              className="rounded-full border-2 border-emerald-600 px-7 py-3.5 text-base font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-900/30"
            >
              Qayta ishlash punktlari
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-emerald-950 dark:text-emerald-50">
            Nima qila olasiz?
          </h2>
          <p className="mt-3 text-emerald-900/70 dark:text-emerald-100/70">
            Bir necha bosqichda buyumingizga yangi egasini toping yoki
            atrof-muhitni asrashga hissa qo&apos;shing.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-emerald-900/40 dark:bg-emerald-950/20"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl dark:bg-emerald-900/40">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-emerald-950 dark:text-emerald-50">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-emerald-900/70 dark:text-emerald-100/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-emerald-50/60 py-16 sm:py-24 dark:bg-emerald-950/20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-emerald-950 dark:text-emerald-50">
            Qanday ishlaydi
          </h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {STEPS.map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-emerald-950 dark:text-emerald-50">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-emerald-900/70 dark:text-emerald-100/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-emerald-600 px-6 py-14 text-center shadow-xl shadow-emerald-600/20 sm:px-12">
          <h2 className="text-3xl font-bold text-white">
            Bugun buyumingizga yangi hayot bering
          </h2>
          <p className="max-w-xl text-emerald-50/90">
            Bir necha daqiqada e&apos;lon joylashtiring va Toshkent
            aholisiga foydali bo&apos;ling.
          </p>
          <Link
            href="/items/new"
            className="rounded-full bg-white px-7 py-3.5 text-base font-semibold text-emerald-700 shadow-lg transition hover:bg-emerald-50"
          >
            Buyum qo&apos;shish
          </Link>
        </div>
      </section>
    </div>
  );
}
