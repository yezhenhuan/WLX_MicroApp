String.prototype.ToString = function (format) {
  var dateTime = new Date(parseInt(this.substring(6, this.length - 2)));
  format = format.replace("yyyy", dateTime.getFullYear());
  format = format.replace("yy", dateTime.getFullYear().toString().substr(2));
  format = format.replace("MM", dateTime.getMonth() + 1)
  format = format.replace("dd", dateTime.getDate());
  format = format.replace("hh", dateTime.getHours());
  format = format.replace("mm", dateTime.getMinutes());
  format = format.replace("ss", dateTime.getSeconds());
  format = format.replace("ms", dateTime.getMilliseconds())
  return format;
};