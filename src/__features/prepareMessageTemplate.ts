import {Order, OrderItem} from "@prisma/client";
import getNormalDate from "./getNormalDate";


const STATUS_DICT = {
  "PROCESSING": "В процесі",
  "FULFILLED": "Виконано",
}

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
    `Коментар: ${order.comment ? order.comment : "Відсутній" }\n` +
    `Тип платежу: ${order.payment_type}\n` +
    `Статус: ${STATUS_DICT[order.status]}\n` + +
    `Дата створення: ${getNormalDate(order.created_at.toString())}\n`
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