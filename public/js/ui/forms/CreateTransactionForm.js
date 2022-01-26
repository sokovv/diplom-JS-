/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let currentUser = User.current();
    Account.list(currentUser, (err, response) => {
      let data = response.data;
      console.log(data)
      let accountsSelect = this.element.querySelector('.accounts-select');
      let options = '';
      data.forEach(el => {
        options += `<option value="${el.id}">${el.name}</option>`;
      });
      accountsSelect.innerHTML = options;
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(options) {
    Transaction.create(options, (err, response) => {
        if (response.success == true) {
        this.element.reset();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
        App.update();
      } else {
        console.log('Ошибка создания счета: ' + response.error);
      }
    });
  }
}