/**
 * Слой доступа к данным заявок.
 *
 * СЕЙЧАС: заявки не отправляются на сервер — функция имитирует отправку
 * и сохраняет заявку локально в sessionStorage, чтобы можно было проверить
 * весь пользовательский сценарий.
 *
 * БУДУЩИЙ BACKEND: замените тело `submitOrder` на реальный вызов API,
 * например:
 *
 *   const res = await fetch("/api/orders", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(order),
 *   });
 *   if (!res.ok) throw new Error("Ошибка сервера");
 */

export type OrderPayload = {
  name: string;
  phone: string;
  service: string;
  comment?: string;
};

export type OrderResult = { ok: true };

export async function submitOrder(order: OrderPayload): Promise<OrderResult> {
  // Имитация сетевой задержки
  await new Promise((resolve) => setTimeout(resolve, 900));

  try {
    const key = "chemistka:orders";
    const existing = JSON.parse(sessionStorage.getItem(key) ?? "[]");
    existing.push({ ...order, createdAt: new Date().toISOString() });
    sessionStorage.setItem(key, JSON.stringify(existing));
  } catch {
    // sessionStorage может быть недоступен — заявка просто не сохранится локально
  }

  return { ok: true };
}
