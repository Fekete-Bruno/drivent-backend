import { prisma } from "@/config";

async function findTicketsTypes() {
  return prisma.ticketType.findMany();
}

async function findTicketsTypesbyId(id: number) {
  return prisma.ticketType.findFirst({
    where: { id }
  });
}

async function findTickets() {
  return prisma.ticket.findFirst();
}

const ticketRepository = {
  findTicketsTypes,
  findTicketsTypesbyId,
  findTickets,
};

export default ticketRepository;
