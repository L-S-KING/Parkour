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
var Level2 = (function (_super) {
    __extends(Level2, _super);
    function Level2() {
        var _this = _super.call(this) || this;
        _this.addListener(_this, egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    Level2.prototype.init = function () {
        this.addChild(new BossBg());
        BossManager.getBoss().addBoss();
        PlayerManager.getPlayer().addFighter();
        KeyManager.getRocker().addKey();
    };
    return Level2;
}(BaseModule));
__reflect(Level2.prototype, "Level2");
//# sourceMappingURL=Level2.js.map