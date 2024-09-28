import {Order, OrderItem} from "@prisma/client";
import getNormalDate from "./getNormalDate";


const STATUS_DICT = {
  "PROCESSING": "В процесі",
  "FULFILLED": "Виконано",
}


const ifEmpty = (str: string) => Boolean(str.trim()) ? str : "--"

export default function prepareMessageTemplate(order: Order & Partial<{items: Array<OrderItem & any> }>, index?: number) {
  return `\n---------------------- Замовлення ${index ? "#" + index : ""} ----------------------\n` + (
    `ID: ${order.id}\n` +
    `Замовник: ${order.name} ${order.surname} \n` +
    `Кількість товарів до замовлення: ${order.total_items} шт. \n` +
    `Ціна замовлення: ${order.total_price} грн. \n` +
    `Номер телефону: ${order.phone} \n` +
    `E-mail: ${order.email} \n` +
    `Тип платежу: ${order.payment_type}\n` +
    `Статус: ${STATUS_DICT[order.status]}\n` +
    `Коментар: ${ifEmpty(order.comment)}\n` +
    `Доставка: ${order.delivery_type}\n` +
    `Область: ${ifEmpty(order.region)}\n` +
    `Місто: ${ifEmpty(order.locality)}\n` +
    `Відділення: ${ifEmpty(order.department_address)}\n` +
    `\nЯкщо кур'єром ↓\n\n` +

    `Вулиця: ${ifEmpty(order.street)}\n` +
    `Будинок: ${ifEmpty(order.house)}\n` +
    `Квартира: ${ifEmpty(order.appartment)}\n` +
    `Поверх: ${ifEmpty(order.floor)}\n` +

    `\nЯкщо рахунок юр. особи ↓\n\n` +

    `Код ЄДРПОУ: ${ifEmpty(order.EDRPOY_CODE)}\n` +
    `Повна назва юр. особи: ${ifEmpty(order.legal_entity)}\n` +

    `\nДата створення: ${getNormalDate(order.created_at as unknown as string)}\n`
  ) + (
    "\n----------------------------- Товари -----------------------------\n"
  ) + (!!order.items && (
    order.items.map((item) => (
      `ID: ${item.id} \n` +
      `Продукт: ${item.product_name} \n` +
      `Кількість: ${item.amount} \n` +
      `Ціна: ${item.price} \n` +
      `Колір: ${item.color_name} \n` +
      `Варіант: ${item.variant.size_label} \n` +
      `Пластик: ${item.plastic} \n`
    )).join("\n")
  ))
}