## Creado o Editado por: HaJuegosCat! y Convex!. Si editaras o copiaras este archivo, recuerda dejar creditos. Cualquier otra informacion o reporte, en el server de Discord: https://discord.gg/WH9KpNWXUz
## Created or Edited by: HaJuegosCat! & Convex!. If you edit or copy this file, remember to give credit. For any other information or report, visit the Discord server: https://discord.gg/WH9KpNWXUz

execute as @a at @s if block ~~~ deadbush run effect @s poison 10 0

clear @a netherite_ingot
clear @a netherite_scrap
clear @a netherite_block
clear @a ancient_debris

execute as @a at @s run fill ~2 ~2 ~-2 ~-2 ~-2 ~2 air replace portal
execute as @a at @s run fill ~5 ~5 ~-5 ~-5 ~-5 ~5 air replace end_portal
execute as @a at @s run fill ~5 ~5 ~-5 ~-5 ~-5 ~5 air replace end_portal_frame

execute as @a[m=s] run tag @s add survival
execute as @a[m=a] run tag @s add survival

execute as @a[m=c] run tag @s remove survival
execute as @a[m=spectator] run tag @s remove survival