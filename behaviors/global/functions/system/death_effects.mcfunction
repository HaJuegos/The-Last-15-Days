## Creado o modificado por Ha Juegos. Archivo de uso libre, cualquier modificacion o edicion del mismo, debe ser acreditado. Gracias, cualquier informacion en: https://github.com/HaJuegos/The-Last-15-Days.
## Created or modified by Ha Juegos. Free to use file, any modification or editing of it must be credited. Thank you, any information at: https://github.com/HaJuegos/The-Last-15-Days.

tag @s add death

gamemode spectator

effect @a nausea 10 100 true
effect @a blindness 10 100 true
execute as @r[tag=!death] at @s run summon lightning_bolt

titleraw @a times 10 220 92
titleraw @a title {"rawtext": [{"translate": "ui.game_over_title"}]}

## Sonido que solo afecta al jugador que murio
playsound ui.player.death_sound @s

## Sonido general cuando muere
execute as @a[tag=!death] at @s run playsound ui.player.death_sound_global

execute as @s at @s run tellraw @a {"rawtext": [{"translate": "chat.system.resquicio_start", "with": {"rawtext": [{"selector": "@s"}]}}]}

title @a reset