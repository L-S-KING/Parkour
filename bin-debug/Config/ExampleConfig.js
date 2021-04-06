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
var ExampleConfig = (function (_super) {
    __extends(ExampleConfig, _super);
    function ExampleConfig() {
        return _super.call(this) || this;
    }
    Object.defineProperty(ExampleConfig, "instnace", {
        get: function () {
            if (this._instance == null) {
                this._instance = new ExampleConfig();
            }
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    ExampleConfig.prototype.init = function (str) {
        this.dataList = [];
        _super.prototype.init.call(this, str, ExampleConfigModel, this.dataList);
    };
    ExampleConfig.prototype.getExampleArr = function () {
        return this.dataList;
    };
    ExampleConfig.prototype.floorInit = function (str) {
        this.floor = [];
        _super.prototype.init.call(this, str, FloorConfigModel, this.floor);
    };
    ExampleConfig.prototype.getFloorArr = function () {
        return this.floor;
    };
    return ExampleConfig;
}(BaseConfig));
__reflect(ExampleConfig.prototype, "ExampleConfig");
//# sourceMappingURL=ExampleConfig.js.map