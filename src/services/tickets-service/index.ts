import { notFoundError, requestError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository, { CreateTicketParams } from "@/repositories/tickets-repository";
import httpStatus from "http-status";

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

async function createTicket(
  params: CreateTicketParams,
  userId: number)
{
  if(!params.ticketTypeId) {
    throw requestError(httpStatus.BAD_REQUEST, "BAD REQUEST");
  }

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if(!enrollment) throw notFoundError();

  try {
    const Ticket = await ticketRepository.create({
      status: "RESERVED",
      ticketTypeId: params.ticketTypeId,
      enrollmentId: enrollment.id,
    });
    return(Ticket);
  } catch (error) {
    throw (notFoundError());
  }
}

const ticketsService = {
  getTicketsTypes,
  getTickets,
  createTicket
};

export default ticketsService;
