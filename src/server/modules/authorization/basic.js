import { Database, DBTables } from "../../system/database/main";

export default class Basic {
    async loadData(login) {
        let result = await Database.select('*')
            .from(DBTables.users.name)
            .where(DBTables.users.colums.name, '=', login)
            .limit(1);

        if(!result || result.length === 0) {
            return {};
        }

        return result[0];
    }

    playerAlert(player, eventName, message, type) {
        let callJsonStr = JSON.stringify({
            type: type,
            message: message
        });

        player.call(eventName, [callJsonStr]);
    }

    isEmptyOrLess4Chars(value) {
        if(!value || value === "" || value.length < 4) {
            return false;
        }

        return true;
    }

    validationLogin(value) {
        if(!this.isEmptyOrLess4Chars(value)) {
            return false;
        }

        if(!(/^[a-zA-Z0-9_]+$/.exec(value))) {
            return false;
        }

        return true;
    }

    comparePasswords(passwordOne, passwordTwo) {
        if(!this.isEmptyOrLess4Chars(passwordOne)) {
            return false;
        }

        if(!this.isEmptyOrLess4Chars(passwordTwo)) {
            return false;
        }

        if(passwordOne !== passwordTwo) {
            return false;
        }

        return true;
    }

    validationEmail(value) {
        if(!this.isEmptyOrLess4Chars(value)) {
            return false;
        }

        const rageXPStringEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return rageXPStringEmail.exec(String(value));
    }
} 

