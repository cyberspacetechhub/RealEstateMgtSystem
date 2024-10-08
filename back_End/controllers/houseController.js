const {
    createHouse,
    getHouses,
    getHouse,
    updateHouse,
    deleteHouse,
    houseExists,
    houseStatus
} = require('../services/houseService')

const createHouseHandler = async (req, res) => {
    const {title, description, price, location, owner, bedrooms, bathrooms, squareFootage, yearBuilt, lotSize, stories, docType, basement, amenities, exteriorFeatures, interiorFeatures, livingRoomFeatures, kitchenFeatures} = req.body;
    if(!title, !description, !price, !location, !owner, !bedrooms, !bathrooms, !squareFootage, !yearBuilt, !lotSize, !stories, !docType, !basement, !amenities, !exteriorFeatures, !interiorFeatures, !livingRoomFeatures, !kitchenFeatures) {
        return res.status(400).json({message: 'All fields are required'})
    }
    console.log(req.body)
    const duplicate = await houseExists(title);
    if(duplicate) {
        return res.status(409).json({message: 'House already exists'})
    }
    const data = {
        title,
        description,
        price,
        location,
        owner,
        bedrooms,
        bathrooms,
        squareFootage,
        yearBuilt,
        lotSize,
        stories,
        docType,
        basement,
        amenities,
        exteriorFeatures,
        interiorFeatures,
        livingRoomFeatures,
        kitchenFeatures,
        files: req.files,
    };
    console.log(req.files)
    const result = await createHouse(data);
    if(result.error) {
        return res.status(400).json({message: result})
    }
    return res.status(201).json({message: 'House created successfully', data: result})
};

const getHousesHandler = async (req, res) => {
    const data ={
        page: req.query.page,
        limit: req.query.limit
    }
    const houses = await getHouses(data);
    if(!houses) {
        return res.status(404).json({message: 'No house found'})
    }
    res.json(houses)
};

const getHouseHandler = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({message: 'House ID required'})
    }
    const house = await getHouse(req.params.id);
    if(!house) {
        return res.status(404).json({message: 'House not found'})
    }
    res.json(house)
};

const updateHouseHandler = async (req, res) => {
    if(!req.body) {
        return res.status(400).json({message: 'Data to update required'})
    }
    const result = await updateHouse(req.body._id, req.body);
    if(result.error) {
        return res.status(400).json({message: result})
    }
    res.json({message: 'House updated successfully', data: result})
};

const deleteHouseHandler = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({message: 'House ID required'})
    }
    const result = await deleteHouse(req.params.id);
    if(result.error) {
        return res.status(400).json({message: result})
    }
    res.json({message: 'House deleted successfully', data: result})
};

const houseStatusHandler = async (req, res) => {
    if(!req.params.id) {
        return res.status(400).json({message: 'House ID required'})
    }
    const _id = req.params.id
    const status = req.body.status
    const result = await houseStatus(_id, status);
    if(result.error) {
        return res.status(400).json({message: result})
    }
    res.json({message: 'House status updated successfully', data: result})
};

module.exports = {
    createHouseHandler,
    getHousesHandler,
    getHouseHandler,
    updateHouseHandler,
    deleteHouseHandler,
    houseStatusHandler
}