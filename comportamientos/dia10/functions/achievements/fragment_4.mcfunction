## Creado/Editado por: HaJuegos Cat! & Convex!. Si necesitas mas informacion, hablamos en Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174
## Created/Edited by: HaCatto! & Convex! If you need more information, we talk on Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174

scoreboard objectives add itemsgets dummy
scoreboard players add @s itemsgets 1
playsound random.levelup @a ~ ~ ~ 900 2

tellraw @a {"rawtext": [{"translate":"achievement.message_fragment_get", "with": {"rawtext": [{"selector":"@s"},{"translate":"fragmento_igneo_key"},{"score":{"name":"@s","objective":"itemsgets"}}]}}]}

tag @s add completo4