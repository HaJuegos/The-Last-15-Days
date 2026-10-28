tag @s remove death
tag @s remove banned

playsound ambient.respawned_ply @a ~~~

particle ha:totem_link_particle ~~1~
particle ha:get_armor_particle ~~1~

gamemode s

effect @s slow_falling 10 100 true
effect @s resistance 160 100 true

give @s totem_of_undying