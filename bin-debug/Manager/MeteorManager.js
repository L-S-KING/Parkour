var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 流星管理类
 */
var MeteorManager = (function () {
    function MeteorManager() {
        /**流星 */
        this.meteor = null;
        /**流星队列 */
        this.meteorArray = [];
    }
    MeteorManager.getMeteor = function () {
        if (this._meteor == null) {
            this._meteor = new MeteorManager();
        }
        return this._meteor;
    };
    /**添加流星 */
    MeteorManager.prototype.addMeteor = function () {
        this.meteor = new Meteor();
        this.meteor.meteorInit();
        this.meteor.x = PlayerManager.getPlayer().player.x;
        this.meteor.y = 0;
        SceneManager.getInstance().currentScene.addChild(this.meteor);
        this.meteorArray.push(this.meteor);
        return this.meteor;
    };
    MeteorManager._meteor = null;
    return MeteorManager;
}());
__reflect(MeteorManager.prototype, "MeteorManager");
//# sourceMappingURL=MeteorManager.js.map