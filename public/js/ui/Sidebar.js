/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */


class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */v
  static initToggleButton() {
    let sidebar = document.getElementsByClassName("sidebar-mini")
    let toggle = document.getElementsByClassName("sidebar-toggle visible-xs")

    function but() {
      sidebar[0].classList.toggle("sidebar-open");
      sidebar[0].classList.toggle("sidebar-collapse");
    }

    toggle[0].addEventListener('click', but)
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    let itemRegister = document.getElementsByClassName("menu-item_register")
    let itemLogin = document.getElementsByClassName("menu-item_login")
    let itemLogout = document.getElementsByClassName("menu-item_logout")
    function openRegistr() {
      let register = App.getModal('register')
      register.open()
    }
    function openLogin() {
      let login = App.getModal('login')
      login.open()
    }
    function closeLogout() {
      User.logout();
      App.setState('init')
    }
    itemRegister[0].addEventListener('click', openRegistr)
    itemLogin[0].addEventListener('click', openLogin)
    itemLogout[0].addEventListener('click', closeLogout)
  }
}