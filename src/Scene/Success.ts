class Success extends BaseModule
{
	public constructor() 
	{
		super();
		this.addListener(this, egret.Event.ADDED_TO_STAGE, this.init, this);
		this.addListener(this, egret.Event.ENTER_FRAME, this.update, this);
	}
	/**胜 */
	private success:eui.Image;
	/**败 */
	private fail:eui.Image;
	/**金币文本框 */
	private gold:eui.Label;
	/**金币数 */
	private goldNum:number;
	/**结束按钮 */
	private end:eui.Button;

	private init()
	{
		this.skinName = "success";
		this.gold.text = "" + KeyManager.getRocker().gold;

		if(egret.localStorage.getItem("Gold"))
		{
			this.goldNum = Number(egret.localStorage.getItem("Gold"));
		}
		else 
		{
			this.goldNum = 0;	
		}
		this.goldNum += KeyManager.getRocker().gold;
		egret.localStorage.setItem("Gold","" + this.goldNum );

		this.addListener(this.end, egret.TouchEvent.TOUCH_TAP, this.endTap, this);
	}

	private endTap()
	{
		SceneManager.getInstance().addScene(new Adventure());
	}

	private time:number = 0;

	private update()
	{
		this.time += 1;
		if(this.time % 5 == 0)
		{
			if(this.success.scaleX >= 1)
			{
				this.success.scaleX = 1;
				this.success.scaleY = 1;
				this.time = 0;
			}
			this.success.scaleX += 0.1;
			this.success.scaleY += 0.1;
		}
	}
}