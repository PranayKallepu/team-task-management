import { sequelize } from "#src/config/database.js";
import { DataTypes } from "sequelize";
import {
  TICKET_PRIORITIES,
  TICKET_STATUSES,
  TICKET_TYPES,
} from "#src/features/tickets/ticket.constants.js";

export const Ticket = sequelize.define("tickets", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Ticket title is required" },
      len: { args: [3, 255], msg: "Ticket title must be at least 3 characters long" },
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: null,
  },
  type: {
    type: DataTypes.ENUM(...TICKET_TYPES),
    allowNull: false,
    defaultValue: "bug",
  },
  status: {
    type: DataTypes.ENUM(...TICKET_STATUSES),
    allowNull: false,
    defaultValue: "todo",
  },
  priority: {
    type: DataTypes.ENUM(...TICKET_PRIORITIES),
    allowNull: false,
    defaultValue: "low",
  },
  reporterId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  assigneeId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  parentTicketId: {
    type: DataTypes.UUID,
    allowNull: true,
    defaultValue: null,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  currentAssigneeDueDate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
  finalDueDate: {
    type: DataTypes.DATE,
    allowNull: false, // DOUBT
  },
  labels: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: null,
  },
  sprint: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
  },
});
