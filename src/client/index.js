import { Player } from "./modules/player/main";
import { Chat } from "./modules/chat/main";
import { Authorization } from "./modules/authorization/main";

require('./modules/noclip/main');

let pl = new Player().init();
let ch = new Chat().init();
let au = new Authorization().init();