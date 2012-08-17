#!/usr/bin/env python
# -*- coding: UTF-8 -*-

import re


re_string = re.compile(r"""'[^']*'|"[^"]*""" + '"')



def encode (obj) :

	s = `obj` \
		.replace('\\\\', '\\x5c') \
		.replace('\\\'', '\\x27') \
		.replace('\\\"', '\\x22')

	raw_l1 = re_string.findall(s)
	raw_l2 = re_string.split(s)
	
	l1 = []
	l2 = []
	
	for tmp in raw_l1 :
		
		tmp = eval(tmp).decode('utf-8')
		tmp = tmp \
			.replace(u'\\', u'\\\\') \
			.replace(u'"', u'\\"') \
			.replace(u'\b', u'\\b') \
			.replace(u'\f', u'\\f') \
			.replace(u'\n', u'\\n') \
			.replace(u'\t', u'\\t')
			
		tmp = '"' + tmp.encode('utf-8') + '"'
		l1.append(tmp)
		


	for tmp in raw_l2 :
		
		tmp = tmp \
			.replace('True', 'true') \
			.replace('False', 'false') \
			.replace('None', 'null') \
			.replace('L', '')
		
		l2.append(tmp)

		#tmp = tmp[1:-1] \
		#	.replace('\'', '\\\'') \
		#	.replace('\"', '\\\"') \
		#
		#
		#	.replace('\\x22', '\\\"') \
		#	.replace('\\x27', '\\\'') \
		#	.replace('\\x5c', '\\\\') \
		#	.replace('\\x08', '\\\\') \
		#	.replace('\\x0c', '\\\\') \
		#	.replace('\\x0a', '\\\\') \
		#	.replace('\\x0d', '\\\\') \
		#	.replace('\\x09', '\\\\')
		
		tmp = '"' + tmp + '"'
	
	
	l = [l2[0]]
	
	for i in range(len(l1)) :
		l.append(l1[i])
		l.append(l2[i + 1])
	
	s = ''.join(l)
	return s


#tmp = { '\'' : '"', '中文' : '\'\\' }
#print encode(tmp)
