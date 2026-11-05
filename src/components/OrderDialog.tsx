import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { orderForm } from "@/config";
import { submitOrder } from "@/lib/orderApi";

type OrderDialogContextValue = {
  openDialog: (service?: string) => void;
};

const OrderDialogContext = createContext<OrderDialogContextValue>({
  openDialog: () => {},
});

export function useOrderDialog() {
  return useContext(OrderDialogContext);
}

/* ---------- Валидация ---------- */

type FormState = {
  name: string;
  phone: string;
  service: string;
  comment: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialForm: FormState = {
  name: "",
  phone: "",
  service: "",
  comment: "",
};

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Укажите имя";
  } else if (values.name.trim().length < 2) {
    errors.name = "Имя слишком короткое";
  }

  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim()) {
    errors.phone = "Укажите телефон";
  } else if (digits.length < 10 || digits.length > 11) {
    errors.phone = "Похоже, номер указан не полностью";
  }

  if (!values.service) {
    errors.service = "Выберите услугу";
  }

  return errors;
}

/* ---------- Компонент ---------- */

export function OrderDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const openDialog = useCallback((service?: string) => {
    setForm((f) => ({
      ...initialForm,
      service: service ?? f.service,
    }));
    setErrors({});
    setStatus("idle");
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    // Фокус в первое поле при открытии
    const t = window.setTimeout(() => firstFieldRef.current?.focus(), 350);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open]);

  const setField = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      await submitOrder({
        name: form.name.trim(),
        phone: form.phone.trim(),
        service: form.service,
        comment: form.comment.trim() || undefined,
      });
      setStatus("success");
    } catch {
      setStatus("idle");
      setErrors({ phone: "Не удалось отправить заявку. Попробуйте позже." });
    }
  };

  const resetAndClose = () => {
    setOpen(false);
    window.setTimeout(() => {
      setForm(initialForm);
      setErrors({});
      setStatus("idle");
    }, 300);
  };

  return (
    <OrderDialogContext.Provider value={{ openDialog }}>
      {children}

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="order-dialog-title"
        >
          {/* Подложка */}
          <button
            type="button"
            aria-label="Закрыть"
            onClick={close}
            className="absolute inset-0 bg-black/30 opacity-100 transition-opacity duration-300"
            style={{
              WebkitBackdropFilter: "blur(8px)",
              backdropFilter: "blur(8px)",
            }}
          />

          {/* Панель */}
          <div
            ref={dialogRef}
            className="relative w-full max-w-lg translate-y-0 rounded-t-[28px] bg-white p-7 opacity-100 shadow-2xl transition-all duration-300 sm:rounded-[28px] sm:p-9"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Закрыть окно"
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-surface text-foreground/60 transition-colors hover:bg-border hover:text-foreground"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>

            {status === "success" ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12.5l4.5 4.5L19 7.5" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 id="order-dialog-title" className="title-md mt-6">
                  Заявка принята
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                  Спасибо! Мы свяжемся с вами, чтобы согласовать детали и время
                  визита.
                </p>
                <button type="button" onClick={resetAndClose} className="btn-primary mt-8 w-full sm:w-auto">
                  Отлично
                </button>
              </div>
            ) : (
              <>
                <h3 id="order-dialog-title" className="title-md pr-10">
                  Заказать химчистку
                </h3>
                <p className="mt-2 text-[14px] text-muted-foreground">
                  Заполните форму — мы перезвоним и согласуем удобное время.
                </p>

                <form onSubmit={onSubmit} noValidate className="mt-7 flex flex-col gap-4">
                  <div>
                    <label htmlFor="order-name" className="mb-1.5 block text-[13px] font-medium text-foreground/80">
                      Имя
                    </label>
                    <input
                      ref={firstFieldRef}
                      id="order-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Как к вам обращаться"
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                      aria-invalid={!!errors.name}
                      className={`field ${errors.name ? "field-error" : ""}`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-[13px] text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="order-phone" className="mb-1.5 block text-[13px] font-medium text-foreground/80">
                      Телефон
                    </label>
                    <input
                      id="order-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      aria-invalid={!!errors.phone}
                      className={`field ${errors.phone ? "field-error" : ""}`}
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-[13px] text-destructive">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="order-service" className="mb-1.5 block text-[13px] font-medium text-foreground/80">
                      Услуга
                    </label>
                    <select
                      id="order-service"
                      value={form.service}
                      onChange={(e) => setField("service", e.target.value)}
                      aria-invalid={!!errors.service}
                      className={`field appearance-none ${errors.service ? "field-error" : ""} ${
                        form.service ? "" : "text-muted-foreground/60"
                      }`}
                    >
                      <option value="" disabled>
                        Что нужно почистить
                      </option>
                      {orderForm.serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-1.5 text-[13px] text-destructive">{errors.service}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="order-comment" className="mb-1.5 block text-[13px] font-medium text-foreground/80">
                      Комментарий <span className="font-normal text-muted-foreground">(необязательно)</span>
                    </label>
                    <textarea
                      id="order-comment"
                      rows={3}
                      placeholder="Например: диван угловой, есть пятна от кофе"
                      value={form.comment}
                      onChange={(e) => setField("comment", e.target.value)}
                      className="field resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending" ? "Отправляем…" : "Отправить заявку"}
                  </button>
                  <p className="text-center text-[12px] leading-relaxed text-muted-foreground">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных
                    данных.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </OrderDialogContext.Provider>
  );
}
