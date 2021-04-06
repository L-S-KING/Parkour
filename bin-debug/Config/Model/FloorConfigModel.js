var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FloorConfigModel = (function () {
    function FloorConfigModel(obj) {
        this.floorX = parseInt(obj[0]);
        this.floorY = parseInt(obj[1]);
    }
    return FloorConfigModel;
}());
__reflect(FloorConfigModel.prototype, "FloorConfigModel");
//# sourceMappingURL=FloorConfigModel.js.map