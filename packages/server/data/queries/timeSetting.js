const knex = require('../db')

const findTimeSetting = async (timeSetting) => {
  const timeQuery = {
    main_time: timeSetting.mainTime, 
    time_period: timeSetting.timePeriod, 
    period_length: timeSetting.periodLength, 
    overtime: timeSetting.overtime, 
    overtime_period: timeSetting.overtimePeriod, 
    overtime_length: timeSetting.overtimeLength
  }
  return await knex('time_setting')
  .where({...timeSetting})
  .select('id');
}

module.exports = {
  findTimeSetting
}