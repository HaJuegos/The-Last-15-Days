tag @s remove death
tag @s remove banned
tag @s add isLinked

playsound ambient.respawned_ply @a ~~~

particle ha:totem_link_particle ~~1~
particle ha:get_armor_particle ~~1~

gamemode s
effect @s slow_falling 10 100 true

tag @s remove kit