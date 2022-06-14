export function sortCardsByParam(a, b, param, type = 'string') {
  const cardAId = a['data-id'];
  const cardBId = b['data-id'];
  let valueA = a.querySelector(`#${param}-${cardAId}`).innerText;
  let valueB = b.querySelector(`#${param}-${cardBId}`).innerText;

  if (type === 'number') {
    valueA = Number(valueA);
    valueB = Number(valueB);
  }

  if (valueA < valueB) {
    return -1;
  }
  
  if (valueA > valueB) {
    return 1;
  }

  return 0;
}
