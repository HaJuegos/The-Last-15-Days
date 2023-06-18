## Creado/Editado por: HaJuegos Cat! & Convex!. Si necesitas mas informacion, hablamos en Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174
## Created/Edited by: HaCatto! & Convex! If you need more information, we talk on Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174

tag @s remove dead
tag @s remove coords
tag @s remove nosound
scoreboard players reset @s isBanned

tellraw @a {"rawtext": [{"translate":"chat.player_revival", "with": {"rawtext": [{"selector":"@s"}]}}]}
playsound mob.zombie.unfect @a
particle minecraft:totem_particle ~~0.5~
particle minecraft:totem_particle ~~0.5~
particle minecraft:totem_particle ~~0.5~
gamemode s @s