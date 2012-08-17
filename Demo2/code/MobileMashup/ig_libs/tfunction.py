#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from mod_python import util

def parse_args(req):
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