/**
 * 格斗失败
 */
class Fail extends BaseModule
{
	public constructor() 
	{
		super();
		this.addListener(this, egret.Event.ADDED_TO_STAGE, this.init, this);
		this.addListener(this, egret.Event.ENTER_FRAME, this.update, this);
	}

	/**结束 */
	private end:eui.Button;
	/**败 */
	private fail:eui.Image;



	private init()
	{
		this.skinName = "fail";

		this.addListener(this.end, egret.TouchEvent.TOUCH_TAP, this.endTap, this);
	}

	private time:number = 0;

	private update()
	{
		this.time += 1;
		if(this.time % 5 == 0)
		{
			if(this.fail.scaleX >= 1)
			{
				this.fail.scaleX = 1;
				this.fail.scaleY = 1;
				this.time = 0;
			}
			this.fail.scaleX += 0.1;
			this.fail.scaleY += 0.1;
		}
	}

	private endTap()
	{
		SceneManager.getInstance().addScene(new Adventure());
	}

}