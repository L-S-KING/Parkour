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
 * 流星
 */
var Meteor = (function (_super) {
    __extends(Meteor, _super);
    function Meteor() {
        var _this = _super.call(this) || this;
        /**游戏暂停 */
        _this.gameStop = false;
        /**流星 */
        _this.meteor = null;
        /**流星速度 */
        _this.meteorSpeed = 0;
        /**是否存在流星 */
        _this.isMeteor = false;
        /**流星与地板碰撞 */
        _this.isTouch = false;
        _this.downSpeed = 10;
        _this.addListener(_this, egret.Event.ENTER_FRAME, _this.update, _this);
        return _this;
    }
    /**流星初始化 */
    Meteor.prototype.meteorInit = function () {
        this.meteor = new egret.Bitmap();
        this.meteor.texture = RES.getRes("meteor_png");
        this.meteor.anchorOffsetX = this.meteor.width * 0.5;
        this.meteor.anchorOffsetY = this.meteor.height * 0.5;
        this.addChild(this.meteor);
        this.isMeteor = true;
        this.addMessage(MsgCMD.PLAYER_STOPGO, this);
        this.addMessage(MsgCMD.PLAYER_DEATH, this);
        this.addMessage(MsgCMD.GAME_STOP, this);
        this.addMessage(MsgCMD.GAME_CONTINUE, this);
    };
    Meteor.prototype.update = function () {
        if (PlayerManager.getPlayer().player.playerDeath == true) {
            return;
        }
        if (this.gameStop == true) {
            return;
        }
        if (PlayerManager.getPlayer().player.isSprint == true) {
            this.meteorSpeed = PlayerManager.getPlayer().player.sprintSpeed;
        }
        else if (PlayerManager.getPlayer().player.isSprint == false && PlayerManager.getPlayer().player.x >= 640) {
            this.meteorSpeed = 8;
        }
        this.y += this.downSpeed;
        this.x += this.downSpeed * 1.2;
        if (Math.abs(this.x - PlayerManager.getPlayer().player.x) < (this.meteor.width + PlayerManager.getPlayer().player.player.width) * 0.5
            && Math.abs(this.y - PlayerManager.getPlayer().player.y) < (this.meteor.height + PlayerManager.getPlayer().player.player.height) * 0.5
            && this.downSpeed == 0) {
            if (this.parent != null) {
                KeyManager.getRocker().parkour.performance += 40;
                this.parent.removeChild(this);
                this.isMeteor = false;
            }
        }
        if (this.x < 0 && this.parent != null) {
            this.parent.removeChild(this);
        }
        if (this.downSpeed == 0) {
            this.x -= 8;
        }
    };
    Meteor.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.PLAYER_STOPGO:
                this.meteorSpeed = 8;
                break;
            case MsgCMD.PLAYER_DEATH:
                this.meteorSpeed = 0;
                break;
            case MsgCMD.GAME_STOP:
                this.gameStop = true;
                break;
            case MsgCMD.GAME_CONTINUE:
                this.gameStop = false;
                break;
        }
    };
    return Meteor;
}(BaseModule));
__reflect(Meteor.prototype, "Meteor", ["IMessage"]);
//# sourceMappingURL=Meteor.js.map