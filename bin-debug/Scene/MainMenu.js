var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 游戏主界面
 */
var MainMenu = (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu() {
        var _this = _super.call(this) || this;
        _this.addListener(_this, egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
        // this.addListener(this, egret.Event.ENTER_FRAME, this.update, this);
    }
    MainMenu.prototype.init = function () {
        this.skinName = "menu";
        //音量控制按钮装态
        if (SoundManager.instance.isPlay == false) {
            this.setMusic.selected = true;
        }
        if (SoundManager.instance.isPlay == true) {
            this.setMusic.selected = false;
        }
        this.addListener(this.btnClassic, egret.TouchEvent.TOUCH_TAP, this.btnClassicTap, this);
        this.addListener(this.btnAdventure, egret.TouchEvent.TOUCH_TAP, this.btnAdventureTap, this);
        this.addListener(this.btnShop, egret.TouchEvent.TOUCH_TAP, this.btnShopTap, this);
        this.addListener(this.setMusic, egret.TouchEvent.TOUCH_TAP, this.setMusicTap, this);
    };
    MainMenu.prototype.btnClassicTap = function () {
        SceneManager.getInstance().addScene(new Classic());
    };
    MainMenu.prototype.btnAdventureTap = function () {
        SoundManager.instance.stopBgMusic();
        SceneManager.getInstance().addScene(new Adventure());
    };
    MainMenu.prototype.btnShopTap = function () {
        SceneManager.getInstance().addScene(new Shop());
    };
    MainMenu.prototype.setMusicTap = function () {
        if (this.setMusic.selected == false) {
            SoundManager.instance.startBgMusic("bgMusic_mp3");
            SoundManager.instance.isPlay = true;
        }
        if (this.setMusic.selected == true) {
            SoundManager.instance.stopBgMusic();
            SoundManager.instance.isPlay = false;
        }
    };
    MainMenu.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
        }
    };
    return MainMenu;
}(BaseModule));
__reflect(MainMenu.prototype, "MainMenu", ["IMessage"]);
//# sourceMappingURL=MainMenu.js.map