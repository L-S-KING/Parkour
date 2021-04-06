class BossBg extends BaseModule
{
	public constructor() 
	{
		super();
		this.addListener(this, egret.Event.ADDED_TO_STAGE, this.init, this);
	}
	private bossBg:eui.Image;
	private bgType:number = 0;
	private init()
	{
		if(Math.random() > 0.5)
		{
			this.bgType = 1;
		}
		else
		{
			this.bgType = 2;
		}
		this.bossBg = new eui.Image();
		this.bossBg.texture = RES.getRes("bossBg" + this.bgType + "_jpg");
		this.addChild(this.bossBg);
	}
}