## Creado o Editado por: HaJuegosCat! y Convex!. Si editaras o copiaras este archivo, recuerda dejar creditos. Cualquier otra informacion o reporte, en el server de Discord: https://discord.gg/WH9KpNWXUz
## Created or Edited by: HaJuegosCat! & Convex!. If you edit or copy this file, remember to give credit. For any other information or report, visit the Discord server: https://discord.gg/WH9KpNWXUz

tellraw @a {"rawtext": [{"translate": "chat.player_revival", "with": {"rawtext": [{"selector": "@s"}]}}]}

tag @s remove dead
tag @s remove banned
tag @s remove kit

particle minecraft:totem_particle ~~~
particle minecraft:totem_particle ~~1~
particle minecraft:totem_particle ~~-1~

gamemode s

execute as @a at @s run playsound mob.zombie.unfect

scriptevent ha:tp_revive