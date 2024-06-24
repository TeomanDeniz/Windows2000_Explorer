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
# : License - MIT       :: Update - 2024/06/24 : #    ::::!!!1!!1!!!1!!!::     #
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

function JS_MAIN()
{
	var WINDOW_OBJECT;
	var WINDOW_OBJECT_SIZE;
	var CORNER_OBJECT;
	var HITBOX_SIZE;

	WINDOW_OBJECT = document.getElementsByClassName('WINDOW_OBJECT')[0];
	WINDOW_OBJECT_SIZE = WINDOW_OBJECT.getBoundingClientRect();
	CORNER_OBJECT = document.getElementsByClassName('WINDOW-RESIZE-HANDLE')[0];
	HITBOX_SIZE = parseInt(window.getComputedStyle(CORNER_OBJECT).width, 10) + 
		parseInt(window.getComputedStyle(CORNER_OBJECT).marginLeft, 10);
	document.getElementById("WINDOW-TOP").style.width =
		(WINDOW_OBJECT_SIZE.width - HITBOX_SIZE) + 'px';
	document.getElementById("WINDOW-BOTTOM").style.width =
		(WINDOW_OBJECT_SIZE.width - HITBOX_SIZE) + 'px';
	document.getElementById("WINDOW-LEFT").style.height =
		(WINDOW_OBJECT_SIZE.height - HITBOX_SIZE) + 'px';
	document.getElementById("WINDOW-RIGHT").style.height =
		(WINDOW_OBJECT_SIZE.height - HITBOX_SIZE) + 'px';
	WINDOW_OBJECT.addEventListener('mousedown', WINDOW_RESIZER);
}

function WINDOW_RESIZER(WINDOW_RESIZER_EVENT)
{
	var CLICKED_OBJECT;
	var CLICKED_OBJECT_ID;
	var HITBOX_SIZE;

	CLICKED_OBJECT = (WINDOW_RESIZER_EVENT.srcElement ||
		WINDOW_RESIZER_EVENT.target);
	CLICKED_OBJECT_ID = CLICKED_OBJECT.id;
	if (!CLICKED_OBJECT_ID.localeCompare('WINDOW-BOTTOM-RIGHT') ||
		!CLICKED_OBJECT_ID.localeCompare('WINDOW-TOP-LEFT') ||
		!CLICKED_OBJECT_ID.localeCompare('WINDOW-TOP-RIGHT') ||
		!CLICKED_OBJECT_ID.localeCompare('WINDOW-BOTTOM-LEFT') ||
		!CLICKED_OBJECT_ID.localeCompare('WINDOW-BOTTOM') ||
		!CLICKED_OBJECT_ID.localeCompare('WINDOW-LEFT') ||
		!CLICKED_OBJECT_ID.localeCompare('WINDOW-TOP') ||
		!CLICKED_OBJECT_ID.localeCompare('WINDOW-RIGHT')
		)
	{
		CLICKED_OBJECT =
			document.getElementsByClassName('WINDOW-RESIZE-HANDLE')[0];
		HITBOX_SIZE =
			parseInt(window.getComputedStyle(CLICKED_OBJECT).width, 10) + 
			parseInt(window.getComputedStyle(CLICKED_OBJECT).marginLeft, 10);
		window.addEventListener('mousemove', WINDOW_RESIZE);
		window.addEventListener('mouseup', WINDOW_RESIZE_DESTORY);
	}

	function WINDOW_RESIZE(WINDOW_RESIZE_EVENT)
	{
		var WINDOW_OBJECT_SIZE;

		if (CLICKED_OBJECT_ID.localeCompare('WINDOW-BOTTOM-RIGHT') == 0)
		{
			window.resizeTo(
				WINDOW_RESIZE_EVENT.clientX + HITBOX_SIZE,
				WINDOW_RESIZE_EVENT.clientY + HITBOX_SIZE
			);
		}
		else if (CLICKED_OBJECT_ID.localeCompare('WINDOW-TOP-LEFT') == 0)
		{
			window.moveTo(
				(window.screenLeft + WINDOW_RESIZE_EVENT.clientX) - HITBOX_SIZE,
				(window.screenTop + WINDOW_RESIZE_EVENT.clientY) - HITBOX_SIZE
			);
			window.resizeTo(
				(window.innerWidth - WINDOW_RESIZE_EVENT.clientX) + HITBOX_SIZE,
				(window.innerHeight - WINDOW_RESIZE_EVENT.clientY) + HITBOX_SIZE
			);
		}
		else if (CLICKED_OBJECT_ID.localeCompare('WINDOW-TOP-RIGHT') == 0)
		{
			window.resizeTo(
				WINDOW_RESIZE_EVENT.clientX + HITBOX_SIZE,
				(window.innerHeight - WINDOW_RESIZE_EVENT.clientY) + HITBOX_SIZE
			);
			window.moveTo(
				window.screenLeft,
				(window.screenTop + WINDOW_RESIZE_EVENT.clientY) - HITBOX_SIZE
			);
		}
		else if (CLICKED_OBJECT_ID.localeCompare('WINDOW-BOTTOM-LEFT') == 0)
		{
			window.moveTo(
				(window.screenLeft + WINDOW_RESIZE_EVENT.clientX) - HITBOX_SIZE,
				window.screenTop
			);
			window.resizeTo(
				(window.innerWidth - WINDOW_RESIZE_EVENT.clientX) + HITBOX_SIZE,
				WINDOW_RESIZE_EVENT.clientY + HITBOX_SIZE
			);
		}
		else if (CLICKED_OBJECT_ID.localeCompare('WINDOW-BOTTOM') == 0)
		{
			window.resizeTo(
				window.innerWidth,
				WINDOW_RESIZE_EVENT.clientY + HITBOX_SIZE
			);
		}
		else if (CLICKED_OBJECT_ID.localeCompare('WINDOW-LEFT') == 0)
		{
			window.moveTo(
				(window.screenLeft + WINDOW_RESIZE_EVENT.clientX) - HITBOX_SIZE,
				window.screenTop
			);
			window.resizeTo(
				(window.innerWidth - WINDOW_RESIZE_EVENT.clientX) + HITBOX_SIZE,
				window.innerHeight
			);
		}
		else if (CLICKED_OBJECT_ID.localeCompare('WINDOW-TOP') == 0)
		{
			window.moveTo(
				window.screenLeft,
				(window.screenTop + WINDOW_RESIZE_EVENT.clientY) - HITBOX_SIZE
			);
			window.resizeTo(
				window.innerWidth,
				(window.innerHeight - WINDOW_RESIZE_EVENT.clientY) + HITBOX_SIZE
			);
		}
		else if (CLICKED_OBJECT_ID.localeCompare('WINDOW-RIGHT') == 0)
		{
			window.resizeTo(
				WINDOW_RESIZE_EVENT.clientX + HITBOX_SIZE,
				window.innerHeight
			);
		}

		WINDOW_OBJECT_SIZE = 
			document.getElementsByClassName('WINDOW_OBJECT')[0].
			getBoundingClientRect();
		document.getElementById("WINDOW-TOP").style.width =
			(WINDOW_OBJECT_SIZE.width - HITBOX_SIZE) + 'px';
		document.getElementById("WINDOW-BOTTOM").style.width =
			(WINDOW_OBJECT_SIZE.width - HITBOX_SIZE) + 'px';
		document.getElementById("WINDOW-LEFT").style.height =
			(WINDOW_OBJECT_SIZE.height - HITBOX_SIZE) + 'px';
		document.getElementById("WINDOW-RIGHT").style.height =
			(WINDOW_OBJECT_SIZE.height - HITBOX_SIZE) + 'px';
	}

	function WINDOW_RESIZE_DESTORY()
	{
		window.removeEventListener('mousemove', WINDOW_RESIZE);
		window.removeEventListener('mouseup', WINDOW_RESIZE_DESTORY);
	}
}

// window.onload = JS_MAIN; // Running from VBScript