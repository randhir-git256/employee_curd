
const userService = require('./userService');

const getDataControllerFn = async (req, res) => {
    try {
        const users = await userService.getDataFromDBService();
        res.json({ status: true, data: users });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

const createUserControllerFn = async (req, res) => {
    try {
        const user = await userService.createUserDBService(req.body);
        res.status(201).json({ status: true, message: 'User created successfully', data: user });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

const updateUserController = async (req, res) => {
    try {
        const result = await userService.updateUserDBService(req.params.id, req.body);
        if (result) {
            res.json({ status: true, message: 'User updated successfully', data: result });
        } else {
            res.status(404).json({ status: false, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

const deleteUserController = async (req, res) => {
    try {
        const result = await userService.removeUserDBService(req.params.id);
        if (result) {
            res.json({ status: true, message: 'User deleted successfully' });
        } else {
            res.status(404).json({ status: false, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

module.exports = { getDataControllerFn, createUserControllerFn, updateUserController, deleteUserController };
