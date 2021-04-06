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
 * 格斗失败
 */
var Fail = (function (_super) {
    __extends(Fail, _super);
    function Fail() {
        var _this = _super.call(this) || this;
        _this.time = 0;
        _this.addListener(_this, egret.Event.ADDED_TO_STAGE, _this.init, _this);
        _this.addListener(_this, egret.Event.ENTER_FRAME, _this.update, _this);
        return _this;
    }
    Fail.prototype.init = function () {
        this.skinName = "fail";
        this.addListener(this.end, egret.TouchEvent.TOUCH_TAP, this.endTap, this);
    };
    Fail.prototype.update = function () {
        this.time += 1;
        if (this.time % 5 == 0) {
            if (this.fail.scaleX >= 1) {
                this.fail.scaleX = 1;
                this.fail.scaleY = 1;
                this.time = 0;
            }
            this.fail.scaleX += 0.1;
            this.fail.scaleY += 0.1;
        }
    };
    Fail.prototype.endTap = function () {
        SceneManager.getInstance().addScene(new Adventure());
    };
    return Fail;
}(BaseModule));
__reflect(Fail.prototype, "Fail");
//# sourceMappingURL=Fail.js.map