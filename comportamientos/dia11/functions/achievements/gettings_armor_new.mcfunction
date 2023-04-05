## Creado/Editado por: HaJuegos Cat! & Convex!. Si necesitas mas informacion, hablamos en Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174
## Created/Edited by: HaCatto! & Convex! If you need more information, we talk on Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174

scoreboard objectives add armorfull dummy

execute @s[tag=!casco,hasitem={item=ha:sneaky_astroner_helmet,location=slot.armor.head}] ~ ~ ~ tellraw @a {"rawtext": [{"translate":"achievement_message.helmet_sneaky_get", "with": {"rawtext": [{"selector":"@s"},{"translate":"item.ha:sneaky_astroner_helmet"}]}}]}

execute @s[tag=!pechera,hasitem={item=ha:sneaky_astroner_chestplate,location=slot.armor.chest}] ~ ~ ~ tellraw @a {"rawtext": [{"translate":"achievement_message.chestsplate_sneaky_get", "with": {"rawtext": [{"selector":"@s"},{"translate":"item.ha:sneaky_astroner_chestplate"}]}}]}

execute @s[tag=!pantalones,hasitem={item=ha:sneaky_astroner_leggings,location=slot.armor.legs}] ~ ~ ~ tellraw @a {"rawtext": [{"translate":"achievement_message.leggings_sneaky_get", "with": {"rawtext": [{"selector":"@s"},{"translate":"item.ha:sneaky_astroner_leggings"}]}}]}

execute @s[tag=!botas,hasitem={item=ha:sneaky_astroner_boots,location=slot.armor.feet}] ~ ~ ~ tellraw @a {"rawtext": [{"translate":"achievement_message.boots_sneaky_get", "with": {"rawtext": [{"selector":"@s"},{"translate":"item.ha:sneaky_astroner_boots"}]}}]}

execute @s[tag=!casco,hasitem={item=ha:sneaky_astroner_helmet,location=slot.armor.head}] ~ ~ ~ playsound random.levelup @a ~ ~ ~ 900 2

execute @s[tag=!pechera,hasitem={item=ha:sneaky_astroner_chestplate,location=slot.armor.chest}] ~ ~ ~ playsound random.levelup @a ~ ~ ~ 900 2

execute @s[tag=!pantalones,hasitem={item=ha:sneaky_astroner_leggings,location=slot.armor.legs}] ~ ~ ~ playsound random.levelup @a ~ ~ ~ 900 2

execute @s[tag=!botas,hasitem={item=ha:sneaky_astroner_boots,location=slot.armor.feet}] ~ ~ ~ playsound random.levelup @a ~ ~ ~ 900 2

execute @s[tag=!casco,hasitem={item=ha:sneaky_astroner_helmet,location=slot.armor.head}] ~ ~ ~ tag @s add casco

execute @s[tag=!pechera,hasitem={item=ha:sneaky_astroner_chestplate,location=slot.armor.chest}] ~ ~ ~ tag @s add pechera

execute @s[tag=!pantalones,hasitem={item=ha:sneaky_astroner_leggings,location=slot.armor.legs}] ~ ~ ~ tag @s add pantalones

execute @s[tag=!botas,hasitem={item=ha:sneaky_astroner_boots,location=slot.armor.feet}] ~ ~ ~ tag @s add botas

execute @s[tag=!fullsneaky,scores={armorfull=1}] ~ ~ ~ tellraw @a {"rawtext": [{"translate":"achievement_message.all_sneaky_armor", "with": {"rawtext": [{"selector":"@s"},{"translate":"sneaky_armor_key"}]}}]}

execute @s[tag=!fullsneaky,scores={armorfull=1}] ~ ~ ~ playsound ambient.weather.thunder @a
execute @s[tag=!fullsneaky,scores={armorfull=1}] ~ ~ ~ playsound ui.achievement_get @s

execute @s[tag=!fullsneaky,scores={armorfull=1}] ~ ~ ~ tag @s add fullsneaky