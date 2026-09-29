"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { routes } from "@/data/navigation";
import { OTHER_SERVICE_OPTION, serviceOptionGroups } from "@/data/services";
import { SELECT_SERVICE_EVENT } from "@/components/OrderButton";
import { LIMITS, validateLead, type LeadErrors, type LeadInput } from "@/lib/leads";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const emptyLead: LeadInput = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
  consent: false,
  website: "",
};

export function ContactForm({ defaultService = "", className }: { defaultService?: string; className?: string }) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<LeadInput>({ ...emptyLead, service: defaultService });
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");

  const id = (name: string) => `${uid}-${name}`;

  // "Заказать" buttons preselect the service in the form on the same page.
  useEffect(() => {
    const onSelect = (event: Event) => {
      const service = (event as CustomEvent<string>).detail;
      setStatus("idle");
      setValues((prev) => ({ ...prev, service }));
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  function update<K extends keyof LeadInput>(key: K, value: LeadInput[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function focusFirstError(found: LeadErrors) {
    const first = (Object.keys(found) as (keyof LeadInput)[])[0];
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateLead(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      focusFirstError(found);
      return;
    }

    setStatus("loading");
    setServerMessage("");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: LeadErrors;
        message?: string;
      };
      if (response.ok && data.ok) {
        setStatus("success");
        setValues({ ...emptyLead, service: defaultService });
        return;
      }
      if (data.errors) {
        setErrors(data.errors);
        focusFirstError(data.errors);
      }
      setServerMessage(data.message ?? "Проверьте правильность заполнения формы.");
      setStatus("error");
    } catch {
      setServerMessage("Не удалось отправить заявку. Проверьте подключение к интернету и попробуйте ещё раз.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn("flex flex-col items-start border border-line bg-white p-8 sm:p-12", className)}
      >
        <span className="grid size-14 place-items-center rounded-full border border-gold text-gold-deep">
          <Check aria-hidden="true" className="size-6" strokeWidth={1.5} />
        </span>
        <p className="text-h3 mt-8 text-ink">Спасибо!</p>
        <p className="mt-3 max-w-md text-muted">
          Мы получили вашу заявку и свяжемся с вами в ближайшее время.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-underline mt-8 text-[0.9rem] font-semibold text-ink"
        >
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  const loading = status === "loading";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      aria-busy={loading}
      className={cn("border border-line bg-white p-6 sm:p-10", className)}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={id("name")} label="Имя" error={errors.name} required>
          <input
            id={id("name")}
            name="name"
            required
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass(errors.name)}
            {...describedBy(id("name"), errors.name)}
          />
        </Field>
        <Field id={id("phone")} label="Телефон" error={errors.phone} required>
          <input
            id={id("phone")}
            name="phone"
            required
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder="+000 00 000 000"
            maxLength={LIMITS.phone}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass(errors.phone)}
            {...describedBy(id("phone"), errors.phone)}
          />
        </Field>
        <Field id={id("email")} label="Почта" error={errors.email}>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass(errors.email)}
            {...describedBy(id("email"), errors.email)}
          />
        </Field>
        <Field id={id("service")} label="Какая услуга интересует?" error={errors.service}>
          <select
            id={id("service")}
            name="service"
            value={values.service}
            onChange={(e) => update("service", e.target.value)}
            className={cn(inputClass(errors.service), "appearance-none bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10")}
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5l5 5 5-5' stroke='%23172033' stroke-width='1.3'/%3E%3C/svg%3E\")",
            }}
            {...describedBy(id("service"), errors.service)}
          >
            <option value="">Выберите услугу</option>
            {serviceOptionGroups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((option) => (
                  <option key={option} value={option}>
                    {option.replace(`${group.label}: `, "")}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value={OTHER_SERVICE_OPTION}>{OTHER_SERVICE_OPTION}</option>
          </select>
        </Field>
        <Field id={id("message")} label="Сообщение" error={errors.message} className="sm:col-span-2">
          <textarea
            id={id("message")}
            name="message"
            rows={4}
            maxLength={LIMITS.message}
            placeholder="Коротко опишите задачу"
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            className={cn(inputClass(errors.message), "resize-y")}
            {...describedBy(id("message"), errors.message)}
          />
        </Field>
      </div>

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input
          id={id("website")}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="mt-7">
        <div className="flex items-start gap-3">
          <input
            id={id("consent")}
            name="consent"
            required
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update("consent", e.target.checked)}
            className="mt-1 size-5 shrink-0 cursor-pointer accent-navy-950"
            {...describedBy(id("consent"), errors.consent)}
          />
          <label htmlFor={id("consent")} className="cursor-pointer text-[0.9rem] text-muted">
            Я согласен с{" "}
            <Link href={routes.privacy} className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink">
              политикой конфиденциальности
            </Link>
            .
          </label>
        </div>
        {errors.consent && <ErrorText id={`${id("consent")}-error`}>{errors.consent}</ErrorText>}
      </div>

      {status === "error" && serverMessage && (
        <div role="alert" className="mt-6 flex items-start gap-3 border border-red-200 bg-red-50 p-4 text-[0.9rem] text-red-800">
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
          <p>{serverMessage}</p>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={loading} arrow={!loading} className="w-full sm:w-auto">
          {loading ? (
            <span className="inline-flex items-center gap-3">
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Отправка…
            </span>
          ) : (
            "Отправить"
          )}
        </Button>
        <p className="text-[0.8rem] text-muted">
          <span aria-hidden="true">*</span> обязательные поля
        </p>
      </div>
      <p className="sr-only" aria-live="polite">
        {loading ? "Отправляем заявку" : ""}
      </p>
    </form>
  );
}

function inputClass(error?: string) {
  return cn(
    "block min-h-12 w-full rounded-[2px] border bg-white px-4 py-3 text-[1rem] text-ink placeholder:text-muted/70 transition-[border-color,box-shadow] duration-300 focus:outline-none focus-visible:outline-none focus:ring-1",
    error
      ? "border-red-700 focus:border-red-700 focus:ring-red-700"
      : "border-line hover:border-ink/40 focus:border-navy-950 focus:ring-navy-950",
  );
}

function describedBy(fieldId: string, error?: string) {
  return error
    ? { "aria-invalid": true as const, "aria-describedby": `${fieldId}-error` }
    : { "aria-invalid": false as const };
}

function Field({
  id,
  label,
  error,
  required,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[0.85rem] font-semibold text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-gold-deep">
            *
          </span>
        )}
      </label>
      {children}
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 text-[0.85rem] text-red-700">
      {children}
    </p>
  );
}
