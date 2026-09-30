import z from "zod";
import {
  TICKET_PRIORITIES,
  TICKET_STATUSES,
  TICKET_TYPES,
} from "#src/features/tickets/ticket.constants.js";

export const createTicketSchema = z.object({
  body: z.object({
    projectId: z.string().uuid(),
    title: z.string().min(3, "Ticket Title must be at least 3 characters long"),
    description: z.string().optional(),
    type: z.enum(TICKET_TYPES).optional(),
    status: z.enum(TICKET_STATUSES).optional(),
    priority: z.enum(TICKET_PRIORITIES).optional(),
    assigneeId: z.string().uuid(),
    // Converts the incoming date string into a Date object
    finalDueDate: z.coerce.date(),
  }),
});
