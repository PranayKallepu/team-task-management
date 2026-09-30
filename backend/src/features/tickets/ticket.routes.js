import express from "express";

import { validate } from "#src/middlewares/validate.js";
import { createTicketSchema } from "#src/features/tickets/ticket.schema.js";
import { createTicket, getReporterTickets } from "#src/features/tickets/ticket.controller.js";
import { authenticate } from "#src/features/auth/auth.middleware.js";

const router = express.Router();

router.use(authenticate);

router.post("/", validate(createTicketSchema), createTicket);
router.get("/", getReporterTickets);
export default router;
