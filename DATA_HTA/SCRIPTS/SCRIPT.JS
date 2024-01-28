/******************************************************************************\
# JS - SOUND                                     #       Maximum Tension       #
################################################################################
#                                                #      -__            __-     #
# Teoman Deniz                                   #  :    :!1!-_    _-!1!:    : #
# maximum-tension.com                            #  ::                      :: #
#                                                #  :!:    : :: : :  :  ::::!: #
# +.....................++.....................+ #   :!:: :!:!1:!:!::1:::!!!:  #
# : C - Maximum Tension :: Create - 2022/11/21 : #   ::!::!!1001010!:!11!!::   #
# :---------------------::---------------------: #   :!1!!11000000000011!!:    #
# : License - MIT       :: Update - 2024/01/27 : #    ::::!!!1!!1!!!1!!!::     #
# +.....................++.....................+ #       ::::!::!:::!::::      #
\******************************************************************************/

var SOUND_NEXT_EFFECT = 0;

window.moveTo((screen.width - window.innerWidth) / 2,
	(screen.height - window.innerHeight) / 2);

function MINIMALIZE_WINDOW()
{
	HHCtrlMinimizeWindowObject.Click();
}

function
	PLAY_SOUND(EVENT)
{
	document.getElementsByTagName("BGSOUND")[SOUND_NEXT_EFFECT].src =
		"DATA_HTA/SOUNDS/" + EVENT;
	if (SOUND_NEXT_EFFECT >= 9)
		SOUND_NEXT_EFFECT = 0;
	SOUND_NEXT_EFFECT++;
}