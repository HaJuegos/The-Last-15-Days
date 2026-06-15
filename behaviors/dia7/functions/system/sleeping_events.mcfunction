## Creado o modificado por Ha Juegos. Archivo de uso libre, cualquier modificacion o edicion del mismo, debe ser acreditado. Gracias, cualquier informacion en: https://github.com/HaJuegos/The-Last-15-Days.
## Created or modified by Ha Juegos. Free to use file, any modification or editing of it must be credited. Thank you, any information at: https://github.com/HaJuegos/The-Last-15-Days.

execute as @s[tag=!inBed] at @s run tellraw @a {"rawtext": [{ "translate": "chat.system.player_in_bed", "with": {"rawtext": [{ "selector": "@s" }]} }]}

time add 20

tag @s add inBed