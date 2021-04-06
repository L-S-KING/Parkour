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
var Level1 = (function (_super) {
    __extends(Level1, _super);
    function Level1() {
        var _this = _super.call(this) || this;
        _this.gameOver = null;
        _this.addListener(_this, egret.Event.ADDED_TO_STAGE, _this.init, _this);
        _this.addListener(_this, egret.Event.ENTER_FRAME, _this.update, _this);
        return _this;
    }
    Level1.prototype.init = function () {
        this.addChild(new Bg());
        this.addChild(new Floor());
        PlayerManager.getPlayer().addPlayer();
        KeyManager.getRocker().addParkour();
    };
    Level1.prototype.update = function () {
        if (PlayerManager.getPlayer().player.playerDeath == true) {
            if (this.gameOver == null) {
                this.gameOver = new GameOver();
                SceneManager.getInstance().currentScene.addChild(this.gameOver);
            }
        }
    };
    return Level1;
}(BaseModule));
__reflect(Level1.prototype, "Level1");
//# sourceMappingURL=Level1.js.map