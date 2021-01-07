import Basic from "./basic";
import bcrypt from 'bcrypt';

export default class Auth extends Basic {
    async authorize(player, data) {
        data = JSON.parse(data);

        const login = data.login.trim();
        const password = data.password;
        
        if(!this.validationLogin(login)) {
            this.playerAlert(player, "SERVER::Authorization.DisplayError", "Поле с ником пустое или содержит запрещенные символы!", false);
            return {};
        }

        if(!this.isEmptyOrLess4Chars(password)) {
            this.playerAlert(player, "SERVER::Authorization.DisplayError", "Поле с паролем пустое или содержит меньше 4х символов!", false);
            return {};
        }

        try {
            let playerData = await this.loadData(login);
            if(Object.keys(playerData).length === 0) {
                this.playerAlert(player, "SERVER::Authorization.DisplayError", "Такого пользователя нету в базе данных!", false);
                return {};
            }
    
            let comparePasswordsResult = await bcrypt.compare(password, playerData.password);
            if(!comparePasswordsResult) {
                this.playerAlert(player, "SERVER::Authorization.DisplayError", "Логин и пароль не подходит к данному аккаунту!", false);
                return {};
            } else {
                return playerData;
            }
        } catch(error) {
            //TODO: Завезти логи
            console.log(error);
        }
    }   
}