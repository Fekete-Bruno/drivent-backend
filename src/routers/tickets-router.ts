import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTickets, getTicketTypes } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", getTicketTypes)
  .get("/", getTickets);

export { ticketsRouter };
