package dart.mashup.graphics
{
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import flash.text.TextField;
	
	public class Circle extends Sprite
	{
        private var radius:Number         = 20;
        private var fillColor:uint;
        private var lineColor:uint;
        private var borderColor:uint;
		private var fillColorArr:Array = new Array(0x330099, 0x993399, 0xFF0099, 0x6600FF, 0xFF6666, 0x00CC33, 0x33CC00, 0xFFFF99, 0xCC66FF, 0xFF9900);
		private var lineColorArr:Array = new Array(0x000CCC, 0xFF33FF, 0xFF3366, 0x0000FF, 0xFF0000, 0x33FF00, 0x00FF00, 0xFFFF33, 0xFF00FF, 0xFFCC00);
		
        private function drawCircle(text:String, x:Number, y:Number):void {
          //  var halfSize:Number = Math.round(size / 2);
         /*   var child:Sprite = new Sprite();
            child.graphics.beginFill(fillColor);
            child.graphics.lineStyle(2,lineColor);
            //child.graphics.drawCircle(this.x + halfSize, this.y + halfSize, halfSize);
            child.graphics.drawCircle(x, y, halfSize);     
            var label:TextField = new TextField();
            label.text = text;
            //label.x = this.x + halfSize;
            //label.y = this.y + halfSize;
            label.x = x;
            label.y = y;
            label.width = halfSize;
            label.height = halfSize / 2;
            child.addChild(label);
            child.graphics.endFill();
            this.addChild(child);            
            this.addEventListener(MouseEvent.ROLL_OVER, zoomCircle);
            this.addEventListener(MouseEvent.ROLL_OUT, zoomCircle); */
            
            this.graphics.beginFill(fillColor);
            this.graphics.lineStyle(2,lineColor);
            //child.graphics.drawCircle(this.x + halfSize, this.y + halfSize, halfSize);
            this.graphics.drawCircle(x, y, radius);     
            var label:TextField = new TextField();
            label.text = text;
            //label.x = this.x + halfSize;
            //label.y = this.y + halfSize;
            label.x = x;
            label.y = y;
            label.width = radius;
            label.height = radius / 2;
            this.addChild(label);
            this.graphics.endFill();
        }
        
		public function zoomCircle(event:MouseEvent):void
		{
			if(zoom.isPlaying)
				zoom.reverse();
			else
				zoom.play([this], event.type == MouseEvent.ROLL_OUT ? true : false);
		}
		public function getColorIndex(type:String):uint
		{
			var hashCode:Number = 0;
			var length:int = type.length;
			
			for(var i:int = 0; i < length; i++)
				hashCode += type.charCodeAt(i);
				
			return hashCode % 10;	
		}
		public function Circle(text:String = "test", type:String = "other", x:Number = 20, y:Number = 20, radius:Number)
		{
			/* initialize zoom */
			super();
			zoom = new Zoom();
			zoom.zoomWidthTo = 1.5;
			zoom.zoomWidthFrom = 1;
			zoom.zoomHeightFrom = 1;
			zoom.zoomHeightTo = 1.5;
			zoom.originX = x;
			zoom.originY = y;
			/* get color index */
			var i:int = getColorIndex(type);
			fillColor = fillColorArr[i];
			lineColor = lineColorArr[i];
			this.radius = radius;
			
			//this.width = size;
			//this.height = size;
			//this.x = x;
			//this.y = y;
			
			drawCircle(text, x, y);
		}

	}
}