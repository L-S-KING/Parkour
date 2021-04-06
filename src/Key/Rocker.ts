/**
 * 摇杆
 * 
 */
class Rocker extends BaseModule
{
	public constructor() 
	{
		super();
	}
	/************************************皮肤文件写摇杆********************************************* */
	/**摇杆 */
	private rocker:eui.Group;
	/**摇杆外圆 */
	public rockerOut:eui.Image;
	/**摇杆触摸点 */
	public rockerIn:eui.Image;
	/**摇杆半径 */
	public radius:number = 128;

	public rockerInit()
	{
		this.skinName = "Rocker_";

		//给触摸点添加触摸监听
		this.addListener(this.rockerIn, egret.TouchEvent.TOUCH_BEGIN, this.rockerBegin, this);
		this.addListener(this.rocker, egret.TouchEvent.TOUCH_END,this.rockerEnd,this);

	}

	//摇杆触摸
	private rockerBegin()
	{
		//给触摸点添加移动监听
		this.addListener(this.rockerIn, egret.TouchEvent.TOUCH_MOVE, this.rockerMove, this);
		this.rockerOut.alpha = 1;
		this.rockerIn.alpha = 1;
	}
	/**移动角度 */
	public angle:number = 0;
	/**触摸点到摇杆距离 */
	public distance:number = 0;

	//摇杆触摸点移动
	private rockerMove(e:egret.TouchEvent)
	{
		//获取角度---弧度
		this.angle = Math.atan2(e.stageY - this.rockerOut.y, e.stageX - this.rockerOut.x );
		//获取触摸点到摇杆的距离
		this.distance = (e.stageY - this.rockerOut.y) / Math.sin(this.angle);
		//触摸点的位置
		//如果触摸点到摇杆中心的距离大于摇杆大半径触摸点的位置
		if(this.distance > this.radius)
		{
			this.rockerIn.x = this.rockerOut.x + this.radius * Math.cos(this.angle);
			this.rockerIn.y = this.rockerOut.y + this.radius * Math.sin(this.angle);
		}
		//如果触摸点到摇杆中心的距离小于摇杆大半径触摸点的位置
		else 
		{
			this.rockerIn.x = e.stageX;
			this.rockerIn.y = e.stageY;
		}
	}

	//摇杆触摸结束
	private rockerEnd()
	{
		//触摸结束触摸点的位置等于摇杆的位置
		this.rockerIn.x = this.rockerOut.x;
		this.rockerIn.y = this.rockerOut.y;
		//触摸点到摇杆的距离
		this.distance = 0;
		this.rockerOut.alpha = 0.5;
		this.rockerIn.alpha = 0.5;
	}
}