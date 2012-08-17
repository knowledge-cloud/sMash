from mod_python import apache,psp,util
import contacts
import time

#templates directory
TMPL_DIR="Templates"
#main template
MAIN_TMPL="plain.psp"
FORM_TMPL="form"

def handler(req):
	#An instance of HRHandler
	hrh=HRHandler()
	result=hrh.handler(req)
	del hrh
	return result

def hello(req):
	req.write('hello my name is chenjian')
	return apache.OK
		
class HRHandler(object):
	def _init_(self):
		pass

	def handler(self,requ):
		self.req=self.parse_args(requ)
		args=self.req.get_vars
		try:
			name=str(args['name'])
		except KeyError:
			name=None
		title=''
		if name!=None:
			title='This title is also dynamic,'+name
		else:
			title='Dynamic Content Demonstration'
			
		content=''
		if name!=None:
			content='<H1>Hello,'+name+'</H1>'
			content+='<br/><a href=".py?">Back to Start page</a>'
			
		else:
			contentFromFile=open((apache.server_root()+'/htdocs/HtmlTest/'+TMPL_DIR+'/'+FORM_TMPL),'r')
			temp=contentFromFile.readlines()
			contentFromFile.close()
			for line in temp:
				content+=line+'\n'
			content+=requ.uri
		
		db=contacts.open()
		length="%d" %len(db)
		requ.content_type='text/html;charset=UTF-8'
		requ.html_head=''
		requ.html_body_attr=''
		
		fname=TMPL_DIR+'\\'+MAIN_TMPL
		template=psp.PSP(requ,filename=fname)
		template.run({'length':length,'content':content,'html_head':requ.html_head,'html_body_attr':requ.html_body_attr,'title':title})
		del template
		return apache.OK
		
	def parse_args(self,req):
		req.get_vars={}
		try:
			if req.args:
				temp=req.args.split('&')
				for arg in temp:
					arg=arg.split('=')
					req.get_vars[arg[0]]=arg[1]
		except IndexError:
			pass
		req.form=util.FieldStorage(req)
		for i in range(len(req.form.list)):
			req.form.list[i].value=req.form.list[i].value.replace("'","\'")
		return req