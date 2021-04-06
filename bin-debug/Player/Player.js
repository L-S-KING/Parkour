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
 * 玩家
 */
var Player = (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super.call(this) || this;
        /**玩家 */
        _this.player = null;
        /**玩家序列帧 */
        _this.playerFrame = 1;
        /**玩家序列帧种类 */
        _this.playerFrameType = 0;
        /**玩家跳跃序列帧 */
        _this.jumpFrame = 1;
        /**游戏暂停 */
        _this.gameStop = false;
        /**玩家的移动速度 */
        _this.playerSpeed = 8;
        /**玩家序列帧切换时间 */
        _this.frameTime = 0;
        /**玩家是否处于跳跃状态 */
        _this.isJumpState = true;
        /**玩家跳跃速度 */
        _this.jumpSpeed = 0;
        /**跳跃次数 */
        _this.jumpTimes = 2;
        /**玩家是否滑动 */
        _this.isSlide = false;
        /**冲刺道具是否存在 */
        _this.isSprint = false;
        /**冲刺道具 */
        _this.sprint = null;
        /**冲刺道具时效 */
        _this.sprintTime = 0;
        /**冲刺速度 */
        _this.sprintSpeed = 0;
        /**护盾是否存在 */
        _this.isShield = false;
        /**护盾 */
        _this.shield = null;
        /**删除护盾 */
        _this.shieldRmove = false;
        /**玩家死亡 */
        _this.playerDeath = false;
        /**玩家是否后退 */
        _this.isBack = false;
        /**玩家与地板左侧碰撞 */
        _this.isLeft = false;
        /**玩家是否在地板上 */
        _this.isFloor = false;
        _this.maxTime = 0;
        _this.addListener(_this, egret.Event.ENTER_FRAME, _this.update, _this);
        return _this;
    }
    /**玩家初始化 */
    Player.prototype.playerInit = function (playerType) {
        this.playerFrameType = playerType;
        this.player = new egret.Bitmap();
        this.player.texture = RES.getRes("player" + this.playerFrameType + this.playerFrame + "_png");
        this.player.anchorOffsetX = this.player.width * 0.5;
        this.player.anchorOffsetY = this.player.height * 0.5;
        this.addChild(this.player);
        //注册消息
        this.addMessage(MsgCMD.PLAYER_JUMP, this);
        this.addMessage(MsgCMD.PLAYER_SLIDE, this);
        this.addMessage(MsgCMD.PLAYER_STOPSLIDE, this);
        this.addMessage(MsgCMD.ITEM_SPRINT, this);
        this.addMessage(MsgCMD.ITEM_SHIELD, this);
        this.addMessage(MsgCMD.PLAYER_DEATH, this);
        this.addMessage(MsgCMD.PLAYER_BOUNCE, this);
        this.addMessage(MsgCMD.PLAYER_DOWNFLOOR, this);
        this.addMessage(MsgCMD.ITEM_SHIELDREMOVE, this);
        this.addMessage(MsgCMD.PLAYER_BACK, this);
        this.addMessage(MsgCMD.FLOOR_LEFT, this);
        this.addMessage(MsgCMD.GAME_STOP, this);
        this.addMessage(MsgCMD.GAME_CONTINUE, this);
    };
    Player.prototype.update = function () {
        if (this.playerDeath == true) {
            return;
        }
        if (this.gameStop == true) {
            return;
        }
        //玩家跑
        this.x += this.playerSpeed;
        //玩家与地板左侧碰撞
        if (this.isLeft == true) {
            this.playerSpeed = 0;
            this.x -= 8;
            if (this.isJumpState == true) {
                this.isLeft = false;
                this.playerSpeed = 2;
            }
        }
        //玩家与障碍物碰撞后退
        if (this.isBack == true) {
            this.playerSpeed = -8;
        }
        //玩家下滑通过障碍物
        if (this.x < 640 && this.isSlide == true && this.playerSpeed < 0 && this.isFloor == true) {
            this.playerSpeed = 2;
            this.isBack = false;
        }
        //玩家在屏幕中心
        if (this.x > 640) {
            this.playerSpeed = 0;
            this.x = 640;
            Message.instance.send(MsgCMD.PLAYER_STOPGO);
        }
        //玩家走出屏幕死亡
        if (this.y >= 720 || this.x < -this.player.width * 0.5) {
            this.playerDeath = true;
            Message.instance.send(MsgCMD.PLAYER_DEATH);
        }
        this.frameTime += 1;
        //玩家跑序列帧切换
        if (this.isSlide == false) {
            if (this.frameTime % 2 == 0) {
                this.playerFrame += 1;
                if (this.playerFrame > 12) {
                    this.playerFrame = 1;
                }
                this.player.texture = RES.getRes("player" + this.playerFrameType + this.playerFrame + "_png");
            }
        }
        //玩家跳跃
        if (this.isJumpState == true) {
            this.isFloor = false;
            this.y -= this.jumpSpeed;
            this.jumpSpeed -= 1;
            //一段跳序列帧
            if (this.jumpTimes == 1) {
                this.playerFrame = 4;
                this.player.texture = RES.getRes("player" + this.playerFrameType + this.playerFrame + "_png");
            }
            //二段跳序列帧
            if (this.jumpTimes < 1 && this.playerFrameType > 1) {
                if (this.frameTime % 6 == 0) {
                    this.jumpFrame += 1;
                    if (this.jumpFrame >= 5) {
                        this.jumpFrame = 5;
                    }
                }
                this.player.texture = RES.getRes("jump" + this.playerFrameType + this.jumpFrame + "_png");
            }
        }
        //玩家滑动
        if (this.isSlide == true && this.isJumpState == false) {
            this.isJumpState = false;
            this.player.texture = RES.getRes("slide" + this.playerFrameType + "_png");
        }
        //冲刺时间
        //开局购买道具
        if (PlayerManager.getPlayer().isBuySprint == true) {
            this.isSprint = true;
            this.maxTime = 1800;
        }
        else if (PlayerManager.getPlayer().isBuySprint == false) {
            if (this.playerFrameType == 1) {
                this.maxTime = 180;
            }
            if (this.playerFrameType == 2) {
                this.maxTime = 360;
            }
            if (this.playerFrameType == 3) {
                this.maxTime = 420;
            }
            if (this.playerFrameType == 4) {
                this.maxTime = 480;
            }
        }
        //冲刺道具
        if (this.isSprint == true) {
            if (this.sprint == null) {
                this.sprint = new egret.Bitmap();
                this.sprint.texture = RES.getRes("sprint_png");
                this.sprint.anchorOffsetX = this.sprint.width * 0.5;
                this.sprint.anchorOffsetY = this.sprint.height * 0.5;
                this.sprint.alpha = 0.6;
                this.addChild(this.sprint);
            }
            this.playerFrame = 4;
            this.player.texture = RES.getRes("player" + this.playerFrameType + this.playerFrame + "_png");
            this.sprintTime += 1;
            this.y = 300;
            this.jumpSpeed = 0;
            this.sprint.x = this.player.x;
            this.sprint.y = this.player.y;
            this.sprintSpeed = 24;
            if (this.sprintTime >= this.maxTime && this.sprint.parent != null) {
                this.sprint.parent.removeChild(this.sprint);
                this.isJumpState = true;
                this.isSprint = false;
                this.sprintTime = 0;
                this.sprintSpeed = 0;
                this.jumpTimes = 1;
                this.sprint = null;
                PlayerManager.getPlayer().isBuySprint = false;
            }
        }
        //开局购买道具
        if (PlayerManager.getPlayer().isBuyShiled == true) {
            this.isShield = true;
        }
        //护盾道具
        if (this.isShield == true) {
            PlayerManager.getPlayer().isBuyShiled = false;
            if (this.shield == null) {
                this.shield = new egret.Bitmap();
                this.shield.texture = RES.getRes("shield_png");
                this.shield.anchorOffsetX = this.shield.width * 0.5;
                this.shield.anchorOffsetY = this.shield.height * 0.5;
                this.addChild(this.shield);
            }
            this.shield.x = this.player.x;
            this.shield.y = this.player.y;
        }
        if (this.shieldRmove == true && this.shield.parent != null) {
            this.shield.parent.removeChild(this.shield);
            this.isShield = false;
            this.shieldRmove = false;
            this.shield = null;
        }
        //移动距离
        if (this.frameTime % 10 == 0 && this.playerSpeed >= 0) {
            if (this.isSprint == false) {
                KeyManager.getRocker().parkour.metre += 1;
            }
            if (this.isSprint == true) {
                KeyManager.getRocker().parkour.metre += 4;
            }
        }
    };
    //接收消息
    Player.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.PLAYER_BACK:
                this.isBack = true;
                break;
            //跳跃键按下
            case MsgCMD.PLAYER_JUMP:
                this.isJumpState = true;
                this.isSlide = false;
                if (this.jumpTimes > 1) {
                    this.jumpSpeed = 21;
                }
                if (this.jumpTimes <= 1 && this.jumpTimes > 0) {
                    this.jumpSpeed = 18;
                }
                this.jumpTimes -= 1;
                break;
            //滑动键按下
            case MsgCMD.PLAYER_SLIDE:
                this.isSlide = true;
                break;
            //滑动键松开
            case MsgCMD.PLAYER_STOPSLIDE:
                this.isSlide = false;
                break;
            //吃掉冲刺道具
            case MsgCMD.ITEM_SPRINT:
                this.isSprint = true;
                break;
            //吃掉护盾道具
            case MsgCMD.ITEM_SHIELD:
                this.isShield = true;
                break;
            //删除护盾道具
            case MsgCMD.ITEM_SHIELDREMOVE:
                this.shieldRmove = true;
                break;
            //玩家死亡
            case MsgCMD.PLAYER_DEATH:
                this.playerDeath = true;
                break;
            //弹跳
            case MsgCMD.PLAYER_BOUNCE:
                this.jumpSpeed = 10;
                this.jumpTimes = 1;
                break;
            //检测到玩家走出地板
            case MsgCMD.PLAYER_DOWNFLOOR:
                this.isJumpState = true;
                break;
            //检测玩家与地板左侧碰撞
            case MsgCMD.FLOOR_LEFT:
                this.isLeft = true;
                break;
            //游戏暂停
            case MsgCMD.GAME_STOP:
                this.gameStop = true;
                break;
            //游戏继续
            case MsgCMD.GAME_CONTINUE:
                this.gameStop = false;
                break;
        }
    };
    return Player;
}(BaseModule));
__reflect(Player.prototype, "Player", ["IMessage"]);
//# sourceMappingURL=Player.js.map