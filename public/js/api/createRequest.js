/**
 * Основная функция для совершения запросов
 * на сервер.
 * */




const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest;
  let dataarr = [];
  if (options.method === 'GET') {
    if (options.data) {
      for (let key in options.data) {
        let elem = `${key}=${options.data[key]}`;
        dataarr.push(elem);
        xhr.open(options.method, options.url + '?' + dataarr.join('&'));
      }
    } else {
      xhr.open(options.method, options.url)
    }
    xhr.send();
  } else {
    let formData = new FormData;
    if (options.data) {
      for (let key in options.data) {
        formData.append(key, options.data[key]);
      }
      xhr.open(options.method, options.url);
      xhr.send(formData);
    }
  }
  xhr.responseType = "json"
  xhr.onload = () => {
    if (xhr.status != 200) {
      console.log('Ошибка статуса' + xhr.status)
      return;
    }
    const response = xhr.response;
    if (response) {
      let err;
      if ("error" in response) {
        err = response.error
      } else {
        err = null
      }
      options.callback(err, response)
    } else {
      console.log('Нет ответа на запрос')
    }

  }
  xhr.onprogress = (e) => {
    // если сервер присылает заголовок Content-Length
    if (e.lengthComputable) {
      console.log(`Получено ${e.loaded} из ${e.total} байт`);
    } else {
      console.log(`Получено ${e.loaded} байт`);
    }
  }
  xhr.onerror = () => { // происходит, только когда запрос совсем не получилось выполнить
    console.log(`Ошибка при выполнении запроса`);
  };


};

