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
 * 障碍物
 */
var Obstacle = (function (_super) {
    __extends(Obstacle, _super);
    function Obstacle() {
        var _this = _super.call(this) || this;
        /**游戏暂停 */
        _this.gameStop = false;
        /**障碍物 */
        _this.obstacle = null;
        /**障碍物种类 */
        _this.obstacleType = 0;
        /**障碍物速度 */
        _this.obstacleSpeed = 8;
        /**是否滑行 */
        _this.isSlide = false;
        /**是否冲刺 */
        _this.isSprint = false;
        _this.addListener(_this, egret.Event.ENTER_FRAME, _this.update, _this);
        return _this;
    }
    /**障碍物初始化 */
    Obstacle.prototype.obstacleInit = function () {
        this.obstacleType = Math.floor(Math.random() * 5 + 1);
        this.obstacle = new egret.Bitmap();
        this.obstacle.texture = RES.getRes("obstacle" + this.obstacleType + "_png");
        this.obstacle.anchorOffsetX = this.obstacle.width * 0.5;
        this.obstacle.anchorOffsetY = this.obstacle.height * 0.5;
        this.addChild(this.obstacle);
        this.addMessage(MsgCMD.PLAYER_STOPGO, this);
        this.addMessage(MsgCMD.PLAYER_DEATH, this);
        this.addMessage(MsgCMD.PLAYER_SLIDE, this);
        this.addMessage(MsgCMD.PLAYER_STOPSLIDE, this);
        this.addMessage(MsgCMD.GAME_STOP, this);
        this.addMessage(MsgCMD.GAME_CONTINUE, this);
    };
    Obstacle.prototype.update = function () {
        if (PlayerManager.getPlayer().player.playerDeath == true) {
            return;
        }
        if (this.gameStop == true) {
            return;
        }
        if (PlayerManager.getPlayer().player.isSprint == true) {
            this.obstacleSpeed = PlayerManager.getPlayer().player.sprintSpeed;
        }
        else if (PlayerManager.getPlayer().player.isSprint == false && PlayerManager.getPlayer().player.x >= 640) {
            this.obstacleSpeed = 8;
        }
        this.x -= this.obstacleSpeed;
        if (this.x < -300) {
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
        }
        //玩家与障碍物的碰撞
        if (Math.abs(PlayerManager.getPlayer().player.x - this.x) < (PlayerManager.getPlayer().player.player.width + this.obstacle.width) * 0.5
            && Math.abs(PlayerManager.getPlayer().player.y - this.y) < (PlayerManager.getPlayer().player.player.height + this.obstacle.height) * 0.5
            && PlayerManager.getPlayer().player.x - PlayerManager.getPlayer().player.player.width * 0.2 < this.x) {
            //玩家不是冲刺状态
            if (PlayerManager.getPlayer().player.isSprint == false && PlayerManager.getPlayer().player.isSlide == false) {
                Message.instance.send(MsgCMD.PLAYER_BACK);
            }
            //玩家是冲刺状态
            if (PlayerManager.getPlayer().player.isSprint == true) {
                if (this.parent != null) {
                    KeyManager.getRocker().parkour.performance += 40;
                    this.parent.removeChild(this);
                }
            }
        }
        if (PlayerManager.getPlayer().player.x + PlayerManager.getPlayer().player.width * 0.4 > this.x - this.obstacle.width * 0.5
            && PlayerManager.getPlayer().player.x - PlayerManager.getPlayer().player.width * 0.4 < this.x + this.obstacle.width * 0.5
            && PlayerManager.getPlayer().player.y > this.y) {
            PlayerManager.getPlayer().player.jumpTimes = 0;
        }
        //流星与障碍物的碰撞
        for (var i = 0; i < MeteorManager.getMeteor().meteorArray.length; i++) {
            if (Math.abs(MeteorManager.getMeteor().meteorArray[i].x - this.x) < (MeteorManager.getMeteor().meteorArray[i].meteor.width + this.obstacle.width) * 0.4
                && Math.abs(MeteorManager.getMeteor().meteorArray[i].y - this.y) < (MeteorManager.getMeteor().meteorArray[i].meteor.height + this.obstacle.height) * 0.5
                && MeteorManager.getMeteor().meteorArray[i].isMeteor == true) {
                MeteorManager.getMeteor().meteorArray[i].downSpeed = 0;
                if (this.parent != null) {
                    KeyManager.getRocker().parkour.performance += 30;
                    this.parent.removeChild(this);
                }
            }
        }
    };
    Obstacle.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.PLAYER_STOPGO:
                this.obstacleSpeed = 8;
                break;
            case MsgCMD.PLAYER_DEATH:
                this.obstacleSpeed = 0;
                break;
            case MsgCMD.PLAYER_SLIDE:
                this.isSlide = true;
                break;
            case MsgCMD.PLAYER_STOPSLIDE:
                this.isSlide = false;
                break;
            case MsgCMD.GAME_STOP:
                this.gameStop = true;
                break;
            case MsgCMD.GAME_CONTINUE:
                this.gameStop = false;
                break;
        }
    };
    return Obstacle;
}(BaseModule));
__reflect(Obstacle.prototype, "Obstacle", ["IMessage"]);
//# sourceMappingURL=Obstacle.js.map