/**
 * 背景
 */
class Bg extends BaseModule implements IMessage
{
	public constructor() 
	{
		super();
		this.addListener(this, egret.Event.ADDED_TO_STAGE, this.init, this);
		this.addListener(this,egret.Event.ENTER_FRAME, this.update, this);
	}
	/**游戏暂停 */
	private gameStop:boolean = false;
	/**背景图片种类 */
	private bgType:number = 0;
	/**背景图片序列 */
	private bgFrame:number = 0;
	/**背景移动速度 */
	private bgSpeed:number = 0;
	/**背景 */
	private bg:egret.Bitmap = null;
	/**背景数组 */
	private bgArray:egret.Bitmap[] = [];
	/**背景初始化 */
	public init()
	{
		this.addMessage(MsgCMD.PLAYER_STOPGO,this);
		this.addMessage(MsgCMD.PLAYER_DEATH,this);
		this.addMessage(MsgCMD.GAME_STOP,this);
		this.addMessage(MsgCMD.GAME_CONTINUE,this);
		this.bgType = Math.floor(Math.random() * 3 + 1);
		for(let i=0;i<2;i++)
		{	
			this.bgFrame = i;
			this.bg = new egret.Bitmap();
			this.bg.texture = RES.getRes("bg" + this.bgType + this.bgFrame + "_jpg");
			this.bg.x = i * 1280;
			this.bg.y = 0;
			this.addChild(this.bg);
			this.bgArray.push(this.bg);		
		}
	}
	public update()
	{
		if(PlayerManager.getPlayer().player.playerDeath == true)
		{
			return;
		}
		if(this.gameStop == true)
		{
			return;
		}
		for(let i=0;i<this.bgArray.length;i++)
		{
			this.bgArray[i].x -= this.bgSpeed;
			if(this.bgArray[i].x <= -1280)
			{
				this.bgArray[i].x = 1280;
			}
		}
	}
	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.PLAYER_STOPGO:
			this.bgSpeed = 8;
			break;

			case MsgCMD.PLAYER_DEATH:
			this.bgSpeed = 0;
			break;

			case MsgCMD.GAME_STOP:
			this.gameStop = true;
			break;

			case MsgCMD.GAME_CONTINUE:
			this.gameStop = false;
			break;
		}
	}
}