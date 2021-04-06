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
var Success = (function (_super) {
    __extends(Success, _super);
    function Success() {
        var _this = _super.call(this) || this;
        _this.time = 0;
        _this.addListener(_this, egret.Event.ADDED_TO_STAGE, _this.init, _this);
        _this.addListener(_this, egret.Event.ENTER_FRAME, _this.update, _this);
        return _this;
    }
    Success.prototype.init = function () {
        this.skinName = "success";
        this.gold.text = "" + KeyManager.getRocker().gold;
        if (egret.localStorage.getItem("Gold")) {
            this.goldNum = Number(egret.localStorage.getItem("Gold"));
        }
        else {
            this.goldNum = 0;
        }
        this.goldNum += KeyManager.getRocker().gold;
        egret.localStorage.setItem("Gold", "" + this.goldNum);
        this.addListener(this.end, egret.TouchEvent.TOUCH_TAP, this.endTap, this);
    };
    Success.prototype.endTap = function () {
        SceneManager.getInstance().addScene(new Adventure());
    };
    Success.prototype.update = function () {
        this.time += 1;
        if (this.time % 5 == 0) {
            if (this.success.scaleX >= 1) {
                this.success.scaleX = 1;
                this.success.scaleY = 1;
                this.time = 0;
            }
            this.success.scaleX += 0.1;
            this.success.scaleY += 0.1;
        }
    };
    return Success;
}(BaseModule));
__reflect(Success.prototype, "Success");
//# sourceMappingURL=Success.js.map