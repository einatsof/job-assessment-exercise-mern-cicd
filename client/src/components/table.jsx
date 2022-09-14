import React from 'react';

export default function Table({ headData, data, sort }) {
  
  const NUM_OF_CATEGORIES = 3;

  // Convert from mongoDB Date data type to a string '{day}.{month}.{year}'
  const formatDate = (dateString) => {
    let date = new Date(dateString);
    let day = ('0' + date.getDate()).slice(-2);
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let newDate = `${day}.${month}.${date.getFullYear()}`;
    return <td>{newDate}</td>;
  }

  // Convert category array to colored bullets with one category name or multi for long arrays
  const formatCategory = (categoryArray) => {
    let arr = [...categoryArray];
    arr.reverse();
    while (arr.length < NUM_OF_CATEGORIES) {
      arr.unshift('');
    }
    return <td>{categoryBullets(arr)}<span style={{paddingLeft: '5px'}}>{ categoryArray.length > 1 ? 'Multi' : categoryArray[0]}</span></td>;
  }

  // Make bullets with colors according to category type
  const categoryBullets = (array) => {
    const colors = {
      'Type1': 'mediumorchid',
      'Type2': 'limegreen',
      'Type3': 'orange'
    }
    return array.map((item, i) => (
      <span style={{ color: colors[item] }}>{ item ? '●' : '' }</span>
    ));
  }

  // Format status text and background colors accordingly
  const formatStatus = (status) => {
    const colors = {
      'Active':           'rgb(98,177,255)',
      'Approver Request': 'rgb(207,136,224)',
      'Approved':         'rgb(112,220,112)'
    }
    const backgroundColors = {
      'Active':           'rgb(233,244,255)',
      'Approver Request': 'rgb(248,238,251)',
      'Approved':         'rgb(235,250,235)'
    }
    return (<td className="text-center">
              <span className="badge rounded-1" style={{ color: colors[status], backgroundColor: backgroundColors[status] }}>
                {status}
              </span>
            </td>);
  }

  return(
    <table className="table text-nowrap">
      <thead className="table-light">
        <tr>
          {headData.map((item, i) => {
            return (
              <th
                key={i}
                onClick={() => sort(item.value, !item.orderAsc)}
                className={item.value === "status" ? "text-center" : ""}
              >
                {item.heading}
                <span className={item.active ? "active" : "inactive"}>{item.orderAsc ? "⏶" : "⏷"}</span>
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i}>
            <td>{item.iso_code}</td>
            <td>{item.version}</td>
            <td>{item.created_by}</td>
            <td>{item.modified_by}</td>
            {formatCategory(item.category)}
            {formatDate(item.date_modified)}
            <td>{item.company}</td>
            {formatStatus(item.status)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}