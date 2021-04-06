/**
 * 场景界面管理类
 */
class SceneManager 
{
	private constructor() 
	{
	}
	private static instance:SceneManager = null;
	public static getInstance():SceneManager
	{
		if(this.instance == null)
		{
			this.instance = new SceneManager;
		}
		return this.instance;
	}
	/**当前可用显示对象 */
	public rootScene:eui.UILayer;
	/**设置当前可用显示对象 */
	public setRootScene(root:eui.UILayer)
	{
		this.rootScene = root;
	}
	/**当前可用场景 */
	public currentScene:BaseModule;
	/**添加当前可用场景 */
	public addScene(scene:BaseModule)
	{
		if(this.currentScene != null)
		{
			//删除原来场景
			this.rootScene.removeChild(this.currentScene);
			//将原来场景置空
			this.currentScene = null;
		}
		//添加到舞台
		if(this.rootScene != null)
		{
			this.currentScene = scene;
			this.rootScene.addChild(scene);
		}
	}
}