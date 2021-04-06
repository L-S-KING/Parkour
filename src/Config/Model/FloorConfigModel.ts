class FloorConfigModel 
{
	public floorX:number;
	public floorY:number;
	public constructor( obj:string[] ) 
	{
		this.floorX = parseInt(obj[0]);
		this.floorY = parseInt(obj[1]);
	}
}