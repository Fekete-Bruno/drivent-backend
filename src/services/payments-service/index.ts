import { notFoundError, requestError, unauthorizedError } from "@/errors";
import paymentRepository from "@/repositories/payments-repository";
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

const paymentService = {
  getPaymentsByTicketId
};

export default paymentService;
