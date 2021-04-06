var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ExampleConfigModel = (function () {
    function ExampleConfigModel(obj) {
        this.type = parseInt(obj[0]);
        this.coinX = parseInt(obj[1]);
        this.coinY = parseInt(obj[2]);
    }
    return ExampleConfigModel;
}());
__reflect(ExampleConfigModel.prototype, "ExampleConfigModel");
//# sourceMappingURL=ExampleConfigModel.js.map