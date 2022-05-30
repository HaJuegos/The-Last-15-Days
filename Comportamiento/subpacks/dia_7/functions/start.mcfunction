execute @s[tag=!Kit] ~ ~ ~ replaceitem entity @s slot.weapon.offhand 0 totem
execute @s[tag=!Kit] ~ ~ ~ replaceitem entity @s slot.hotbar 8 golden_carrot 15
execute @s[tag=!Kit] ~ ~ ~ replaceitem entity @s slot.hotbar 7 water_bucket
execute @s[tag=!Kit] ~ ~ ~ scoreboard objectives add ban dummy ban
execute @s[tag=!Kit] ~ ~ ~ scoreboard objectives add SwapInv dummy
execute @s[tag=!Kit] ~ ~ ~ difficulty hard
execute @s[tag=!Kit] ~ ~ ~ gamerule doimmediaterespawn true
execute @s[tag=!Kit] ~ ~ ~ gamerule pvp false