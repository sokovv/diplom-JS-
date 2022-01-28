

/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
   onSubmit(options) {
    User.login(options, (err, response) => {
      console.log(response.success)
      if (response.success == true) {
        let login = App.getModal('login');
        App.setState('user-logged');
        login.close();
      } else {
        console.log('Ошибка регистрации: ' + response.error);
      }
    });
  }
}