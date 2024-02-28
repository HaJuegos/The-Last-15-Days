## Creado o Editado por: HaJuegosCat! y Convex!. Si editaras o copiaras este archivo, recuerda dejar creditos. Cualquier otra informacion o reporte, en el server de Discord: https://discord.gg/WH9KpNWXUz
## Created or Edited by: HaJuegosCat! & Convex!. If you edit or copy this file, remember to give credit. For any other information or report, visit the Discord server: https://discord.gg/WH9KpNWXUz

scoreboard players random @s randomTotem 0 1

execute as @s[scores={randomTotem=0}] at @s run fill ~4 ~ ~4 ~-4 ~-3 ~-4 emerald_block replace end_stone
execute as @s[scores={randomTotem=0}] at @s run fill ~4 ~ ~4 ~-4 ~-3 ~-4 emerald_block replace obsidian
execute as @s[scores={randomTotem=1}] at @s run fill ~4 ~ ~4 ~-4 ~-3 ~-4 gold_block replace end_stone
execute as @s[scores={randomTotem=1}] at @s run fill ~4 ~ ~4 ~-4 ~-3 ~-4 gold_block replace obsidian

loot spawn ~ ~50 ~ loot "totems"
execute as @a[tag=in_end] at @s run playsound mob.wither.spawn
tellraw @a[tag=in_end] {"rawtext": [{"translate":"chat.spawn_totems"}]}