import { createNewTicket, getAllReporterTickets } from "#src/features/tickets/ticket.service.js";

export const createTicket = async (req, res) => {
  const newTicket = await createNewTicket(req.user, req.body);
  res.status(200).json({
    status: "success",
    data: { ticket: newTicket, message: "Ticket created Successfully" },
  });
};

export const getReporterTickets = async (req, res) => {
  const tickets = await getAllReporterTickets(req.user.id);
  res.status(200).json({
    status: "success",
    data: { tickets },
  });
};
