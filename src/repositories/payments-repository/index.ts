import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function findPaymentbyTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function create(
  createdPayment: CreatePaymentParams
) {
  return prisma.payment.create({
    data: { ...createdPayment },
  });
}

export type CreatePaymentParams = Omit<Payment, "id" | "createdAt" | "updatedAt">;

const paymentRepository = {
  findPaymentbyTicketId,
  create
};

export default paymentRepository;
