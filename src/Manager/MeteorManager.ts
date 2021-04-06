/**
 * 流星管理类
 */
class MeteorManager 
{
	private constructor() 
	{
	}
	private static _meteor:MeteorManager = null;
	public static getMeteor():MeteorManager
	{
		if(this._meteor == null)
		{
			this._meteor = new MeteorManager();
		}
		return this._meteor;
	}
	/**流星 */
	public meteor:Meteor = null;
	/**流星队列 */
	public meteorArray:Meteor[] = [];
	/**添加流星 */
	public addMeteor()
	{
		this.meteor = new Meteor();
		this.meteor.meteorInit();
		this.meteor.x = PlayerManager.getPlayer().player.x;
		this.meteor.y = 0;
		SceneManager.getInstance().currentScene.addChild(this.meteor);
		this.meteorArray.push(this.meteor);
		return this.meteor;
	}
}