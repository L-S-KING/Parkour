/**
 * 跑酷操作管理
 * 格斗操作管理
 */
class KeyManager 
{
	private constructor() 
	{
	}
	private static _key:KeyManager = null;
	public static getRocker():KeyManager
	{
		if(this._key == null)
		{
			this._key = new KeyManager();
		}
		return this._key;
	}
	/**金币 */
	public gold:number = 0;
	/**金币数量 */
	public goldNum:number = 0;
	/**跑酷按键 */
	public parkour:Parkour = null;
	/**添加跑酷按键 */
	public addParkour()
	{
		this.parkour = new Parkour();
		this.parkour.init();
		SceneManager.getInstance().currentScene.addChild(this.parkour);
	}

	
	/**摇杆 */
	public rocker:Rocker = null;
	/**添加摇杆 */
	public addRocker()
	{
		this.rocker = new Rocker();
		this.rocker.rockerInit();
		SceneManager.getInstance().currentScene.addChild(this.rocker);
	}

	/**按键 */
	public key:Key = null
	/**格斗停止 */
	public pkStop:boolean = false;
	/**添加按键 */
	public addKey()
	{
		this.key = new Key();
		this.key.keyInit();
		SceneManager.getInstance().currentScene.addChild(this.key);
	}
}