export const CARD_TITLE = [
  {required: true, message: 'введите название'},
  {min: 4, message: 'Название слишком короткое'},
  {max: 25, message: 'Название слишком длинное'},
];

export const CARD_CITY = [{required: true, message: 'не выбран город'}];

export const CARD_DATE = [{type: 'array', required: true, message: 'не указаны даты'}];
