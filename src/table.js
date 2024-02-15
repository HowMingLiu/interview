export function setTable(tableDOM, data){
  tableDOM.innerHTML = `
    <tr>
      <th>品項</th>
      <th>數量</th>
      <th>單價</th>
      <th>總價</th>
    </tr>
  `
  let total =  0;
  data.forEach(item => {
    let newTr =  document.createElement("tr");
    total += item.totalPrice;
    newTr.innerHTML = `
      <td>${item.title}</td>
      <td>${item.count}</td>
      <td>${item.price}</td>
      <td>${item.totalPrice}</td>
    `
    tableDOM.appendChild(newTr)
  })
  
  let newTr =  document.createElement("tr");
  newTr.innerHTML = `
    <td></td>
    <td></td>
    <td>總金額</td>
    <td>${total}</td>
  `
  tableDOM.appendChild(newTr)
}