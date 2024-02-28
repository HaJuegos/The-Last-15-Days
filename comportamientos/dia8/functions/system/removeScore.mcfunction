## Creado o Editado por: HaJuegosCat! y Convex!. Si editaras o copiaras este archivo, recuerda dejar creditos. Cualquier otra informacion o reporte, en el server de Discord: https://discord.gg/WH9KpNWXUz
## Created or Edited by: HaJuegosCat! & Convex!. If you edit or copy this file, remember to give credit. For any other information or report, visit the Discord server: https://discord.gg/WH9KpNWXUz

scoreboard players remove @s[scores={dolphinTimer=1..}] dolphinTimer 1

execute as @s[scores={dolphinTimer=1..}] at @s run titleraw @s actionbar {"rawtext": [{"translate": "ui.dolphin.alert", "with": {"rawtext": [{"score": {"name": "@s", "objective": "dolphinTimer"}}]}}]}

event entity @s[scores={dolphinTimer=1..},tag=!dolphinDebuff] ha:remove_air_dolphin
event entity @s[scores={dolphinTimer=0},tag=dolphinDebuff] ha:return_air