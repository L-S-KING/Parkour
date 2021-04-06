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
var BossBg = (function (_super) {
    __extends(BossBg, _super);
    function BossBg() {
        var _this = _super.call(this) || this;
        _this.bgType = 0;
        _this.addListener(_this, egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    BossBg.prototype.init = function () {
        if (Math.random() > 0.5) {
            this.bgType = 1;
        }
        else {
            this.bgType = 2;
        }
        this.bossBg = new eui.Image();
        this.bossBg.texture = RES.getRes("bossBg" + this.bgType + "_jpg");
        this.addChild(this.bossBg);
    };
    return BossBg;
}(BaseModule));
__reflect(BossBg.prototype, "BossBg");
//# sourceMappingURL=BossBg.js.map