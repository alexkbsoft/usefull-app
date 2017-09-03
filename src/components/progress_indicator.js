import React, {PropTypes, Component} from 'react';

export default class ProgressIndicator extends Component {

  render() {
    return <div className="percent">
        Загружено - &nbsp;
        <span className="percent-val">{this.props.percent}</span>
        &nbsp;
        страниц вакансий
      </div>
  }
}

ProgressIndicator.propTypes = {
  percent: PropTypes.number
};