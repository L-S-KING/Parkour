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
 * 摇杆
 *
 */
var Rocker = (function (_super) {
    __extends(Rocker, _super);
    function Rocker() {
        var _this = _super.call(this) || this;
        /**摇杆半径 */
        _this.radius = 128;
        /**移动角度 */
        _this.angle = 0;
        /**触摸点到摇杆距离 */
        _this.distance = 0;
        return _this;
    }
    Rocker.prototype.rockerInit = function () {
        this.skinName = "Rocker_";
        //给触摸点添加触摸监听
        this.addListener(this.rockerIn, egret.TouchEvent.TOUCH_BEGIN, this.rockerBegin, this);
        this.addListener(this.rocker, egret.TouchEvent.TOUCH_END, this.rockerEnd, this);
    };
    //摇杆触摸
    Rocker.prototype.rockerBegin = function () {
        //给触摸点添加移动监听
        this.addListener(this.rockerIn, egret.TouchEvent.TOUCH_MOVE, this.rockerMove, this);
        this.rockerOut.alpha = 1;
        this.rockerIn.alpha = 1;
    };
    //摇杆触摸点移动
    Rocker.prototype.rockerMove = function (e) {
        //获取角度---弧度
        this.angle = Math.atan2(e.stageY - this.rockerOut.y, e.stageX - this.rockerOut.x);
        //获取触摸点到摇杆的距离
        this.distance = (e.stageY - this.rockerOut.y) / Math.sin(this.angle);
        //触摸点的位置
        //如果触摸点到摇杆中心的距离大于摇杆大半径触摸点的位置
        if (this.distance > this.radius) {
            this.rockerIn.x = this.rockerOut.x + this.radius * Math.cos(this.angle);
            this.rockerIn.y = this.rockerOut.y + this.radius * Math.sin(this.angle);
        }
        else {
            this.rockerIn.x = e.stageX;
            this.rockerIn.y = e.stageY;
        }
    };
    //摇杆触摸结束
    Rocker.prototype.rockerEnd = function () {
        //触摸结束触摸点的位置等于摇杆的位置
        this.rockerIn.x = this.rockerOut.x;
        this.rockerIn.y = this.rockerOut.y;
        //触摸点到摇杆的距离
        this.distance = 0;
        this.rockerOut.alpha = 0.5;
        this.rockerIn.alpha = 0.5;
    };
    return Rocker;
}(BaseModule));
__reflect(Rocker.prototype, "Rocker");
//# sourceMappingURL=Rocker.js.map