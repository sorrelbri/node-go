
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('time_setting').del()
    .then(function () {
      // Inserts seed entries
      return knex('time_setting').insert([
        {main_time: 'untimed', time_period: 1, period_length: 0, overtime: 'untimed', overtime_period: 0, overtime_length: 0},
      ]);
    });
};