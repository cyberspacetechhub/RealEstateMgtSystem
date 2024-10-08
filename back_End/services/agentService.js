const Agent = require('../model/Agent');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const createAgent = async (data) => {
    const profile = data.file ? data.file.path : null;
    const identityImage = data.file ? data.file.path : null;

    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newAgent = await Agent.create({
            "firstname": data.firstname,
            "lastname": data.lastname,
            "email": data.email,
            "phone": data.phone,
            "password": hashedPassword,
            "profile": profile,
            "identityImage": identityImage,
            "identityNumber": data.identityNumber,
            "identityType": data.identityType,
            "contactAddress": data.contactAddress,
            "agencyName": data.agencyName,
            "officeAddress": data.officeAddress,
            "searchString": `${data.firstname} ${data.lastname} ${data.username} ${data.email} ${data.phone}`
        })
        return newAgent;
    } catch (e) {
        return {error: e.message}
    }
};

const getAllAgents = async (data) => {
    let page = parseInt(data.page) || 1;
    let limit = parseInt(data.limit) || 5;
    let skip = (page - 1) * limit;
    try {
        const agents = await Agent.find().populate('properties').skip(skip).limit(limit);
        const totalCount = await Agent.countDocuments();
        return {agents, page, totalCount}
    } catch (e) {
        return {error: e.message}
    }
};

const getAgent = async (id) => {
    try {
        const agent = await Agent.findOne({_id : id}).populate('properties').exec();
        if(!agent) return {error: "Agent not found"};
        return agent;
    } catch (e) {
        return {error: e.message}
    }
};

const updateAgent = async (id, data) => {
    try {
        const agent = await Agent.findOne({_id : id}).exec();
        if(!agent) return {error: "Agent not found"};
        if(data.firstname) agent.firstname = data.firstname
        if(data.lastname) agent.lastname = data.lastname
        if(data.email) agent.email = data.email
        if(data.phone) agent.phonr = data.phone
        if(data.password)  {
            const hashedPassword = await bcrypt.hash(data.password, 10);
                agent.password = hashedPassword;
        }
        if(data.identityImage) agent.identityImage = data.identityImage
        if(data.identityNumber) agent.identityNumber = data.identityNumber
        if(data.identityType) agent.identityType = data.identityType
        if(data.contactAddress) agent.contactAddress = data.contactAddress

        const result = await agent.save();
        return result;
    } catch (e) {
        return {error: e.message}
    }
};

const deleteAgent = async (id) => {
    try {
        const agent = await Agent.findOne({_id : id}).exec();
        if(!agent) return {error: "Agent not found"};
        const result = await agent.deleteOne()
        return result;
    } catch (e) {
        return {error: e.message}
    }
};

const agentExists = async (email) => {
    try {
        const agent = await Agent.findOne({email}).exec();
        return agent;
    } catch (e) {
        return {error: e.message}
    }
};

const verifyAgent = async(id) => {
    try{
        const agent = await Agent.findOne({_id: id}).exec();
        if(!agent) return {error: "Agent not found"};
        agent.verified = true;
        await agent.save();
        return agent;

    } catch (e) {
        return {error: e.message}
    }
}

const unVerifyAgent = async(id) => {
    try{
        const agent = await Agent.findOne({_id: id}).exec();
        if(!agent) return {error: "Agent not found"};
        agent.verified = false;
        await agent.save();
        return agent;

    } catch (e) {
        return {error: e.message}
    }
}

module.exports = {
    createAgent, 
    getAllAgents, 
    getAgent, 
    updateAgent, 
    deleteAgent, 
    agentExists,
    verifyAgent,
    unVerifyAgent
}