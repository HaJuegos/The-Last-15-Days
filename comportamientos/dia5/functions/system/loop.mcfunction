## Este archivo fue creado por ୨୧ 𓂅 𝒄𝒐𝒏𝒗𝒆𝒙 ! ♡#9947 (Discord) y @Ha_Juegos_Cat!, Cualquier reutilizacion o modificacion de este, Por favor dejar creditos originales del creador del codigo y del add-on para no tener problemas!. Si quieres contactarte con el creador de este codigo, Ve a su server de Discord: https://discord.gg/C3ZHdnUVmu y https://discord.gg/9jZHkhu86P
## This file was created by ୨୧ 𓂅 𝒄𝒐𝒏𝒗𝒆𝒙 ! ♡#9947 (Discord) and @Ha_Juegos_Cat!, Any reuse or modification of this, please leave original credits to the creator of the code and add-on to avoid problems. If you want to contact the creator of this code, go to his Discord server: https://discord.gg/C3ZHdnUVmu and https://discord.gg/9jZHkhu86P

clear @a netherite_scrap
clear @a ancient_debris
execute @a ~ ~ ~ fill ~5 ~5 ~5 ~-5 ~-5 ~-5 air 0 replace end_portal_frame

execute @a ~ ~ ~ detect ~ ~ ~ deadbush 0 effect @s poison 10 0
execute @a ~ ~ ~ detect ~ ~-1 ~ deadbush 0 effect @s poison 10 0

## Dev rangos
tag "Ha Juegos" add "r:§6§lDEV§r"
tag "llConvex38ll" add "r:§6§lDEV§r"
tag "R o y e r 5 5 1" add "r:§e§lCreador§r"
tag "BigRoyer" add "r:§e§lCreador§r"

## Rangos Especiales o de paga
tag "Dyaerl" add "r:§a§lDaoLover§r"
tag "XChitoX3083" add "r:§c§lDiresito Lover§r"
tag "Mattols7886" add "r:§e§lRey grasoso§r"
tag "taracubayano" add "r:§b§lThe Last Survivor§r"
tag "Stazku" add "r:§e§lMvpBtw§r"

execute @a[name=!"Ha Juegos",name=!"BigRoyer",name=!"R o y e r 5 5 1",name=!"llConvex38ll",name=!"Dyaerl",name=!"XChitoX3083",name=!"Mattols7886",name=!"taracubayano",name=!"Stazku"] ~ ~ ~ tag @s add "r:§4§lSobreviviente§r" 
## Ok, puedes retirarlo si quieres, pero aun asi apoya esta caracteristica en Ko-fi y asi no tengas que cambiarlo por cuenta propia en cada dia! Aqui en: https://ko-fi.com/s/06625c8f00 Gracias!

## Loop Commands Systems

execute @a[hasitem={item=cnvx:infernal_relic,quantity=!0}] ~ ~ ~ function reliquia_system/lo_tiene
execute @a[hasitem={item=cnvx:infernal_relic,quantity=0}] ~ ~ ~ function reliquia_system/no_lo_tiene

execute @a[tag=!completo1,hasitem={item=cnvx:blaze_fragment,quantity=!0}] ~ ~ ~ function achievements/fragment_1
execute @a[tag=!completo2,hasitem={item=cnvx:ghast_fragment,quantity=!0}] ~ ~ ~ function achievements/fragment_2
execute @a[tag=!completo3,hasitem={item=cnvx:magma_fragment,quantity=!0}] ~ ~ ~ function achievements/fragment_3
execute @a[tag=!completo4,hasitem={item=cnvx:piglin_fragment,quantity=!0}] ~ ~ ~ function achievements/fragment_4