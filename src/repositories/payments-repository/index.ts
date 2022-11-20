import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function findPaymentbyTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

const paymentRepository = {
  findPaymentbyTicketId
};

export default paymentRepository;
