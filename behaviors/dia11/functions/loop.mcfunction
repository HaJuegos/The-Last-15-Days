## Creado o modificado por Ha Juegos. Archivo de uso libre, cualquier modificacion o edicion del mismo, debe ser acreditado. Gracias, cualquier informacion en: https://github.com/HaJuegos/The-Last-15-Days.
## Created or modified by Ha Juegos. Free to use file, any modification or editing of it must be credited. Thank you, any information at: https://github.com/HaJuegos/The-Last-15-Days.

scoreboard objectives add dayAddon dummy dayAddon

clear @a ominous_bottle

tag @a[m=s] add isSurvival
tag @a[m=a] add isSurvival

tag @a[m=spectator] remove isSurvival
tag @a[m=c] remove isSurvival