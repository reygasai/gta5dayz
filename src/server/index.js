import { chat } from "./modules/chat/main";
import Authorization from "./modules/authorization/main";

import Debug from "./system/utils/debug";

chat.init();

let debug = new Debug();
debug.init();

let au = new Authorization;
au.init();