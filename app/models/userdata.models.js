module.exports = (sequelize, Sequelize) => {
    const UserData = sequelize.define("user_data", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        leaveQuota: {
            type: Sequelize.INTEGER
        },
    });

    return UserData;
};