## Creado/Editado por: HaJuegos Cat! & Convex!. Si necesitas mas informacion, hablamos en Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174
## Created/Edited by: HaCatto! & Convex! If you need more information, we talk on Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174

execute as @s[tag=!logroinfernal] run tellraw @a {"rawtext": [{"translate":"achievement.message_relic_infernal","with":{"rawtext": [{"selector":"@s"},{"translate":"item.cnvx:infernal_relic"}]}}]}
execute as @s[tag=!logroinfernal] run playsound ambient.weather.thunder @a
execute as @s[tag=!logroinfernal] run playsound ui.achievement_get @s
tag @s[tag=!logroinfernal] add logroinfernal

effect @s[tag=in_nether] resistance 3 1 true
effect @s[tag=in_nether] strength 3 1 true
effect @s[tag=in_nether] fire_resistance 5 1 true
tag @s[tag=!lo_tiene] add lo_tiene