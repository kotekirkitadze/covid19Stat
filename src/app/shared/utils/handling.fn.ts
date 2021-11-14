export function handleDateFormat(value: Date) {
  if ((value.getMonth() + 1) < 10 && value.getDate() < 10) {
    return `${value.getFullYear()}-0${value.getMonth() + 1}-0${value.getDate()}`;
  } else if ((value.getMonth() + 1) < 10 && value.getDate() > 10) {
    return `${value.getFullYear()}-0${value.getMonth() + 1}-${value.getDate()}`;
  } else if ((value.getMonth() + 1) > 9 && value.getDate() < 10) {
    return `${value.getFullYear()}-${value.getMonth() + 1}-0${value.getDate()}`;
  } else {
    return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
  }
}
