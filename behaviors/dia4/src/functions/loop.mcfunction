scoreboard objectives add dayAddon dummy dayAddon

execute as @a[m=a,tag=!inSurvival] at @s run tag @s add inSurvival
execute as @a[m=s,tag=!inSurvival] at @s run tag @s add inSurvival

execute as @a[m=c,tag=inSurvival] at @s run tag @s remove inSurvival
execute as @a[m=spectator,tag=inSurvival] at @s run tag @s remove inSurvival

execute as @a at @s run fill ~5 ~5 ~-5 ~-5 ~-5 ~5 air replace portal
execute as @a at @s run fill ~5 ~5 ~-5 ~-5 ~-5 ~5 air replace end_portal

clear @a ominous_bottle
clear @a netherite_ingot
clear @a netherite_block
clear @a netherite_scrap