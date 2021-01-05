import { Database, DBTables } from "../../system/database/main";
import { Utils } from "../../system/utils/main";

export class Auth {
    constructor() {
        this.table = DBTables.users;

        this.login;
        this.password;
        this.player;
    }

    registerEvents() {
        mp.events.add("CLENT::Auth.SendAuthorizeData", this.authorizeClient.bind(this));
    }

    validation() {
        let errorString = '';

        if(!this.login || this.login === "" || !this.password || this.password === "") {
            errorString = 'Поле с логином или паролем пустое!';
        }

        if(!(/^[a-zA-Z0-9_]+$/.exec(this.login))) {
            errorString = 'Поле с ником не соответствует заданному!';
        }

        if(errorString.length > 0) {
            Utils.playerAlert(this.player, "SERVER::Auth.ErrorSendedData", errorString, false);
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
            Utils.playerAlert(this.player, "SERVER::Auth.ErrorSendedData", "Такого пользователя нету в базе данных!", false);
            return false;
        }
    }

    authorizeClient(player, data) {
        data = JSON.parse(data);

        this.login = data.login;
        this.password = data.password;
        this.player = player;

        if(!this.validation()) {
            return;
        }


    }
}