/**
 * 道具管理类
 */
class ItemManager 
{
	private constructor() 
	{
	}
	private static _item:ItemManager = null;
	public static getItem():ItemManager
	{
		if(this._item == null)
		{
			this._item = new ItemManager();
		}
		return this._item;
	}
	/**道具 */
	public item:Item = null;
	/**添加道具
	 * 1 = 磁铁道具
	 * 2 = 流星道具
	 * 3 = 冲刺道具
	 * 4 = 护盾道具
	 */
	public addItem(type:number, itemX:number, itemY:number)
	{
		this.item = new Item();
		this.item.itemInit(type);
		this.item.x = itemX;
		this.item.y = itemY;
		SceneManager.getInstance().currentScene.addChild(this.item);
	}
}