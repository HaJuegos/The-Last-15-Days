## Este archivo fue creado por ୨୧ 𓂅 𝒄𝒐𝒏𝒗𝒆𝒙 ! ♡#9947 (Discord) y @Ha_Juegos_Cat!, Cualquier reutilizacion o modificacion de este, Por favor dejar creditos originales del creador del codigo y del add-on para no tener problemas!. Si quieres contactarte con el creador de este codigo, Ve a su server de Discord: https://discord.gg/C3ZHdnUVmu y https://discord.gg/9jZHkhu86P
## This file was created by ୨୧ 𓂅 𝒄𝒐𝒏𝒗𝒆𝒙 ! ♡#9947 (Discord) and @Ha_Juegos_Cat!, Any reuse or modification of this, please leave original credits to the creator of the code and add-on to avoid problems. If you want to contact the creator of this code, go to his Discord server: https://discord.gg/C3ZHdnUVmu and https://discord.gg/9jZHkhu86P

execute @s[tag=!primercolmillo] ~ ~ ~ tellraw @a {"rawtext": [{"translate":"achievement.message_tusk_hoglin", "with": {"rawtext": [{"selector":"@s"},{"translate":"item.cnvx:hoglin_tusk"}]}}]}
execute @s[tag=!primercolmillo] ~ ~ ~ playsound ambient.weather.thunder @a
execute @s[tag=!primercolmillo] ~ ~ ~ playsound ui.achievement_get @s

tag @s[tag=!primercolmillo] add primercolmillo