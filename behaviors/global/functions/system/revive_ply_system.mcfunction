## Creado o modificado por Ha Juegos. Archivo de uso libre, cualquier modificacion o edicion del mismo, debe ser acreditado. Gracias, cualquier informacion en: https://github.com/HaJuegos/The-Last-15-Days.
## Created or modified by Ha Juegos. Free to use file, any modification or editing of it must be credited. Thank you, any information at: https://github.com/HaJuegos/The-Last-15-Days.

tag @s remove death
tag @s remove banned
tag @s add isLinked

playsound ambient.respawned_ply @a ~~~

particle ha:totem_link_particle ~~1~
particle ha:get_armor_particle ~~1~

gamemode s
effect @s slow_falling 10 100 true

tag @s remove kit