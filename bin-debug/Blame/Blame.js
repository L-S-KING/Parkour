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
 * 酷跑中的怪
 */
var Blame = (function (_super) {
    __extends(Blame, _super);
    function Blame() {
        var _this = _super.call(this) || this;
        /**游戏暂停 */
        _this.gameStop = false;
        /**怪 */
        _this.blame = null;
        /**怪的种类 */
        _this.blameType = 0;
        /**怪的速度 */
        _this.blameSpeed = 8;
        /**怪的下落速度 */
        _this.blameDownSpeed = 12;
        _this.addListener(_this, egret.Event.ENTER_FRAME, _this.update, _this);
        return _this;
    }
    /**怪初始化 */
    Blame.prototype.blameInit = function (type) {
        this.blameType = type;
        this.blame = new egret.Bitmap();
        this.blame.texture = RES.getRes("blame" + this.blameType + "_png");
        this.blame.anchorOffsetX = this.blame.width * 0.5;
        this.blame.anchorOffsetY = this.blame.height * 0.5;
        this.addChild(this.blame);
        this.addMessage(MsgCMD.GAME_STOP, this);
        this.addMessage(MsgCMD.GAME_CONTINUE, this);
    };
    Blame.prototype.update = function () {
        if (PlayerManager.getPlayer().player.playerDeath == true) {
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
        }
        if (this.gameStop == true) {
            return;
        }
        if (PlayerManager.getPlayer().player.isSprint == true) {
            this.blameSpeed = PlayerManager.getPlayer().player.sprintSpeed;
        }
        else if (PlayerManager.getPlayer().player.isSprint == false && PlayerManager.getPlayer().player.x >= 640) {
            this.blameSpeed = 8;
        }
        this.x -= this.blameSpeed;
        //怪走出屏幕的移除
        if (this.x < -160 && this.parent != null) {
            this.parent.removeChild(this);
        }
        //玩家与怪的左边碰撞
        if (Math.abs(PlayerManager.getPlayer().player.x - this.x) < (PlayerManager.getPlayer().player.player.width + this.blame.width) * 0.35 + 5
            && Math.abs(PlayerManager.getPlayer().player.y - this.y) < (PlayerManager.getPlayer().player.player.height + this.blame.height) * 0.2
            && PlayerManager.getPlayer().player.x < this.x) {
            //玩家存在护盾道具
            if (PlayerManager.getPlayer().player.isShield == true) {
                Message.instance.send(MsgCMD.ITEM_SHIELDREMOVE);
                if (this.parent != null) {
                    this.parent.removeChild(this);
                    PlayerManager.getPlayer().player.isShield = false;
                }
            }
            else if (PlayerManager.getPlayer().player.isShield == false) {
                Message.instance.send(MsgCMD.PLAYER_DEATH);
            }
        }
        //玩家与怪的右边碰撞
        if (Math.abs(PlayerManager.getPlayer().player.x - this.x) < (PlayerManager.getPlayer().player.player.width + this.blame.width) * 0.3 + 5
            && Math.abs(PlayerManager.getPlayer().player.y - this.y) < (PlayerManager.getPlayer().player.player.height + this.blame.height) * 0.2
            && PlayerManager.getPlayer().player.x > this.x) {
            //玩家存在护盾道具
            if (PlayerManager.getPlayer().player.isShield == true) {
                Message.instance.send(MsgCMD.ITEM_SHIELDREMOVE);
                if (this.parent != null) {
                    this.parent.removeChild(this);
                    PlayerManager.getPlayer().player.isShield = false;
                }
            }
            else if (PlayerManager.getPlayer().player.isShield == false) {
                Message.instance.send(MsgCMD.PLAYER_DEATH);
            }
        }
        //玩家踩到怪的头上
        if (Math.abs((PlayerManager.getPlayer().player.y + PlayerManager.getPlayer().player.player.height * 0.5) - (this.y - this.blame.height * 0.5)) < (10 + 10) * 0.5
            && Math.abs(PlayerManager.getPlayer().player.x - this.x) < (PlayerManager.getPlayer().player.player.width + this.blame.width) * 0.4
            && PlayerManager.getPlayer().player.jumpSpeed < 0) {
            Message.instance.send(MsgCMD.PLAYER_BOUNCE);
            if (this.parent != null) {
                KeyManager.getRocker().parkour.performance += 20;
                this.parent.removeChild(this);
            }
        }
        //流星与怪的碰撞
        for (var i = 0; i < MeteorManager.getMeteor().meteorArray.length; i++) {
            if (Math.abs(MeteorManager.getMeteor().meteorArray[i].x - this.x) < (MeteorManager.getMeteor().meteorArray[i].meteor.width + this.blame.width) * 0.5
                && Math.abs(MeteorManager.getMeteor().meteorArray[i].y - this.y) < (MeteorManager.getMeteor().meteorArray[i].meteor.height + this.blame.height) * 0.5
                && MeteorManager.getMeteor().meteorArray[i].isMeteor == true) {
                MeteorManager.getMeteor().meteorArray[i].downSpeed = 0;
                if (this.parent != null) {
                    this.parent.removeChild(this);
                }
            }
        }
    };
    Blame.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.GAME_STOP:
                this.gameStop = true;
                break;
            case MsgCMD.GAME_CONTINUE:
                this.gameStop = false;
                break;
        }
    };
    return Blame;
}(BaseModule));
__reflect(Blame.prototype, "Blame", ["IMessage"]);
//# sourceMappingURL=Blame.js.map