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
var GameOver = (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super.call(this) || this;
        _this.addListener(_this, egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    GameOver.prototype.init = function () {
        if (PlayerManager.getPlayer().playerType == 1) {
            this.skinName = "endOne";
        }
        if (PlayerManager.getPlayer().playerType == 2) {
            this.skinName = "endTwo";
        }
        if (PlayerManager.getPlayer().playerType == 3) {
            this.skinName = "endThree";
        }
        if (PlayerManager.getPlayer().playerType == 4) {
            this.skinName = "endFour";
        }
        this.addListener(this.over, egret.TouchEvent.TOUCH_TAP, this.overTap, this);
    };
    GameOver.prototype.overTap = function () {
        MeteorManager.getMeteor().meteorArray = [];
        ObstacleManager.getObstacle().obstacleArray = [];
        BlameManager.getBlame().blameArray = [];
        CoinManager.getCoin().coin = null;
        SceneManager.getInstance().addScene(new End());
    };
    return GameOver;
}(BaseModule));
__reflect(GameOver.prototype, "GameOver");
//# sourceMappingURL=GameOver.js.map