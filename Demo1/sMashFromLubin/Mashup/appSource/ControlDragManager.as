package appSource
{
	import mx.core.UIComponent;
	import mx.containers.Canvas;
	import mx.containers.HBox;
	import mx.controls.Label;
	import mx.controls.Alert;
	import mx.collections.ArrayCollection;
	
	
	public class ControlDragManager
	{
		public function ControlDragManager()
		{
		}
		
		public static var treeData:ArrayCollection = new ArrayCollection();
		
		public static function mouseDownOperation(control:UIComponent,propertyArray:Array):void
		{
			Alert.show("propertyArray.length:"+propertyArray.length);
			control.startDrag();
			var propertyContainer:HBox = control.parentApplication.mashupViews.getChildByName("appViewer").propertyContainer;
			propertyContainer.removeAllChildren();
			
			for(var i:int = 0; i<propertyArray.length/2; i++)
			{
				Alert.show("propertyArray.xxx:");
				Alert.show("propertyArray.length2:"+propertyArray.length);
				var propertyName:Label = new Label();
				propertyName.text = propertyArray[2*i];
				Alert.show("propertyName.text:"+propertyName.text);
				propertyContainer.addChild(propertyName);
				propertyContainer.addChild(propertyArray[2*i+1]);
			}
		} 
		
		public static function mouseUpOperation(control:UIComponent):void
		{
			control.stopDrag();
			var previewContainer:Canvas = control.parentApplication.mashupViews.getChildByName("appViewer").previewContainer.previewCanvas;
			if(previewContainer.hitTestObject(control))
			{
				//var p:Point = new Point(event.stageX, event.stageY);
				//var array:Array = previewContainer.getObjectsUnderPoint(p);
				
				if(!previewContainer.contains(control))
				{
					previewContainer.addChild(control);
					var parentCanvas:Canvas = control.parent as Canvas;
					control.x = parentCanvas.contentMouseX-10;
					control.y = parentCanvas.contentMouseY-10;
					
				}
				//this.parentApplication.addChild(this); //?
			}
			else
			{
				if(previewContainer.contains(control))
					previewContainer.removeChild(control);
				control.parentApplication.removeChild(control);
			}
		}

	}
}