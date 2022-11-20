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

async function findTicketsById(id: number) {
  return prisma.ticket.findFirst({
    where: { id },
    include: { Enrollment: true }
  });
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
  findTicketsById,
  create
};

export default ticketRepository;
