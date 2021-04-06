/**
 * BOSS管理类
 */
class BossManager 
{
	private constructor() 
	{
	}
	private static _boss:BossManager = null;
	public static getBoss():BossManager
	{
		if(this._boss == null)
		{
			this._boss = new BossManager();
		}
		return this._boss;
	}
	/**BOSS*/
	public boss:Boss = null;
	/**BOSS血量 */
	public bossHp:number = 0;
	/**BOSS停止 */
	public bossStop:boolean = false;
	/**boss种类 */
	public bossType:number = 0;
	/**添加BOSS */
	public addBoss()
	{
		this.boss = new Boss();
		this.boss.bossInt(this.bossType);
		this.boss.x = 1000;
		this.boss.y = 640;
		if(this.bossType == 1)
		{
			this.bossHp = 800;
		}
		if(this.bossType == 2)
		{
			this.bossHp = 1200;
		}
		if(this.bossType == 3)
		{
			this.bossHp = 1200;
		}
		SceneManager.getInstance().currentScene.addChild(this.boss);
	}
}