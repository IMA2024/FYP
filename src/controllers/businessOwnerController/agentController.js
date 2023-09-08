const agentModel = require("../../models/agent");
require("dotenv").config();

// Agent          

// Adding Agent 

const addAgent = async (req, res) => {
    const { business, name, voice } = req.body;
  
    try {
      const existingAgent = await agentModel.findOne({ business, name , voice });
  
      if (existingAgent) {
        return res.status(400).json({ message: 'Agent already added for this business.' });
      }
  
      const newAgent = await agentModel.create({ business, name, voice });
      return res.status(201).json({ agent: newAgent });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
  


// View All Agents

const viewAllAgents = async (req, res) => {
  try {
    const agents = await agentModel.find().populate('business');
    return res.status(200).json({ agents: agents });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete Agent

const deleteAgent = async (req, res) => {
  const { agentId } = req.query;

  try {
    const deletedAgent = await agentModel.findByIdAndDelete(agentId);

    if (!deletedAgent) {
      return res.status(404).json({ error: 'Agent not found.' });
    }

    return res.status(200).json({ message: 'Agent Deleted Successfully.' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { addAgent , viewAllAgents , deleteAgent}