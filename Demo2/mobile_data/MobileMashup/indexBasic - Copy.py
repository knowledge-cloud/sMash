from mod_python import apache
#templates directory
TMPL_DIR="Templates"
#main template
MAIN_TMPL="plain.psp"

def handler(req):
	#An instance of HRHandler
	hrh=HRHandler()
	result=hrh.handler(req)
	del hrh
	return result
	
class HRHandler(object)
	def _init_(self):
	pass

def handler(self,requ):
	title='Page title'
	content='This is the page content'
	requ.content_type='text/html;charset=UTF-8'
	requ.html_head=''
	requ.html_body_attr=''
	
	fname=TMPL_DIR+'\\'+MAIN_TMPL
	template=psp.PSP(requ,filename=fname)
	template.run({'content':content,'html_head':requ.html_head,'html_body_attr':requ.html_body_attr,'title':title})
	del template
	return apache.OK
