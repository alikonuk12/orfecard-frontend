const convertToCreditCardFormat = (text) => {
  const value = text.replace(/\D/g, '');
  let formattedValue;

  if (text.length > 19) return text.slice(0, 19);

  if ((/^3[47]\d{0,13}$/).test(value)) {
    formattedValue = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ');
  } else if ((/^3(?:0[0-5]|[68]\d)\d{0,11}$/).test(value)) {
    formattedValue = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{6})/, '$1 $2 ');
  } else if ((/^\d{0,16}$/).test(value)) {
    formattedValue = value.replace(/(\d{4})/, '$1 ').replace(/(\d{4}) (\d{4})/, '$1 $2 ').replace(/(\d{4}) (\d{4}) (\d{4})/, '$1 $2 $3 ');
  }

  return formattedValue;
}

export default convertToCreditCardFormat;