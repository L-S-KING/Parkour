/**
 * 障碍物管理类
 */
class ObstacleManager 
{
	private constructor() 
	{
	}
	private static _obstacle:ObstacleManager = null;
	public static getObstacle():ObstacleManager
	{
		if(this._obstacle == null)
		{
			this._obstacle = new ObstacleManager();
		}
		return this._obstacle;
	}
	/**障碍物 */
	public obstacle:Obstacle = null;
	/**障碍物队列 */
	public obstacleArray:Obstacle[] = [];
	/**添加障碍物 */
	public addObstacle(posX:number, posY:number)
	{
		this.obstacle = new Obstacle();
		this.obstacle.obstacleInit();
		this.obstacle.x = posX;
		this.obstacle.y = posY;
		SceneManager.getInstance().currentScene.addChild(this.obstacle);
		this.obstacleArray.push(this.obstacle);	
	}
}