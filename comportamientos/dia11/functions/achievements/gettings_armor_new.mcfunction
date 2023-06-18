## Creado/Editado por: HaJuegos Cat! & Convex!. Si necesitas mas informacion, hablamos en Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174
## Created/Edited by: HaCatto! & Convex! If you need more information, we talk on Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174

scoreboard objectives add armorfull dummy

execute as @s[tag=!casco,hasitem={item=ha:sneaky_astroner_helmet,location=slot.armor.head}] run tellraw @a {"rawtext": [{"translate":"achievement_message.helmet_sneaky_get", "with": {"rawtext": [{"selector":"@s"},{"translate":"item.ha:sneaky_astroner_helmet"}]}}]}

execute as @s[tag=!pechera,hasitem={item=ha:sneaky_astroner_chestplate,location=slot.armor.chest}] run tellraw @a {"rawtext": [{"translate":"achievement_message.chestsplate_sneaky_get", "with": {"rawtext": [{"selector":"@s"},{"translate":"item.ha:sneaky_astroner_chestplate"}]}}]}

execute as @s[tag=!pantalones,hasitem={item=ha:sneaky_astroner_leggings,location=slot.armor.legs}] run tellraw @a {"rawtext": [{"translate":"achievement_message.leggings_sneaky_get", "with": {"rawtext": [{"selector":"@s"},{"translate":"item.ha:sneaky_astroner_leggings"}]}}]}

execute as @s[tag=!botas,hasitem={item=ha:sneaky_astroner_boots,location=slot.armor.feet}] run tellraw @a {"rawtext": [{"translate":"achievement_message.boots_sneaky_get", "with": {"rawtext": [{"selector":"@s"},{"translate":"item.ha:sneaky_astroner_boots"}]}}]}

execute as @s[tag=!casco,hasitem={item=ha:sneaky_astroner_helmet,location=slot.armor.head}] run playsound random.levelup @a ~~~ 900 2

execute as @s[tag=!pechera,hasitem={item=ha:sneaky_astroner_chestplate,location=slot.armor.chest}] run playsound random.levelup @a ~~~ 900 2

execute as @s[tag=!pantalones,hasitem={item=ha:sneaky_astroner_leggings,location=slot.armor.legs}] run playsound random.levelup @a ~~~ 900 2

execute as @s[tag=!botas,hasitem={item=ha:sneaky_astroner_boots,location=slot.armor.feet}] run playsound random.levelup @a ~~~ 900 2

execute as @s[tag=!casco,hasitem={item=ha:sneaky_astroner_helmet,location=slot.armor.head}] run tag @s add casco

execute as @s[tag=!pechera,hasitem={item=ha:sneaky_astroner_chestplate,location=slot.armor.chest}] run tag @s add pechera

execute as @s[tag=!pantalones,hasitem={item=ha:sneaky_astroner_leggings,location=slot.armor.legs}] run tag @s add pantalones

execute as @s[tag=!botas,hasitem={item=ha:sneaky_astroner_boots,location=slot.armor.feet}] run tag @s add botas

execute as @s[tag=!fullsneaky,scores={armorfull=1}] run tellraw @a {"rawtext": [{"translate":"achievement_message.all_sneaky_armor", "with": {"rawtext": [{"selector":"@s"},{"translate":"sneaky_armor_key"}]}}]}

execute as @s[tag=!fullsneaky,scores={armorfull=1}] run playsound ambient.weather.thunder @a
execute as @s[tag=!fullsneaky,scores={armorfull=1}] run playsound ui.achievement_get @s

execute as @s[tag=!fullsneaky,scores={armorfull=1}] run tag @s add fullsneaky