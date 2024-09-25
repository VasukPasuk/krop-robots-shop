import {Order, OrderItem} from "@prisma/client";
import getNormalDate from "./getNormalDate";


const STATUS_DICT = {
  "PROCESSING": "В процесі",
  "FULFILLED": "Виконано",
}

const DELIVERY_COMPANY_DICT = {
  "NEW_POST_MAIL": "Нова пошта",
  "UKR_POST_MAIL": "Укрпошта",
}

interface IDelivery {
  delivery_type: string
  locality: string
  department_index: string
  mail_index: number
  delivery_company: string
}


export default function prepareMessageTemplate(order: Order & Partial<{items: Array<OrderItem & any> }>, index?: number) {
  const DELIVERY = JSON.parse(order.delivery as string) as IDelivery  ;
  return `\n---------------------- Замовлення ${index ? "#" + index : ""} ----------------------\n` + (
    `ID: ${order.id}\n` +
    `ПІБ: ${order.first_surname} ${order.name} ${order.second_surname} \n` +
    `Кількість товарів до замовлення: ${order.total_items} шт. \n` +
    `Ціна замовлення: ${order.total_price} грн. \n` +
    `Номер телефону: ${order.phone_number} \n` +
    `E-mail: ${order.email} \n` +
    `Тип платежу: ${order.payment_type}\n` +
    `Статус: ${STATUS_DICT[order.status]}\n` +
    `Коментар: ${order.comment ? order.comment : "Відсутній" }\n` +
    `Тип платежу: ${order.payment_type}\n` +
    `Статус: ${STATUS_DICT[order.status]}\n` +
    `Служба доставки: ${DELIVERY_COMPANY_DICT[DELIVERY.delivery_company]}\n` +
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