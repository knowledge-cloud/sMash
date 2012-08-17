import time
import positioning
import codecs
import string
import e32,positioning

def gps_init():
	global gps_data
	
	gps_data ={
	'satellites': {'horizontal_dop': 0.0, 'used_satellites': 0, 'vertical_dop': 0.0, 'time': 0.0,'satellites': 0, 'time_dop':0.0},
	'position': {'latitude': 0.0, 'altitude': 0.0, 'vertical_accuracy': 0.0, 'longitude': 0.0, 'horizontal_accuracy': 0.0},
	'course': {'speed': 0.0, 'heading': 0.0, 'heading_accuracy': 0.0, 'speed_accuracy': 0.0}
	}
	positioning.select_module(positioning.default_module())
	positioning.set_requestors([{"type":"service","format":"application","data":"gps_app"}])
	positioning.position(course=1,satellites=1,callback=gps, interval=200000,partial=0)
	e32.ao_sleep(3)

def gps(event):
	global gps_data
	gps_data = event
	
def gps_stop():
	try:
		positioning.stop_position()
	except:
		return '2'

gps_init()
count = 0
while(count<=60):
    count = count + 1
    sat = gps_data['satellites']['used_satellites']
    pos_lat = gps_data['position']['latitude']
    pos_long = gps_data['position']['longitude']
    speed = gps_data['course']['speed']
    f=open('e:/DATA/Web Server/htdocs/MobileMashup/cat','rt+')
    f.write(str(pos_lat)+"\n")
    f.write(str(pos_long)+"\n")
    f.close()
    e32.ao_sleep(1)
gps_stop()
    
