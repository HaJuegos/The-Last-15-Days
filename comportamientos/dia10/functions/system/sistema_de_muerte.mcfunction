## Este archivo fue creado por ୨୧ 𓂅 𝒄𝒐𝒏𝒗𝒆𝒙 ! ♡#9947 (Discord) y @Ha_Juegos_Cat!, Cualquier reutilizacion o modificacion de este, Por favor dejar creditos originales del creador del codigo y del add-on para no tener problemas!. Si quieres contactarte con el creador de este codigo, Ve a su server de Discord: https://discord.gg/C3ZHdnUVmu y https://discord.gg/9jZHkhu86P
## This file was created by ୨୧ 𓂅 𝒄𝒐𝒏𝒗𝒆𝒙 ! ♡#9947 (Discord) and @Ha_Juegos_Cat!, Any reuse or modification of this, please leave original credits to the creator of the code and add-on to avoid problems. If you want to contact the creator of this code, go to his Discord server: https://discord.gg/C3ZHdnUVmu and https://discord.gg/9jZHkhu86P
 
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