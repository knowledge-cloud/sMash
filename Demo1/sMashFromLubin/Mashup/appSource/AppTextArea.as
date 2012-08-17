package appSource
{
	import flash.events.MouseEvent;
	
	import mx.controls.TextArea;
	public class AppTextArea extends TextArea
	{
		public function AppTextArea(displayName:String)
		{
			super();//TODO: implement function
			this.addEventListener(MouseEvent.MOUSE_DOWN, mouseDownHandler);
			this.addEventListener(MouseEvent.MOUSE_UP, mouseUpHandler);
			
			var displayer:Displayer = new Displayer(displayName);					
//			Alert.show("labelname: "+xx);
			ControlDragManager.treeData.addItem(displayer);
		
		}
		
		protected function mouseDownHandler(event:MouseEvent):void
		{
			this.startDrag();
		}
		
		protected function mouseUpHandler(event:MouseEvent):void 
		{
			ControlDragManager.mouseUpOperation(this);
		}

	}
}