
const {
    createLand,
    getLands,
    getLand,
    updateLand,
    deleteLand,
    landExists,
    landStatus
} = require('../services/landService')

const createLandHandler = async (req, res) => {
    const { title, description, price, location, owner, plots, docType, ownershipType} = req.body;
    if (!title, !description, !price, !location, !owner, !docType, !ownershipType ) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const duplicate = await landExists(title);
    if (duplicate) {
        return res.status(409).json({ message: 'Land already exists' });
    }
    const data = {
        title,
        description,
        price,
        location,
        owner,
        plots,
        docType,
        ownershipType,
        files: req.files
    };
    const result = await createLand(data);
    if (result.error) {
        return res.status(400).json({ message: result });
    }
    return res.status(201).json({success: 'New land property created', result});
};

const getLandsHandler = async (req, res) => {
    const data = {
        page: req.query.page,
        limit: req.query.limit
    }
    const lands = await getLands(data)
    if(!lands) {
        return res.status(404).json({message: 'No land property found'})
    }
    res.json(lands)
};

const getLandHandler = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({ message: 'Land ID required' });
    }
    const land = await getLand(req.params.id);
    if(!land) {
        return res.status(404).json({ message: 'Land not found' });
    }
    return res.status(200).json(land);
};

const updateLandHandler = async (req, res) => {
    if(!req.body) {
        return res.status(400).json({ message: 'Data to update required' });
    }
    const result = await updateLand(req.body._id, req.body);
    if(result.error) {
        return res.status(400).json({message: result})
    }
    res.json({message: 'Land updated successfully', data: result})
};

const deleteLandHandler = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({message: 'Land ID required'})
    }
    const result = await deleteLand(req.params.id);
    if(result.error) {
        return res.status(400).json({message: result})
    }
    res.json({message: 'Land deleted successfully', data: result})
};

const landStatusHandler = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({message: 'Land ID required'})
    }
    const _id = req.params.id
    const status = req.body.status
    const result = await landStatus(_id, status);
    if(result.error) {
        return res.status(400).json({message: result})
    }
    res.json({message: 'Land status updated successfully', data: result})
};

module.exports = {
    createLandHandler,
    getLandsHandler,
    getLandHandler,
    updateLandHandler,
    deleteLandHandler,
    landStatusHandler
}