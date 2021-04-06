var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 道具管理类
 */
var ItemManager = (function () {
    function ItemManager() {
        /**道具 */
        this.item = null;
    }
    ItemManager.getItem = function () {
        if (this._item == null) {
            this._item = new ItemManager();
        }
        return this._item;
    };
    /**添加道具
     * 1 = 磁铁道具
     * 2 = 流星道具
     * 3 = 冲刺道具
     * 4 = 护盾道具
     */
    ItemManager.prototype.addItem = function (type, itemX, itemY) {
        this.item = new Item();
        this.item.itemInit(type);
        this.item.x = itemX;
        this.item.y = itemY;
        SceneManager.getInstance().currentScene.addChild(this.item);
    };
    ItemManager._item = null;
    return ItemManager;
}());
__reflect(ItemManager.prototype, "ItemManager");
//# sourceMappingURL=ItemManager.js.map