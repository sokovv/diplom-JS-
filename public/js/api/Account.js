/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static URL = '/account/';
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback) {
    createRequest({
      url: this.URL + id,
      method: 'GET',
      callback: (err, response) => {
        if (err) {
          console.log('Ошибка', err);
        } else {
          console.log('Данные, если нет ошибки', response);
        }
       callback(err, response);
      }
    })
  }
}


