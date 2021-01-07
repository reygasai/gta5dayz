import { Database, DBTables } from "../../system/database/main";
import { Utils } from "../../system/utils/main";
import bcrypt from 'bcrypt';
/*
export class Auth {
    validation() {
        let errorString = '';

        if(!this.login || this.login === "" || !this.password || this.password === "") {
            errorString = 'Поле с логином или паролем пустое!';
        }

        if(!(/^[a-zA-Z0-9_]+$/.exec(this.login))) {
            errorString = 'Поле с ником содержит запрещенные символы!';
        }

        if(errorString.length > 0) {
            Utils.playerAlert(this.player, "SERVER::Authorization.DisplayError", errorString, false);
            return false;
        }

        return true;
    }

    async authorize(player, data) {
        data = JSON.parse(data);

        const login = data.login;
        const password = data.password;
        
        if(!this.validation(login, password)) {
            return;
        }
    }   
}
*/
export class Auth {
    constructor(player, data) {
        console.log(data);

        this.table = DBTables.users;

        this.login;
        this.password;
        this.player;
    }

    init() {

    }

    registerEvents() {
        //mp.events.add("CLIENT::Authorization.SendAuthData", this.authorizeClient.bind(this));
    }

    validation() {
        let errorString = '';

        if(!this.login || this.login === "" || !this.password || this.password === "") {
            errorString = 'Поле с логином или паролем пустое!';
        }

        if(!(/^[a-zA-Z0-9_]+$/.exec(this.login))) {
            errorString = 'Поле с ником содержит запрещенные символы!';
        }

        if(errorString.length > 0) {
            Utils.playerAlert(this.player, "SERVER::Authorization.DisplayError", errorString, false);
            return false;
        }

        return true;
    }

    async loadData() {
        let result = await Database.select(this.table.colums.name)
            .select(this.table.colums.password)
            .from(this.table.name)
            .where(this.table.colums.name, '=', this.login)
            .limit(1);

        if(!result || result.length === 0) {
            return {};
        }

        return result[0];
    }

    async authorizeClient(player, data) {
        data = JSON.parse(data);

        this.login = data.login;
        this.password = data.password;
        this.player = player;

        if(!this.validation()) {
            return;
        }

        let userData = await this.loadData();

        if(Object.keys(userData).length === 0) {
            Utils.playerAlert(this.player, "SERVER::Authorization.DisplayError", "Такого пользователя нету в базе данных!", false);
            return;
        }

        let compareResult = await bcrypt.compare(this.password, userData.password);
        
        if(compareResult) {
            Utils.playerAlert(this.player, "SERVER::Authorization.DisplayError", "Авторизовали!", false);
        } else {
            Utils.playerAlert(this.player, "SERVER::Authorization.DisplayError", "Логин или пароль не верны!", false);
        }
    }
}