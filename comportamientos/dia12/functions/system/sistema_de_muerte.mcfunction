## Creado/Editado por: HaJuegos Cat! & Convex!. Si necesitas mas informacion, hablamos en Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174
## Created/Edited by: HaCatto! & Convex! If you need more information, we talk on Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174

gamemode spectator @s

execute as @s[tag=!dead] run effect @a blindness 10 0
execute as @s[tag=!dead] run effect @a nausea 10 0
execute as @s[tag=!dead] run execute as @r run summon lightning_bolt ~ ~ ~
execute as @s[tag=!dead] run title @a times 10 220 92
execute as @s[tag=!dead] run title @a title §cGame Over?
execute as @s[tag=!dead] run tag @s add nosound
execute as @s[tag=!dead] run playsound ui.dead_sound_player @a[tag=!nosound]
execute as @s[tag=nosound] run playsound ui.disconection_player_dead @s
 
execute as @s[tag=!dead] run tellraw @a {"rawtext": [{"translate":"player_dead_world", "with": {"rawtext":[{"selector":"@s"},{"translate":"resquicio_infernal_key"}]}}]}
 
tag @s[tag=!dead] add dead
 
title @a reset
 
event entity @s ha:start_delay_ban