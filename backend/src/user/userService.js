const User = require('./userModel');

module.exports.getDataFromDBService = async () => {
    return User.findAll()
        .catch(error => {
            throw new Error(`Error retrieving data: ${error.message}`);
        });
};

module.exports.createUserDBService = async (userDetails) => {
    try {
        const user = await User.create(userDetails);
        return user;
    } catch (error) {
        throw new Error(`Error creating user: ${error.message}`);
    }
};

module.exports.updateUserDBService = async (id, userDetails) => {
    try {
        const [updatedRowsCount, updatedRows] = await User.update(userDetails, {
            where: { id },
            returning: true,
        });
        if (updatedRowsCount === 0) {
            throw new Error(`User with id ${id} not found.`);
        }
        return updatedRows[0];
    } catch (error) {
        throw new Error(`Error updating user: ${error.message}`);
    }
};

module.exports.removeUserDBService = async (id) => {
    try {
        const deletedRowCount = await User.destroy({ where: { id } });
        if (deletedRowCount === 0) {
            throw new Error(`User with id ${id} not found.`);
        }
        return true;
    } catch (error) {
        throw new Error(`Error removing user: ${error.message}`);
    }
};
