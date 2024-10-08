const {
    createAgent,
    getAllAgents,
    getAgent,
    updateAgent,
    deleteAgent,
    agentExists,
    verifyAgent,
    unVerifyAgent
} = require('../services/agentService');

const handleAgents = async (req, res) => {
    const data = {
        page: req.query.page,
        limit: req.query.limit 
    }
   const agents = await getAllAgents(data);
   if(!agents) {
    return res.status(400).json({ message: 'No agents found' });
   }
   res.json(agents);
}

const handleCreateAgent = async (req, res) => {
    const {firstname, lastname, email, phone,password, contactAddress, identityNumber, identityType, officeAddress, agencyName} = req.body;
    // console.log(req.body);
    
    if(!firstname || !lastname || !email || !phone || !contactAddress || !identityNumber || !identityType || !officeAddress || !agencyName) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const duplicate = await agentExists(email);
    if(duplicate) return res.status(409).json({ message: 'Agent already exists' });
    const data = {
        firstname,
        lastname,
        email,
        phone,
        password,
        contactAddress,
        identityNumber,
        identityType,
        officeAddress,
        agencyName
    }
    const result = await createAgent(data);
    if(result.error) return res.status(500).json(result);
    res.status(201).json({Success: "Agent created successfully", result});
}

const handleAgentUpdate = async (req, res) => {
    if(!req.body) {
        return res.status(400).json({ message: 'Data to update is required' });
    }
    
    const result = await updateAgent(req.body._id, req.body);
    if(result.error) return res.status(500).json(result);

    res.status(200).json({Success: "Agent updated successfully", result});
    
}

const handleAgentDelete = async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({ message: 'ID is required' });
    }
    const result = await deleteAgent(req.params.id);
    if(result.error) return res.status(500).json(result);

    res.status(200).json({Success: "Agent deleted successfully", result});
}

const handleAgent = async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({ message: 'ID is required' });
    }
    const agent = await getAgent(req.params.id);
    if(!agent) {
        return res.status(400).json({ message: 'Agent not found' });
    }
    res.status(200).json(agent);
}

const handleVerifyAgent = async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({ message: 'ID is required' });
    }
    const _id = req.params.id;
    const result = await verifyAgent(_id);
    if(result.error) return res.status(500).json(result);
    res.status(200).json({Success: "Agent verified successfully", result});
}

const handleUnVerifyAgent = async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({ message: 'ID is required' });
    }
    const _id = req.params.id;
    const result = await unVerifyAgent(_id);
    if(result.error) return res.status(500).json(result);
    res.status(200).json({Success: "Agent unverified successfully", result});
}
module.exports = {
    handleAgents,
    handleCreateAgent,
    handleAgentUpdate,
    handleAgentDelete,
    handleAgent,
    handleVerifyAgent,
    handleUnVerifyAgent
}