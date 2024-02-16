import AbstractView from "./AbstractView.js";
export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle("Добавить категорию");
    }

    async getHtml(){
        return `
        <!--Просто сразу форма без кнопок-->
        <link rel="stylesheet" href="static/css/signupform.css">
        <h1>Внимание! Добавлять новую категорию абонентов может только администратор.</h1>
        <form id="register" class="modal-content">
        <div>
        <label for="name">Имя</label>
        <input id="name" name="name" type="text" placeholder="Введите имя" autocomplete="on" required>
          </div>
          <div>
        <label for="password">Пароль</label>
        <input id="password" name="password" type="text" placeholder="Введите пароль" autocomplete="on" required>
          </div>
          <button id="but" class="button button1" type="submit">Отправить данные</button></form><div align="center" id="ist"></div>
        <h1>Добавьте человека в группу.</h1>
        <form id="proceed"class="modal-content">
        <div>
        <label for="group">Имя группы</label>
        <input id="group" name="group" type="text" placeholder="Введите имя группы" autocomplete="on" required>
          </div>
          <div>
          <label for="name">Имя абонента</label>
          <input id="name" name="name" type="text" placeholder="Введите абонента" autocomplete="on" required>
          </div>
          
        <button id="control" class="button button1" type="submit">Добавить.</button>
        </form>
      <div id="est"></div>
        `;
    }
    async executeViewScript(){
      document.getElementById("control").disabled = true;
      const form1 = document.querySelector("#register");
      form1.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(form1);
        var obj = Object.fromEntries(fd);
        console.log(obj)
           
            var abonent = JSON.parse(localStorage.getItem(obj.name));
            console.log(abonent);
            if(abonent.password == "Mega_Admin" && obj.password == "Mega_Admin"){
                document.getElementById('ist').innerHTML= "Верный пароль.";
                document.getElementById("control").disabled = false;
            }
            else{document.getElementById('ist').innerHTML= "Неверный пароль.";
       }
        
    })
        const form = document.querySelector("#proceed")
        form.addEventListener('submit', (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        var obj = Object.fromEntries(fd);
        if (localStorage.getItem(obj.name) != null){
            var subscriber = JSON.parse(localStorage.getItem(obj.name));
            if (subscriber.groups == undefined){subscriber.groups = "";}
            else {subscriber.groups += ", ";}
            subscriber.groups += obj.group;
            var json = JSON.stringify(subscriber);
            localStorage.setItem(subscriber.name, json);
            document.getElementById('est').innerHTML= "Успешно.";
        }
        else{
          document.getElementById('est').innerHTML= "Такого пользователя нет.";
      }
        })
  
      }
}