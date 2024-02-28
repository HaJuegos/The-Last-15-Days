## Creado o Editado por: HaJuegosCat! y Convex!. Si editaras o copiaras este archivo, recuerda dejar creditos. Cualquier otra informacion o reporte, en el server de Discord: https://discord.gg/WH9KpNWXUz
## Created or Edited by: HaJuegosCat! & Convex!. If you edit or copy this file, remember to give credit. For any other information or report, visit the Discord server: https://discord.gg/WH9KpNWXUz

execute as @s[hasitem={item=ha:blaze_ignite_shard}] at @s run tag @s add inf1
execute as @s[hasitem={item=ha:magmacube_ignite_shard}] at @s run tag @s add inf2
execute as @s[hasitem={item=ha:piglin_ignite_shard}] at @s run tag @s add inf3
execute as @s[hasitem={item=ha:ghast_ignite_shard}] at @s run tag @s add inf4

scoreboard players add @s infernalShards 1

execute as @s at @s run tellraw @a {"rawtext": [{"translate": "chat.infernal_shard_get", "with": {"rawtext": [{"selector": "@s"},{"score": {"name": "@s","objective": "infernalShards"}}]}}]}
execute as @a at @s run playsound random.levelup @s ~~~ 1.0 2