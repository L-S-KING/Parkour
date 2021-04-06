/**
 * 格斗特效
 */
class Effect extends BaseModule implements IMessage
{
	public constructor() 
	{
		super();
		this.addMessage(MsgCMD.GAME_STOP,this);
		this.addMessage(MsgCMD.GAME_CONTINUE,this);
		this.addListener(this, egret.Event.ENTER_FRAME, this.update, this);
	}
	/**特效 */
	private effect:egret.Bitmap = null;
	/**特效种类 */
	private typeEffect:number = 0;
	/**特效序列帧 */
	private frameEffect:number = 0;
	/**游戏暂停 */
	private gameStop:boolean = false;

	public effectInit(type:number)
	{
		this.typeEffect = type;
		this.frameEffect = 1;
		this.effect = new egret.Bitmap();
		this.effect.texture = RES.getRes("effect" + this.typeEffect + this.frameEffect + "_png");
		this.effect.anchorOffsetX = this.effect.width * 0.5;
		this.effect.anchorOffsetY = this.effect.height * 0.5;
		this.addChild(this.effect);

		if(this.typeEffect <= 13)
		{
			this.effect.scaleX = PlayerManager.getPlayer().fighter.fighter.scaleX;
		}
		if(this.typeEffect > 13)
		{
			this.effect.scaleX = BossManager.getBoss().boss.boss.scaleX;
		}
		if(this.typeEffect <=6)
		{
			this.isMove = false;
			this.frameMax = 4;
			this.isRemove = true;
		}
		if(this.typeEffect == 7)
		{
			this.isMove = true;
			this.frameMax = 1;
			this.isRemove = false;
		}
		if(this.typeEffect == 8)
		{
			this.isMove = true;
			this.frameMax = 5;
			this.isRemove = false;
		}
		if(this.typeEffect == 9)
		{
			this.isMove = false;
			this.frameMax = 8;
			this.isRemove = true;
		}
		if(this.typeEffect == 10)
		{
			this.isMove = true;
			this.frameMax = 10;
			this.isRemove = false;
		}
		if(this.typeEffect == 11)
		{
			this.isMove = false;
			this.frameMax = 11;
			this.isRemove = false;
		}
		if(this.typeEffect == 12)
		{
			this.isMove = false;
			this.frameMax = 4;
			this.isRemove = true;
		}
		if(this.typeEffect == 13)
		{
			this.isMove = true;
			this.frameMax = 8;
			this.isRemove = false;
		}
		if(this.typeEffect == 14)
		{
			this.isMove = true;
			this.frameMax = 8;
			this.isRemove = true;
		}
		if(this.typeEffect == 15)
		{
			this.isMove = false;
			this.frameMax = 9;
			this.isRemove = true;
		}
		if(this.typeEffect == 16)
		{
			this.isMove = true;
			this.frameMax = 7;
			this.isRemove = true;
		}
		if(this.typeEffect == 17)
		{
			this.isMove = false;
			this.frameMax = 6;
			this.isRemove = true;
		}
		if(this.typeEffect == 18)
		{
			this.isMove = true;
			this.frameMax = 6;
			this.isRemove = true;
		}
		if(this.typeEffect == 19)
		{
			this.isMove = false;
			this.frameMax = 8;
			this.isRemove = true;
		}
		if(this.typeEffect == 20)
		{
			this.isMove = false;
			this.frameMax = 17;
			this.isRemove = true;
		}
	}
	/**序列帧切换时间 */
	private frameTime:number = 0;
	/**特效移动速度 */
	private speedEffect:number = 8;
	/**是否删除 */
	private isRemove:boolean = false;
	/**是否移动 */
	private isMove:boolean = false;
	/**帧动画最大值 */
	private frameMax:number = 0;
	/**特效是否碰撞 */

	public update()
	{
		if(this.gameStop == true)
		{
			return;
		}
		//特效移动
		if(this.isMove == true)
		{
			this.x += this.effect.scaleX * this.speedEffect;
		}


		//特效序列帧切换
		this.frameTime += 1;
		if(this.frameTime % 6 == 0)
		{
			this.frameEffect += 1;
			if(this.frameEffect > this.frameMax)
			{
				if(this.parent != null && this.isRemove == true)
				{
					this.parent.removeChild(this);
				}
				else if(this.isRemove == false)
				{
					this.frameEffect = 1;
				}
			}
			this.effect.texture = RES.getRes("effect" + this.typeEffect + this.frameEffect + "_png");
		}

		//特效1——特效6
		if(this.typeEffect <= 6
		&& Math.abs(this.x - BossManager.getBoss().boss.x) < (this.effect.width + BossManager.getBoss().boss.boss.width) * 0.1
		&& Math.abs(this.y - BossManager.getBoss().boss.y) < (this.effect.height + BossManager.getBoss().boss.boss.height) * 0.3)
		{
			//击退效果
			BossManager.getBoss().boss.x += this.effect.scaleX * 4;
			//BOSS掉血
			BossManager.getBoss().bossHp -= 3;
			//删除特效
			this.isRemove = true;
		}

		//特效7
		if(this.typeEffect == 7
		&& Math.abs(this.x - BossManager.getBoss().boss.x) < (this.effect.width + BossManager.getBoss().boss.boss.width) * 0.2
		&& Math.abs(this.y - BossManager.getBoss().boss.y) < (this.effect.height + BossManager.getBoss().boss.boss.height) * 0.5)
		{
			this.isRemove = true;
			EffectManager.getEffect().addEffect(12,BossManager.getBoss().boss.x,BossManager.getBoss().boss.y - 100,2);
		}

		//特效8
		if(this.typeEffect == 8 
		&& Math.abs(this.x - BossManager.getBoss().boss.x) < 10
		&& Math.abs(this.y - BossManager.getBoss().boss.y) < (this.effect.height + BossManager.getBoss().boss.boss.height) * 0.4)
		{
			//时效时间
			this.eightTime -= 1;
			//BOSS血量减少
			BossManager.getBoss().bossHp -= 2;
			//特效生成位置
			this.effect.scaleX = 2;
			this.effect.scaleY = 2;
			this.isMove = false;
			BossManager.getBoss().boss.x = this.x;
			// BossManager.getBoss().boss.y = this.y ;
			//删除特效
			if(this.eightTime < 0 && this.parent != null)
			{
				this.parent.removeChild(this);
			}
		}
		
		//特效9
		if(this.typeEffect == 9
		&& Math.abs(this.x - BossManager.getBoss().boss.x) < (this.effect.width + BossManager.getBoss().boss.boss.width) * 0.3
		&& Math.abs(this.y - BossManager.getBoss().boss.y) < (this.effect.height + BossManager.getBoss().boss.boss.height) * 0.4)
		{
			BossManager.getBoss().bossHp -= 2;
		}

		//特效10
		if(this.typeEffect == 10 
		&& Math.abs(this.x - BossManager.getBoss().boss.x) < 10 
		&& Math.abs(this.y - BossManager.getBoss().boss.y) < (this.effect.height + BossManager.getBoss().boss.boss.height) * 0.3)
		{
			//特效生成位置
			this.x = BossManager.getBoss().boss.x;
			this.y = BossManager.getBoss().boss.y - 60;
			BossManager.getBoss().bossStop = true;
			//删除特效
			if(this.parent != null)
			{
				this.parent.removeChild(this);
				EffectManager.getEffect().addEffect(11,this.x,this.y - 120,3);
			}
		}

		//特效11
		if(this.typeEffect == 11)
		{
			//特效时效
			this.elevenTime -= 1;
			BossManager.getBoss().bossHp -= 5;
			//删除特效
			if(this.elevenTime <= 0 && this.parent != null)
			{
				BossManager.getBoss().bossStop = false;
				this.parent.removeChild(this);
			}
		}

		//特效12
		if(this.typeEffect == 12)
		{
			BossManager.getBoss().bossHp -= 1;
		}
		


		//特效13
		if(this.typeEffect == 13
		&& Math.abs(this.x - BossManager.getBoss().boss.x) < (this.effect.width + BossManager.getBoss().boss.boss.width) * 0.35
		&& Math.abs(this.y - BossManager.getBoss().boss.y) < (this.effect.height + BossManager.getBoss().boss.boss.height) * 0.5
		&& this.thirteenTime >= 0)
		{
			BossManager.getBoss().boss.x = this.x;
			this.thirteenTime -= 1;
			BossManager.getBoss().bossHp -= 3;
			this.isRemove = true;
		}

		//特效14
		if(this.typeEffect == 14
		&& Math.abs(this.x - PlayerManager.getPlayer().fighter.x) < (this.effect.width + PlayerManager.getPlayer().fighter.fighter.width) * 0.2
		&& Math.abs(this.y - PlayerManager.getPlayer().fighter.y) < (this.effect.height + PlayerManager.getPlayer().fighter.fighter.height) * 0.6)
		{
			if(this.parent != null)
			{
				this.parent.removeChild(this);
			}
			EffectManager.getEffect().addEffect(15,PlayerManager.getPlayer().fighter.x,PlayerManager.getPlayer().fighter.y-120,3);
		}

		//特效15
		if(this.typeEffect == 15)
		{
			//玩家掉血
			PlayerManager.getPlayer().fighterHp -= 2;
		}

		//特效16
		if(this.typeEffect == 16
		&& Math.abs(this.x - PlayerManager.getPlayer().fighter.x) < (this.effect.width + PlayerManager.getPlayer().fighter.fighter.width) * 0.3
		&& Math.abs(this.y - PlayerManager.getPlayer().fighter.y) < (this.effect.height + PlayerManager.getPlayer().fighter.fighter.height) * 0.6)
		{
			if(this.parent != null)
			{
				this.parent.removeChild(this);
			}
			EffectManager.getEffect().addEffect(17,PlayerManager.getPlayer().fighter.x - this.effect.scaleX * 30,PlayerManager.getPlayer().fighter.y-120,3);
		}

		//特效17
		if(this.typeEffect == 17)
		{
			//玩家掉血
			PlayerManager.getPlayer().fighterHp -= 3;
		}

		//特效18
		if(this.typeEffect == 18
		&& Math.abs(this.x - PlayerManager.getPlayer().fighter.x) < (this.effect.width + PlayerManager.getPlayer().fighter.fighter.width) * 0.2
		&& Math.abs(this.y - PlayerManager.getPlayer().fighter.y) < (this.effect.height + PlayerManager.getPlayer().fighter.fighter.height) * 0.6)
		{
			if(this.parent != null)
			{
				this.parent.removeChild(this);
			}
			EffectManager.getEffect().addEffect(19,PlayerManager.getPlayer().fighter.x - this.effect.scaleX * 30,PlayerManager.getPlayer().fighter.y-100,3);
		}

		//特效19
		if(this.typeEffect == 19)
		{
			PlayerManager.getPlayer().fighterHp -= 3;
		}
		//特效移除屏幕删除
		if(this.x >= 1400 || this.x <= -200)
		{
			if(this.parent != null)
			{
				this.parent.removeChild(this);
			}
		}
	}
	private eightTime:number = 30;
	private elevenTime:number = 60;
	private sevenTime:number = 0;
	private thirteenTime:number = 20;

	recvMsg(cmd:number, date:any)
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