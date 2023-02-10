module.exports = (sequelize, Sequelize) => {
    const LeaveData = sequelize.define("leave_data", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        leaveDateFrom: {
            type: Sequelize.DATEONLY
        },
        leaveDateTo: {
            type: Sequelize.DATEONLY
        },
    });

    return LeaveData;
};