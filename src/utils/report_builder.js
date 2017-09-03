import {VACANCIES_REPORT, WORDS_REPORT} from '../constants/report';

export default class BuilderFactory {
  static getBuilder(name) {
    return new CompositeBuilder();
  }
}

/// Паттерн билдер
class ReportBuilder {
  constructor(){
    this.accum = {}
  }

  build(itemList) {
    itemList.forEach( item => this.processItem(item, this.accum) );
  }

  processItem(item, accum) {

  }

  result(){

  }
}

class TopWordsBuilder extends ReportBuilder {
  constructor(){
    super();
  }

  processItem(item) {
    item.header.split(' ')
    .map( word => word.trim() )
    .forEach(word => this.accum[word] = this.accum[word] + 1 || 0);
  }
}

class TopVacanciesBuilder extends ReportBuilder {
  constructor(){
    super();
  }

  processItem(item, accum) {
    item.rubrics.forEach(r => this.accum[r.title] = this.accum[r.title] + 1 || 0);
  }
}

// аля композитор
class CompositeBuilder extends ReportBuilder {
  constructor(){
    super();

    this.builders = [
      {
        name: VACANCIES_REPORT,
        builder: new TopVacanciesBuilder(),
        title: 'Топ по рубрикам'
      },
      {
        name: WORDS_REPORT,
        builder: new TopWordsBuilder(),
        title: 'Топ по словам'
      }
    ]
  }

  processItem(item) {
    this.builders.forEach( descriptor => {
      descriptor.builder.processItem(item);
    })
  }

  result() {
    super.result();

    return this.builders.reduce( 
      (acc, item) => {
        let reportPositions = item.builder.accum;
        let lines = Object.keys(reportPositions)
          .map(k => Object.assign({}, { name:k, count: reportPositions[k] }) )
          .sort( (a,b) => b.count - a.count );

        acc[item.name] = {
          lines: lines,
          title: item.title
        };
        
        return acc;
      }, {});
  }
}