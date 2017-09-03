import React, {PropTypes, Component} from 'react';

export default class Report extends Component {

  render() {

    let report = this.props.report;
    console.log('report in render: ', report);
    let lines = [];
    let title = 'Первая загрузка';

    if(report) {
      lines = report.lines;
      title = report.title;
      console.log('Report.render: ', report.lines.count);
    }

    return <div className="report">

      <h3 className="report-header">{title}</h3>

      <div className="table">
        <div className="row">
          <div className="col col1 th">Рубрики</div>
          <div className="col col1 th">Кол-во</div>
        </div>
        {
          lines.map(line =>
            <div className="row">
              <div className="col col1">{line.name}</div>
              <div className="col col2">{line.count}</div>
            </div>
          )
        }
      </div>


    </div>
  }
}

Report.propTypes = {
  report: PropTypes.object
};