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
 * 背景
 */
var Bg = (function (_super) {
    __extends(Bg, _super);
    function Bg() {
        var _this = _super.call(this) || this;
        /**游戏暂停 */
        _this.gameStop = false;
        /**背景图片种类 */
        _this.bgType = 0;
        /**背景图片序列 */
        _this.bgFrame = 0;
        /**背景移动速度 */
        _this.bgSpeed = 0;
        /**背景 */
        _this.bg = null;
        /**背景数组 */
        _this.bgArray = [];
        _this.addListener(_this, egret.Event.ADDED_TO_STAGE, _this.init, _this);
        _this.addListener(_this, egret.Event.ENTER_FRAME, _this.update, _this);
        return _this;
    }
    /**背景初始化 */
    Bg.prototype.init = function () {
        this.addMessage(MsgCMD.PLAYER_STOPGO, this);
        this.addMessage(MsgCMD.PLAYER_DEATH, this);
        this.addMessage(MsgCMD.GAME_STOP, this);
        this.addMessage(MsgCMD.GAME_CONTINUE, this);
        this.bgType = Math.floor(Math.random() * 3 + 1);
        for (var i = 0; i < 2; i++) {
            this.bgFrame = i;
            this.bg = new egret.Bitmap();
            this.bg.texture = RES.getRes("bg" + this.bgType + this.bgFrame + "_jpg");
            this.bg.x = i * 1280;
            this.bg.y = 0;
            this.addChild(this.bg);
            this.bgArray.push(this.bg);
        }
    };
    Bg.prototype.update = function () {
        if (PlayerManager.getPlayer().player.playerDeath == true) {
            return;
        }
        if (this.gameStop == true) {
            return;
        }
        for (var i = 0; i < this.bgArray.length; i++) {
            this.bgArray[i].x -= this.bgSpeed;
            if (this.bgArray[i].x <= -1280) {
                this.bgArray[i].x = 1280;
            }
        }
    };
    Bg.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.PLAYER_STOPGO:
                this.bgSpeed = 8;
                break;
            case MsgCMD.PLAYER_DEATH:
                this.bgSpeed = 0;
                break;
            case MsgCMD.GAME_STOP:
                this.gameStop = true;
                break;
            case MsgCMD.GAME_CONTINUE:
                this.gameStop = false;
                break;
        }
    };
    return Bg;
}(BaseModule));
__reflect(Bg.prototype, "Bg", ["IMessage"]);
//# sourceMappingURL=Bg.js.map