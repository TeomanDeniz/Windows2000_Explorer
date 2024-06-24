'/*****************************************************************************\
'# VBS - HTA_EXPLORER [IE 9+]                     #      Maximum Tension       #
'###############################################################################
'#                                                #     -__            __-     #
'# Teoman Deniz                                   # :    :!1!-_    _-!1!:    : #
'# maximum-tension.com                            # ::                      :: #
'#                                                # :!:    : :: : :  :  ::::!: #
'# +.....................++.....................+ #  :!:: :!:!1:!:!::1:::!!!:  #
'# : C - Maximum Tension :: Create - 2022/11/15 : #  ::!::!!1001010!:!11!!::   #
'# :---------------------::---------------------: #  :!1!!11000000000011!!:    #
'# : License - MIT       :: Update - 2024/06/24 : #   ::::!!!1!!1!!!1!!!::     #
'# +.....................++.....................+ #      ::::!::!:::!::::      #
'\*****************************************************************************/

POS_X=0
POS_Y=0
WINDOW_MOVING=0
SOUND_NEXT_EFFECT=0
Dim SHELL : Set SHELL = CreateObject("WScript.Shell")
' GET WINDOWS SHELL EQUIPMENTS
Set window.onload = GetRef("VB_MAIN")
' IF VBSCRIPT NOT AUTOMATICALLY WORKED, RUN WITH "VB_MAIN" SUB

Sub VB_MAIN()
	JS_MAIN()
	EXPLORER_INDEX.value = 1
	EXPLORER_OPEN_FOLDER(Replace(SHELL.CurrentDirectory, "\", "/"))
	' START EXPLORER WITH CURRENT HTA DIRECTORY
End Sub

Sub PLAY_SOUND(SOUND_NAME)
	document.getElementById("BGSOUND" & CStr(SOUND_NEXT_EFFECT)).src = _
		"DATA_HTA/SOUNDS/" & SOUND_NAME
	If SOUND_NEXT_EFFECT >= 9 Then
		SOUND_NEXT_EFFECT = 0
	End If
	SOUND_NEXT_EFFECT = SOUND_NEXT_EFFECT + 1
End SUb

Function READ_INI(ARG_INI_PATH, ARG_SECTION, ARG_KEY)
	' Written by Keith Lacelle
	' Modified by Denis St-Pierre and Rob van der Woude
	Const ForReading   = 1
	Const ForWriting   = 2
	Const ForAppending = 8
	Dim EQUAL_POS
	Dim OBJ_FSO
	Dim OBJECT_INI
	Dim INI_PATH
	Dim KEY
	Dim LEFT_STRING
	Dim LINE
	Dim SECTION

	Set OBJ_FSO = CreateObject("Scripting.FileSystemObject")
	READ_INI = ""
	INI_PATH = Trim(ARG_INI_PATH)
	SECTION = Trim(ARG_SECTION)
	KEY = Trim(ARG_KEY)
	If OBJ_FSO.FileExists(INI_PATH) Then
		Set OBJECT_INI = OBJ_FSO.OpenTextFile(INI_PATH, ForReading, False)
		Do While OBJECT_INI.AtEndOfStream = False
			LINE = Trim(OBJECT_INI.ReadLine)
			If LCase(LINE) = "[" & LCase(SECTION) & "]" Then
				LINE = Trim(OBJECT_INI.ReadLine)
				Do While Left(LINE, 1) <> "["
					EQUAL_POS = InStr(1, LINE, "=", 1)
					If EQUAL_POS > 0 Then
						LEFT_STRING = Trim(Left(LINE, EQUAL_POS - 1))
						If LCase(LEFT_STRING) = LCase(KEY) Then
							READ_INI = Trim(Mid(LINE, EQUAL_POS + 1))
							If READ_INI = "" Then
								READ_INI = " "
							End If
							' Abort loop when item is found
							Exit Do
						End If
					End If
					If OBJECT_INI.AtEndOfStream Then Exit Do
					LINE = Trim(OBJECT_INI.ReadLine)
				Loop
			Exit Do
			End If
		Loop
		OBJECT_INI.Close
	End If
End Function

Function GET_FOLDER_ICON(FOLDER_PATH)
	Dim DESKTOP_INI_PATH

	DESKTOP_INI_PATH = FOLDER_PATH & "\desktop.ini"
	If CreateObject("Scripting.FileSystemObject").FileExists(DESKTOP_INI_PATH) _
		Then
		GET_FOLDER_ICON = _
			READ_INI(DESKTOP_INI_PATH, ".ShellClassInfo", "IconResource")
	Else
		GET_FOLDER_ICON = ""
	End If
End Function

Sub EXPLORER_OPEN_FOLDER(DIR_PARM)
	Dim EXPLORER_SHOW_HIDDEN_OBJECTS
	Dim EXPLORER_OBJECT_NO
	Dim EXPLORER_ENTITIES
	Dim EXPLORER_FOLDERS
	Dim EXPLORER_FILES
	Dim EXPLORER_BACK
	Dim EXPLORER
	Dim FOLDER_ICON
	Dim TEMP
	Dim T

	EXPLORER_SHOW_HIDDEN_OBJECTS = 0
	' SHOW HIDDEN/SYSTEM FILES/FOLDERS?
	EXPLORER_PATH.value = DIR_PARM
	' GET ARGUMENT (DIRECTORY)
	Set EXPLORER = document.getElementById("___EXPLORER___")
	' GET FILE/FOLDER TABLE ELEMENT
	Set EXPLORER_BACK = document.getElementById("EXPLORER_BACK")
	' GET "BACK" BUTTON ELEMENT
	Set APP_ID = document.getElementById("APP_TITLE") ' TITLE BAR
	Set EXPLORER_ENTITIES = _
		CreateObject("Scripting.FileSystemObject").GetFolder(DIR_PARM)
	' GET ALL OBJECTS
	Set EXPLORER_FILES = EXPLORER_ENTITIES.Files
	' GET ONLY FILES OBJECTS
	Set EXPLORER_FOLDERS = EXPLORER_ENTITIES.SubFolders
	' GET ONLY FOLDERS OBJECTS
	LAST_PATH = InStrRev(DIR_PARM, "/")
	BACK_DIR = Mid(DIR_PARM, LAST_PATH)
	BACK_DIR = Replace(BACK_DIR, "/", "")
	APP_TITLE.innerHTML = BACK_DIR ' TODO: DIR_PARM ON TEXT AREA
	EXPLORER.innerHTML = "" ' CLEAR THE OBJECT TABLE FOR ADD NEW OBJECTS ON IT
	EXPLORER_OBJECT_NO = 1 ' RESET OBJECT NUMBERS
	if EXPLORER_PATH.value <> "C:/" Then
	' CHECK IF NOT THE DIRECTORY AT IT IS LIMIT
		EXPLORER_BACK.style.display="BLOCK" 'ACTIVE BACK BUTTON VIA SHOW IT
		EXPLORER_BACK_NOT.style.display="NONE" 'HIDE DISABLED BACK BUTTON
	End If
	For Each EXPLORER_FOLDER in EXPLORER_FOLDERS 'COUNT EACH FOLDER OBJECT
		T = "" 'RESET TMP'
		If Not (((EXPLORER_FOLDER.Attributes And 38) Or _
			(EXPLORER_FOLDER.Attributes And 6)) And _
			(EXPLORER_SHOW_HIDDEN_OBJECTS = 0)) Then
			' CHECK IF FOLDER IS HIDDEN OR SYSTEM FOLDER AND
			' "EXPLORER_SHOW_HIDDEN_OBJECTS" IS ENABLED'
			TEMP = Replace(EXPLORER_FOLDER.Path, "\", "/")
			' REPLACE "\" WITH "/" FOR SPECIAL CHARACTER
			' IN HTML ARGUMENT CONTENT'
			FOLDER_ICON = GET_FOLDER_ICON(EXPLORER_FOLDER.Path)
			T = T & "<DIV CLASS='EXPLORER_ENTITY_HITBOX'>"
			T = T & 	"<DIV ONKEYPRESS='CHECK_ENTER_FOLDER(""" & TEMP & """)'"
			T = T & 		" " & "CLASS='EXPLORER_FOLDER'"
			T = T & 		" " & "TABINDEX='1'"
			T = T & 		" " & _
				"ONDBLCLICK=" & _
				"'javascript:PLAY_SOUND(""POPUPS/NAVIGATION.wav""); " & _
				"VBScript:EXPLORER_OPEN_FOLDER(""" & TEMP & """)'"
			If FOLDER_ICON <> "" Then
				FOLDER_ICON = EXPLORER_FOLDER & "\" & FOLDER_ICON
				FOLDER_ICON = Left(FOLDER_ICON, Len(FOLDER_ICON) - 2)
				T = T & 	" " & "STYLE='BACKGROUND-IMAGE: URL(""" & _
					Replace(FOLDER_ICON, "\", "/") & """);'"
			End If
			T = T & 		" " & "ONFOCUS='VBScript:EXPLORER_UPDATE_FOCUS" & _
				"(""" & EXPLORER_OBJECT_NO & """)'>"
			T = T & 	"<SPAN>" & EXPLORER_FOLDER.Name & "</SPAN>"
			T = T & 	"</DIV>"
			T = T & "</DIV>"
			EXPLORER.innerHTML = EXPLORER.innerHTML & T
			EXPLORER_OBJECT_NO = EXPLORER_OBJECT_NO + 1
		End If
	Next
	For Each EXPLORER_FILE in EXPLORER_FILES ' COUNT EACH FILE OBJECT
		T = "" ' RESET TMP
		If Not (((EXPLORER_FILE.Attributes = 38) Or _
			(EXPLORER_FILE.Attributes = 6)) And _
			(EXPLORER_SHOW_HIDDEN_OBJECTS = 0)) Then
			' CHECK IF FILE IS HIDDEN OR SYSTEM FILE AND
			' "EXPLORER_SHOW_HIDDEN_OBJECTS" IS ENABLED
			TEMP = Replace(EXPLORER_FILE.Path, "\", "/")
			' REPLACE "\" WITH "/" FOR SPECIAL
			' CHARACTER IN HTML ARGUMENT CONTENT
			T = T & "<DIV CLASS='EXPLORER_ENTITY_HITBOX'>"
			T = T & 	"<DIV ONKEYPRESS='CHECK_ENTER_FILE(""" & TEMP & """)'"
			T = T & 		" " & "CLASS='EXPLORER_FILE'"
			T = T & 		" " & "TABINDEX='1'"
			T = T & 		" " & "ONDBLCLICK='VBScript:EXPLORER_OPEN_FILE" & _
				"(""" & TEMP & """)'"
			T = T & 		" " & "FILE_ICON='" & TEMP & "'"
			If LCase(Right(EXPLORER_FILE.Path, 4)) = ".png" Or _
				LCase(Right(EXPLORER_FILE.Path, 4)) = ".jpg" Or _
				LCase(Right(EXPLORER_FILE.Path, 4)) = ".bmp" Then
				T = T & 	" " & _
					"STYLE='BACKGROUND-IMAGE: URL(""" & TEMP & """);'"
			End If
			T = T & 		 " " & "ONFOCUS='VBScript:EXPLORER_UPDATE_FOCUS" & _
				"(""" & EXPLORER_OBJECT_NO & """)'>"
			T = T & 	"<SPAN>" & EXPLORER_FILE.Name & "</SPAN>"
			T = T & 	"</DIV>"
			T = T & "</DIV>"
			EXPLORER.innerHTML = EXPLORER.innerHTML & T
			EXPLORER_OBJECT_NO = EXPLORER_OBJECT_NO + 1
		End If
	Next
End Sub

Sub EXPLORER_OPEN_FILE(PATH)
	PATH = chr(34) & PATH & chr(34)
	SHELL.Run(PATH)
End Sub

Sub EXPLORER_BACK_DIRECTORY()
	Dim LAST_PATH
	Dim BACK_DIR
	Dim EXPLORER_BACK
	Dim EXPLORER_BACK_NOT

	LAST_PATH = InStrRev(EXPLORER_PATH.value, "/")
	BACK_DIR = Left(EXPLORER_PATH.value, LAST_PATH - 1)
	If BACK_DIR = "C:" Then
		BACK_DIR = BACK_DIR & "/"
		Set EXPLORER_BACK = document.getElementById("EXPLORER_BACK")
		Set EXPLORER_BACK_NOT = document.getElementById("EXPLORER_BACK_NOT")
		EXPLORER_BACK.style.display="NONE"
		EXPLORER_BACK_NOT.style.display="BLOCK"
	End If
	EXPLORER_OPEN_FOLDER(BACK_DIR)
End Sub

Sub EXPLORER_CHECK_KEY()
	Dim EXPLORER_TAB_FOR_LOOP_KEYS
	Dim EXPLORER_TAB_FOR_CALCULATE
	Dim EXPLORER_FOCUSED_OBJECT
	Dim EXPLORER_IF_CALCULATOR1
	Dim EXPLORER_IF_CALCULATOR2
	Dim EXPLORER_IF_CALCULATOR3
	Dim EXPLORER_OBJECT_WIDTH
	Dim EXPLORER_TAB_FOR_LOOP
	Dim EXPLORER_REST_OBJECTS
	Dim EXPLORER_SPACE_WIDTH
	Dim EXPLORER_OBJECTS
	Dim EXPLORER_KEY_DELAY

	EXPLORER_KEY_DELAY = 1
	' SOVLE THE KEY INPUT LAG
	EXPLORER_TAB_FOR_LOOP_KEYS = ""
	' READY THE VARIABLE TO INCOMING FOR LOOP
	EXPLORER_TAB_FOR_LOOP = 0
	' READY THE VARIABLE TO INCOMING FOR LOOP
	EXPLORER_SPACE_WIDTH = 4
	' SPACE SIZE BETWEEN OBJECTS
	EXPLORER_OBJECT_WIDTH = 72 + EXPLORER_SPACE_WIDTH
	' OBJECT SIZE ITSELF (72PX) + SPACE SIZE
	EXPLORER_FOCUSED_OBJECT = EXPLORER_INDEX.value
	' GET WHICH OBJECT IS FOCUSED
	EXPLORER_TAB_FOR_CALCULATE = _
		Document.body.offsetWidth \ EXPLORER_OBJECT_WIDTH
	' MAX OBJECT NUMBER IN A LINE' 'USED "\" FOR INTEGER!
	Set EXPLORER_OBJECTS = Document.querySelectorAll(".EXPLORER_ENTITY_HITBOX")
	' GET TOTAL NUMBER OF OBJECTS
	EXPLORER_REST_OBJECTS = _
		CInt(EXPLORER_OBJECTS.length) Mod CInt(EXPLORER_TAB_FOR_CALCULATE)
	' GET THE NUMBER OF LAST FILES
	EXPLORER_IF_CALCULATOR1 = _
		EXPLORER_OBJECTS.length - EXPLORER_TAB_FOR_CALCULATE
	EXPLORER_IF_CALCULATOR2 = EXPLORER_OBJECTS.length - EXPLORER_REST_OBJECTS
	EXPLORER_IF_CALCULATOR3 = EXPLORER_TAB_FOR_CALCULATE + EXPLORER_REST_OBJECTS
	EXPLORER_TAB_FOR_CALCULATE = CInt(EXPLORER_TAB_FOR_CALCULATE)
	EXPLORER_IF_CALCULATOR1    = CInt(EXPLORER_IF_CALCULATOR1)
	EXPLORER_IF_CALCULATOR2    = CInt(EXPLORER_IF_CALCULATOR2)
	EXPLORER_IF_CALCULATOR3    = CInt(EXPLORER_IF_CALCULATOR3)
	EXPLORER_FOCUSED_OBJECT    = CInt(EXPLORER_FOCUSED_OBJECT)
	EXPLORER_REST_OBJECTS      = CInt(EXPLORER_REST_OBJECTS)
	If window.event.keyCode = 27 Then self.close() ' ESC' "CLOSE PROGRAM"
	If window.event.keyCode = 8 Then
		If EXPLORER_PATH.value <> "C:/" Then
			PLAY_SOUND("POPUPS/NAVIGATION.wav")
			EXPLORER_BACK_DIRECTORY() ' BACKSPACE "<--"  GO BACK DIRECTORY
		End If
	End If
	If window.event.keyCode = 39 Then _
		SHELL.SendKeys "{TAB}" '->' 'ONE FOCUS RIGHT
	If window.event.keyCode = 37 Then _
		SHELL.SendKeys "+{TAB}" '<-' 'ONE FOCUST LEFT
	If window.event.keyCode = 38 Then '^' 'ONE FOCUS UP
		If EXPLORER_FOCUSED_OBJECT < EXPLORER_REST_OBJECTS + 1 Then
			Do While EXPLORER_TAB_FOR_LOOP < EXPLORER_REST_OBJECTS
				EXPLORER_TAB_FOR_LOOP_KEYS = _
					EXPLORER_TAB_FOR_LOOP_KEYS + "+{TAB}"
				EXPLORER_TAB_FOR_LOOP = EXPLORER_TAB_FOR_LOOP + 1
			Loop
		Else
			If EXPLORER_FOCUSED_OBJECT < EXPLORER_TAB_FOR_CALCULATE + 1 Then
				Do While EXPLORER_TAB_FOR_LOOP < EXPLORER_IF_CALCULATOR3
					EXPLORER_TAB_FOR_LOOP_KEYS = _
						EXPLORER_TAB_FOR_LOOP_KEYS + "+{TAB}"
					EXPLORER_TAB_FOR_LOOP = EXPLORER_TAB_FOR_LOOP + 1
				Loop
			Else
				Do While EXPLORER_TAB_FOR_LOOP < EXPLORER_TAB_FOR_CALCULATE
					EXPLORER_TAB_FOR_LOOP_KEYS = _
						EXPLORER_TAB_FOR_LOOP_KEYS + "+{TAB}"
					EXPLORER_TAB_FOR_LOOP = EXPLORER_TAB_FOR_LOOP + 1
				Loop
			End IF
		End IF
		SHELL.SendKeys EXPLORER_TAB_FOR_LOOP_KEYS ' SEND ALL KEYS
	End IF
	If window.event.keyCode = 40 Then 'v'
		If EXPLORER_FOCUSED_OBJECT > EXPLORER_IF_CALCULATOR1 Then
			' IF FOCUSED OBJECT AT THE LIMIT
			If EXPLORER_FOCUSED_OBJECT > EXPLORER_IF_CALCULATOR2 Then
				' IF FOCUSED OBJECT IS IN LAST LINE
				Do While EXPLORER_TAB_FOR_LOOP < EXPLORER_REST_OBJECTS
					EXPLORER_TAB_FOR_LOOP_KEYS = _
						EXPLORER_TAB_FOR_LOOP_KEYS + "{TAB}"
					EXPLORER_TAB_FOR_LOOP = EXPLORER_TAB_FOR_LOOP + 1
				Loop
			Else
				Do While EXPLORER_TAB_FOR_LOOP < EXPLORER_IF_CALCULATOR3
					EXPLORER_TAB_FOR_LOOP_KEYS = _
						EXPLORER_TAB_FOR_LOOP_KEYS + "{TAB}"
					EXPLORER_TAB_FOR_LOOP = EXPLORER_TAB_FOR_LOOP + 1
				Loop
			End IF
		Else
			Do While EXPLORER_TAB_FOR_LOOP < EXPLORER_TAB_FOR_CALCULATE
				EXPLORER_TAB_FOR_LOOP_KEYS = _
					EXPLORER_TAB_FOR_LOOP_KEYS + "{TAB}"
				EXPLORER_TAB_FOR_LOOP = EXPLORER_TAB_FOR_LOOP + 1
			Loop
		End IF
		SHELL.SendKeys EXPLORER_TAB_FOR_LOOP_KEYS ' SEND ALL KEYS
	End If
	If window.event.keyCode = 116 Then EXPLORER_OPEN_FOLDER(EXPLORER_PATH.value)
End Sub

Sub CHECK_ENTER_FOLDER(PATH_CEFO)
	If window.event.keyCode = 13 Then
		PLAY_SOUND("POPUPS/NAVIGATION.wav")
		EXPLORER_OPEN_FOLDER(PATH_CEFO)
	End If
End Sub

Sub CHECK_ENTER_FILE(PATH_CEFI)
	If window.event.keyCode = 13 Then
		PLAY_SOUND("POPUPS/NAVIGATION.wav")
		EXPLORER_OPEN_FILE(PATH_CEFI)
	End If
End Sub

Sub EXPLORER_UPDATE_FOCUS(OBJECT_NUMBER)
	EXPLORER_INDEX.value = OBJECT_NUMBER
End Sub

Function SET_WINDOW_POSITION()
	POS_X=window.event.screenX
	POS_Y=window.event.ScreenY
	WINDOW_MOVING=1
End Function

Function WINDOW_IS_MOVING()
	If WINDOW_MOVING = 1 Then
		MOVE_X=0
		MOVE_Y=0
		MOVE_X=window.event.screenX - POS_X
		MOVE_Y=window.event.screenY - POS_Y
		window.moveto(window.screenLeft + MOVE_X), (window.screenTop + MOVE_Y)
		SET_WINDOW_POSITION()
	End if
End Function

Function WINDOW_STOPPED_MOVING()
	WINDOW_MOVING=0
End Function