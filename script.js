// Form

let message = {
    loading: 'Загрузка...',
    success: 'Спасибо мы скоро с вами свяжемся!',
    failure: 'что-то пошло не так'
};
let form = document.querySelector('.main-form'),
    input = form.getElementsByTagName('input'),
    //для оповещения пользователя создал новый div 
    statusMessage = document.createElement('div');
    //для стилизации назначил класс прописанный в css и с помощью метода add добавил класс елементу
    statusMessage.classList.add('status');

    
    form.addEventListener('submit', function(event){
        event.preventDefault(); 
        form.appendChild(statusMessage); 
        

//отправка данных на сервер
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php'); //отправлка данных на сервер с помощю метода post
        //request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');//настройка заголовков http запроса, контент отправляемый на сервер будет содержать данные полученные из формы
        //отправка json файлов
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

               let formData = new FormData(form);

        let obj = {}; 
        formData.forEach(function(value, key){
            obj[key] = value; 
        });
        let json = JSON.stringify(obj);
        request.send(json);


        //с помощью readystatechange наблюдение за состояниями запроса
        request.addEventListener('readystatechange', function(){
             if(request.readyState <  4) {
             statusMessage.innerHTML = message.loading;
            } else if(request.readyState == 4 && request.status == 200) { 
                statusMessage.innerHTML = message.success; 
            } else { 
                statusMessage.innerHTML = message.failure;
            }
        });
        //цикл который очистит наши формы
        for (let i= 0; i < input.length; i++) {
            input[i].value = ''; //укаждого инпута возьмем value и превратим в пустую строку
        }
    });
