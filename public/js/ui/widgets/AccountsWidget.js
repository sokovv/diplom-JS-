/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      alert("Переданного элемента не существует");
    } else {
      this.element = element;
      this.registerEvents();
      this.update()
    }
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    this.element.addEventListener('click', event => {
      if (event.target.closest('.create-account')) {
        App.getModal('createAccount').open();
      }
      if (event.target.closest('.account')) {
        this.onSelectAccount(event.target.closest('.account'));
      }
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    let currentUser = User.current();
    if (currentUser) {
      Account.list(currentUser, (err, response) => {
        console.log(response.data)
        if (response) {
          this.clear();
          this.renderItem(response.data);
        } else {
          console.log(err)
        }
      }
      )
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    let accounts = this.element.getElementsByClassName('account');
    let accountsarr = Array.from(accounts)
    accountsarr.forEach(account => account.remove());
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    let accounts = this.element.getElementsByClassName('account');
    let accountsarr = Array.from(accounts)
    accountsarr.forEach(account => {
      if (account.classList.contains('active')) {
        account.classList.remove('active');
      }
    });

    element.classList.add('active');
    let account_id = element.dataset.id;
    console.log({ account_id })
    App.showPage('transactions', { account_id });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    let accountContent = '';
    item.forEach(elem => {
      accountContent += `<li class=" account" data-id=${elem.id}>
        <a href="#">
            <span>${elem.name}</span> /
            <span>${elem.sum}</span>
        </a>
      </li>`;
    });


    return accountContent;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(item) {
    let accountContent = this.getAccountHTML(item);
    this.element.insertAdjacentHTML('beforeend', accountContent);
  }
}
