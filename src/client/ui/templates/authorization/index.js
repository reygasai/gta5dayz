class UIAuthorization {
    constructor() {
        this.root = document.querySelector('.auth-pane-content');
        if(!this.root) {
            return;
        }
    }

    notify(reason) {
        const container = document.querySelector(".auth-notice");
        const displayClass = "display";

        if(container.classList.contains(displayClass)) {
            return;
        }

        if(!container) {
            return;
        }

        container.querySelector(".description").innerHTML = reason; 
        container.classList.add(displayClass);

        setTimeout(() => {
            container.classList.remove(displayClass);
        }, 2 * 1000);
    }

    route() {
        const buttons = this.root.querySelectorAll('button');
        const routeButtons = [];

        buttons.forEach(element => {
            if(element.hasAttribute('route')) {
                routeButtons.push(element);
            }
        });

        routeButtons.forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();

                let toRoute = e.target.getAttribute('route');
                
                let pane = this.root.querySelector(`.auth-pane-content-form#${toRoute}`);
                let activePane = this.root.querySelector(`.auth-pane-content-form.display`);
                
                if(!pane) {
                    return;
                }

                if(pane.classList.contains('display')) {
                    return;
                }

                activePane.classList.remove('display');
                pane.classList.add('display');
            });
        });
    }

    authPane() {
        const form = this.root.querySelector(".auth-pane-content-form#auth");

        const name     = form.querySelector('input[name="login"]');
        const password = form.querySelector('input[name="password"]');

        const button = form.querySelector(".auth-button#authorize");
        button.addEventListener('click', (e) => {
            e.preventDefault();

            if(!this.validateValue(name.value)) {
                this.notify('Поле с ником пустое или меньше 4х символов');
                return;
            }

            if(!this.validateValue(password.value)) {
                this.notify('Поле с паролем пустое или меньше 4х символов');
                return;
            }

            mp.trigger("CEF::Authorization.SendAuthData", JSON.stringify({
                login: name.value,
                password: password.value
            }));
        });
    }

    registerPane() {
        const form = this.root.querySelector(".auth-pane-content-form#register");

        const name        = form.querySelector('input[name="login"]');
        const mail        = form.querySelector('input[name="mail"]');
        const passwordOne = form.querySelector('input[name="password-one"]');
        const passwordTwo = form.querySelector('input[name="password-two"]');

        const button = form.querySelector(".auth-button#register");
        button.addEventListener('click', (e) => {
            e.preventDefault();
        
            if(!this.validateValue(name.value)) {
                this.notify('Поле с ником пустое или меньше 4х символов');
                return;
            }
    
            if(!this.validateValue(mail.value)) {
                this.notify('Поле с электронной почтой пустое!');
                return;
            }
    
            if(!this.validateEmail(mail.value)) {
                this.notify('Поле с электронной почтой заполнено не верно!');
                return;
            }
    
            if(!this.validateValue(passwordOne.value) || !this.validateValue(passwordTwo.value)) {
                this.notify('Одно из полей связанное с паролем не заполнено!');
                return;
            }
    
            if(passwordOne.value !== passwordTwo.value) {
                this.notify('Введенные пароли не совпадают!');
            }
    
            mp.trigger('CEF::Authorization.SendRegisterData', JSON.stringify({
                login: name.value,
                email: email.value,
                password: passwordOne.value
            }));
        });
    }

    validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.exec(String(email));
    }

    validateValue(value) {
        if(value === '' || value.length < 4) {
            return false;
        }

        return true;
    }
}

document.addEventListener("DOMContentLoaded", function(event) { 
    let UI = document.authUI = new UIAuthorization;
    UI.route();
    UI.authPane();
    UI.registerPane();
});