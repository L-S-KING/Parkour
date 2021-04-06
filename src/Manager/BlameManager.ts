/**
 * 怪管理类
 */
class BlameManager 
{
	private constructor() 
	{
	}
	private static _blame:BlameManager = null;
	public static getBlame():BlameManager
	{
		if(this._blame == null)
		{
			this._blame = new BlameManager();
		}
		return this._blame;
	}
	/**怪 */
	private blame:Blame = null;
	/**怪队列 */
	public blameArray:Blame[] = [];
	/**添加怪 */
	public addBlame(type:number, blameX:number, blameY:number)
	{
		// for(let i=0;i<num;i++)
		{
			this.blame = new Blame();
			this.blame.blameInit(type);
			this.blame.x = blameX;
			this.blame.y = blameY;
			SceneManager.getInstance().currentScene.addChild(this.blame);
			this.blameArray.push(this.blame);
		}
	}
	// /**计时 */
	// public blameTime:number = 0;
	// /**创建怪的X随机位置 */
	// private blameX:number = 0;
	// /**创建怪的个数 */
	// private blameNum:number = 0;

	// public setBlame()
	// {
	// 	this.blameTime += 1;
	// 	if(this.blameTime % 360 == 0)
	// 	{
	// 		this.blameX = Math.floor(Math.random() * 600 + 150);
	// 		this.blameNum = Math.floor(Math.random() * 3 + 1);
	// 		// this.addBlame(1,this.blameNum,this.blameX + 1280,-100);
	// 	}
		
	// }
}