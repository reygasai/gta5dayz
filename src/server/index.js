import { chat } from "./modules/chat/main";
import { Character } from "./modules/character/main";
import { Auth } from "./modules/authorization/auth";

import Debug from "./system/utils/debug";

chat.init();

let debug = new Debug();
debug.init();

let ch = new Character;
ch.init();

let au = new Auth;
au.registerEvents();