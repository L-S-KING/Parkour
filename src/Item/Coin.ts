/**
 * 金币
 * 银币
 * 铜币
 */
class Coin extends BaseModule implements IMessage
{
	public constructor() 
	{
		super();
		this.addListener(this, egret.Event.ENTER_FRAME, this.update, this);
	}
	/**游戏暂停 */
	private gameStop:boolean = false;
	/**钱币 */
	private coin:egret.Bitmap = null;
	/**钱币种类*/
	private coinType:number = 0;
	/**钱币的速度 */
	private coinSpeed:number = 0;
	/**是否具备磁铁道具 */
	private isMagnet:boolean = false;
	/**磁铁道具时效 */
	private magnetTime:number = 0;
	/**钱币是否正在被吸 */
	private isGo:boolean = false;
	/**被吸取钱币的速度 */
	private speed:number = 0;
	/**钱币初始化 */
	public coinInit(type:number)
	{
		this.coinType = type;
		this.coin = new egret.Bitmap();
		this.coin.texture = RES.getRes("coin" + this.coinType + "_png");
		this.coin.anchorOffsetX = this.coin.width * 0.5;
		this.coin.anchorOffsetY = this.coin.height * 0.5;
		this.addChild(this.coin);

		//注册消息
		this.addMessage(MsgCMD.PLAYER_STOPGO,this);
		this.addMessage(MsgCMD.PLAYER_DEATH,this);
		this.addMessage(MsgCMD.ITEM_MAGNET,this);
		this.addMessage(MsgCMD.ITEM_SPRINT,this);
		this.addMessage(MsgCMD.GAME_STOP,this);
		this.addMessage(MsgCMD.GAME_CONTINUE,this);
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
		if(PlayerManager.getPlayer().player.isSprint == true)
		{
			this.coinSpeed = PlayerManager.getPlayer().player.sprintSpeed;
		}
		else if(PlayerManager.getPlayer().player.isSprint == false && PlayerManager.getPlayer().player.x >= 640)
		{
			this.coinSpeed = 8;
		}
		this.x -= this.coinSpeed;
		
		//玩家与钱币的碰撞
		if(Math.abs(this.x - PlayerManager.getPlayer().player.x) < (this.coin.width + PlayerManager.getPlayer().player.player.width) * 0.5
		&& Math.abs(this.y - PlayerManager.getPlayer().player.y) < (this.coin.height + PlayerManager.getPlayer().player.player.height) * 0.5)
		{
			if(this.parent != null)
			{
				this.parent.removeChild(this);
			}
			if(this.coinType == 1)
			{
				KeyManager.getRocker().parkour.grade += 80;
				KeyManager.getRocker().gold += 1;
			}
			if(this.coinType == 2)
			{
				KeyManager.getRocker().parkour.grade += 40;
			}
			if(this.coinType == 3)
			{
				KeyManager.getRocker().parkour.grade += 20;
			}
		}

		//玩家未吃到的钱币删除
		if(this.x <= -100)
		{
			if(this.parent != null)
			{
				this.parent.removeChild(this);
			}
		}
		//购买道具
		if(PlayerManager.getPlayer().isBuyMagnet == true)
		{
			this.isMagnet = true;
		}
		//磁铁道具
		if(this.isMagnet == true || this.isGo == true)
		{
			this.magnetTime += 1;
			if(PlayerManager.getPlayer().player.isSprint == false)
			{
				this.speed = 18;
			}
			else if(PlayerManager.getPlayer().player.isSprint == true)
			{
				this.speed = 48;
			}
			let vector:egret.Point = new egret.Point();
			vector.x = PlayerManager.getPlayer().player.x - this.x;
			vector.y = PlayerManager.getPlayer().player.y - this.y;
			vector.normalize(1);
			//吸取钱币范围
			if(Math.abs(this.x - PlayerManager.getPlayer().player.x) <= 640)
			{
				this.x += this.speed * vector.x;
				this.y += this.speed * vector.y;
				this.isGo = true;
			}
			//超出磁铁道具时效
			if(this.magnetTime >= 360)
			{
				this.isMagnet = false;
				this.magnetTime = 0;
				PlayerManager.getPlayer().isBuyMagnet = false;
			}
		}
	}

	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.PLAYER_STOPGO:
			this.coinSpeed = 8;
			break;

			case MsgCMD.PLAYER_DEATH:
			this.coinSpeed = 0;
			break;

			case MsgCMD.ITEM_MAGNET:
			this.isMagnet = true;
			break;

			case MsgCMD.ITEM_SPRINT:
			this.isMagnet = true;
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