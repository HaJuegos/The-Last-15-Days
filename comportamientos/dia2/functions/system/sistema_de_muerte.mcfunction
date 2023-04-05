## Creado/Editado por: HaJuegos Cat! & Convex!. Si necesitas mas informacion, hablamos en Discord: https://discord.com/users/1065525532197916722 & https://discord.com/users/736761089056047174 o tambien https://discord.com/users/714622708649951272 y https://discord.com/users/948057828495605820
## Created/Edited by: HaCatto! & Convex! If you need more information, we talk on Discord: https://discord.com/users/1065525532197916722 & https://discord.com/users/736761089056047174 or also https://discord.com/users/714622708649951272 y https://discord.com/users/948057828495605820
 
gamemode spectator @s
execute @s[tag=!dead] ~ ~ ~ effect @a blindness 10 0
execute @s[tag=!dead] ~ ~ ~ effect @a nausea 10 0
execute @s[tag=!dead] ~ ~ ~ execute @r ~ ~ ~ summon lightning_bolt ~ ~ ~
execute @s[tag=!dead] ~ ~ ~ title @a times 10 220 92
execute @s[tag=!dead] ~ ~ ~ title @a title §cGame Over?
execute @s[tag=!dead] ~ ~ ~ tag @s add nosound
execute @s[tag=!dead] ~ ~ ~ playsound ui.dead_sound_player @a[tag=!nosound]
execute @s[tag=nosound] ~ ~ ~ playsound ui.disconection_player_dead @s
 
execute @s[tag=!dead] ~ ~ ~ tellraw @a {"rawtext": [{"translate":"player_dead_world", "with": {"rawtext":[{"selector":"@s"},{"translate":"resquicio_infernal_key"}]}}]}
 
tag @s[tag=!dead] add dead
 
title @a reset
 
event entity @s ha:start_delay_ban