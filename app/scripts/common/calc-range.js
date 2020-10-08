export default (input) => {
  const val = input.val();
  const min = input.attr('min');
  const max = input.attr('max');
  return parseInt(((val - min) * 100) / (max - min));
}
