## Creado/Editado por: HaJuegos Cat! & Convex!. Si necesitas mas informacion, hablamos en Discord: https://discord.com/users/1065525532197916722 & https://discord.com/users/736761089056047174 o tambien https://discord.com/users/714622708649951272 y https://discord.com/users/948057828495605820
## Created/Edited by: HaCatto! & Convex! If you need more information, we talk on Discord: https://discord.com/users/1065525532197916722 & https://discord.com/users/736761089056047174 or also https://discord.com/users/714622708649951272 y https://discord.com/users/948057828495605820

clear @a netherite_scrap
clear @a ancient_debris
execute @a ~ ~ ~ fill ~5 ~5 ~5 ~-5 ~-5 ~-5 air 0 replace end_portal_frame

execute @a ~ ~ ~ detect ~ ~ ~ deadbush 0 effect @s poison 10 0
execute @a ~ ~ ~ detect ~ ~-1 ~ deadbush 0 effect @s poison 10 0

## Dev rangos
tag "Ha Juegos" add "r:§7§l[§r§6§lDEV§7§l]§r"
tag "llConvex38ll" add "r:§7§l[§r§6§lDEV§r§7§l]§r"
tag "R o y e r 5 5 1" add "r:§7§l[§r§e§lCreador§r§7§l]§r"
tag "BigRoyer" add "r:§7§l[§r§e§lCreador§r§7§l]§r"

## Rangos Especiales o de paga
tag "Dyaerl" add "r:§7§l[§r§a§lDaoLover§r§7§l]§r"
tag "XChitoX3083" add "r:§7§l[§r§c§lDiresito Lover§r§7§l]§r"
tag "Mattols7886" add "r:§7§l[§r§e§lRey grasoso§r§7§l]§r"
tag "taracubayano" add "r:§7§l[§r§b§lThe Last Survivor§r§7§l]§r"
tag "Stazku" add "r:§7§l[§r§e§lMvpBtw§r§7§l]§r"

execute @a[name=!"Ha Juegos",name=!"BigRoyer",name=!"R o y e r 5 5 1",name=!"llConvex38ll",name=!"Dyaerl",name=!"XChitoX3083",name=!"Mattols7886",name=!"taracubayano",name=!"Stazku"] ~ ~ ~ tag @s add "r:§7§l[§4Sobreviviente§7]§r" 
## Ok, puedes retirarlo si quieres, pero aun asi apoya esta caracteristica en Ko-fi y asi no tengas que cambiarlo por cuenta propia en cada dia! Aqui en: https://ko-fi.com/s/06625c8f00 Gracias!

## Anti-Fire Protection
execute @e[type=item,name="§cIgneous fragment of a Ghast§r"] ~~~ tag @s add fireprote
execute @e[type=item,name="§cIgneous fragment of a Magma Cube§r"] ~~~ tag @s add fireprote
execute @e[type=item,name="§cIgneous fragment of a Blaze§r"] ~~~ tag @s add fireprote
execute @e[type=item,name="§cIgneous fragment of a Piglin§r"] ~~~ tag @s add fireprote
execute @e[type=item,name="§4§lInfernal Relic§r"] ~~~ tag @s add fireprote
execute @e[type=item,name="§cFragmento Igneo de un Ghast§r"] ~~~ tag @s add fireprote
execute @e[type=item,name="§cFragmento Igneo de un Magma Cube§r"] ~~~ tag @s add fireprote
execute @e[type=item,name="§cFragmento Igneo de un Blaze§r"] ~~~ tag @s add fireprote
execute @e[type=item,name="§cFragmento Igneo de un Piglin§r"] ~~~ tag @s add fireprote
execute @e[type=item,name="§4§lReliquia Infernal§r"] ~~~ tag @s add fireprote

## Loop Commands Systems

execute @a[hasitem={item=cnvx:infernal_relic,quantity=!0}] ~ ~ ~ function reliquia_system/lo_tiene
execute @a[hasitem={item=cnvx:infernal_relic,quantity=0}] ~ ~ ~ function reliquia_system/no_lo_tiene

execute @a[tag=!completo1,hasitem={item=cnvx:blaze_fragment,quantity=!0}] ~ ~ ~ function achievements/fragment_1
execute @a[tag=!completo2,hasitem={item=cnvx:ghast_fragment,quantity=!0}] ~ ~ ~ function achievements/fragment_2
execute @a[tag=!completo3,hasitem={item=cnvx:magma_fragment,quantity=!0}] ~ ~ ~ function achievements/fragment_3
execute @a[tag=!completo4,hasitem={item=cnvx:piglin_fragment,quantity=!0}] ~ ~ ~ function achievements/fragment_4