import React, { Component } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Table from './components/table';
import PrintTable from './components/printTable';
import timesNormal from './fonts/times-normal';
import './App.css';

class App extends Component {

  state = {
    isLoading: true,
    sortBy: 'iso_code',
    sortOrder: true,
    headData: [
      { heading: 'ISO CODE',      value: 'iso_code',      active: false, orderAsc: false },
      { heading: 'VERSION',       value: 'version',       active: false, orderAsc: false },
      { heading: 'CREATED BY',    value: 'created_by',    active: false, orderAsc: false },
      { heading: 'MODIFIED BY',   value: 'modified_by',   active: false, orderAsc: false },
      { heading: 'CATEGORY',      value: 'category',      active: false, orderAsc: false },
      { heading: 'DATE MODIFIED', value: 'date_modified', active: false, orderAsc: false },
      { heading: 'COMPANY',       value: 'company',       active: false, orderAsc: false },
      { heading: 'STATUS',        value: 'status',        active: false, orderAsc: false }
    ],
    data: []
  };

  // Get data from backend
  async componentDidMount() {
    const response = await fetch('http://localhost:4000/');
    if (!response) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
    } 
    const data = await response.json();
    this.setState({ data });
    this.setState({ isLoading: false });
  }

  renderTable() {
    if (this.state.isLoading) return <div className="text-center mt-5"><div className="spinner-border"></div></div>;
    return <Table headData={this.state.headData} data={this.state.data} sort={this.handleSort} />;
  }

  // When a 'th' element is clicked update data and headData accordingly
  handleSort = (sortBy, sortOrder) => {
    const data = [...this.state.data];
    const statusValue = {
      'Approved': 1,
      'Approver Request': 2,
      'Active': 3
    }
    if (sortBy === 'status') {
      data.sort((a, b) => statusValue[a[sortBy]] > statusValue[b[sortBy]] ? (sortOrder ? 1 : -1) : (sortOrder ? -1 : 1));
    } else {
      data.sort((a, b) => a[sortBy] > b[sortBy] ? (sortOrder ? 1 : -1) : (sortOrder ? -1 : 1));
    }
    const headData = this.state.headData.map(obj => {
      if (obj.value === sortBy){
        return {...obj, active: true, orderAsc: sortOrder}
      } else {
        return {...obj, active: false}
      }
    });
    this.setState({ headData, data });
  }

  // Use jsPDF to convert table element html (and css) to a pdf file
  handleDownload = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: '.invisible', useCss: true, margin: 10, styles: {font: 'timesnormal'} });
    console.log(doc);
    doc.save('table.pdf');
  }
  
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="text-center">
            <button type="button" onClick={this.handleDownload} className="btn btn-primary mt-3 mb-4">Download PDF</button>
          </div>
        </div>
        <div className="row">
          { this.renderTable() }
        </div>
        <div>
          <PrintTable
            headData={this.state.headData}
            data={this.state.data} />
        </div>
      </div>
    ); 
  }
}

export default App;