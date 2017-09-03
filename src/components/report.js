import React, {PropTypes, Component} from 'react';

export default class Report extends Component {

  render() {

    let report = this.props.report;
    let lines = [];
    let title = 'загрузка...';

    if(report) {
      lines = report.lines;
      title = report.title;
    }

    return <div className="report">


      <table className="table">
      <caption className="report-header">{title}</caption>
      <thead>
        <tr>
          <th className="col">Рубрики</th>
          <th className="col">Кол-во</th>
        </tr>
      </thead>
      <tbody>
        {
          lines.map(line =>
            <tr className="row">
              <td className="col col1">{line.name}</td>
              <td className="col col2">{line.count}</td>
            </tr>
          )
        }
      </tbody>
      </table>


    </div>
  }
}

Report.propTypes = {
  report: PropTypes.object
};