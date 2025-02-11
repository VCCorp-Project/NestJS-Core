'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('event_participant', {
      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'events', // Name of the referenced table
          key: 'event_id', // Key in the referenced table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      participant_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'participants', // Name of the referenced table
          key: 'participant_id', // Key in the referenced table
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('event_participant');
  },
};
