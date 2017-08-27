import React, {PropTypes, Component} from 'react';

export default class Report extends Component {

  getReportBtnClick(e) {
    this.props.getReport(this.props.type);
  }

  render() {

    let report = this.props.vacanciesReport.reports[this.props.type];
    let lines = [];
    let title = 'Первая загрузка';

    if(report){
      lines = report.lines;
      title = report.title;
    }

    return <div className="report">

      <header>
        <button className="btn" onClick={::this.getReportBtnClick}> Перезагрузить </button>
      </header>

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
  vacanciesReport: PropTypes.object.isRequired,
  getReport: PropTypes.func.isRequired
};