enum BOSS_STATE
{
	/**默认状态 */
	IDEO,
	/**后退状态 */
	DODEG,
	/**攻击状态 */
	ATTACK,
}
class Boss extends BaseModule implements IMessage
{
	public constructor() 
	{
		super();
		this.addMessage(MsgCMD.GAME_STOP,this);
		this.addMessage(MsgCMD.GAME_CONTINUE,this);
		this.addListener(this,egret.Event.ENTER_FRAME,this.update,this);
	}
	/**BOOS */
	public boss:egret.Bitmap = null;
	/**BOSS种类 */
	private bossType:number = 0;
	/**BOSS序列帧 */
	private bossFrame:number = 0;
	/**技能种类 */
	private skillType:number = 0;

	public bossInt(type:number)
	{
		this.gameStop = false;
		BossManager.getBoss().bossStop = false;
		this.bossType = type;
		this.skillType = 0;
		this.bossFrame = 1;
		this.boss = new egret.Bitmap();
		this.boss.texture = RES.getRes("boss" + this.bossType + this.skillType + this.bossFrame + "_png");
		this.boss.anchorOffsetX = this.boss.width * 0.5;
		this.boss.anchorOffsetY = this.boss.height;
		this.addChild(this.boss);
		this.boss.scaleX = -1;
	}
	/**序列帧切换时间 */
	private frameTime:number = 0;
	/**BOSS移动方向 */
	private vectorBoss:number = 0;
	/**BOSS的移动速度 */
	private speedBoss:number = 8;
	/**技能随机 */
	private random:number = 0;
	/**技能2CD */
	private cdTwo:number = 0;
	/**技能3CD */
	private cdThree:number = 0;
	/**2技能已经释放 */
	private twoRelease:boolean = false; 
	/**3技能已经释放 */
	private threeRelease:boolean = false;
	/**释放技能计时 */
	private attackTime:number = 0;
	/**开始攻击 */
	private startAttack:boolean = false;
	/**默认状态 */
 	private state:BOSS_STATE = BOSS_STATE.IDEO;
	/**距离玩家的距离 */
	private disPlayer:number = 0;
	/**定时检测与玩家的距离 */
	private time:number = 0;
	/**是否释放技能 */
	private hasSkill:boolean = false;

	public update()
	{
		if(BossManager.getBoss().bossStop == true || this.gameStop == true)
		{
			return;
		}
		if(this.x <= - this.boss.width * 0.5)
		{
			this.x = -this.boss.width * 0.5;
		}
		if(this.x >= 1280 -this.boss.width * 0.5)
		{
			this.x = 1280 -this.boss.width * 0.5;
		}
		this.x += this.vectorBoss * this.speedBoss;

		switch(this.state)
		{
			case BOSS_STATE.IDEO:
				if(this.time == 0)
				{
					//玩家与BOSS的距离
					this.disPlayer = Math.abs(this.x - PlayerManager.getPlayer().fighter.x);
				}
				else if(this.time >= 50)
				{
					this.time = 0;
					if(this.disPlayer > Math.abs(this.x - PlayerManager.getPlayer().fighter.x))
					{
						if(this.state == BOSS_STATE.IDEO)
						{
							this.state = BOSS_STATE.DODEG;
						}
					}
					else
					{
						if(this.state == BOSS_STATE.IDEO)
						{
							this.state = BOSS_STATE.ATTACK;
						}
					}
				}
				this.time ++ ;
				if(this.x <= 200)
				{
					this.vectorBoss = 0;
				}
				if(this.x > 1000)
				{
					this.vectorBoss = 0;
				}
			break;

			case BOSS_STATE.DODEG:
				//判断方向boss后退
				if(this.x - PlayerManager.getPlayer().fighter.x > 0)
				{
					this.vectorBoss = 1;
					this.boss.scaleX = -1;
					
				}
				if(this.x - PlayerManager.getPlayer().fighter.x < 0)
				{
					this.vectorBoss = -1;
					this.boss.scaleX = 1;
				}
				if(this.x <= 200)
				{
					this.vectorBoss = 0;
					this.bossFrame = 1;
					this.state = BOSS_STATE.ATTACK;
				}
				else if(this.x >= 1000)
				{
					this.vectorBoss = 0;
					this.state = BOSS_STATE.ATTACK;
					this.bossFrame = 1;
				}
			break;

			case BOSS_STATE.ATTACK:
				var random:number = Math.random();
				if(random < 0.5)
				{
					if(!this.hasSkill)
					{
						this.bossFrame = 1;
						this.skillType = 2;
						this.hasSkill = true;
						//寻找目标
						if(this.x - PlayerManager.getPlayer().fighter.x > 0)
						{
							this.vectorBoss = -1;
							this.boss.scaleX = -1;
						}
						if(this.x - PlayerManager.getPlayer().fighter.x < 0)
						{
							this.vectorBoss = 1;
							this.boss.scaleX = 1;
						}
					}
				}
				else {
					if(!this.hasSkill)
					{
						this.hasSkill = true;
						this.bossFrame = 1;
						this.skillType = 3;
						//旋转方向
						if(this.x - PlayerManager.getPlayer().fighter.x > 0)
						{
							this.boss.scaleX = -1;
						}
						if(this.x - PlayerManager.getPlayer().fighter.x < 0)
						{
							this.boss.scaleX = 1;
						}
					}
				}

				//进入boss攻击范围进行攻击
				if(Math.abs(this.x - PlayerManager.getPlayer().fighter.x) < 200 && this.skillType == 2)
				{
					//进行攻击
					this.vectorBoss = 0;
					if(!this.startAttack)
					this.startAttack = true;
				}
			break;
		}

		//BOSS静止序列帧切换
		if(this.skillType == 0 && this.frameTime % 30 == 0)
		{
			this.bossFrame += 1;
			if(this.bossFrame > 3)
			{
				this.bossFrame = 1;
			}
		}
				
		/***********************************************************************BOSS1*******************************************************************************************************/
		if(this.bossType == 1)
		{
			this.frameTime += 1;
			// //好像是走路
			// if(this.skillType == 1 && this.frameTime % 10 == 0)
			// {
			// 	this.bossFrame += 1;
			// 	if(this.bossFrame >= 8)
			// 	{
			// 		this.bossFrame = 1;
			// 	}
			// }

			//技能2
			if(this.skillType == 2 && this.frameTime % 15 == 0)
			{
				if( this.startAttack )
				{
					this.bossFrame += 1;
					if(this.bossFrame == 4 || this.bossFrame == 7)
					{
						if(Math.abs(this.x - PlayerManager.getPlayer().fighter.x) < (this.boss.width + PlayerManager.getPlayer().fighter.fighter.width) * 0.35
						&& Math.abs(this.y - PlayerManager.getPlayer().fighter.y) < (this.boss.height + PlayerManager.getPlayer().fighter.fighter.height) * 0.3)
						{
							//玩家掉血
							PlayerManager.getPlayer().fighterHp -= 20;
						}
					}
					if(this.bossFrame > 8)
					{
						if(this.x - PlayerManager.getPlayer().fighter.x > 0)
						{
							this.vectorBoss = 1;
						}
						if(this.x - PlayerManager.getPlayer().fighter.x < 0)
						{
							this.vectorBoss = -1;
						}

						//重置状态
						this.state = BOSS_STATE.IDEO;
						this.skillType = 0;
						this.bossFrame = 1;
						this.startAttack = false;
						this.frameTime = 0;
						this.hasSkill = false;
					}
				}
			}
			if(this.skillType == 3 && this.frameTime % 20 == 0)
			{
				this.bossFrame += 1;
				if(this.bossFrame == 2)
				{
					EffectManager.getEffect().addEffect(14,this.x + this.boss.scaleX * 100,this.y-150,2)
				}
				if(this.bossFrame > 2)
				{
					this.state = BOSS_STATE.IDEO;
					this.skillType = 0;
					this.bossFrame = 1;
					this.frameTime = 0;
					this.hasSkill = false;
				}
			}
		}





		/********************************************************************************************************************************************************************************** */
		if(this.bossType == 2)
		{
			this.frameTime += 1;
			// if(this.skillType == 1 && this.frameTime % 15 == 0)
			// {
			// 	this.bossFrame += 1;
			// 	if(this.bossFrame > 8)
			// 	{
			// 		this.bossFrame = 1;
			// 	}
			// }

			if(this.skillType == 2 && this.frameTime % 15 == 0)
			{
				if(this.startAttack)
				{
					this.bossFrame += 1;
					if(this.bossFrame == 3 || this.bossFrame == 7)
						{
							if(Math.abs(this.x - PlayerManager.getPlayer().fighter.x) < (this.boss.width + PlayerManager.getPlayer().fighter.fighter.width) * 0.35
							&& Math.abs(this.y - PlayerManager.getPlayer().fighter.y) < (this.boss.height + PlayerManager.getPlayer().fighter.fighter.height) * 0.3)
							{
								//玩家掉血
								PlayerManager.getPlayer().fighterHp -= 30;
							}
						}
					if(this.bossFrame > 8)
					{
						if(this.x - PlayerManager.getPlayer().fighter.x > 0)
						{
							this.vectorBoss = 1;
						}
						if(this.x - PlayerManager.getPlayer().fighter.x < 0)
						{
							this.vectorBoss = -1;
						}
						this.state = BOSS_STATE.IDEO;
						this.skillType = 0;
						this.bossFrame = 1;
						this.startAttack = false;
						this.frameTime = 0;
						this.hasSkill = false;
					}
				}
			}

			if(this.skillType == 3 && this.frameTime % 10 == 0)
			{
				this.bossFrame += 1;
				if(this.bossFrame == 6)
				{
					EffectManager.getEffect().addEffect(16,this.x + this.boss.scaleX * 60,this.y - 150,2)
				}
				if(this.bossFrame > 7)
				{
					this.state = BOSS_STATE.IDEO;
					this.skillType = 0;
					this.bossFrame = 1;
					this.frameTime = 0;
					this.hasSkill = false;
				}
			}

		}
		/************************************************************************************************************************************************************************************* */
		if(this.bossType == 3)
		{
			this.frameTime += 1;
			if(this.skillType == 1 && this.frameTime % 20 == 0)
			{
				this.bossFrame += 1;
				if(this.bossFrame > 4)
				{
					this.bossFrame = 1;
				}
			}

			if( this.startAttack )
			{
				if(this.skillType == 2 && this.frameTime % 10 == 0)
				{
					this.bossFrame += 1;
					if(this.bossFrame >= 2)
					{
						this.bossFrame = 2;
						this.move = true;
					}
				}
				if(this.move == true)
				{
					this.moveTime -= 1;
					this.x += this.boss.scaleX * 20;
					if(this.moveTime < 0)
					{
						this.move = false;
						this.moveTime = 20;
						this.state = BOSS_STATE.IDEO;
						this.skillType = 0;
						this.bossFrame = 1;
						this.startAttack = false;
						this.frameTime = 0;
						this.hasSkill = false;
					}
				}
				if(Math.abs(this.x - PlayerManager.getPlayer().fighter.x) < (this.boss.width + PlayerManager.getPlayer().fighter.fighter.width) * 0.1)
				{
					PlayerManager.getPlayer().fighterHp -= 10;
				}
			}

			if(this.skillType == 3 && this.frameTime % 6 == 0)
			{
				this.bossFrame += 1;
				if(this.bossFrame == 2)
				{
					EffectManager.getEffect().addEffect(18,this.x + this.boss.scaleX * 100,this.y- 100,3);
				}
				if(this.bossFrame > 5)
				{
					this.state = BOSS_STATE.IDEO;
					this.skillType = 0;
					this.bossFrame = 1;
					this.frameTime = 0;
					this.hasSkill = false;
				}
			}
			
		}
		this.boss.texture = RES.getRes("boss" + this.bossType + this.skillType + this.bossFrame + "_png");
	}
	/**boss3移动 */
	private move:boolean = false;
	/**BOSS3 3技能移动时间 */
	private moveTime:number = 20;
	/**游戏暂停 */
	private gameStop:boolean = false;

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