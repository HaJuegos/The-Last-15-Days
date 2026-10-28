scoreboard players set @s dayAddon 0

tellraw @s {"rawtext": [{ "translate": "chat.system.day_addon", "with": {"rawtext": [{ "score": { "name":"*", "objective": "dayAddon" } }]} }]}
playsound random.screenshot @s

titleraw @s times 5 25 10
execute as @s[tag=!"intro"] at @s run titleraw @s title {"rawtext": [{ "translate": "ui.fist_intro.title" }]}
execute as @s[tag=!"intro"] at @s run titleraw @s subtitle {"rawtext": [{ "translate": "ui.fist_intro.subtitle" }]}
execute as @s[tag=!"intro"] at @s run playsound ui.login_first_time
titleraw @s reset

tag @s add intro

scriptevent ha:chance_backrooms
scriptevent ha:pickup_change