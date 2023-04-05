## Creado/Editado por: HaJuegos Cat! & Convex!. Si necesitas mas informacion, hablamos en Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174
## Created/Edited by: HaCatto! & Convex! If you need more information, we talk on Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174

execute @s[tag=!primercolmillo] ~ ~ ~ tellraw @a {"rawtext": [{"translate":"achievement.message_tusk_hoglin", "with": {"rawtext": [{"selector":"@s"},{"translate":"item.cnvx:hoglin_tusk"}]}}]}
execute @s[tag=!primercolmillo] ~ ~ ~ playsound ambient.weather.thunder @a
execute @s[tag=!primercolmillo] ~ ~ ~ playsound ui.achievement_get @s

tag @s[tag=!primercolmillo] add primercolmillo