import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/tickets-repository";

async function getTicketsTypes() {
  try {
    const requestTicketTypes = await ticketRepository.findTicketsTypes();
    return requestTicketTypes;
  } catch (error) {
    throw (notFoundError());
  }
}

const ticketsService = {
  getTicketsTypes
};

export default ticketsService;
