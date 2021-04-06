/**
 * 酷跑中的怪
 */
class Blame extends BaseModule implements IMessage
{
	public constructor() 
	{
		super();
		this.addListener(this, egret.Event.ENTER_FRAME, this.update, this);
	}
	/**游戏暂停 */
	private gameStop:boolean = false;
	/**怪 */
	public blame:egret.Bitmap = null;
	/**怪的种类 */
	private blameType:number = 0;
	/**怪的速度 */
	private blameSpeed:number = 8;
	/**怪的下落速度 */
	public blameDownSpeed:number = 12;
	/**怪初始化 */
	public blameInit(type:number)
	{
		this.blameType = type;
		this.blame = new egret.Bitmap();
		this.blame.texture = RES.getRes("blame" + this.blameType + "_png");
		this.blame.anchorOffsetX = this.blame.width * 0.5;
		this.blame.anchorOffsetY = this.blame.height * 0.5;
		this.addChild(this.blame);

		this.addMessage(MsgCMD.GAME_STOP,this);
		this.addMessage(MsgCMD.GAME_CONTINUE,this);
	}
	public update()
	{
		if(PlayerManager.getPlayer().player.playerDeath == true)
		{
			if(this.parent != null)
			{
				this.parent.removeChild(this);
			}
		}
		if(this.gameStop == true)
		{
			return;
		}
		if(PlayerManager.getPlayer().player.isSprint == true)
		{
			this.blameSpeed = PlayerManager.getPlayer().player.sprintSpeed;
		}
		else if(PlayerManager.getPlayer().player.isSprint == false && PlayerManager.getPlayer().player.x >= 640)
		{
			this.blameSpeed = 8;
		}
		this.x -= this.blameSpeed;
		//怪走出屏幕的移除
		if(this.x < -160 && this.parent !=null)
		{
			this.parent.removeChild(this);
		}
		//玩家与怪的左边碰撞
		if(Math.abs(PlayerManager.getPlayer().player.x - this.x) < (PlayerManager.getPlayer().player.player.width + this.blame.width) * 0.35 + 5
		&& Math.abs(PlayerManager.getPlayer().player.y - this.y) < (PlayerManager.getPlayer().player.player.height + this.blame.height) * 0.2
		&& PlayerManager.getPlayer().player.x < this.x)
		{
			//玩家存在护盾道具
			if(PlayerManager.getPlayer().player.isShield == true)
			{
				Message.instance.send(MsgCMD.ITEM_SHIELDREMOVE);
				if(this.parent != null)
				{
					this.parent.removeChild(this);
					PlayerManager.getPlayer().player.isShield = false;
				}
			}
			//玩家不存在护盾道具
			else if(PlayerManager.getPlayer().player.isShield == false)
			{
				Message.instance.send(MsgCMD.PLAYER_DEATH);
			}
		}
		//玩家与怪的右边碰撞
		if(Math.abs(PlayerManager.getPlayer().player.x - this.x) < (PlayerManager.getPlayer().player.player.width + this.blame.width) * 0.3 + 5
		&& Math.abs(PlayerManager.getPlayer().player.y - this.y) < (PlayerManager.getPlayer().player.player.height + this.blame.height) * 0.2
		&& PlayerManager.getPlayer().player.x > this.x)
		{
			//玩家存在护盾道具
			if(PlayerManager.getPlayer().player.isShield == true)
			{
				Message.instance.send(MsgCMD.ITEM_SHIELDREMOVE);
				if(this.parent != null)
				{
					this.parent.removeChild(this);
					PlayerManager.getPlayer().player.isShield = false;
				}
			}
			//玩家不存在护盾道具
			else if(PlayerManager.getPlayer().player.isShield == false)
			{
				Message.instance.send(MsgCMD.PLAYER_DEATH);
			}
		}
		//玩家踩到怪的头上
		if(Math.abs((PlayerManager.getPlayer().player.y + PlayerManager.getPlayer().player.player.height * 0.5) - (this.y - this.blame.height * 0.5)) < (10+10) * 0.5
		&& Math.abs(PlayerManager.getPlayer().player.x - this.x) < (PlayerManager.getPlayer().player.player.width + this.blame.width) * 0.4
		&& PlayerManager.getPlayer().player.jumpSpeed < 0)
		{
			Message.instance.send(MsgCMD.PLAYER_BOUNCE);
			if(this.parent != null)
			{
				KeyManager.getRocker().parkour.performance += 20;
				this.parent.removeChild(this);
			}
		}
		//流星与怪的碰撞
		for(let i=0;i<MeteorManager.getMeteor().meteorArray.length;i++)
		{
			if(Math.abs(MeteorManager.getMeteor().meteorArray[i].x - this.x) < (MeteorManager.getMeteor().meteorArray[i].meteor.width + this.blame.width) * 0.5
			&& Math.abs(MeteorManager.getMeteor().meteorArray[i].y - this.y) < (MeteorManager.getMeteor().meteorArray[i].meteor.height + this.blame.height) * 0.5
			&& MeteorManager.getMeteor().meteorArray[i].isMeteor == true)
			{
				MeteorManager.getMeteor().meteorArray[i].downSpeed = 0;
				if(this.parent != null)
				{
					this.parent.removeChild(this);
				}
			}
		}
	}

	recvMsg(cmd:number, data:any):void
	{
		switch(cmd)
		{
			case MsgCMD.GAME_STOP:
			this.gameStop = true;
			break;
			case MsgCMD.GAME_CONTINUE:
			this.gameStop = false;
			break;
		}
	}
}