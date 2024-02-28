## Creado o Editado por: HaJuegosCat! y Convex!. Si editaras o copiaras este archivo, recuerda dejar creditos. Cualquier otra informacion o reporte, en el server de Discord: https://discord.gg/WH9KpNWXUz
## Created or Edited by: HaJuegosCat! & Convex!. If you edit or copy this file, remember to give credit. For any other information or report, visit the Discord server: https://discord.gg/WH9KpNWXUz

execute as @a[hasitem={item=ha:infernal_relic,quantity=!0}] at @s run tag @s add infernalRelic
execute as @a[tag=!getInfernal,hasitem={item=ha:infernal_relic}] at @s run function achievements/infernal_relic
execute as @a[hasitem={item=ha:infernal_relic,quantity=0}] at @s run tag @s remove infernalRelic

execute as @a[tag=!inf1,hasitem={item=ha:blaze_ignite_shard}] at @s run function achievements/infernal_shard
execute as @a[tag=!inf2,hasitem={item=ha:magmacube_ignite_shard}] at @s run function achievements/infernal_shard
execute as @a[tag=!inf3,hasitem={item=ha:piglin_ignite_shard}] at @s run function achievements/infernal_shard
execute as @a[tag=!inf4,hasitem={item=ha:ghast_ignite_shard}] at @s run function achievements/infernal_shard

effect @a[tag=infernalRelic,tag=in_nether] fire_resistance 11 1 true 
effect @a[tag=infernalRelic,tag=in_nether] resistance 11 1 true 
effect @a[tag=infernalRelic,tag=in_nether] strength 11 1 true

## Fire Inmune
execute as @e[tag=!fireOff,type=item,name="§4§lInfernal Relic§r"] at @s run tag @s add fireOff
execute as @e[tag=!fireOff,type=item,name="§4§lReliquia Infernal§r"] at @s run tag @s add fireOff
execute as @e[tag=!fireOff,type=item,name="item.ha:infernal_relic"] at @s run tag @s add fireOff
execute as @e[tag=!fireOff,type=item,name="item.ha:infernal_relic.name"] at @s run tag @s add fireOff

execute as @e[tag=!fireOff,type=item,name="§cFragmento Ígneo del Cubo de Magma§r"] at @s run tag @s add fireOff
execute as @e[tag=!fireOff,type=item,name="§cMagma Cube's Ignite Shard§r"] at @s run tag @s add fireOff
execute as @e[tag=!fireOff,type=item,name="item.ha:magmacube_ignite_shard"] at @s run tag @s add fireOff
execute as @e[tag=!fireOff,type=item,name="item.ha:magmacube_ignite_shard.name"] at @s run tag @s add fireOff

execute as @e[tag=!fireOff,type=item,name="§cFragmento Ígneo del Piglin§r"] at @s run tag @s add fireOff
execute as @e[tag=!fireOff,type=item,name="§cPiglin's Ignite Shard§r"] at @s run tag @s add fireOff
execute as @e[tag=!fireOff,type=item,name="item.ha:piglin_ignite_shard"] at @s run tag @s add fireOff
execute as @e[tag=!fireOff,type=item,name="item.ha:piglin_ignite_shard.name"] at @s run tag @s add fireOff

execute as @e[tag=!fireOff,type=item,name="§cGhast's Ignite Shard§r"] at @s run tag @s add fireOff
execute as @e[tag=!fireOff,type=item,name="§cFragmento Ígneo del Ghast§r"] at @s run tag @s add fireOff
execute as @e[tag=!fireOff,type=item,name="item.ha:ghast_ignite_shard"] at @s run tag @s add fireOff
execute as @e[tag=!fireOff,type=item,name="item.ha:ghast_ignite_shard.name"] at @s run tag @s add fireOff

execute as @e[tag=!fireOff,type=item,name="§cBlaze's Ignite Shard§r"] at @s run tag @s add fireOff
execute as @e[tag=!fireOff,type=item,name="§cFragmento Ígneo del Blaze§r"] at @s run tag @s add fireOff
execute as @e[tag=!fireOff,type=item,name="item.ha:blaze_ignite_shard"] at @s run tag @s add fireOff
execute as @e[tag=!fireOff,type=item,name="item.ha:blaze_ignite_shard.name"] at @s run tag @s add fireOff