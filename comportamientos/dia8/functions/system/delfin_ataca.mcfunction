## Creado/Editado por: HaJuegos Cat! & Convex!. Si necesitas mas informacion, hablamos en Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174
## Created/Edited by: HaCatto! & Convex! If you need more information, we talk on Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174

scoreboard objectives add delfincontador dummy
scoreboard players add @s delfincontador 20

titleraw @s actionbar {"rawtext": [{"translate":"dolphin_attacked_message", "with": {"rawtext": [{"score":{"name":"@s","objective":"delfincontador"}}]}}]}

tag @s remove terminodelfin