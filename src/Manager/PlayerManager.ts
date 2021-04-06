/**
 * 玩家管理类
 */
class PlayerManager 
{
	private constructor() 
	{
	}
	private static _player:PlayerManager = null;
	public static getPlayer():PlayerManager
	{
		if(this._player == null)
		{
			this._player = new PlayerManager();
		}
		return this._player;
	}
	/**玩家 */
	public player:Player = null;
	/**玩家种类 */
	public playerType:number;
	/**是否购买开局冲刺道具 */
	public isBuySprint:boolean = false;
	/**是否购买护盾道具 */
	public isBuyShiled:boolean = false;
	/**是否购买磁铁道具 */
	public isBuyMagnet:boolean = false;
	/**是否购买死亡冲刺道具 */
	public isBuyDeathSprint:boolean = false;
	/**添加玩家 */
	public addPlayer()
	{
		this.player = new Player();
		this.player.playerInit(this.playerType);
		this.player.x = 30;
		this.player.y = 500;
		SceneManager.getInstance().currentScene.addChild(this.player);
	}
	/**格斗者 */
	public fighter:Fighter = null;
	/**玩家血量 */
	public fighterHp:number = 0;
	/**格斗家种类 */
	public fighterType:number = 0;
	/**添加格斗玩家 */
	public addFighter()
	{
		this.fighter = new Fighter();
		this.fighter.fighterInit(this.fighterType);
		this.fighter.x = 300;
		this.fighter.y = 640;
		if(this.fighterType == 1)
		{
			this.fighterHp = 800;
		}
		if(this.fighterType == 2)
		{
			this.fighterHp = 1200;
		}
		SceneManager.getInstance().currentScene.addChild(this.fighter);
	}
}