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
# : License - MIT       :: Update - 2024/06/26 : #    ::::!!!1!!1!!!1!!!::     #
# +.....................++.....................+ #       ::::!::!:::!::::      #
\******************************************************************************/

var SOUND_NEXT_EFFECT = 0;
var OLD_WINDOW_COORDINATE_X = 0;
var OLD_WINDOW_COORDINATE_Y = 0;
var OLD_WINDOW_SIZE_X = 0;
var OLD_WINDOW_SIZE_Y = 0;

var MIN_WINDOW_X_SIZE = 0;
var MIN_WINDOW_Y_SIZE = 0;

window.moveTo((screen.width - window.innerWidth) / 2,
	(screen.height - window.innerHeight) / 2);

function MINIMIZE_WINDOW()
{
	HHCtrlMinimizeWindowObject.Click();
}

function TITLE_BAR_DOUBLE_CLICK()
{
	var MAXIMIZE_BUTTON;

	MAXIMIZE_BUTTON =
		document.getElementsByClassName('WINDOW2000-MAXIMIZE-BUTTON')[0]
	if (MAXIMIZE_BUTTON.style.display == 'block')
		MAXIMIZE_WINDOW();
	else
		RESTORE_WINDOW()
}

function MAXIMIZE_WINDOW()
{
	var RESTORE_BUTTON;
	var MAXIMIZE_BUTTON;
	var WINDOW_TOP_LEFT;
	var WINDOW_TOP_RIGHT;
	var WINDOW_BOTTOM_LEFT;
	var WINDOW_BOTTOM_RIGHT;
	var WINDOW_TOP;
	var WINDOW_BOTTOM;
	var WINDOW_LEFT;
	var WINDOW_RIGHT;

	WINDOW_TOP_LEFT = document.getElementById('WINDOW-TOP-LEFT');
	WINDOW_TOP_RIGHT = document.getElementById('WINDOW-TOP-RIGHT');
	WINDOW_BOTTOM_LEFT = document.getElementById('WINDOW-BOTTOM-LEFT');
	WINDOW_BOTTOM_RIGHT = document.getElementById('WINDOW-BOTTOM-RIGHT');
	WINDOW_TOP = document.getElementById('WINDOW-TOP');
	WINDOW_BOTTOM = document.getElementById('WINDOW-BOTTOM');
	WINDOW_LEFT = document.getElementById('WINDOW-LEFT');
	WINDOW_RIGHT = document.getElementById('WINDOW-RIGHT');
	WINDOW_TOP_LEFT.style.display = "NONE";
	WINDOW_TOP_RIGHT.style.display = "NONE";
	WINDOW_BOTTOM_LEFT.style.display = "NONE";
	WINDOW_BOTTOM_RIGHT.style.display = "NONE";
	WINDOW_TOP.style.display = "NONE";
	WINDOW_BOTTOM.style.display = "NONE";
	WINDOW_LEFT.style.display = "NONE";
	WINDOW_RIGHT.style.display = "NONE";
	RESTORE_BUTTON =
		document.getElementsByClassName('WINDOW2000-RESTORE-BUTTON')[0];
	MAXIMIZE_BUTTON =
		document.getElementsByClassName('WINDOW2000-MAXIMIZE-BUTTON')[0];
	OLD_WINDOW_COORDINATE_X = window.screenLeft;
	OLD_WINDOW_COORDINATE_Y = window.screenTop;
	OLD_WINDOW_SIZE_X = window.innerWidth;
	OLD_WINDOW_SIZE_Y = window.innerHeight;
	RESTORE_BUTTON.style.display = "BLOCK";
	MAXIMIZE_BUTTON.style.display = "NONE";
	window.moveTo(0, 0);
	window.resizeTo(screen.availWidth, screen.availHeight);
}

function RESTORE_WINDOW()
{
	var RESTORE_BUTTON;
	var MAXIMIZE_BUTTON;
	var WINDOW_TOP_LEFT;
	var WINDOW_TOP_RIGHT;
	var WINDOW_BOTTOM_LEFT;
	var WINDOW_BOTTOM_RIGHT;
	var WINDOW_TOP;
	var WINDOW_BOTTOM;
	var WINDOW_LEFT;
	var WINDOW_RIGHT;
	var TITLE_SIZE_X;

	TITLE_SIZE_X = GET_TITLE_SIZE_X();
	WINDOW_TOP_LEFT = document.getElementById('WINDOW-TOP-LEFT');
	WINDOW_TOP_RIGHT = document.getElementById('WINDOW-TOP-RIGHT');
	WINDOW_BOTTOM_LEFT = document.getElementById('WINDOW-BOTTOM-LEFT');
	WINDOW_BOTTOM_RIGHT = document.getElementById('WINDOW-BOTTOM-RIGHT');
	WINDOW_TOP = document.getElementById('WINDOW-TOP');
	WINDOW_BOTTOM = document.getElementById('WINDOW-BOTTOM');
	WINDOW_LEFT = document.getElementById('WINDOW-LEFT');
	WINDOW_RIGHT = document.getElementById('WINDOW-RIGHT');
	WINDOW_TOP_LEFT.style.display = "BLOCK";
	WINDOW_TOP_RIGHT.style.display = "BLOCK";
	WINDOW_BOTTOM_LEFT.style.display = "BLOCK";
	WINDOW_BOTTOM_RIGHT.style.display = "BLOCK";
	WINDOW_TOP.style.display = "BLOCK";
	WINDOW_BOTTOM.style.display = "BLOCK";
	WINDOW_LEFT.style.display = "BLOCK";
	WINDOW_RIGHT.style.display = "BLOCK";
	RESTORE_BUTTON =
		document.getElementsByClassName('WINDOW2000-RESTORE-BUTTON')[0];
	MAXIMIZE_BUTTON =
		document.getElementsByClassName('WINDOW2000-MAXIMIZE-BUTTON')[0];
	if (TITLE_SIZE_X + MIN_WINDOW_X_SIZE > OLD_WINDOW_SIZE_X)
		OLD_WINDOW_SIZE_X = TITLE_SIZE_X + MIN_WINDOW_X_SIZE;
	window.moveTo(OLD_WINDOW_COORDINATE_X, OLD_WINDOW_COORDINATE_Y);
	window.resizeTo(OLD_WINDOW_SIZE_X, OLD_WINDOW_SIZE_Y);
	RESTORE_BUTTON.style.display = "NONE";
	MAXIMIZE_BUTTON.style.display = "BLOCK";
}

function
	PLAY_SOUND(EVENT)
{
	document.getElementsByTagName("BGSOUND")[SOUND_NEXT_EFFECT].src =
		"DATA_HTA/SOUNDS/" + EVENT;

	if (SOUND_NEXT_EFFECT >= 9)
		SOUND_NEXT_EFFECT = 0;

	++SOUND_NEXT_EFFECT;
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
		(WINDOW_OBJECT_SIZE.width - HITBOX_SIZE) + 'PX';
	document.getElementById("WINDOW-BOTTOM").style.width =
		(WINDOW_OBJECT_SIZE.width - HITBOX_SIZE) + 'PX';
	document.getElementById("WINDOW-LEFT").style.height =
		(WINDOW_OBJECT_SIZE.height - HITBOX_SIZE) + 'PX';
	document.getElementById("WINDOW-RIGHT").style.height =
		(WINDOW_OBJECT_SIZE.height - HITBOX_SIZE) + 'PX';
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
		!CLICKED_OBJECT_ID.localeCompare('WINDOW-RIGHT'))
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
		var WINDOW_X;
		var WINDOW_Y;
		var SIZE_X;
		var SIZE_Y;
		var TITLE_SIZE_X;
		var TITLE_SIZE_Y;

		TITLE_SIZE_X = GET_TITLE_SIZE_X();
		TITLE_SIZE_Y = GET_TITLE_SIZE_Y();

		switch (CLICKED_OBJECT_ID)
		{
			case 'WINDOW-BOTTOM-RIGHT':
			{
				SIZE_X = WINDOW_RESIZE_EVENT.clientX + HITBOX_SIZE;
				SIZE_Y = WINDOW_RESIZE_EVENT.clientY + HITBOX_SIZE;

				if (SIZE_X < MIN_WINDOW_X_SIZE + TITLE_SIZE_X)
					SIZE_X = MIN_WINDOW_X_SIZE + TITLE_SIZE_X;

				if (SIZE_Y < MIN_WINDOW_Y_SIZE + TITLE_SIZE_Y)
					SIZE_Y = MIN_WINDOW_Y_SIZE + TITLE_SIZE_Y;

				window.resizeTo(SIZE_X, SIZE_Y);
				break ;
			}
			case 'WINDOW-TOP-LEFT':
			{
				SIZE_X = (window.innerWidth - WINDOW_RESIZE_EVENT.clientX) +
					HITBOX_SIZE;
				SIZE_Y = (window.innerHeight - WINDOW_RESIZE_EVENT.clientY) +
					HITBOX_SIZE;
				WINDOW_X = (window.screenLeft + WINDOW_RESIZE_EVENT.clientX) -
					HITBOX_SIZE;
				WINDOW_Y = (window.screenTop + WINDOW_RESIZE_EVENT.clientY) -
					HITBOX_SIZE;

				if (SIZE_X < MIN_WINDOW_X_SIZE + TITLE_SIZE_X)
				{
					SIZE_X = MIN_WINDOW_X_SIZE + TITLE_SIZE_X;
					WINDOW_X = window.screenLeft;
				}

				if (SIZE_Y < MIN_WINDOW_Y_SIZE + TITLE_SIZE_Y)
				{
					SIZE_Y = MIN_WINDOW_Y_SIZE + TITLE_SIZE_Y;
					WINDOW_Y = window.screenTop;
				}

				window.moveTo(WINDOW_X, WINDOW_Y);
				window.resizeTo(SIZE_X, SIZE_Y);
				break ;
			}
			case 'WINDOW-TOP-RIGHT':
			{
				SIZE_X = WINDOW_RESIZE_EVENT.clientX + HITBOX_SIZE;
				SIZE_Y = (window.innerHeight - WINDOW_RESIZE_EVENT.clientY) +
					HITBOX_SIZE;
				WINDOW_X = window.screenLeft;
				WINDOW_Y = (window.screenTop + WINDOW_RESIZE_EVENT.clientY) -
					HITBOX_SIZE;

				if (SIZE_X < MIN_WINDOW_X_SIZE + TITLE_SIZE_X)
					SIZE_X = MIN_WINDOW_X_SIZE + TITLE_SIZE_X;

				if (SIZE_Y < MIN_WINDOW_Y_SIZE + TITLE_SIZE_Y)
				{
					SIZE_Y = MIN_WINDOW_Y_SIZE + TITLE_SIZE_Y;
					WINDOW_Y = window.screenTop;
				}

				window.moveTo(WINDOW_X, WINDOW_Y);
				window.resizeTo(SIZE_X, SIZE_Y);
				break ;
			}
			case 'WINDOW-BOTTOM-LEFT':
			{
				SIZE_X = (window.innerWidth - WINDOW_RESIZE_EVENT.clientX) +
					HITBOX_SIZE;
				SIZE_Y = WINDOW_RESIZE_EVENT.clientY + HITBOX_SIZE;
				WINDOW_X = (window.screenLeft + WINDOW_RESIZE_EVENT.clientX) -
					HITBOX_SIZE;
				WINDOW_Y = window.screenTop;

				if (SIZE_Y < MIN_WINDOW_Y_SIZE + TITLE_SIZE_Y)
					SIZE_Y = MIN_WINDOW_Y_SIZE + TITLE_SIZE_Y;

				if (SIZE_X < MIN_WINDOW_X_SIZE + TITLE_SIZE_X)
				{
					SIZE_X = MIN_WINDOW_X_SIZE + TITLE_SIZE_X;
					WINDOW_X = window.screenLeft;
				}

				window.moveTo(WINDOW_X, WINDOW_Y);
				window.resizeTo(SIZE_X, SIZE_Y);
				break ;
			}
			case 'WINDOW-BOTTOM':
			{
				SIZE_X = window.innerWidth;
				SIZE_Y = WINDOW_RESIZE_EVENT.clientY + HITBOX_SIZE;

				if (SIZE_Y < MIN_WINDOW_Y_SIZE + TITLE_SIZE_Y)
					SIZE_Y = MIN_WINDOW_Y_SIZE + TITLE_SIZE_Y;

				window.resizeTo(SIZE_X, SIZE_Y);
				break ;
			}
			case 'WINDOW-LEFT':
			{
				SIZE_X = (window.innerWidth - WINDOW_RESIZE_EVENT.clientX) +
					HITBOX_SIZE;
				SIZE_Y = window.innerHeight;
				WINDOW_X = (window.screenLeft + WINDOW_RESIZE_EVENT.clientX) -
					HITBOX_SIZE;
				WINDOW_Y = window.screenTop;

				if (SIZE_X < MIN_WINDOW_X_SIZE + TITLE_SIZE_X)
				{
					SIZE_X = MIN_WINDOW_X_SIZE + TITLE_SIZE_X;
					WINDOW_X = window.screenLeft;
				}

				window.moveTo(WINDOW_X, WINDOW_Y);
				window.resizeTo(SIZE_X, SIZE_Y);
				break ;
			}
			case 'WINDOW-TOP':
			{
				SIZE_X = window.innerWidth;
				SIZE_Y = (window.innerHeight - WINDOW_RESIZE_EVENT.clientY) +
					HITBOX_SIZE;
				WINDOW_X = window.screenLeft;
				WINDOW_Y = (window.screenTop + WINDOW_RESIZE_EVENT.clientY) -
					HITBOX_SIZE;

				if (SIZE_Y < MIN_WINDOW_Y_SIZE + TITLE_SIZE_Y)
				{
					SIZE_Y = MIN_WINDOW_Y_SIZE + TITLE_SIZE_Y;
					WINDOW_Y = window.screenTop;
				}

				window.moveTo(WINDOW_X, WINDOW_Y);
				window.resizeTo(SIZE_X, SIZE_Y);
				break ;
			}
			case 'WINDOW-RIGHT':
			{
				SIZE_X = WINDOW_RESIZE_EVENT.clientX + HITBOX_SIZE;
				SIZE_Y = window.innerHeight;

				if (SIZE_X < MIN_WINDOW_X_SIZE + TITLE_SIZE_X)
					SIZE_X = MIN_WINDOW_X_SIZE + TITLE_SIZE_X;

				window.resizeTo(SIZE_X, SIZE_Y);
				break ;
			}
			default:
			{
				break ;
			}
		}

		WINDOW_OBJECT_SIZE = 
			document.getElementsByClassName('WINDOW_OBJECT')[0].
			getBoundingClientRect();
		document.getElementById("WINDOW-TOP").style.width =
			(WINDOW_OBJECT_SIZE.width - HITBOX_SIZE) + 'PX';
		document.getElementById("WINDOW-BOTTOM").style.width =
			(WINDOW_OBJECT_SIZE.width - HITBOX_SIZE) + 'PX';
		document.getElementById("WINDOW-LEFT").style.height =
			(WINDOW_OBJECT_SIZE.height - HITBOX_SIZE) + 'PX';
		document.getElementById("WINDOW-RIGHT").style.height =
			(WINDOW_OBJECT_SIZE.height - HITBOX_SIZE) + 'PX';
	}

	function WINDOW_RESIZE_DESTORY()
	{
		window.removeEventListener('mousemove', WINDOW_RESIZE);
		window.removeEventListener('mouseup', WINDOW_RESIZE_DESTORY);
	}
}

function CHECK_AND_FIX_WINDOW_SIZE()
{
	var TITLE_SIZE_X;

	TITLE_SIZE_X = GET_TITLE_SIZE_X();

	if (TITLE_SIZE_X + MIN_WINDOW_X_SIZE > window.innerWidth)
		window.resizeTo(TITLE_SIZE_X + MIN_WINDOW_X_SIZE, window.innerHeight);
}

function GET_TITLE_SIZE_X()
{
	return (document.getElementById("APP_TITLE").
		getBoundingClientRect().width +
		document.getElementsByClassName("WINDOW2000-CLOSE-BUTTON")[0]
		.getBoundingClientRect().width +
		(
			document.getElementsByClassName("WINDOW2000-MAXIMIZE-BUTTON")[0]
				.getBoundingClientRect().width ||
			document.getElementsByClassName("WINDOW2000-RESTORE-BUTTON")[0]
				.getBoundingClientRect().width
		 ) +
		document.getElementsByClassName("WINDOW2000-MINIMIZE-BUTTON")[0]
		.getBoundingClientRect().width +
		14 /* SIZE OF WINDOW2000-BORDER WITH BORDERS */ +
		6 /* MARGIN OF BUTTONS */);
}

function GET_TITLE_SIZE_Y()
{
	return (document.getElementsByClassName("WINDOW2000-TITLEBAR")[0]
		.getBoundingClientRect().height +
		18 /* SIZE OF WINDOW2000-BORDER WITH BORDERS */);
}

// window.onload = JS_MAIN; // Running from VBScript
