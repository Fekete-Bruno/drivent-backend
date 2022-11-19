import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTickets, getTicketTypes, postCreateTicket } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketTypes)
  .get("/", getTickets)
  .post("/", postCreateTicket);

export { ticketsRouter };
