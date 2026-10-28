execute as @s[tag=!inBed] at @s run tellraw @a {"rawtext": [{ "translate": "chat.system.player_in_bed", "with": {"rawtext": [{ "selector": "@s" }]} }]}
tag @s[tag=!inBed] remove alertSleep
tag @s[tag=!inBed] remove noSleepingYet

scoreboard players reset @s[tag=!inBed] ha:sleep_count

tag @s[tag=!inBed] add inBed

time add 20