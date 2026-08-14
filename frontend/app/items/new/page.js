"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createItem } from "@/lib/api";
import { CATEGORIES, DISTRICTS, TYPES } from "@/lib/constants";

const INITIAL_FORM = {
  title: "",
  description: "",
  category: CATEGORIES[0].value,
  type: TYPES[0].value,
  ownerName: "",
  ownerContact: "",
  district: DISTRICTS[0],
  imageUrl: "",
};

export default function NewItemPage() {
  const router = useRouter();
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      type: form.type,
      ownerName: form.ownerName.trim(),
      ownerContact: form.ownerContact.trim(),
      district: form.district,
    };
    if (form.imageUrl.trim()) payload.imageUrl = form.imageUrl.trim();

    try {
      await createItem(payload);
      router.push("/items");
    } catch (err) {
      setError(err.message || "Buyumni saqlab bo'lmadi. Qayta urinib ko'ring.");
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <Link
        href="/items"
        className="text-sm font-medium text-emerald-700 hover:underline dark:text-emerald-300"
      >
        ← Buyumlar ro&apos;yxatiga qaytish
      </Link>

      <h1 className="mt-4 text-3xl font-bold text-emerald-950 dark:text-emerald-50">
        Buyum qo&apos;shish
      </h1>
      <p className="mt-1 text-sm text-emerald-900/70 dark:text-emerald-100/70">
        Ma&apos;lumotlarni to&apos;ldiring — e&apos;lon darhol ro&apos;yxatda
        paydo bo&apos;ladi.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col gap-5 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm dark:border-emerald-900/40 dark:bg-emerald-950/20"
      >
        <Field label="Sarlavha" required>
          <input
            type="text"
            required
            maxLength={120}
            value={form.title}
            onChange={handleChange("title")}
            placeholder="Masalan: Ishlatilgan noutbuk"
            className="input"
          />
        </Field>

        <Field label="Tavsif" required>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={handleChange("description")}
            placeholder="Buyum haqida qisqacha ma'lumot bering..."
            className="input resize-none"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Kategoriya" required>
            <select
              value={form.category}
              onChange={handleChange("category")}
              className="input"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Turi" required>
            <select
              value={form.type}
              onChange={handleChange("type")}
              className="input"
            >
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Ismingiz" required>
            <input
              type="text"
              required
              maxLength={80}
              value={form.ownerName}
              onChange={handleChange("ownerName")}
              placeholder="Masalan: Aziz"
              className="input"
            />
          </Field>

          <Field label="Kontakt (telefon / telegram)" required>
            <input
              type="text"
              required
              maxLength={80}
              value={form.ownerContact}
              onChange={handleChange("ownerContact")}
              placeholder="+998 90 123 45 67 yoki @username"
              className="input"
            />
          </Field>
        </div>

        <Field label="Tuman" required>
          <select
            value={form.district}
            onChange={handleChange("district")}
            className="input"
          >
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Rasm havolasi (ixtiyoriy)">
          <input
            type="url"
            value={form.imageUrl}
            onChange={handleChange("imageUrl")}
            placeholder="https://..."
            className="input"
          />
        </Field>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-2 rounded-full bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Saqlanmoqda..." : "Buyumni joylashtirish"}
        </button>
      </form>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid rgb(167 243 208 / 0.6);
          background: white;
          padding: 0.6rem 0.75rem;
          font-size: 0.9rem;
          color: #052e21;
          outline: none;
        }
        .input:focus {
          border-color: #10b981;
        }
        :global(.dark) .input {
          background: rgba(6, 78, 59, 0.2);
          border-color: rgba(6, 95, 70, 0.6);
          color: #ecfdf5;
        }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm font-medium text-emerald-900 dark:text-emerald-100">
      <span>
        {label}
        {required && <span className="text-rose-500"> *</span>}
      </span>
      {children}
    </label>
  );
}
