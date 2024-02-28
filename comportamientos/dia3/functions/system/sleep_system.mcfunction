## Creado o Editado por: HaJuegosCat! y Convex!. Si editaras o copiaras este archivo, recuerda dejar creditos. Cualquier otra informacion o reporte, en el server de Discord: https://discord.gg/WH9KpNWXUz
## Created or Edited by: HaJuegosCat! & Convex!. If you edit or copy this file, remember to give credit. For any other information or report, visit the Discord server: https://discord.gg/WH9KpNWXUz

time add 90
weather clear

execute as @s[tag=!sleep] at @s run tellraw @a {"rawtext": [{"translate": "chat.sleeping", "with": {"rawtext": [{"selector": "@s"}]}}]}
tag @s[tag=!sleep] add sleep