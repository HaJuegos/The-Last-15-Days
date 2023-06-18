## Creado/Editado por: HaJuegos Cat! & Convex!. Si necesitas mas informacion, hablamos en Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174
## Created/Edited by: HaCatto! & Convex! If you need more information, we talk on Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174

scoreboard objectives add isBanned dummy
scoreboard objectives add SwapInv dummy

give @s[tag=!startkit] totem
give @s[tag=!startkit] golden_carrot 15
give @s[tag=!startkit] water_bucket
execute as @s[tag=!startkit] run difficulty hard
execute as @s[tag=!startkit] run gamerule doimmediaterespawn true
execute as @s[tag=!startkit] run gamerule pvp false
execute as @s[tag=!startkit] run gamerule commandblockoutput false
 
tag @s[tag=!startkit] add startkit