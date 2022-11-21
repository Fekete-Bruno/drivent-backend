import { notFoundError, requestError, unauthorizedError } from "@/errors";
import { paymentData } from "@/protocols";
import paymentRepository, { CreatePaymentParams } from "@/repositories/payments-repository";
import ticketRepository from "@/repositories/tickets-repository";
import httpStatus from "http-status";

async function getPaymentsByTicketId(ticketId: number, userId: number) {
  if(!ticketId) {
    throw requestError(httpStatus.BAD_REQUEST, "BAD REQUEST");  
  }
  const ticket = await ticketRepository.findTicketsById(ticketId);
  if(!ticket) {
    throw notFoundError();
  }
  if(ticket.Enrollment.userId!==userId) {
    throw unauthorizedError();
  }
  const payment = await(paymentRepository.findPaymentbyTicketId(ticketId));
  return payment;
}

async function createPayment(
  params: paymentData,
  userId: number
) {
  if(!params.cardData || !params.ticketId) {
    throw requestError(httpStatus.BAD_REQUEST, "BAD REQUEST");
  }

  const ticket = await ticketRepository.findTicketsById(params.ticketId);
  if(!ticket) {
    throw notFoundError();
  }
    
  if(ticket.Enrollment.userId!==userId) {
    throw unauthorizedError();
  }

  const ticketType = await ticketRepository.findTicketsTypesbyId(ticket.ticketTypeId);
  
  const payment =  await paymentRepository.create({
    ticketId: ticket.id,
    value: ticketType.price,
    cardIssuer: params.cardData.issuer,
    cardLastDigits: params.cardData.number.toString().slice(-4),
  });

  await ticketRepository.updateTicket(ticket.id);

  return(payment);
}

const paymentService = {
  getPaymentsByTicketId,
  createPayment
};

export default paymentService;
