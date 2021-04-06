var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 怪管理类
 */
var BlameManager = (function () {
    function BlameManager() {
        /**怪 */
        this.blame = null;
        /**怪队列 */
        this.blameArray = [];
    }
    BlameManager.getBlame = function () {
        if (this._blame == null) {
            this._blame = new BlameManager();
        }
        return this._blame;
    };
    /**添加怪 */
    BlameManager.prototype.addBlame = function (type, blameX, blameY) {
        // for(let i=0;i<num;i++)
        {
            this.blame = new Blame();
            this.blame.blameInit(type);
            this.blame.x = blameX;
            this.blame.y = blameY;
            SceneManager.getInstance().currentScene.addChild(this.blame);
            this.blameArray.push(this.blame);
        }
    };
    BlameManager._blame = null;
    return BlameManager;
}());
__reflect(BlameManager.prototype, "BlameManager");
//# sourceMappingURL=BlameManager.js.map