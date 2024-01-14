<p align="center">
  <img src="https://cdn.discordapp.com/attachments/997603479822536794/1021663721241718784/pack_icon.png" alt="Addon Icon" width=450>
  <h3 align="center">The Last 15 Days</h3>
  
 <p align="center">
 Una Serie Hardcore creada por RosherRandom en Colaboracion con Convex! y HaJuegosCat. ¿Sobreviviras los 15 Dias?</p>
</p>

<p align="center">
  <a href="https://discord.gg/WH9KpNWXUz"><img src="https://img.shields.io/discord/782053401281429504?style=plastic&color=red&logo=discord&label=Discord%20Server%20Support" alt="Discord Server "/></a>
  <a href="https://ko-fi.com/hajuegos0710"><img src="https://img.shields.io/npm/v/express?url=https://ko-fi.com/hajuegos0710&style=plastic&logo=kofi&label=Donations&color=inactive" alt="HaJuegos Ko-Fi "/></a>
  <a href="https://github.com/HaJuegos/The-Last-15-Days"><img src="https://img.shields.io/github/stars/HaJuegos/The-Last-15-Days?label=GitHub%20Stars&style=plastic&logo=github&color=blueviolet" alt="GitHub Stars "/></a>
</p>
<p align="center">
  <a href="https://twitter.com/TheLast15Days"><img src="https://img.shields.io/twitter/follow/TheLast15Days?style=plastic&color=success&logo=twitter&label=RosherRandom%20Twitter" alt="Royer Twitter "/></a>
  <a href="https://twitter.com/convex__"><img src="https://img.shields.io/twitter/follow/convex__?style=plastic&color=success&logo=twitter&label=Convex!%20Twitter" alt="Convex Twitter"/></a>
  <a href="https://twitter.com/Ha_Juegos"><img src="https://img.shields.io/twitter/follow/Ha_Juegos?style=plastic&color=success&logo=twitter&label=HaJuegos%20Cat!%20Twitter" alt="HaJuegos Twitter"/></a>
</p>

## CREDITOS Y ACLARACIONES

- Este es un Add-on perteneciente a [RosherRandom](https://twitter.com/TheLast15Days) como comision pagada en Colaboracion de desarollo con [HaJuegos Cat!](https://twitter.com/Ha_Juegos), [Convex!](https://twitter.com/convex__) y [Astral302](https://twitter.com/astral302). Si utilizaras o editaras este Add-on, por favor, asegurate de mencionar al menos a los creadores de este add-on, si tienes alguna inconveniencia, pregunta o problemas con este add-on, reportalo en el Server de Discord dedicado a los Add-ons: https://discord.gg/WH9KpNWXUz

## LINKS DE DESCARGAS
### Nota: Estos links pueden estar acortados con paginas de publicidad, no me hago cargo de descargas o redirecciones malisiosas.

- **Link para descargar TODO el contenido:** (Aun no disponible)

- **Link para descargar solo el Behavior/Comportamiento:** (Aun no disponible)
 
- **Link para descargar solo el Resource/Texturas:** (Aun no disponible)

- **Link para descargar solo el Mapa:** (Aun no disponible)

## MINIGUIA DE USO

- **El Add-on solo soporta la version de Minecraft Bedrock 1.20.50/1/2. Cualquier version inferior o superior a futuro, puede que no funcione correctamente.**
- **Este Add-on utilizar Scipts, asi que no esta en soporte con Aternos.**
- Toda instalacion y configuracion del Add-on es automatico.
- Si descargaste el Mundo PreConfigurado y no sabes que hacer con el, mira esta imagen tutorial: https://media.discordapp.net/attachments/964653057390546954/997570733473550536/exmple.png
- Para revivir a algun Jugador, debes hacer este proceso:
>	- Entra en los archivos del Add-on.
>	- Abre la carpeta llamada "Scripts", en esta carpeta, abre el Archivo llamado "main.js".
>	- Al abrir el archivo, busca estas palabras: "const timerBan = true;".
>	- Si lo encontraste, cambia el "true" a "false" y luego en Minecraft, pon el comando: "/reload". (En caso de que sea un servidor, entonces en la consola)
>   - Dile al Jugador Muerto que entre nuevamente al mundo/servidor.
>	- Ejecuta este comando al Jugador Muerto: /execute as "nombre" at @s run function revivir.
>	- Cuando ya hayas hecho eso, regresa a los archivos del add-on, al archivo "main.js" y cambia nuevamente el valor de "true" a "false" y pon nuevamente el comando "/reload".

## OPCIONES EXPERIMENTALES NECESARIAS
- _El Add-on requiere funciones experimentales para que funcione correctamente, procura tenerlos activados en el mundo antes de poner el add-on._

![new1](https://cdn.discordapp.com/attachments/1093209319606071417/1195898870706745384/image.png)
![new2](https://cdn.discordapp.com/attachments/1093209319606071417/1195898870408958003/image.png)

![old1](https://cdn.discordapp.com/attachments/1093209319606071417/1195898870153101452/image.png)
![old2](https://cdn.discordapp.com/attachments/1093209319606071417/1195898869897244743/image.png)

## COMO PONER ADD-ONS EN SERVIDORES

- **En este tutorial te enseñare como poner un add-on, manualmente, en un servidor dedicado:** https://github.com/HaJuegos/The-Games-Store/tree/main/Betas/como%20instalar%20un%20add-on%20en%20servers

## LISTA DE CAMBIOS
```txt
The Last 15 Days By RosherRandom | Colab entre HaJuegosCat! y Convex! | Version Actual: 0.0.8.

**Cualquier bug o algo que creas que no esta bien en el add-on, reportarlo en el servidor de Discord dedicado para los Add-on's de Ha Juegos. Link del Discord: https://discord.gg/WH9KpNWXUz

-----------------------------------------------------------------

Lista de Cambios:

• Dia 0:
- El mundo esta en Modo Hardcore, pero con la diferencia de que si mueres, eres baneado del server permanente.
- Cualquier Jugador al Morir, activara el "Resquicio Infernal".
	- Resquicio Infernal:
		- Al activarse, dara Ceguera y Nausea por 10 segundos.
		- Generar un Rayo a un Jugador aleatorio del Juego.
		
- Al dormir, en vez de que la noche pase instantaneamente, se pasara mucho mas rapido.
- Los Jugadores tienen el rango llamado "Sobreviviente" y es visible en el nombre y en el chat.
- Cualquier Jugador que Utilize un Totem de la Inmortalidad, aparecera en el chat.
- Se agrega una nueva mecanica, llamada "Items Rapidos":
	- Items Rapidos:
		- Esta caracteriztica consiste en que cuando usas un Totem de la Inmortalidad o un Escudo con tu tecla o boton de interaccion, se pondra en el slot de la segunda mano.
		
- Se quito la visibilidad de la semilla del mundo.
- Apartir de este Dia, se indicara el numero de Dias actuales.
- Ahora la vida de los Jugadores es visible en su nombre.
- La generacion de Diamantes fue modificada para que apareciera mas frecuentemente.
- Los Jugadores nuevos reciben un Kit especial para su supervivencia:
	- 1 totem de la inmortalidad.
	- 15 Zanahorias de oro.
	- 1 Cubeta de agua.
	
- Por el momento, los portales del Nether y del End, estan bloqueados.
- Ahora, en todos los cofres, hay una posibilidad alta de encontrar:
	- Libro encantado con Reparacion y Irrompibilidad III. (90% de Posibilidad)
	
- Ahora los Aldeanos dejaron el trabajo de libreros, permanente.
- Ahora los Aldeanos son mobs neutros.

Att: HaJuegos Cat!
```
