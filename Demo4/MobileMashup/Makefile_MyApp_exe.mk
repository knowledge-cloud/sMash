# ==============================================================================
# Generated by qmake (2.01a) (Qt 4.7.3) on: ??? ?? 18 19:15:29 2012
# This file is generated by qmake and should not be modified by the
# user.
#  Name        : Makefile_MyApp_exe.mk
#  Part of     : MyApp
#  Description : This file is used to call necessary targets on wrapper makefile
#                during normal Symbian build process.
#  Version     : 
#
# ==============================================================================



MAKE = make

VISUAL_CFG = RELEASE
ifeq "$(CFG)" "UDEB"
VISUAL_CFG = DEBUG
endif

do_nothing :
	@rem do_nothing

MAKMAKE: create_temps pre_targetdeps store_build

LIB: create_temps pre_targetdeps store_build

BLD: create_temps pre_targetdeps store_build

ifeq "$(PLATFORM)" "WINSCW"
CLEAN: extension_clean winscw_deployment_clean deployment_clean
else
CLEAN: extension_clean deployment_clean
endif

CLEANLIB: do_nothing

RESOURCE: do_nothing

FREEZE: do_nothing

SAVESPACE: do_nothing

RELEASABLES: do_nothing

ifeq "$(PLATFORM)" "WINSCW"
FINAL: finalize winscw_deployment deployment
else
FINAL: finalize deployment
endif

pre_targetdeps : d:\Qt\MyQtProjects\MobileMashupTest\Makefile
	-$(MAKE) -f "d:\Qt\MyQtProjects\MobileMashupTest\Makefile" pre_targetdeps QT_SIS_TARGET=$(VISUAL_CFG)-$(PLATFORM)

create_temps : d:\Qt\MyQtProjects\MobileMashupTest\Makefile
	-$(MAKE) -f "d:\Qt\MyQtProjects\MobileMashupTest\Makefile" create_temps QT_SIS_TARGET=$(VISUAL_CFG)-$(PLATFORM)

extension_clean : d:\Qt\MyQtProjects\MobileMashupTest\Makefile
	-$(MAKE) -f "d:\Qt\MyQtProjects\MobileMashupTest\Makefile" extension_clean QT_SIS_TARGET=$(VISUAL_CFG)-$(PLATFORM)

finalize : d:\Qt\MyQtProjects\MobileMashupTest\Makefile
	-$(MAKE) -f "d:\Qt\MyQtProjects\MobileMashupTest\Makefile" finalize QT_SIS_TARGET=$(VISUAL_CFG)-$(PLATFORM)

winscw_deployment_clean : d:\Qt\MyQtProjects\MobileMashupTest\Makefile
	-$(MAKE) -f "d:\Qt\MyQtProjects\MobileMashupTest\Makefile" winscw_deployment_clean QT_SIS_TARGET=$(VISUAL_CFG)-$(PLATFORM)

winscw_deployment : d:\Qt\MyQtProjects\MobileMashupTest\Makefile
	-$(MAKE) -f "d:\Qt\MyQtProjects\MobileMashupTest\Makefile" winscw_deployment QT_SIS_TARGET=$(VISUAL_CFG)-$(PLATFORM)

deployment_clean : d:\Qt\MyQtProjects\MobileMashupTest\Makefile
	-$(MAKE) -f "d:\Qt\MyQtProjects\MobileMashupTest\Makefile" deployment_clean QT_SIS_TARGET=$(VISUAL_CFG)-$(PLATFORM)

deployment : d:\Qt\MyQtProjects\MobileMashupTest\Makefile
	-$(MAKE) -f "d:\Qt\MyQtProjects\MobileMashupTest\Makefile" deployment QT_SIS_TARGET=$(VISUAL_CFG)-$(PLATFORM)

store_build : d:\Qt\MyQtProjects\MobileMashupTest\Makefile
	-$(MAKE) -f "d:\Qt\MyQtProjects\MobileMashupTest\Makefile" store_build QT_SIS_TARGET=$(VISUAL_CFG)-$(PLATFORM)


