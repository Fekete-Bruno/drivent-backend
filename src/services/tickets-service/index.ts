import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/tickets-repository";
import { Console } from "console";

async function getTicketsTypes() {
  try {
    const requestTicketTypes = await ticketRepository.findTicketsTypes();
    return requestTicketTypes;
  } catch (error) {
    throw (notFoundError());
  }
}

async function getTickets() {
  try {
    const requestTickets = await ticketRepository.findTickets();
        
    if(!requestTickets || !requestTickets.ticketTypeId) {
      throw notFoundError();
    }

    const TicketType = await ticketRepository.findTicketsTypesbyId(requestTickets.ticketTypeId);
        
    const result = {
      TicketType,
      ...requestTickets
    };
    return result;
  } catch (error) {
    throw (notFoundError());
  }    
}

const ticketsService = {
  getTicketsTypes,
  getTickets
};

export default ticketsService;
