## Creado o Editado por: HaJuegosCat! y Convex!. Si editaras o copiaras este archivo, recuerda dejar creditos. Cualquier otra informacion o reporte, en el server de Discord: https://discord.gg/WH9KpNWXUz
## Created or Edited by: HaJuegosCat! & Convex!. If you edit or copy this file, remember to give credit. For any other information or report, visit the Discord server: https://discord.gg/WH9KpNWXUz

particle minecraft:totem_particle ~~~
particle minecraft:totem_particle ~~1~
particle minecraft:totem_particle ~~-1~

playsound random.totem @a ~~~

event entity @s minecraft:gain_bad_omen
damage @s 2 contact
execute as @s[tag=!summoner] at @s run tellraw @a {"rawtext": [{"translate": "chat.use_summoner_totem", "with": {"rawtext": [{"selector": "@s"}]}}]}
replaceitem entity @s slot.weapon.mainhand 1 air
tag @s add summoner