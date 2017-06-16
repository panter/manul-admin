import React from 'react';

export default class GriddleFilter extends React.Component {

  componentDidMount() {
    this.updateFilter(this.props.filterValue);
  }

  componentWillReceiveProps(nextProps) {
    console.log('hallllooooooo');
    console.log(nextProps.filterValue);
    if (this.props.filterValue !== nextProps.filterValue) {
      this.updateFilter(nextProps.filterValue);
    }
  }

  updateFilter(value) {
    this.props.setFilter(value);
  }

  render() {
    return (<span />);
  }
}
