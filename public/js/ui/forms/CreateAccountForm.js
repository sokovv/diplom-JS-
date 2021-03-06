/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(options) {
    Account.create(options, (err, response) => {
      console.log(response.success)
      if (response.success == true) {
        let newAccount = App.getModal('createAccount')
        newAccount.close();
        App.update();   
      } else {
        console.log('Ошибка создания счета: ' + response.error);
      }
    });
  }
}