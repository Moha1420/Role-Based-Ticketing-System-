const Ticket = require('../models/Ticket');

const createTicket = async (req, res) => {
  const { title, description } = req.body;
  const ticket = new Ticket({ title, description, createdBy: req.user.id });
  await ticket.save();
  res.status(201).json(ticket);
};

const getTickets = async (req, res) => {
  const tickets = req.user.role === 'admin'
    ? await Ticket.find().populate('createdBy', 'username')
    : await Ticket.find({ createdBy: req.user.id });
  res.json(tickets);
};

const updateTicket = async (req, res) => {
  const { status } = req.body;
  const ticket = await Ticket.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(ticket);
};

module.exports = { createTicket, getTickets, updateTicket };
