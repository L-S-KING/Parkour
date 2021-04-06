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
var StopPk = (function (_super) {
    __extends(StopPk, _super);
    function StopPk() {
        var _this = _super.call(this) || this;
        _this.addListener(_this, egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    StopPk.prototype.init = function () {
        this.skinName = "stopBg";
        this.addListener(this.continue, egret.TouchEvent.TOUCH_TAP, this.continueTap, this);
        this.addListener(this.again, egret.TouchEvent.TOUCH_TAP, this.againTap, this);
        this.addListener(this.menu, egret.TouchEvent.TOUCH_TAP, this.menuTap, this);
    };
    StopPk.prototype.continueTap = function () {
        Message.instance.send(MsgCMD.GAME_CONTINUE);
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    StopPk.prototype.againTap = function () {
        if (SoundManager.instance.isPlay == true) {
            SoundManager.instance.startBgMusic("pkMusicBg_mp3");
        }
        SceneManager.getInstance().addScene(new Level2());
    };
    StopPk.prototype.menuTap = function () {
        SoundManager.instance.stopBgMusic();
        if (SoundManager.instance.isPlay == true) {
            SoundManager.instance.startBgMusic("bgMusic_mp3");
        }
        SceneManager.getInstance().addScene(new MainMenu());
    };
    return StopPk;
}(BaseModule));
__reflect(StopPk.prototype, "StopPk");
//# sourceMappingURL=StopPk.js.map