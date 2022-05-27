import moment from 'moment';
import {unique} from './utils';

export const getYear = (date) => {
  const d = moment(date).format('YYYY');
  if (d !== 'Invalid date') {
    return d;
  } else {
    return 'Другие';
  }
};

export const getRangeDate = (dateStart, dateEnd) => {
  if (!dateStart && !dateEnd) {
    return '';
  }
  if (!dateStart && dateEnd) {
    return moment(dateEnd).format('DD MMMM');
  }
  if (dateStart && !dateEnd) {
    return moment(dateStart).format('DD MMMM');
  }

  const isSameMonth = moment(dateStart).isSame(dateEnd, 'month');
  const FORMAT_DS = isSameMonth ? 'DD' : 'DD MMMM';

  const ds = moment(dateStart).format(FORMAT_DS);
  const de = moment(dateEnd).format('DD MMMM');

  return `${ds} - ${de}`;
};

export const getYearsCards = (data) => {
  return unique(data?.map(({dateStart}) => getYear(dateStart))).filter((date)=> !!date).sort((a, b) => b - a);
};

export const getNormalData = (date) => {
  return moment(date).format('DD.MM.YY');
};
