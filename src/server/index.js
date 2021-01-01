import { chat } from "./modules/chat/main";
import { Character } from "./modules/character/main";

import Debug from "./classes/utils/debug";

chat.init();

let debug = new Debug();
debug.init();


let ch = new Character;
ch.init();