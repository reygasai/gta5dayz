import { Database, DBTables } from "../../system/database/main";

export class Auth {
    constructor() {
        this.table = DBTables.users;
    }

    registerEvents() {
        mp.events.add("CLENT::Auth.SendAuthorizeData", this.authorizeClient);
    }

    async authorizeClient(player, data) {
        const login = data.login;
        const password = data.password;
        
        if(!login || login === "" || !password || password === "") {
            player.call("SERVER::Auth.ErrorSendedData", JSON.stringify({
                type: false,
                message: "Поле с логином или паролем пустое!"
            }));
            
            return;
        }

        if(!(/^[a-zA-Z0-9_]+$/.exec(login))) {
            player.call("SERVER::Auth.ErrorSendedData", JSON.stringify({
                type: false,
                message: "Поле с ником не соответствует заданному!"
            }));
            
            return; 
        }

        let result = await Database.select(this.table.colums.name)
                                 .select(this.table.colums.password)
                                 .from(this.table.name)
                                 .where(this.table.colums.name, '=', login)
                                 .limit(1);
        
        if(!result || result.lenght === 0) {
            player.call("SERVER::Auth.ErrorSendedData", JSON.stringify({
                type: false,
                message: "Такого пользователя нету!"
            }));
            
            return;
        }
    }
}