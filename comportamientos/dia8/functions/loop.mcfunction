## Creado/Editado por: HaJuegos Cat! & Convex!. Si necesitas mas informacion, hablamos en Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174
## Created/Edited by: HaCatto! & Convex! If you need more information, we talk on Discord: https://discord.com/users/714622708649951272 & https://discord.com/users/736761089056047174

## Anti-Fire Protection
execute as @e[type=item,name="§cIgneous fragment of a Ghast§r"] run tag @s add fireprote
execute as @e[type=item,name="§cIgneous fragment of a Magma Cube§r"] run tag @s add fireprote
execute as @e[type=item,name="§cIgneous fragment of a Blaze§r"] run tag @s add fireprote
execute as @e[type=item,name="§cIgneous fragment of a Piglin§r"] run tag @s add fireprote
execute as @e[type=item,name="§4§lInfernal Relic§r"] run tag @s add fireprote
execute as @e[type=item,name="§cFragmento Igneo de un Ghast§r"] run tag @s add fireprote
execute as @e[type=item,name="§cFragmento Igneo de un Magma Cube§r"] run tag @s add fireprote
execute as @e[type=item,name="§cFragmento Igneo de un Blaze§r"] run tag @s add fireprote
execute as @e[type=item,name="§cFragmento Igneo de un Piglin§r"] run tag @s add fireprote
execute as @e[type=item,name="§4§lReliquia Infernal§r"] run tag @s add fireprote

## Loop Commands Systems

execute as @a[hasitem={item=cnvx:infernal_relic,quantity=!0}] run function reliquia_system/lo_tiene
execute as @a[hasitem={item=cnvx:infernal_relic,quantity=0}] run function reliquia_system/no_lo_tiene

execute as @a[tag=!completo1,hasitem={item=cnvx:blaze_fragment,quantity=!0}] run function achievements/fragment_1
execute as @a[tag=!completo2,hasitem={item=cnvx:ghast_fragment,quantity=!0}] run function achievements/fragment_2
execute as @a[tag=!completo3,hasitem={item=cnvx:magma_fragment,quantity=!0}] run function achievements/fragment_3
execute as @a[tag=!completo4,hasitem={item=cnvx:piglin_fragment,quantity=!0}] run function achievements/fragment_4

execute as @a[tag=!primercolmillo,hasitem={item=cnvx:hoglin_tusk,quantity=!0}] run function achievements/tusk_hoglin_obtain

## Loop System

execute as @a at @s run fill ~5 ~5 ~5 ~-5 ~-5 ~-5 air replace end_portal_frame

execute as @a at @s if block ~ ~ ~ deadbush run effect @s poison 10 0
execute as @a at @s if block ~ ~-1 ~ deadbush run effect @s poison 10 0

## Custom Tags
tag "Ha Juegos" add r:dev
tag "llConvex38ll" add r:dev
tag "R o y e r 5 5 1" add r:owner
tag "BigRoyer" add r:owner

tag "XChitoX3083" add r:custom_1
tag "Dyaerl" add r:custom_2
tag "Mattols7886" add r:custom_3
tag "taracubayano" add r:custom_4
tag "Stazku" add r:custom_5
tag "MetWee" add r:custom_6
tag "El Dahp" add r:custom_7
tag "SrLoboMCTuber" add r:custom_8
tag "CopyCat Mc" add r:custom_9
tag "ItsAncientMC" add r:custom_10