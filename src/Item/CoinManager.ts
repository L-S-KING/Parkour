/**
 * 钱币管理类
 */
class CoinManager 
{
	private constructor() 
	{
	}
	private static _coin:CoinManager = null;
	public static getCoin():CoinManager
	{
		if(this._coin == null)
		{
			this._coin = new CoinManager();
		}
		return this._coin;
	}
	/**钱币 */
	public coin:Coin = null;
	/**创建钱币
	 * type:钱币种类 1 = 金币， 2 = 银币， 3 = 铜币
	 * num:创建数量
	 * (coinX,coinY):第一个钱币的位置
	 * intervalX:钱币的横向间隔
	 * intervalY:钱币的纵向间隔
	 */
	public setCoin(type:number, num:number, coinX:number, coinY:number, intervalX:number, intervalY:number)
	{
		for(let i=0;i<num;i++)
		{
			this.coin = new Coin();
			this.coin.coinInit(type);
			this.coin.x = coinX + i * intervalX;
			this.coin.y = coinY - i * intervalY;
			SceneManager.getInstance().currentScene.addChild(this.coin);
		}
	}
	/**添加造型钱币
	 * posX:X偏移量
	 * posY:Y偏移量
	 * 1 = HELLO
	 * 2 = GO
	 */
	public addCoin(type:number, posX:number, posY:number)
	{
		if(type == 1)
		{
			//HELLO
			ExampleConfig.instnace.init("hello_txt");
		}
		if(type == 2)
		{
			//GO
			ExampleConfig.instnace.init("go_txt");
		}
		
		for(let i=0;i<ExampleConfig.instnace.getExampleArr().length;i++)
		{
			this.coin = new Coin();
			this.coin.coinInit(ExampleConfig.instnace.getExampleArr()[i].type);
			this.coin.x = ExampleConfig.instnace.getExampleArr()[i].coinX + posX;
			this.coin.y = ExampleConfig.instnace.getExampleArr()[i].coinY + posY;
			SceneManager.getInstance().currentScene.addChild(this.coin);
		}
	}
}