/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    try {
      if (!element) {
        throw new Error("Переданного элемента не существует");
      }
      this.element = element;
      this.onClose 
      this.registerEvents();
    } catch (error) {
      console.error("Error: ", error);
    }


  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    let dataDismissButton = this.element.querySelectorAll('[data-dismiss="modal"]');

    let dataDismissButtonArr = Array.from(dataDismissButton)

    for (let i = 0; i < dataDismissButtonArr.length; i++) {

      function getlink(i) {
        let linkClick = dataDismissButtonArr[i];
        return linkClick;
      }

      let link = getlink(i);

      link.addEventListener('click', this.onClose);
    }
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
    e.preventDefault();
    this.close();
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.style.display = 'block';
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
    this.element.style.display = 'none';
  }
}