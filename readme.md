Создал объект с сообщениями о статусе: "message".
Создал различные состояния запроса: loading: 'Загрузка...',
                                    success: 'Спасибо мы скоро с вами свяжемся!',
                                    failure: 'что-то пошло не так'
                                   
получил елементы со страницы с которыми буду работать.
let form = document.querySelector('.main-form'),
    input = form.getElementsByTagName('input'),

для оповещения пользователя создал новый div 
    statusMessage = document.createElement('div');
    
для стилизации назначил класс прописанный в css и с помощью метода add добавил класс елементу.
    statusMessage.classList.add('status');

Повесил обработчик событий именно на форму, а не на какую то кнопку, необходимо отслеживать когда форма отправляется на сервер.
    form.addEventListener('submit', function(event)
    
Отменил стандартное поведение браузера preventDefault для того, чтобы страница не перегружалась полностью после ввода данных.
    event.preventDefault()
    
Оповещение пользователя как прошел запрос, выведется один из вариантов из message,
для того чтобы его вывести необходимо поместить новый елемент в нашу форму.
form.appendChild(statusMessage);

Отправка данных на сервер.
Создал объект let request = new XMLHttpRequest();
при помощи метода post отправляю данные на сервер.

Отправка json файлов:
request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

Получение данных которые ввел пользователь во все инпуты, это форма получена ранее
let formData = new FormData(form);

/отправка json файлов, данные которые получил с формы преобразовать в json формат
        let obj = {}; //создаем промежуточный объек в который помещаем все эти данные
        formData.forEach(function(value, key){
            obj[key] = value; //объект obj заполням данными которые есть в formData, превратили объект formData в обычный читаемый объект
        });
        let json = JSON.stringify(obj); //превратил с помощью метода stringify объект js в json формат
        
При помощи метода send отправляем данные на сервер
        request.send(json);

При помощи readystatechange наблюдение за состояниями запроса
        request.addEventListener('readystatechange', function(){
Пока статус у readyState < 4(DONE) будем что то делать 
            if(request.readyState <  4)
            
Вывдедет статус загрузка и получим его на странице, если сервер тупит
                statusMessage.innerHTML = message.loading;
(readyState интересеует 4 состояние запррос завершен)

else if(request.readyState == 4 && request.status == 200) все прошло успешно сервер ответил 200 кодом
                statusMessage.innerHTML = message.success; //все прошло успешно выведется статус из  success: 'Спасибо мы скоро с вами свяжемся!'
else если запрос не удачен, то вывдедем данные из failure: 'что-то пошло не так'
                statusMessage.innerHTML = message.failure;
           
Цикл который очистит наши формы
        for (let i= 0; i < input.length; i++) {
            input[i].value = ''; 
        }
