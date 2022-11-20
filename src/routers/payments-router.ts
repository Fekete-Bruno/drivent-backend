import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPaymentsByTicketId } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentsByTicketId);

export { paymentsRouter };
