const moment = require('moment');

export function formatDate (dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString(undefined, options)
};

   export function formatTime (time) {
        return moment(time, 'HH:mm').format('h:mm A');
  };