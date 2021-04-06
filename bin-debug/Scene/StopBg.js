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
var StopBg = (function (_super) {
    __extends(StopBg, _super);
    function StopBg() {
        var _this = _super.call(this) || this;
        _this.addListener(_this, egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    StopBg.prototype.init = function () {
        this.skinName = "stopBg";
        this.addListener(this.continue, egret.TouchEvent.TOUCH_TAP, this.continueTap, this);
        this.addListener(this.again, egret.TouchEvent.TOUCH_TAP, this.againTap, this);
        this.addListener(this.menu, egret.TouchEvent.TOUCH_TAP, this.menuTap, this);
    };
    StopBg.prototype.continueTap = function () {
        Message.instance.send(MsgCMD.GAME_CONTINUE);
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    StopBg.prototype.againTap = function () {
        SceneManager.getInstance().addScene(new Level1());
    };
    StopBg.prototype.menuTap = function () {
        SoundManager.instance.stopBgMusic();
        if (SoundManager.instance.isPlay == true) {
            SoundManager.instance.startBgMusic("bgMusic_mp3");
        }
        SceneManager.getInstance().addScene(new MainMenu());
    };
    return StopBg;
}(BaseModule));
__reflect(StopBg.prototype, "StopBg");
//# sourceMappingURL=StopBg.js.map