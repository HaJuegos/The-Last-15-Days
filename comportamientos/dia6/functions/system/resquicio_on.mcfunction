## Creado o Editado por: HaJuegosCat! y Convex!. Si editaras o copiaras este archivo, recuerda dejar creditos. Cualquier otra informacion o reporte, en el server de Discord: https://discord.gg/WH9KpNWXUz
## Created or Edited by: HaJuegosCat! & Convex!. If you edit or copy this file, remember to give credit. For any other information or report, visit the Discord server: https://discord.gg/WH9KpNWXUz

gamemode spectator
tag @s add dead

titleraw @a times 10 220 94
titleraw @a title {"rawtext": [{"translate": "ui.death_title"}]}
titleraw @a reset
tellraw @a {"rawtext": [{"translate": "chat.dead_player", "with": {"rawtext": [{"selector": "@s"}]}}]}

execute as @r[tag=!dead,tag=survival] at @s run summon lightning_bolt
execute as @a[tag=!dead] at @s run effect @s blindness 10 100
execute as @a[tag=!dead] at @s run effect @s nausea 10 100

execute as @a[tag=!dead] at @s run playsound ui.player_death
playsound ui.player_death_variant

scriptevent ha:resquicio_timer