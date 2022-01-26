/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  static URL = '/account';
  /**
   * Получает информацию о счёте
   * */
  static get(id = '', callback) {
    createRequest({
      url: this.URL,
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


// let data = {
//   mail: 'ian@biz.pro',
//   password: 'odinodin'
// };

// Account.create(data, function (err, response) {
// if (err) {
//   console.log('Ошибка', err);
// } else
//   console.log('Данные, если нет ошибки', response);
//  });

