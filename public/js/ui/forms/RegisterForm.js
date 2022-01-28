
/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(options) {
    User.register(options, (err, response) => {
      console.log(response.success)
      if (response.success == true) {
        App.setState('user-logged');
        let register = App.getModal('register');
        register.close();
      } else {
        console.log('Ошибка регистрации: ' + response.error);
      }
    });
  }
}