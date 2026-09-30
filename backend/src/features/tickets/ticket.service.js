import AppError from "#src/utils/appError.js";
import { Ticket } from "#src/features/tickets/ticket.model.js";

export const createNewTicket = async (currentUser, body) => {
  const { projectId, title, description, type, status, priority, assigneeId, finalDueDate } = body;

  const newTicket = await Ticket.create({
    projectId,
    title,
    description,
    type,
    status,
    priority,
    reporterId: currentUser.id,
    assigneeId,
    finalDueDate,
  });
  return newTicket;
};

export const getAllReporterTickets = async (userId) => {
  return await Ticket.findAll({ where: { reporterId: userId } });
};
