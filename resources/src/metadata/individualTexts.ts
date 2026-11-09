import { MetadataGeneratorManager } from "../../utils/MetadataGenerator";

export const TextsDef = new MetadataGeneratorManager([
    // Other Texts
    {
        idData: "Other Texts",
        typeData: "text",
        texts: {
            spanish: {
                "bt.bg.splash.potion": "Poción de salpicadura",
                "bt.bg.lingering.potion": "Poción de efecto prolongado",
                "bt.bg.extended.potion": "Poción de efecto prolongado",
                "bt.bg.level_2.potion": "Poción de nivel II",
                "bt.bg.effect.potion": "Efecto de poción"
            },
            english: {
                "bt.bg.splash.potion": "Splash Potion",
                "bt.bg.lingering.potion": "Lingering Potion",
                "bt.bg.extended.potion": "Extended Potion",
                "bt.bg.level_2.potion": "Level II Potion",
                "bt.bg.effect.potion": "Potion Effect"
            }
        }
    },

    // Socrates Bullshit
    {
        idData: "Socrates Bullshits",
        typeData: "text",
        texts: {
            spanish: {
                "dialogue.socrates.bullshit1": "Si eres lo que comes, ¿qué eres si te comes una Manzana Dorada Encantada pero igual te caes al vacío en Hardcore? Solo un fantasma muy brillante y costoso, amigo mío.",
                "dialogue.socrates.bullshit2": "Si se supone que dormir restaura tu energía y sana tu alma, ¿qué eres si intentas dormir en el Nether? Un espectáculo de fuegos artificiales con un final bastante trágico, supongo.",
                "dialogue.socrates.bullshit3": "Si las herramientas definen al constructor, ¿qué eres si guardas tu primer pico de madera hasta llegar al Dragón del End? ¿Un verdadero visionario, o solo un tipo que realmente odia la eficiencia?",
                "dialogue.socrates.bullshit4": "Si la muerte en TL15D es el final definitivo, ¿qué eres si mueres sosteniendo un Tótem de Inmortalidad? ¿Un tramposo del destino, o solo un tonto retrasando la inevitable explosión de un Creeper?"
            },
            english: {
                "dialogue.socrates.bullshit1": "If you are what you eat, what are you if you eat an Enchanted Golden Apple but still fall into the void in Hardcore? Just a very shiny, expensive ghost, my friend.",
                "dialogue.socrates.bullshit2": "If sleeping is supposed to restore your energy and heal your soul, what are you if you try to sleep in the Nether? A fireworks show with a rather tragic ending, I suppose.",
                "dialogue.socrates.bullshit3": "If tools define the builder, what are you if you keep your very first wooden pickaxe all the way to the Ender Dragon? A true visionary, or just a guy who really hates efficiency?",
                "dialogue.socrates.bullshit4": "If death in TL15D is the ultimate end, what are you if you die holding a Totem of Undying? A cheater of fate, or just a fool delaying the inevitable Creeper explosion?"
            }
        }
    },

    // Nurse Dialogues
    {
        idData: "Nurse Dialogues",
        typeData: "text",
        texts: {
            spanish: {
                "dialogue.nurse.regenerated": "§7>> Gracias, ten lo que buscas. Regresa después si necesitas mi ayuda.",
                "dialogue.nurse.error_regenerated": "§7>> Primero dame un diamante para poderte dar una mejora si lo necesitas. ¡Te espero!",

                "interact.btn.nurse": "Regenerar tu vida por 1 diamante."
            },
            english: {
                "dialogue.nurse.regenerated": "§7>> Thanks, here's what you're looking for. Come back later if you need my help.",
                "dialogue.nurse.error_regenerated": "§7>> First, give me a diamond so I can give you an upgrade if you need it. I'll be waiting for you!",

                "interact.btn.nurse": "Restore your life for 1 diamond."
            }
        }
    },

    // RoyerBotNPC Dialogues
    {
        idData: "RoyerBotNPC Dialogues",
        typeData: "text",
        texts: {
            spanish: {
                "dialogue.royerbot.intro_txt": "¡Hola! Tengo algo importante que decirte. ¿Quieres escuchar mis relatos?",
                "dialogue.royerbot.dia0.txt": "Bienvenido a TL15D, un add-on y servidor bastante desafiante, pensado para la gente que quiere enfrentarse a retos increíbles. ¡Recuerda que los cambios son diarios, así que cuida tu espalda!",
                "dialogue.royerbot.dia1.txt": "¿Un nuevo día para explorar, eh? Qué refrescante es poder respirar de momento. Lamento que te hayan limitado la exploración.",
                "dialogue.royerbot.dia2.txt": "Esos zorros son demasiado molestos, ¿no crees? Ten mucho cuidado cuando estés explorando por el mundo. Y también al minar.",
                "dialogue.royerbot.dia3.txt": "No subestimes las manzanas de hierro, realmente te serán de mucha utilidad aunque no lo creas. Mucho cuidado por el mundo, amigo mío.",
                "dialogue.royerbot.dia4.txt": "Las raids están peligrosas últimamente, ten mucho cuidado si decides tomar la iniciativa y enfrentarte a una tú solo.",
                "dialogue.royerbot.dia5.txt": "Los Wither son el mob más difícil de la versión de Bedrock. ¿Qué te parece la mejora que les he implementado? ¿Te gusta? ¿Cómo que no? Entonces ya no te daré su corona.",
                "dialogue.royerbot.dia6.txt": "¿Conoces a un tal \"Sócrates\"? No le digas que me has visto. Me cae fatal. La otra vez vino con sus llamas a ofrecerme basura. Solo me fueron útiles sus perlas.",
                "dialogue.royerbot.dia7.txt": "Tengo una Polly de mascota; es muy bonita, me agrada mucho la verdad. Son el mejor mob que hay, pero ojo cuando sean lastimadas por una vaca, que después no hay quien las detenga.",
                "dialogue.royerbot.dia8.txt": "No subestimes el Soul Link, realmente es de mucha ayuda tener compañía para el final; solo esperemos que esa ayuda no sea tan inútil y te termine metiendo en problemas.",
                "dialogue.royerbot.dia9.txt": "Los debuffs son el mejor cambio que se ha implementado, realmente afectan la jugabilidad de una forma muy molesta. Quédate en tu base para estar seguro por si acaso.",
                "dialogue.royerbot.dia10.txt": "Nos vemos mañana. Espero que estés listo, lleva tu armadura perfecta al ring.",
                "dialogue.royerbot.dia11.txt": "....",

                "dialogue.royerbot.dia0.btn1.txt": "Toma, amigo, te regalo este ítem; puede que lo necesites en tu aventura. Ten cuidado ahí fuera. ¡Vuelve mañana para otra recompensa!",
                "dialogue.royerbot.dia0.btn1.txt.alr": "Ya te entregué tu ítem diario. Regresa mañana para otra recompensa. ¡Tranquilo!",

                "dialogue.royerbot.dia0.btn2.txt": "Si necesitas más información, recuerda que en GitHub puedes encontrar todo lo que buscas. Copia este enlace y pégalo en tu navegador: https://github.com/HaJuegos/The-Last-15-Days/wiki/Cambios-de-Dificultad. Y de paso, ya que estás por ahí, ¿nos regalas una estrellita, no? ;)",

                "dialogue.royerbot.btns.btnintro": "¡Claro!",

                "dialogue.royerbot.dia0.btn1": "Reclamar regalo",
                "dialogue.royerbot.dia0.btn2": "Algo más"
            },
            english: {
                "dialogue.royerbot.intro_txt": "Hey there! I've got something important to tell you. Wanna hear my stories?",
                "dialogue.royerbot.dia0.txt": "Welcome to TL15D, a pretty tough add-on and server packed with changes for players who want to face incredible challenges. Remember, the changes are daily, so watch your back!",
                "dialogue.royerbot.dia1.txt": "A new day to explore, huh? It's pretty refreshing to just breathe for a moment. Sorry you got your exploration restricted.",
                "dialogue.royerbot.dia2.txt": "Those foxes are super annoying, don't you think? Be really careful when you're exploring the world. And when mining, too.",
                "dialogue.royerbot.dia3.txt": "Don't underestimate iron apples, they'll actually come in pretty handy, believe it or not. Stay safe out there, my friend.",
                "dialogue.royerbot.dia4.txt": "Raids have been pretty dangerous lately. Be super careful if you decide to take the lead and face one all by yourself.",
                "dialogue.royerbot.dia5.txt": "The Wither is the hardest mob in Bedrock edition. What do you think of the buff I gave them? Do you like it? What do you mean, no? Guess I won't give you their crown then.",
                "dialogue.royerbot.dia6.txt": "You know a guy named \"Socrates\"? Don't tell him you saw me, I can't stand him. The other day he showed up with his llamas to offer me pure trash. Only his pearls were useful.",
                "dialogue.royerbot.dia7.txt": "I have a pet Polly, she's really cute, I actually like her a lot. They're the best mob out there, but watch out if a cow hurts them... nobody can stop them after that.",
                "dialogue.royerbot.dia8.txt": "Don't underestimate the Soul Link. It's actually really helpful to have some company for the end. Let's just hope that \"help\" isn't useless and ends up getting you into trouble.",
                "dialogue.royerbot.dia9.txt": "Debuffs are the best change they've added; they really mess with your gameplay in the most annoying way. Just stay at your base to be on the safe side.",
                "dialogue.royerbot.dia10.txt": "See you tomorrow. Hope you're ready, bring your best armor to the ring.",
                "dialogue.royerbot.dia11.txt": "....",

                "dialogue.royerbot.dia0.btn1.txt": "Here you go, buddy. Take this item, you might need it on your adventure. Be careful out there, and come back tomorrow for another reward!",
                "dialogue.royerbot.dia0.btn1.txt.alr": "I already gave you today's item! Come back tomorrow for another reward. Chill out!",
                "dialogue.royerbot.dia0.btn2.txt": "If you need more info, remember you can find everything you want on GitHub. Just copy and paste this link into your browser: https://github.com/HaJuegos/The-Last-15-Days/wiki/Cambios-de-Dificultad. Oh, and while you're at it, how about leaving us a star? ;)",

                "dialogue.royerbot.btns.btnintro": "Sure!",

                "dialogue.royerbot.dia0.btn1": "Get Gift",
                "dialogue.royerbot.dia0.btn2": "Anything else?"
            }
        }
    },

    // Garfield Dialogues
    {
        idData: "Garfield Dialogues",
        typeData: "text",
        texts: {
            spanish: {
                "dialogue.garfield.pre-dialog1": "§7§l[§r§v§lGARFIELD§7§l]§r Garfield §7§l>>§r John. ¿Dónde está mi lasaña? La necesito",
                "dialogue.garfield.pre-dialog2": "§7§l[§r§v§lGARFIELD§7§l]§r Garfield §7§l>>§r John, tengo hambre. ¿Sabes qué pasa si no me das de comer, John?",
                "dialogue.garfield.pre-dialog3": "§7§l[§r§v§lGARFIELD§7§l]§r Garfield §7§l>>§r John, craftea la lasaña. Craftea ahora",
                "dialogue.garfield.pre-dialog4": "§7§l[§r§v§lGARFIELD§7§l]§r Garfield §7§l>>§r Te estás quedando sin tiempo, John. Puede que tenga que comer algo más si no consigo mi lasaña",
                "dialogue.garfield.pre-dialog5": "§7§l[§r§v§lGARFIELD§7§l]§r Garfield §7§l>>§r 10 segundos, John..",
                "dialogue.garfield.pre-dialogfinal": "§7§l[§r§v§lGARFIELD§7§l]§r Garfield §7§l>>§r Se acabó el tiempo. ¡Es la hora de la cena!",
                "dialogue.garfield.death": "§7§l[§r§v§lGARFIELD§7§l]§r Garfield §7§l>>§r Estoy derrotado."
            },
            english: {
                "dialogue.garfield.pre-dialog1": "§7§l[§r§v§lGARFIELD§7§l]§r Garfield §7§l>>§r John. Where's my lasagna? I need",
                "dialogue.garfield.pre-dialog2": "§7§l[§r§v§lGARFIELD§7§l]§r Garfield §7§l>>§r John, I am hungry. You know what happens if you don't feed me, John?",
                "dialogue.garfield.pre-dialog3": "§7§l[§r§v§lGARFIELD§7§l]§r Garfield §7§l>>§r John, craft lasagna. Craft it now",
                "dialogue.garfield.pre-dialog4": "§7§l[§r§v§lGARFIELD§7§l]§r Garfield §7§l>>§r You're running out of time, John. I might need to eat something else if I don't get my lasagna",
                "dialogue.garfield.pre-dialog5": "§7§l[§r§v§lGARFIELD§7§l]§r Garfield §7§l>>§r 10 seconds, John..",
                "dialogue.garfield.pre-dialogfinal": "§7§l[§r§v§lGARFIELD§7§l]§r Garfield §7§l>>§r Time's up. It's dinner time!",
                "dialogue.garfield.death": "§7§l[§r§v§lGARFIELD§7§l]§r Garfield §7§l>>§r I am defeated."
            }
        }
    },

    // System Texts
    {
        idData: "System Texts",
        typeData: "text",
        texts: {
            spanish: {
                "disconnect.kicked": "¡Game Over! Ya no puedes seguir jugando.",
                "disconnect.kicked.reason": "¡Game Over! Ya no puedes seguir jugando.",
                "disconnect.removed": "¡Game Over! Ya no puedes seguir jugando.",
                "disconnect.removed.reason": "¡Game Over! Ya no puedes seguir jugando.",

                "disconnectionScreen.title.bannedByHost": "Has muerto y ya no puedes seguir jugando.",
                "disconnectionScreen.title.kickedFromWorld": "Has muerto y ya no puedes seguir jugando.",

                "gamepad_disconnect": "¡Se te acabaron las pilas o el mando se apagó!",
                "gamepad_disconnect.reconnectController": "RoyerBot ha intervenido en tu sistema y ahora no reconocemos tu mando. ¡Rápido! Enciéndelo o conéctalo de nuevo para continuar.",

                "pauseScreen.xboxLiveDisconnect": "Se te ha desconectado la cuenta de Xbox. ¿O estás en un mundo local o cómo carajos estás viendo esto? En fin, entra de nuevo al mundo.",

                "hbui.Bedtime.sleepingNotPossibleNotWorldOwner": "La noche se pasará progresivamente. Tú, tranquilo. No es como que tengas algo que hacer, ¿no?",
                "hbui.Bedtime.sleepingNotPossibleWorldOwner": "La noche se pasará progresivamente. Tú, tranquilo. No es como que tengas algo que hacer, ¿no?"
            },
            english: {
                "disconnect.kicked": "Game Over! You can't keep playing anymore.",
                "disconnect.kicked.reason": "Game Over! You can't keep playing anymore.",
                "disconnect.removed": "Game Over! You can't keep playing anymore.",
                "disconnect.removed.reason": "Game Over! You can't keep playing anymore.",
                "disconnectionScreen.title.bannedByHost": "You've died and can't keep playing.",
                "disconnectionScreen.title.kickedFromWorld": "You've died and can't keep playing.",

                "gamepad_disconnect": "Your batteries died or the controller shut off!",
                "gamepad_disconnect.reconnectController": "RoyerBot hijacked your system, and we don't recognize your controller anymore. Quick! Power it back on or reconnect it to keep going.",

                "pauseScreen.xboxLiveDisconnect": "Your Xbox account got disconnected. Are you in a local world, or how the hell are you even seeing this? Either way, get back into the world.",

                "hbui.Bedtime.sleepingNotPossibleNotWorldOwner": "The night will gradually pass. Don't worry. It's not like you have anything else to do, right?",
                "hbui.Bedtime.sleepingNotPossibleWorldOwner": "The night will gradually pass. Don't worry. It's not like you have anything else to do, right?"
            }
        }
    },

    // UI Texts
    {
        idData: "UI Texts",
        typeData: "text",
        texts: {
            spanish: {
                "ui.watermak.title": "§4The Last 15 Days",
                "ui.watermak.version": "§7v0.0.13-beta",

                "ui.watermak.telegram.title": "§e¡Únete al Telegram de la comunidad de HaJuegos!",
                "ui.watermak.telegram.url": "https://t.me/hacattoshub",

                "ui.game_over_title": "§c¿Game Over?§r",
                "ui.fast_items.title": "§g¡Sistema de ítems rápidos activado!",
                "ui.fast_items.sub1": "Ahora con tu tecla de interacción, puedes cambiar",
                "ui.fast_items.sub2": "rápidamente entre ítems como el tótem en tu otra mano.",
                "ui.credits_panel.title": "Créditos principales:",
                "ui.credits_panel.rolecreator": "Creador",
                "ui.credits_panel.dev": "Programador",
                "ui.credits_panel.artist": "Artista",
                "ui.other_credits.title": "Créditos adicionales:",
                "ui.other_credits.role1": "Texturas utilizadas en el add-on",
                "ui.fist_intro.title": "§a§l[ Bienvenido a TL15D ]§r",
                "ui.fist_intro.subtitle": "§4Recibiste un Kit inicial. ¡Suerte!",
                "ui.system.dolphin_timer": "§7Puedes volver a respirar bajo el agua en %1",

                "ui.list_players_death.title": " §4§lElige a tu víctima§r ",
                "ui.list_players_death.body": "§i§oElige a un jugador fallecido para revivirlo y unir tu alma con él para continuar en esta aventura.§r",

                "ui.form_timers.title_form": "§7§oTemporizadores pendientes§r",
                "ui.form_timers.main_text": "\\nTus debuffs activos son los siguientes:\\n\\n",
                "ui.form_timers.time_remain": "§7Tiempo restante.§r",
                "ui.form_timers.final_title_form": "§o§7El tiempo no se actualiza en tiempo real. Consulta este libro cuando quieras.",

                "ui.system.dragon_damage_nausea.title": "§cDEBES AGACHARTE",
                "ui.system.dragon_damage_nausea.subtitle": "La próxima vez, agáchate cuando termine el efecto",

                "ui.dragon_death.title": "§e§l¡ROYERBOT DERROTADO!",
                "ui.dragon_death.subtitle": "Felicidades, jugador, has logrado sobrevivir en esta batalla. ¡Muy bien!",

                "ui.system.end_addon.thanks": "§d ¡Gracias por Jugar! ",
                "ui.system.end_addon.header_thanks": "§e§l¡Felicidades por sobrevivir al viaje!",
                "ui.system.end_addon.body_thanks": "§fCanónicamente, el desarrollo de la serie concluyó en el §c§lDía 12§r§f. Por ende, este es el fin de tu aventura en este add-on.\\n\\nIgualmente, tienes algunos cambios por revisar y explorar en el §dEnd§f. ¡Ten cuidado de no morir esta vez! Nadie quiere ver la ironía de aguantar todos los días finales y que mueras justo en este, jajaja!\\n\\nEn fin, no me queda más que decirte que... §a¡muchas gracias por jugar!§f Agradezco a ti, jugador, por esta oportunidad.",
                "ui.system.end_addon.label_team": "§b§lEl Equipo:§r §7Royer, Convex!, Astral y HaJuegos.§r\\n\\n§eRecuerda dejarnos una estrella en GitHub y cualquier retroalimentación en la página. ¡Muchas gracias :3!",
                "ui.system.end_addon.button_ok": "§a§lContinuar",

                "ui.scoreboard.obj.title": "§g§lTotal de Participantes§r",
                "ui.scoreboard.scores.lives": "§a§lVivos§r",
                "ui.scoreboard.scores.deaths": "§4§lMuertos§r",

                "ui.form_deaths.no_plys_deaths": "§7>> No hay jugadores muertos registrados. Aun.",
                "ui.form_deaths.no_plys_valid": "§7>> Hubo un error al intentar obtener los jugadores muertos registrados, o no hay, o los datos están erróneos.",
                "ui.form_deaths.title.plys_deaths": "§p§l Jugadores muertos §r",
                "ui.form_deaths.subtitle.plys_deaths": "§o§iTodos los jugadores registrados en el mundo desde el Día 0. Principalmente, datos usados para el soul link.§r",

                "ui.form_deaths_delete.title.plys_deaths": "§3Muertos a eliminar§r",
                "ui.form_deaths_delete.subtitle.plys_deaths": "§7§o>> Con fines de depuración, esta es la lista de jugadores muertos desde el Día 0. Si seleccionas a uno, eliminarás su información a largo plazo y este quedará fuera de los registros del add-on. §c§o¡Cuidado!§7",

                "ui.form_deaths_delete.confirm_title.delete": "§4Confirmación final§r",
                "ui.form_deaths_delete.confirm_sub.delete": "§c§o>> Estás a punto de eliminar los datos de §4%1.§c ¿Estás seguro de continuar?",

                "ui.form_deaths_delete.confirm_btn1.accept": "Procede",
                "ui.form_deaths_delete.confirm_btn2.cancel": "Volver atrás",

                "ui.remove_linkeds.title": "§7Eliminar una pareja vinculada",
                "ui.remove_linkeds.subtitle": "§7§oEsta zona es principalmente para depuración, no se recomienda su uso constante a largo plazo por problemas de compatibilidad. Este sistema permite eliminar el registro de un Soul Link de una pareja ya vinculada.",
                "ui.remove_linkeds.nameplys": "%2 §7§oy§r%1%3",

                "ui.remove_linkeds.confirm.title": "§cConfirmación de eliminación de vínculo§r",
                "ui.remove_linkeds.confirm.subtitle": "§cEstás a punto de eliminar la información interna de la siguiente pareja vinculada: §4%1 y %2. §c¿Seguro que deseas continuar?",
                "ui.remove_linkeds.confirm.btn1.accept": "Continuar",
                "ui.remove_linkeds.confirm.btn2.cancel": "Volver",

                "ui.form_remove_debuff.title": "§v§lLimpiar Debuff§r",
                "ui.form_remove_debuff.subtitle": "§7§oEste formulario muestra todos los debuffs que se pueden limpiar al jugador %1. Esto no quiere decir que tenga todos estos debuffs; son solo las opciones disponibles para eliminar. Ten en cuenta que esto es solo por si algo salió mal y con fines depurativos. No se recomienda usar mucho este sistema.",
                "ui.form_remove_debuff.btn.deleted_all": "§4§lLimpiar Todos.§r",

                "ui.custom_command.desc.autoban": "Comando que permite alternar la funcionalidad del baneo automático de jugadores muertos. Habilitando o deshabilitando esta función.",
                "ui.custom_command.desc.hitboxes": "Comando que permite alternar la visibilidad de las hitboxes de las entidades. Habilitándolo o deshabilitándolo.",
                "ui.custom_command.desc.change_fastitems": "Comando que permite cambiar los ítems que acepta la mecánica de los ítems rápidos, reemplazando o añadiendo toda la lista de ítems permitidos.",
                "ui.custom_command.desc.check_deaths": "Comando que permite revisar la lista de jugadores muertos registrados en el add-on. Con fines depurativos.",
                "ui.custom_command.desc.seed": "Comando que muestra la semilla del mundo actual.",
                "ui.custom_command.desc.change_deaths": "Comando que muestra toda la lista de jugadores muertos registrados en el add-on y elimina su registro del mismo. Con fines depurativos.",
                "ui.custom_command.desc.remove_linkeds": "Comando que muestra toda la lista de jugadores vinculados entre sí y permite la vinculación de los mismos. Con fines depurativos.",
                "ui.custom_command.desc.change_debuffs": "Comando que permite alternar la funcionalidad del sistema de debuffs o maldiciones del Día 9, habilitándolo o deshabilitándolo.",
                "ui.custom_command.desc.change_debuffs_ply": "Comando que permite eliminar uno o todos los debuffs que tenga un jugador.",
                "ui.custom_command.desc.force_revive_ply": "Comando que permite revivir a un jugador de forma forzada, eliminando sus datos también.",
                "ui.custom_command.desc.tp_spectator": "Comando que permite teletransportarte a un jugador, en modo espectador sin operador.",
                "ui.custom_command.desc.change_royerbot_fight": "Comando que permite alternar y modificar características de la pelea del RoyerBot del Día 10.",
                "ui.custom_command.desc.statistics": "Comando que te enseña todas las estadísticas del add-on y el total del add-on completado.",

                "ui.form_statistics.title": "§7§oEstadísticas del Add-on§r",
                "ui.form_statistics.subtitle": "§7§oAquí verás todo lo que llevas completado del add-on. ¿Lograrás llegar al %1?§r",
                "ui.form_statistics.dynamic_stats": "§a§l- Progreso Total: §n%2§r%1%1§7§o- Tiempo jugado: %3§r%1%1§e§l- Logros Vanilla completados: §n%4/50§r%1%1§g§l- Logros Custom completados: §n%5/9§r%1%1§6§l- Regalos de RoyerBot: §n%6/10§r%1%1"
            },
            english: {
                "ui.watermak.title": "§4The Last 15 Days",
                "ui.watermak.version": "§7v0.0.13-beta",

                "ui.watermak.telegram.title": "§eJoin the HaJuegos community on Telegram!",
                "ui.watermak.telegram.url": "https://t.me/hacattoshub",

                "ui.game_over_title": "§cGame Over?§r",
                "ui.fast_items.title": "§gQuick item switching is active!",
                "ui.fast_items.sub1": "Now, use your interaction key to quickly",
                "ui.fast_items.sub2": "switch between items like the totem in your off-hand.",
                "ui.credits_panel.title": "Credits:",
                "ui.credits_panel.rolecreator": "Creator",
                "ui.credits_panel.dev": "Developer",
                "ui.credits_panel.artist": "Artist",
                "ui.other_credits.title": "Other Credits:",
                "ui.other_credits.role1": "Textures used in the add-on",
                "ui.fist_intro.title": "§a§l[ Welcome to TL15D ]§r",
                "ui.fist_intro.subtitle": "§4You've received a Starter Kit. Good luck!",
                "ui.system.dolphin_timer": "§7You can breathe underwater again in %1",

                "ui.list_players_death.title": " §4§lChoose your victim§r ",
                "ui.list_players_death.body": "§i§oChoose a deceased player to revive them and unite your soul with theirs to continue this adventure.§r",

                "ui.form_timers.title_form": "§7§oPending timers§r",
                "ui.form_timers.main_text": "\\nHere are your active debuffs:\\n\\n",
                "ui.form_timers.time_remain": "§7Time left.§r",
                "ui.form_timers.final_title_form": "§o§7Time doesn't update in real time. Check this book whenever you want.",

                "ui.system.dragon_damage_nausea.title": "§cYOU MUST BEND DOWN",
                "ui.system.dragon_damage_nausea.subtitle": "Next time, crouch down when the effect ends",

                "ui.dragon_death.title": "§e§lROYERBOT DEFEATED!",
                "ui.dragon_death.subtitle": "Congratulations, player, you managed to survive this battle. Well done!",

                "ui.system.end_addon.thanks": "§d Thanks for playing! ",
                "ui.system.end_addon.header_thanks": "§e§lCongratulations on surviving the journey!",
                "ui.system.end_addon.body_thanks": "§fCanonically, the series' development wrapped up on §c§lDay 12§r§f. So, this is the end of your adventure in this add-on.\\n\\nHowever, you still have some changes to check out and explore in the §dEnd§f. Be careful not to die this time! Nobody wants to see the irony of surviving all the final days just to die in this one, haha!\\n\\nAnyway, I have nothing left to say but... §athank you so much for playing!§f Huge thanks to you, the player, for this opportunity.",
                "ui.system.end_addon.label_team": "§b§lThe Team:§r §7Royer, Convex!, Astral, and HaJuegos.§r\\n\\n§eRemember to leave us a star on GitHub and drop any feedback on the page. Thanks a lot :3!",
                "ui.system.end_addon.button_ok": "§a§lContinue",

                "ui.scoreboard.obj.title": "§g§lTotal Participants§r",
                "ui.scoreboard.scores.lives": "§a§lAlive§r",
                "ui.scoreboard.scores.deaths": "§4§lDead§r",

                "ui.form_deaths.no_plys_deaths": "§7>> No player deaths have been recorded. Yet.",
                "ui.form_deaths.no_plys_valid": "§7>> An error occurred while trying to retrieve the recorded player deaths; either there are none, or the data is incorrect.",
                "ui.form_deaths.title.plys_deaths": "§p§l Dead Players §r",
                "ui.form_deaths.subtitle.plys_deaths": "§o§iAll players registered in the world since Day 0. Primarily, data used for the soul link.§r",

                "ui.form_deaths_delete.title.plys_deaths": "§3Dead Players to Delete§r",
                "ui.form_deaths_delete.subtitle.plys_deaths": "§7§o>> For data cleanup purposes, this is the list of players who have died since Day 0. If you select one, you will permanently delete their information, and they will be removed from the add-on's records. §c§oWarning!§7",

                "ui.form_deaths_delete.confirm_title.delete": "§4Final Confirmation§r",
                "ui.form_deaths_delete.confirm_sub.delete": "§c§o>> You are about to delete the data for §4%1.§c Are you sure you want to continue?",

                "ui.form_deaths_delete.confirm_btn1.accept": "Proceed",
                "ui.form_deaths_delete.confirm_btn2.cancel": "Go Back",

                "ui.remove_linkeds.title": "§7Remove a linked pair",
                "ui.remove_linkeds.subtitle": "§7§oThis area is mainly for debugging. It's not recommended to use this too much in the long run due to compatibility issues. This system lets you delete the Soul Link record of a pair that's already linked.",
                "ui.remove_linkeds.nameplys": "%2 §7§o&§r%1%3",

                "ui.remove_linkeds.confirm.title": "§cConfirm link removal§r",
                "ui.remove_linkeds.confirm.subtitle": "§cYou're about to delete the internal data for the following linked pair: §4%1 and %2. §cAre you sure you want to go ahead?",
                "ui.remove_linkeds.confirm.btn1.accept": "Continue",
                "ui.remove_linkeds.confirm.btn2.cancel": "Go back",

                "ui.form_remove_debuff.title": "§v§lClear Debuffs§r",
                "ui.form_remove_debuff.subtitle": "§7§oThis form shows all the debuffs that can be cleared from player %1. This doesn't mean they have all of these debuffs; these are just the available options for removal. Keep in mind that this is only meant to be used if something went wrong and for debugging purposes. It's not recommended to use this system too often.§r",
                "ui.form_remove_debuff.btn.deleted_all": "§4§lClear All.§r",

                "ui.custom_command.desc.autoban": "Command that allows you to toggle the automatic ban feature for dead players. Enable or disable this feature.",
                "ui.custom_command.desc.hitboxes": "Command that allows you to toggle the visibility of entity hitboxes. Enable or disable this feature.",
                "ui.custom_command.desc.change_fastitems": "Command that allows you to change the items accepted by the quick-item mechanic, replacing or adding to the entire list of allowed items.",
                "ui.custom_command.desc.check_deaths": "Command that allows you to review the list of dead players recorded by the add-on. For debugging purposes.",
                "ui.custom_command.desc.seed": "Command that displays the seed of the current world.",
                "ui.custom_command.desc.change_deaths": "Command that displays the full list of dead players recorded by the add-on and removes their entries from the add-on. For debugging purposes.",
                "ui.custom_command.desc.remove_linkeds": "Command that displays the full list of linked players and allows them to be linked. For debugging purposes.",
                "ui.custom_command.desc.change_debuffs": "Command that allows you to toggle the functionality of the Day 9 debuff or curse system, enabling or disabling it.",
                "ui.custom_command.desc.change_debuffs_ply": "Command that allows you to remove one or all of a player’s debuffs.",
                "ui.custom_command.desc.force_revive_ply": "Command that allows you to forcibly revive a player, while also deleting their data.",
                "ui.custom_command.desc.tp_spectator": "Command that allows you to teleport to a player in spectator mode without an operator.",
                "ui.custom_command.desc.change_royerbot_fight": "Command that allows you to toggle and modify the combat characteristics of the Day 10 RoyerBot.",
                "ui.custom_command.desc.statistics": "Command that shows you all the add-on's statistics and the total progress made in the add-on.",

                "ui.form_statistics.title": "§7§oAdd-on Stats§r",
                "ui.form_statistics.subtitle": "§7§oHere's your overall progress in the add-on. Will you manage to hit %1?§r",
                "ui.form_statistics.dynamic_stats": "§a§l- Total Progress: §n%2§r%1%1§7§o- Playtime: %3§r%1%1§e§l- Vanilla Achievements: §n%4/50§r%1%1§g§l- Custom Achievements: §n%5/9§r%1%1§6§l- RoyerBot Gifts: §n%6/10§r%1%1"
            }
        }
    },

    // Chat Texts
    {
        idData: "Chat Texts",
        typeData: "text",
        texts: {
            spanish: {
                "chat.system.resquicio_start": "§c§l>>§r§c ¡%1 ha causado un §4§lResquicio Infernal§r!",
                "chat.system.last_location_player": "§l§b[§eRoyerBot§b]§r §7§l>>§r§7 %1 ha muerto en %2 en la Dimensión %3.",
                "chat.system.player_in_bed": "§e>> %1 está durmiendo. ¡Buenas noches!",
                "chat.system.error_no_perms": "§7§l>> Aún no puedes realizar esta acción.",
                "chat.system.use_totem": "§7>> %1 ha utilizado un tótem.",
                "chat.system.day_addon": "§a§l>> Es el Día %1.",
                "chat.system.damage_biome": "§4§l>> Estás recibiendo daño por temperatura. ¡Sal de allí!",
                "chat.system.get_debuff_wither1": "§c§l>> Recibiste un efecto negativo aleatorio del Wither.",
                "chat.system.get_debuff_wither2": "§m§l>> Tu inventario ha cambiado por culpa del Wither.",
                "chat.system.get_infernal_item": "§4>> %1 ha conseguido el ítem %2.§r§7 | (%3/5)",
                "chat.system.get_infernal_crown": "§4§l>> %1 ha conseguido %2.",
                "chat.system.hit_by_dolphin": "§e§lTe ha golpeado un delfín, ya no puedes respirar bajo el agua durante %1 minutos. ¡Intenta que no te golpeen nuevamente!",
                "chat.system.soul_link.no_plys_deaths": "§7§l>> No hay jugadores por revivir, es inútil utilizar el ítem en este momento.",
                "chat.system.soul_link.alr_used": "§7§l>> Ya has utilizado este ítem previamente, no puedes revivir a más jugadores.",
                "chat.system.soul_link.select_player": "§7§l>> §cPor el pacto del Soul Link, §e%2 §cha atado su destino al de §e%1§c. §7Son dos cuerpos, pero una sola vida. §4La muerte de uno será la condena absoluta del otro. Ya no hay salvación.",
                "chat.system.block_explorer": "§c§l>> No puedes pasar del límite de exploración de esta dimensión.",

                "chat.system.abyss_text.abyssal_text_combo1": "§1§l>> Ojos del Abismo: Sientes que una presencia oscura te arrebata varios espacios del inventario. Tranquilo, tus cosas están ahora mismo en el suelo. ¡Mala suerte!",
                "chat.system.abyss_text.abyssal_text_combo2": "§1§l>> Ojos del Abismo: Por caer de nuevo en esta maldición, pierdes un espacio aleatorio de tu inventario. ¡Qué mala suerte! Ten cuidado con lo que guardas.",

                "chat.system.abyss_text.colossus_text_combo1": "§6§l>> Engaño del Coloso: Te has vuelto enorme y pesado. Tu cuerpo se siente lento y te cuesta moverte. Ahora los enemigos te alcanzarán antes y será difícil adaptarte al entorno. ¡Mala suerte!",

                "chat.system.abyss_text.hunger_text_combo1": "§2§l>> Insaciable Hambre: Tu cuerpo exige comida a gritos, haciendo que, sin querer, empieces a devorar tus propios objetos al azar. ¡Qué mala suerte!",

                "chat.system.abyss_text.shadows_text_combo1": "§b§l>> Sombras Voraces: Las sombras te acechan. Ahora los monstruos que te ataquen tendrán Velocidad y Fuerza, y el efecto será más potente cada vez que te toque de nuevo. ¡Mala suerte!",

                "chat.system.abyss_text.decay_text_combo1": "§n§l>> Erosión del Alma: El abismo drena tu saturación. Tu energía caerá de golpe y tu cuerpo se debilitará mucho más rápido. ¡Vaya mala suerte!",

                "chat.system.abyss_text.fury_text_combo1": "§c§l>> Furia Desquiciada: La ira te consume. Puedes atacar a otros jugadores y tienes Fuerza, pero el desgaste de tus objetos será mayor cada vez que sufras este efecto. ¡Qué mala suerte!",

                "chat.system.abyss_text.void_text_combo1": "§u§l>> Garras del Vacío: Tus objetos se han quedado bloqueados. No podrás soltarlos ni usarlos mientras dure el efecto. ¡Mala suerte!",
                "chat.system.abyss_text.void_text_combo2": "§u§l>> Garras del Vacío: Más objetos quedan atados a tu inventario. Poco a poco pierdes la capacidad de mover o usar tus cosas. ¡Qué mala suerte!",
                "chat.system.abyss_text.void_text_combo5": "§u§l>> Garras del Vacío: Tus objetos están totalmente sellados. Ya no puedes usarlos ni moverlos; el inventario está completamente bloqueado. ¡Pésima suerte!",

                "chat.system.debuff_total_changed": "§7>> Se ha cambiado el total de debuffs globales del mundo a %1. (Previamente había %2 debuffs en total)",

                "chat.system.debuff_name.abyssal": "§1Ojos del Abismo§7",
                "chat.system.debuff_name.colossus": "§6Engaño del Coloso§7",
                "chat.system.debuff_name.hunger": "§2Insaciable Hambre§7",
                "chat.system.debuff_name.shadows": "§bSombras Voraces§7",
                "chat.system.debuff_name.decay": "§nErosión del Alma§7",
                "chat.system.debuff_name.fury": "§cFuria Desquiciada§7",
                "chat.system.debuff_name.void": "§uGarras del Vacío§7",

                "chat.system.debuff_end_timer": "§7>> El Debuff %1 ha terminado.",

                "chat.system.ui.no_debuffs_timers": "§7>> No tienes timers pendientes por revisar.",

                "chat.system.eat_iron_apple": "§i>> %1 ha consumido una %2",

                "chat.system.get_cautious_item": "§w>> %1 ha conseguido el ítem %2.§r§7 | (%3/4)",

                "chat.system.dragon_attack_finished.nausea": "§7>> Se ha terminado el efecto de Nauseas.",
                "chat.system.dragon_attack_finished.conduit": "§7>> Se ha terminado el efecto del Conduit.",
                "chat.system.timer_bear_trap.starts": "§7>> Fuiste atacado por una trampa de osos. No puedes moverte durante %1 segundos.",
                "chat.system.ender_crystal_explodes.default": "§4§l>> Un EnderCrystal fue explotado en %1. Ahora apareceran Llamas en la arena.",
                "chat.system.ender_crystal_explodes.custom_mob": "§4§l>> Un EnderCrystal fue explotado en %1. Ahora apareceran mobs en la arena.",
                "chat.system.ender_crystal_explodes.removed": "§7>> Un EnderCrystal fue explotado en %1. Pero todo está bien, porque se ha deshabilitado la generación de mobs en cristales.",
                "chat.system.no_end_islands": "§7>> Aún no tienes permitido ir a las islas del End. Regresa al día siguiente y/o termina de pelear con el dragón.",
                "chat.system.spawn_items_rain": "§d>> Una lluvia de ítems ha ocurrido en %1.",
                "chat.system.spawn_totems_rain": "§e>> Una lluvia de tótems ha ocurrido en %1.",
                "chat.system.banned_items_end": "§c>> No usarás eso contra mí en esta batalla. El ítem se ha eliminado de tu inventario.",

                "chat.system.nowitheryet": "§c>> No puedes invocar a este mob aún.",
                "chat.system.block_items.wither": "§4>> No te permitiré usar ese ítem conmigo. Pelea bien. Saca tu espada y enfréntame.",

                "chat.system.autoban.disabled": "§7>> El autoban ahora está desactivado. Los jugadores que mueran o estén muertos pueden entrar libremente al mundo.",
                "chat.system.autoban.enabled": "§7>> El autoban ahora está activado. Los jugadores que mueran o estén muertos serán expulsados del mundo y no podrán entrar nuevamente.",

                "chat.system.hitboxes_system.error.nothing": "§c>> No se encontró el jugador seleccionado.",
                "chat.system.hitboxes_system.error.noply": "§c>> El jugador \"%1\" no fue encontrado.",
                "chat.system.hitboxes_system.error.same_state": "§c>> No se realizaron cambios a \"%1\", ya estaba en ese estado.",
                "chat.system.hitboxes_system.enabled": "§7>> Se han activado las hitboxes para \"%1\".",
                "chat.system.hitboxes_system.disabled": "§7>> Se han desactivado las hitboxes para \"%1\".",

                "chat.system.fastitems_system.items_changed": "§7>> Se han cambiado los ítems del sistema de ítems rápidos.",

                "chat.system.banana_eated": "§g§l>> %1 ha consumido una Banana.",

                "chat.system.form_deaths_deleted.success": "§7>> Se han eliminado los datos de %1 correctamente.",

                "chat.system.remove_linked.no_data": "§7>> No hay registros de Soul Links aún... o puede que haya ocurrido un error.",
                "chat.system.remove_linked.success": "§7>> Se ha eliminado con éxito el registro de la pareja vinculada conformada por %1 y %2.",

                "chat.system.change_debuffs.enabled": "§7>> Se ha habilitado el sistema de debuffs. Ahora los debuffs pendientes y próximos serán aplicados a todos los jugadores.",
                "chat.system.change_debuffs.disabled": "§7>> Se ha deshabilitado el sistema de debuffs. Pero eso no quita el hecho de que cualquier jugador próximo a morir estará acumulando debuffs pendientes cuando se piense rehabilitar este sistema nuevamente. ¿Muy difícil para ti?",

                "chat.system.no_sleeping_alert": "§4>> No has dormido las noches suficientes y es probable que spawneen phantoms la próxima noche. ¡Duerme!",

                "chat.system.form_remove_debuff.error.player_invalid": "§7>> Hubo un error al intentar cargar el formulario. Es posible que el jugador seleccionado se haya desconectado o haya pasado un error. Vuelve a intentarlo.",
                "chat.system.form_remove_debuff.error.fail_removal": "§7>> Algo pasó al intentar remover el debuff al jugador seleccionado. Vuelve a intentarlo.",
                "chat.system.form_remove_debuff.success.removed_debuff": "§7>> Se ha(n) eliminado los debuffs seleccionados correctamente al jugador %1.",

                "chat.system.form_revival_ply.error.player_invalid": "§c>> Hubo un problema al intentar revivir al jugador seleccionado; es posible que se haya desconectado o sea inválido. Vuelve a intentarlo.",
                "chat.system.form_revival_ply.success_but.player_revive": "§c>> Se ha revivido al jugador %1, pero no fue del todo correcto; la información del mismo aún está disponible en los registros del add-on. Usa el comando /changedeaths para eliminarlo.",
                "chat.system.form_revival_ply.success.player_revive": "§a>> Se ha revivido al jugador %1 correctamente.",

                "chat.system.teleport_spect.error.no_args": "§c>> No puedes usar este comando, aún. Muere primero. ",
                "chat.system.teleport_spect.error.player_invalid": "§c>> Hubo un error al intentar obtener el jugador seleccionado debido a que se ha desconectado o es inválido. Intenta nuevamente.",

                "chat.random_msg_brute.msg1": "§7§l[§r§4§lSobreviviente§7§l]§r Piglin Brute §7§l>>§r GG, L.",
                "chat.random_msg_brute.msg2": "§7§l[§r§4§lSobreviviente§7§l]§r Piglin Brute §7§l>>§r ¿Eso fue todo? lol",
                "chat.random_msg_brute.msg3": "§7§l[§r§4§lSobreviviente§7§l]§r Piglin Brute §7§l>>§r Bro se comió el cristal entero.",
                "chat.random_msg_brute.msg4": "§7§l[§r§4§lSobreviviente§7§l]§r Piglin Brute §7§l>>§r Sin pestañar. lmao",
                "chat.random_msg_brute.msg5": "§7§l[§r§4§lSobreviviente§7§l]§r Piglin Brute §7§l>>§r ¿Cuántos totems te quedan? Ah, ninguno.",
                "chat.random_msg_brute.msg6": "§7§l[§r§4§lSobreviviente§7§l]§r Piglin Brute §7§l>>§r Literalmente gratis.",
                "chat.random_msg_brute.msg7": "§7§l[§r§4§lSobreviviente§7§l]§r Piglin Brute §7§l>>§r Bro no sabe jugar. lmao",
                "chat.random_msg_brute.msg8": "§7§l[§r§4§lSobreviviente§7§l]§r Piglin Brute §7§l>>§r No vuelvas a entrar en mi hole.",
                "chat.random_msg_brute.msg9": "§7§l[§r§4§lSobreviviente§7§l]§r Piglin Brute §7§l>>§r Crystal diff. Fácil.",
                "chat.random_msg_brute.msg10": "§7§l[§r§4§lSobreviviente§7§l]§r Piglin Brute §7§l>>§r GG bro, vuelve cuando aprendas a colocar cristales.",

                "chat.system.change_feature_fight": "§7>> Se ha %2 la característica %1 de la pelea con el RoyerBot correctamente.",
                "chat.system.change_feature_fight.args.true": "habilitado",
                "chat.system.change_feature_fight.args.false": "deshabilitado",
                "chat.system.change_feature_fight.error.missing_entity": "§c>> Hace falta la entidad a cambiar si quieres modificar qué mob spawnea en EnderCrystals.",
                "chat.system.change_feature_fight.error.no_valid_entity": "§c>> Esta entidad no está permitida para cambiar; elige otra válida.",
                "chat.system.change_feature_fight.mob_change": "§7>> La característica %1 fue cambiada por el mob %2 correctamente. ",

                "chat.system.no_mele_brute": "§4§l>> Este mob no puede ser atacado a melee. ¡Usa explosiones en su lugar!",

                "chat.system.death.how_to_use_tp": "§5§l>> ¡Has muerto! Pero no fuiste baneado del servidor debido a que un administrador desactivó esa opción. Usa el comando /tpspectator <nombre> para teletransportarte a un jugador.",

                "chat.system.error.noplaceblock_center_end": "§c§l>> No tienes permitido poner bloques en el centro de la isla. ¡No te pases de listo!"
            },
            english: {
                "chat.system.resquicio_start": "§c§l>>§r§c ¡%1 caused a §4§lHellish Rift§r!",
                "chat.system.last_location_player": "§l§b[§eRoyerBot§b]§r §7§l>>§r§7 %1 has died in %2 in Dimension %3.",
                "chat.system.player_in_bed": "§e>> %1 is sleeping. Good night!",
                "chat.system.error_no_perms": "§7§l>> You can't do that yet.",
                "chat.system.use_totem": "§7>> %1 used a totem.",
                "chat.system.day_addon": "§a§l>> It's Day %1.",
                "chat.system.damage_biome": "§4§l>> You're taking temperature damage. Get out of there!",
                "chat.system.get_debuff_wither1": "§c§l>> The Wither just slapped you with a random negative effect.",
                "chat.system.get_debuff_wither2": "§m§l>> The Wither just messed with your inventory.",
                "chat.system.get_infernal_item": "§4>> %1 has obtained %2§r§7 | (%3/5)",
                "chat.system.get_infernal_crown": "§4§l>> %1 has obtained %2.§r",
                "chat.system.hit_by_dolphin": "§e§lYou got hit by a dolphin, so you can't hold your breath underwater for %1 minutes. Try not to get hit again!",
                "chat.system.soul_link.no_plys_deaths": "§7§l>> There are no players to revive, so don't bother using the item right now.",
                "chat.system.soul_link.alr_used": "§7§l>> You've already used this item, so you can't revive any more players.",
                "chat.system.soul_link.select_player": "§7§l>> §cThrough the Soul Link pact, §e%2 §cjust tied their fate to §e%1§c. §7Two bodies, one shared life. §4If one goes down, it's game over for both.",
                "chat.system.block_explorer": "§c§l>> You cannot go beyond this dimension's exploration limit.",

                "chat.system.abyss_text.abyssal_text_combo1": "§1§l>> Abyssal Eyes: You feel a dark presence snatching slots from your inventory. Don't panic—your items are just chilling on the floor now. Tough luck!",
                "chat.system.abyss_text.abyssal_text_combo2": "§1§l>> Abyssal Eyes: Since you got cursed again, another random inventory slot is gone. Watch your back... and your items! Bad luck!",

                "chat.system.abyss_text.colossus_text_combo1": "§6§l>> Colossus Trick: You've grown huge and heavy, making you feel sluggish and slow. Enemies will catch up to you in no time, and moving around is now a pain. Tough luck!",

                "chat.system.abyss_text.hunger_text_combo1": "§2§l>> Endless Hunger: Your body is starving for more, causing you to unconsciously start eating your own random items. Sucks to be you!",

                "chat.system.abyss_text.shadows_text_combo1": "§b§l>> Ravenous Shadows: The shadows are hunting you. Now, any mobs that attack you will gain Speed and Strength—and it only gets worse every time you're hit. Bad luck!",

                "chat.system.abyss_text.decay_text_combo1": "§n§l>> Soul Decay: The abyss is draining your saturation. Your energy levels will tank suddenly, making your body weaken much faster. Tough luck!",

                "chat.system.abyss_text.fury_text_combo1": "§c§l>> Unhinged Fury: Rage consumes you. You can now attack players and gain Strength, but your items will lose durability much faster every time you trigger this. Sucks for you!",

                "chat.system.abyss_text.void_text_combo1": "§u§l>> Void Claws: Your items are locked tight in your inventory. You won't be able to drop or use them while this effect is active. Bad luck!",
                "chat.system.abyss_text.void_text_combo2": "§u§l>> Void Claws: Even more items are bound to your inventory. You're slowly losing the ability to move or use anything. Tough luck!",
                "chat.system.abyss_text.void_text_combo5": "§u§l>> Void Claws: Your items are now completely sealed and stuck. You can't use or move them anymore—your inventory is totally locked down. What a nightmare!",

                "chat.system.debuff_total_changed": "§7>> Global debuff count is now %1. (It was %2 before.)",

                "chat.system.debuff_name.abyssal": "§1Abyssal Eyes§7",
                "chat.system.debuff_name.colossus": "§6Colossus Trick§7",
                "chat.system.debuff_name.hunger": "§2Endless Hunger§7",
                "chat.system.debuff_name.shadows": "§bRavenous Shadows§7",
                "chat.system.debuff_name.decay": "§nSoul Decay§7",
                "chat.system.debuff_name.fury": "§cUnhinged Fury§7",
                "chat.system.debuff_name.void": "§uVoid Claws§7",

                "chat.system.debuff_end_timer": "§7>> Debuff %1 has ended.",

                "chat.system.ui.no_debuffs_timers": "§7>> You don't have any pending timers to review.",

                "chat.system.eat_iron_apple": "§i>> %1 has eaten %2",

                "chat.system.get_cautious_item": "§w>> %1 has obtained %2§r§7 | (%3/4)",

                "chat.system.dragon_attack_finished.nausea": "§7>> The Nauseas effect has ended.",
                "chat.system.dragon_attack_finished.conduit": "§7>> The Conduit effect has ended.",
                "chat.system.timer_bear_trap.starts": "§7>> You were hit by a bear trap. You cannot move for %1 seconds.",
                "chat.system.ender_crystal_explodes.default": "§4§l>> An EnderCrystal explodes at %1. Llamas will now appear in the arena.",
                "chat.system.ender_crystal_explodes.custom_mob": "§4§l>> An EnderCrystal explodes at %1. Mobs will now appear in the arena.",
                "chat.system.ender_crystal_explodes.removed": "§7>> An EnderCrystal explodes at %1. But it's all right, because mob spawning in crystals has been disabled.",
                "chat.system.no_end_islands": "§7>> You're not allowed to go to the End Islands yet. Come back tomorrow and/or finish fighting the dragon.",
                "chat.system.spawn_items_rain": "§d>> An item rain has occurred in %1.",
                "chat.system.spawn_totems_rain": "§e>> A totem rain has occurred in %1.",
                "chat.system.banned_items_end": "§c>> You won't be using that against me in this battle. The item has been removed from your inventory.",

                "chat.system.nowitheryet": "§c>> You can't summon this mob yet.",
                "chat.system.block_items.wither": "§4>> I won't let you use that item on me. Fight fair. Draw your sword and face me.",

                "chat.system.autoban.disabled": "§7>> Autoban is now disabled. Players who die or are dead can freely enter the world.",
                "chat.system.autoban.enabled": "§7>> Autoban is now enabled. Players who die or are dead will be kicked from the world and will not be able to re-enter.",

                "chat.system.hitboxes_system.error.nothing": "§c>> The selected player was not found.",
                "chat.system.hitboxes_system.error.noply": "§c>> The player \"%1\" was not found.",
                "chat.system.hitboxes_system.error.same_state": "§c>> No changes were made to \"%1\"; it was already in that state.",
                "chat.system.hitboxes_system.enabled": "§7>> Hitboxes have been enabled for \"%1\".",
                "chat.system.hitboxes_system.disabled": "§7>> Hitboxes have been disabled for \"%1\".",

                "chat.system.fastitems_system.items_changed": "§7>> The items in the quick-items system have been changed.",

                "chat.system.banana_eated": "§g§l>> %1 ate a banana.",

                "chat.system.form_deaths_deleted.success": "§7>> The data from %1 has been successfully deleted.",

                "chat.system.remove_linked.no_data": "§7>> No Soul Link records yet... or maybe something went wrong.",
                "chat.system.remove_linked.success": "§7>> Successfully deleted the record for the linked pair %1 and %2.",

                "chat.system.change_debuffs.enabled": "§7>> The debuff system has been enabled. Pending and upcoming debuffs will now be applied to all players.",
                "chat.system.change_debuffs.disabled": "§7>> The debuff system has been disabled. However, this does not change the fact that any player close to death will continue to accumulate pending debuffs until this system is reactivated. Is that too difficult for you?",

                "chat.system.no_sleeping_alert": "§4>> You haven't slept enough nights, and phantoms will probably spawn tomorrow night. Go to sleep!",

                "chat.system.form_remove_debuff.error.player_invalid": "§c>> Something went wrong while trying to load the form. The selected player may have disconnected, or an error may have occurred. Please try again.",
                "chat.system.form_remove_debuff.error.fail_removal": "§c>> Something went wrong while trying to remove the debuff from the selected player. Please try again.",
                "chat.system.form_remove_debuff.success.removed_debuff": "§a>> The selected debuff(s) were successfully removed from player %1.",

                "chat.system.form_revival_ply.error.player_invalid": "§c>> Something went wrong while trying to revive the selected player; they may have disconnected or may no longer be valid. Please try again.",
                "chat.system.form_revival_ply.success_but.player_revive": "§c>> Player %1 was revived, but something went wrong during the process; their information is still available in the add-on's logs. Use the /changedeaths command to remove it.",
                "chat.system.form_revival_ply.success.player_revive": "§a>> Player %1 was successfully revived.",

                "chat.system.teleport_spect.error.no_args": "§c>> You can't use this command yet. Die first.",
                "chat.system.teleport_spect.error.player_invalid": "§c>> There was an error while trying to get the selected player because they have disconnected or are no longer valid. Please try again.",

                "chat.random_msg_brute.msg1": "§7§l[§r§4§lSobreviviente§7§l]§r Piglin Brute §7§l>>§r GG, L.",
                "chat.random_msg_brute.msg2": "§7§l[§r§4§lSobreviviente§7§l]§r Piglin Brute §7§l>>§r Was that all? lol",
                "chat.random_msg_brute.msg3": "§7§l[§r§4§lSobreviviente§7§l]§r Piglin Brute §7§l>>§r Bro ate the whole crystal.",
                "chat.random_msg_brute.msg4": "§7§l[§r§4§lSobreviviente§7§l]§r Piglin Brute §7§l>>§r Didn't even blink. lmao",
                "chat.random_msg_brute.msg5": "§7§l[§r§4§lSobreviviente§7§l]§r Piglin Brute §7§l>>§r How many totems you got left? Oh, none.",
                "chat.random_msg_brute.msg6": "§7§l[§r§4§lSobreviviente§7§l]§r Piglin Brute §7§l>>§r Literally free.",
                "chat.random_msg_brute.msg7": "§7§l[§r§4§lSobreviviente§7§l]§r Piglin Brute §7§l>>§r Bro doesn't know how to play. lmao",
                "chat.random_msg_brute.msg8": "§7§l[§r§4§lSobreviviente§7§l]§r Piglin Brute §7§l>>§r Don't come back to my hole.",
                "chat.random_msg_brute.msg9": "§7§l[§r§4§lSobreviviente§7§l]§r Piglin Brute §7§l>>§r Crystal diff. Easy.",
                "chat.random_msg_brute.msg10": "§7§l[§r§4§lSobreviviente§7§l]§r Piglin Brute §7§l>>§r GG bro, come back when you learn how to place crystals.",

                "chat.system.change_feature_fight": "§7>> Feature %1 for the fight with RoyerBot has been successfully %2.",
                "chat.system.change_feature_fight.args.true": "enabled",
                "chat.system.change_feature_fight.args.false": "disabled",
                "chat.system.change_feature_fight.error.missing_entity": "§c>> The entity to be changed is required if you want to modify which mob spawns at EnderCrystals.",
                "chat.system.change_feature_fight.error.no_valid_entity": "§c>> This entity cannot be changed; please select a valid one.",
                "chat.system.change_feature_fight.mob_change": "§7>> Feature %1 was successfully changed to mob %2.",

                "chat.system.no_mele_brute": "§4§l>> This mob cannot be attacked in melee. Use explosions instead!",

                "chat.system.death.how_to_use_tp": "§5§l>> You've died! But you weren't banned from the server because an administrator disabled that option. Use the command /tpspectator <name> to teleport to a player.",

                "chat.system.error.noplaceblock_center_end": "§c§l>> You're not allowed to place blocks in the center of the island. Don't get too clever!"
            }
        }
    },

    // Item Catalog Texts
    {
        idData: "Item Catalogs",
        typeData: "text",
        texts: {
            spanish: {
                "ha:itemGroup.name.nether_items": "§4Cosas del Nether§r"
            },
            english: {
                "ha:itemGroup.name.nether_items": "§4Nether Stuff§r"
            }
        }
    },

    // Music Desc Texts
    {
        idData: "Music Desc",
        typeData: "text",
        texts: {
            spanish: {
                "item.record_click.desc": "Akira Yamaoka - Otherside (Silent Hill)",
                "item.record_nodamage.desc": "Escape - Kiss",
                "item.record_break.desc": "Aphex Twin - Alberto Balsam (Half Life)",
                "item.record_attach.desc": "EZHALT - Athazagoraphobia (FNF: The Trollge Files)"
            },
            english: {
                "item.record_click.desc": "Akira Yamaoka - Otherside (Silent Hill)",
                "item.record_nodamage.desc": "Escape - Kiss",
                "item.record_break.desc": "Aphex Twin - Alberto Balsam (Half Life)",
                "item.record_attach.desc": "EZHALT - Athazagoraphobia (FNF: The Trollge Files)"
            }
        }
    },

    // Advacements Texts
    {
        idData: "Advacements",
        typeData: "text",
        texts: {
            spanish: {
                "chat.advan.normal_base": "%1 ha conseguido el progreso §a[%2]§r",
                "chat.advan.rare_base": "%1 ha completado el desafío §5[%2]§r",

                "advacement.wood_pick": "La Edad de Piedra",
                "advacement.stone_pick": "Mejorando herramientas",
                "advacement.iron_ingot": "La Edad de Hierro",
                "advacement.suit_up": "Vístete",
                "advacement.hot_stuff": "¡La cosa está que arde!",
                "advacement.iron_pick": "¿No es hierrónico?",
                "advacement.not_today": "Hoy no, gracias",
                "advacement.obsidian": "Mente fría",
                "advacement.diamonds": "¡Diamantes!",
                "advacement.nether": "Plus ultra",
                "advacement.diamods_armor": "Cúbreme de diamantes",
                "advacement.zombie_doctor": "Zombiólogo",
                "advacement.the_end": "¿Se acabó?",
                "advacement.return_sender": "Devolver al remitente",
                "advacement.debris": "Escondido en las profundidades",
                "advacement.crying_obsi": "¿Quién está cortando cebollas?",
                "advacement.ghast_over": "Falsa alianza",
                "advacement.netherite": "Cúbreme de netherita",
                "advacement.wither_skull": "Por una cabeza",
                "advacement.blaze": "Jugando con fuego",
                "advacement.wither": "Dr. Witherstein",
                "advacement.beacon": "Faroneitor",
                "advacement.all_effects": "Mezcla explosiva",
                "advacement.free_end": "Libera el End",
                "advacement.next_generation": "La nueva generación",
                "advacement.mint": "¡Qué mal aliento!",
                "advacement.shulker": "La ciudad al final del juego",
                "advacement.elytra": "Hasta el infinito... ¡y más allá!",
                "advacement.bad_omen": "Exilio voluntario",
                "advacement.compass_block": "Magnetita, llévame a casita",
                "advacement.monster_hunter": "Monster Hunter",
                "advacement.dreams": "Dulces sueños",
                "advacement.hero_village": "Héroe de la aldea",
                "advacement.trident": "Jugada maestra",
                "advacement.bow": "¡Diana!",
                "advacement.totem": "Post mortem",
                "advacement.pillager_now": "El saqueador saqueado",
                "advacement.sniper_duel": "Francocazadores",
                "advacement.bullseye": "En el blanco",
                "advacement.under_lock": "Bajo llave",
                "advacement.revault": "La caja de Pandora",
                "advacement.blowback": "Contrarresto",
                "advacement.hydrated": "¡Mantente hidratado!",
                "advacement.bee_guest": "¡Adelante, esta es tu casa!",
                "advacement.bukki": "Renacuajo al cubo",
                "advacement.sniffer": "Huele interesante",
                "advacement.tactical_fish": "Pesca táctica",
                "advacement.little_sniffs": "Little Sniffs",
                "advacement.serius_dedication": "Pequeños olfateos",
                "advacement.wax_off": "Pulir cera",
                "advacement.axolotl": "El depredador más adorable",
                "advacement.all_frogs": "¡Uniendo nuestras fuerzas!",
                "advacement.infernal_crown": "Domando al Nether",
                "advacement.hoglin_tusk": "El Depredador Alfa",
                "advacement.cautious_armor": "Domando la Cautela",
                "advacement.backrooms": "Una visita a los backrooms",
                "advacement.garfield": "Superando los 70",
                "advacement.ha": "¡Hey, es HaJuegos!",
                "advacement.royer": "¡Pero si es BigRoyer!",
                "advacement.convex": "Sorprendentemente, ¡ha llegado Convex!",
                "advacement.riding_llama": "Domando a la bestia"
            },
            english: {
                "chat.advan.normal_base": "%1 has made the advancement §a[%2]§r",
                "chat.advan.rare_base": "%1 has completed the challenge §5[%2]§r",

                "advacement.wood_pick": "Stone Age",
                "advacement.stone_pick": "Getting an Upgrade",
                "advacement.iron_ingot": "Acquire Hardware",
                "advacement.suit_up": "Suit Up",
                "advacement.hot_stuff": "Hot Stuff",
                "advacement.iron_pick": "Isn't It Iron Pick",
                "advacement.not_today": "Not Today, Thank You",
                "advacement.obsidian": "Ice Bucket Challenge",
                "advacement.diamonds": "Diamonds!",
                "advacement.nether": "We Need to Go Deeper",
                "advacement.diamods_armor": "Cover Me with Diamonds",
                "advacement.zombie_doctor": "Zombie Doctor",
                "advacement.the_end": "The End?",
                "advacement.return_sender": "Return to Sender",
                "advacement.debris": "Hidden in the Depths",
                "advacement.crying_obsi": "Who is Cutting Onions?",
                "advacement.ghast_over": "Uneasy Alliance",
                "advacement.netherite": "Cover Me in Debris",
                "advacement.wither_skull": "Spooky Scary Skeleton",
                "advacement.blaze": "Into Fire",
                "advacement.wither": "Withering Heights",
                "advacement.beacon": "Beaconator",
                "advacement.all_effects": "A Furious Cocktail",
                "advacement.free_end": "Free the End",
                "advacement.next_generation": "The Next Generation",
                "advacement.mint": "You Need a Mint",
                "advacement.shulker": "The City at the End of the Game",
                "advacement.elytra": "Sky's the Limit",
                "advacement.bad_omen": "Voluntary Exile",
                "advacement.compass_block": "Country Lode, Take Me Home",
                "advacement.monster_hunter": "Monster Hunter",
                "advacement.dreams": "Sweet Dreams",
                "advacement.hero_village": "Hero of the Village",
                "advacement.trident": "A Throwaway Joke",
                "advacement.bow": "Take Aim",
                "advacement.totem": "Postmortal",
                "advacement.pillager_now": "Who's the Pillager Now?",
                "advacement.sniper_duel": "Sniper Duel",
                "advacement.bullseye": "Bullseye",
                "advacement.under_lock": "Under Lock and Key",
                "advacement.revault": "Revaulting",
                "advacement.blowback": "Blowback",
                "advacement.hydrated": "Stay Hydrated!",
                "advacement.bee_guest": "Bee Our Guest",
                "advacement.bukki": "Bukkit Bukkit",
                "advacement.sniffer": "Smells Interesting",
                "advacement.tactical_fish": "Tactical Fishing",
                "advacement.little_sniffs": "Little Sniffs",
                "advacement.serius_dedication": "Serious Dedication",
                "advacement.wax_off": "Wax Off",
                "advacement.axolotl": "The Cutest Predator",
                "advacement.all_frogs": "With Our Powers Combined!",
                "advacement.infernal_crown": "Conquering the Nether",
                "advacement.hoglin_tusk": "The Alpha Predator",
                "advacement.cautious_armor": "Overcoming Caution",
                "advacement.backrooms": "A Tour of the Backrooms",
                "advacement.garfield": "Leaving the 70s Behind",
                "advacement.ha": "Hey, it's HaJuegos!",
                "advacement.royer": "Look who it is, BigRoyer!",
                "advacement.convex": "Shockingly, Convex has arrived!",
                "advacement.riding_llama": "Taming the Beast"
            }
        }
    }
]);