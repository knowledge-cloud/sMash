"""Loads the actual handler in Framework directory"""
import sys
import os
htdocs = os.path.split(os.path.dirname(__file__))[0] + "/"
if not htdocs in sys.path:
    sys.path.insert(0, htdocs)
from Framework import RestHandler

def handler(req):
    """Called by mod_python for every request.
    Initializes and calls RestHandler.
    """
    rh = RestHandler.RestHandler()
    return rh.handler(req)
