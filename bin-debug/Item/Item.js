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
 * 跑酷道具
 */
var Item = (function (_super) {
    __extends(Item, _super);
    function Item() {
        var _this = _super.call(this) || this;
        /**游戏暂停 */
        _this.gameStop = false;
        /**道具 */
        _this.item = null;
        /**道具种类 */
        _this.itemType = 0;
        /**道具速度 */
        _this.itemSpeed = 0;
        _this.meteorTime = 0;
        _this.addListener(_this, egret.Event.ENTER_FRAME, _this.update, _this);
        return _this;
    }
    /**道具初始化 */
    Item.prototype.itemInit = function (type) {
        this.itemType = type;
        this.item = new egret.Bitmap();
        this.item.texture = RES.getRes("item" + this.itemType + "_png");
        this.item.anchorOffsetX = this.item.width * 0.5;
        this.item.anchorOffsetY = this.item.height * 0.5;
        this.addChild(this.item);
        //注册消息
        this.addMessage(MsgCMD.PLAYER_STOPGO, this);
        this.addMessage(MsgCMD.PLAYER_DEATH, this);
        this.addMessage(MsgCMD.GAME_STOP, this);
        this.addMessage(MsgCMD.GAME_CONTINUE, this);
    };
    Item.prototype.update = function () {
        if (PlayerManager.getPlayer().player.playerDeath == true) {
            return;
        }
        if (this.gameStop == true) {
            return;
        }
        if (PlayerManager.getPlayer().player.isSprint == true) {
            this.itemSpeed = PlayerManager.getPlayer().player.sprintSpeed;
        }
        else if (PlayerManager.getPlayer().player.isSprint == false && PlayerManager.getPlayer().player.x >= 640) {
            this.itemSpeed = 8;
        }
        this.x -= this.itemSpeed;
        //道具与玩家的碰撞
        if (Math.abs(this.x - PlayerManager.getPlayer().player.x) < (this.item.width + PlayerManager.getPlayer().player.player.width) * 0.5
            && Math.abs(this.y - PlayerManager.getPlayer().player.y) < (this.item.height + PlayerManager.getPlayer().player.player.height) * 0.5) {
            if (this.parent != null) {
                KeyManager.getRocker().parkour.performance += 20;
                this.parent.removeChild(this);
            }
            if (this.itemType == 1) {
                Message.instance.send(MsgCMD.ITEM_MAGNET);
            }
            if (this.itemType == 2) {
                this.addEventListener(egret.Event.ENTER_FRAME, this.down, this);
                if (PlayerManager.getPlayer().player.x == 640) {
                    Message.instance.send(MsgCMD.PLAYER_STOPGO);
                }
            }
            if (this.itemType == 3) {
                Message.instance.send(MsgCMD.ITEM_SPRINT);
            }
            if (this.itemType == 4) {
                Message.instance.send(MsgCMD.ITEM_SHIELD);
            }
        }
        for (var i = 0; i < ObstacleManager.getObstacle().obstacleArray.length; i++) {
            if (Math.abs(this.x - ObstacleManager.getObstacle().obstacleArray[i].x) < (this.item.width + ObstacleManager.getObstacle().obstacleArray[i].obstacle.width) * 0.5) {
                if (ObstacleManager.getObstacle().obstacleArray[i].parent != null) {
                    ObstacleManager.getObstacle().obstacleArray[i].parent.removeChild(ObstacleManager.getObstacle().obstacleArray[i]);
                    ObstacleManager.getObstacle().obstacleArray.splice(i, 1);
                    i--;
                }
            }
        }
    };
    Item.prototype.down = function () {
        if (PlayerManager.getPlayer().player.playerDeath == true) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.down, this);
        }
        this.meteorTime += 1;
        if (this.meteorTime % 30 == 0) {
            MeteorManager.getMeteor().addMeteor();
        }
        if (this.meteorTime >= 240) {
            this.meteorTime = 0;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.down, this);
        }
    };
    Item.prototype.recvMsg = function (cmd, data) {
        switch (cmd) {
            case MsgCMD.PLAYER_STOPGO:
                this.itemSpeed = 8;
                break;
            case MsgCMD.PLAYER_DEATH:
                this.itemSpeed = 0;
                break;
            case MsgCMD.GAME_STOP:
                this.gameStop = true;
                break;
            case MsgCMD.GAME_CONTINUE:
                this.gameStop = false;
                break;
        }
    };
    return Item;
}(BaseModule));
__reflect(Item.prototype, "Item", ["IMessage"]);
//# sourceMappingURL=Item.js.map