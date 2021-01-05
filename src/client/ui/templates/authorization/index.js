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
        }, 5 * 1000);
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
        const button   = form.querySelector(".auth-button#authorize");

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

            mp.trigger('CEF::Auth.SendAuthorizeData', JSON.stringify({
                login: name.value,
                password: password.value
            }));
        });
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
});