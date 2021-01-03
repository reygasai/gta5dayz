export class Authorization {
    init() {
        let block = false;
        var loginBrowser;

        mp.keys.bind(0x46, true, function() {
            if(!block) {
                loginBrowser = mp.browsers.new('package://ui/templates/authorization/index.html');
            } else {
                loginBrowser.destroy();
            }
            
            block = !block;
        });
    }
}