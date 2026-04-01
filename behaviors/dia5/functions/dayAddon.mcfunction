## Creado o modificado por Ha Juegos. Archivo de uso libre, cualquier modificacion o edicion del mismo, debe ser acreditado. Gracias, cualquier informacion en: https://github.com/HaJuegos/The-Last-15-Days.
## Created or modified by Ha Juegos. Free to use file, any modification or editing of it must be credited. Thank you, any information at: https://github.com/HaJuegos/The-Last-15-Days.

scoreboard players set @s dayAddon 5

tellraw @s {"rawtext": [{ "translate": "chat.system.day_addon", "with": {"rawtext": [{ "score": { "name":"*", "objective": "dayAddon" } }]} }]}
playsound random.screenshot @s

titleraw @s times 5 25 10
execute as @s[tag=!"intro"] at @s run titleraw @s title {"rawtext": [{ "translate": "ui.fist_intro.title" }]}
execute as @s[tag=!"intro"] at @s run titleraw @s subtitle {"rawtext": [{ "translate": "ui.fist_intro.subtitle" }]}
execute as @s[tag=!"intro"] at @s run playsound ui.login_first_time
titleraw @s reset

tag @s add intro