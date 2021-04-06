var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 场景界面管理类
 */
var SceneManager = (function () {
    function SceneManager() {
    }
    SceneManager.getInstance = function () {
        if (this.instance == null) {
            this.instance = new SceneManager;
        }
        return this.instance;
    };
    /**设置当前可用显示对象 */
    SceneManager.prototype.setRootScene = function (root) {
        this.rootScene = root;
    };
    /**添加当前可用场景 */
    SceneManager.prototype.addScene = function (scene) {
        if (this.currentScene != null) {
            //删除原来场景
            this.rootScene.removeChild(this.currentScene);
            //将原来场景置空
            this.currentScene = null;
        }
        //添加到舞台
        if (this.rootScene != null) {
            this.currentScene = scene;
            this.rootScene.addChild(scene);
        }
    };
    SceneManager.instance = null;
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
//# sourceMappingURL=SceneManager.js.map