import { prisma } from "@/config";
import { Ticket } from "@prisma/client";

async function findTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function findTicketsTypesbyId(id: number) {
  return prisma.ticketType.findFirst({
    where: { id },
  });
}

async function findTickets() {
  return prisma.ticket.findFirst();
}

async function create(
  createdTicket: CreateTicketParams
) {
  return prisma.ticket.create({
    data: { ...createdTicket },
    include: { TicketType: true }
  });
}

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">;

const ticketRepository = {
  findTicketsTypes,
  findTicketsTypesbyId,
  findTickets,
  create
};

export default ticketRepository;
