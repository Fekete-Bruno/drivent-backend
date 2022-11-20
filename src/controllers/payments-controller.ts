import { AuthenticatedRequest } from "@/middlewares";
import paymentService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPaymentsByTicketId(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  const userId = req.userId;
  try {
    const result = await paymentService.getPaymentsByTicketId(Number(ticketId), userId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if(error.name === "UnauthorizedError") {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
    if(error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
