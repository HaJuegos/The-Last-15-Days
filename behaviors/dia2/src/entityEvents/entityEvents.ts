import * as mc from "@minecraft/server";
import * as vanilla from "@minecraft/vanilla-data";

import { afterEventsSimplified } from "simplified-mojang-api";

/**
 * Clase hijo que maneja los eventos principales o mecanicas de las entidades.
 * @author HaJuegos - 22-03-2026
 */
class EntityEventsManager {
    /**
     * Eventos iniciales de la clase cuando es llamada o inicializada.
     * @constructor
     */
    constructor () {
        this.onHitSystem();
        this.onSpawnEntitysSystem();
    }

    /**
     * Metodo principal donde se maneja las logicas principales cuando una entidad golpea a otra.
     * @author HaJuegos - 23-03-2026 
     * @private
     */
    private onHitSystem(): void {
        afterEventsSimplified.onHitEntity((args) => {
            const hitEntity = args.hitEntity;
            const sourceEntity = args.damagingEntity;

            if (sourceEntity.typeId == vanilla.MinecraftEntityTypes.Fox && (hitEntity instanceof mc.Player)) {
                this.stealItemsSystem(hitEntity, sourceEntity);

                const noDropItems = sourceEntity.getComponent(mc.EntityComponentTypes.IsCharged);

                if (!noDropItems) {
                    sourceEntity.triggerEvent('ha:set_persistance_items');
                }
            }
        });
    }

    /**
     * Metodo principal que maneja las logicas de cuando una entidad spawnea en el mundo.
     * @author HaJuegos - 23-03-2026
     * @private
     */
    private onSpawnEntitysSystem(): void {
        afterEventsSimplified.onEntitySpawns((args) => {
            const entity = args.entity;

            if (!entity.isValid) return;

            if (entity.typeId == vanilla.MinecraftEntityTypes.LightningBolt) {
                const coords = entity.location;
                const dime = entity.dimension;

                let block;
                let blockDown;

                try {
                    block = dime.getBlock(coords);
                    blockDown = dime.getBlockBelow(coords);
                } catch (e) {
                    if (e instanceof Error && e.message.includes("outside of the world boundaries")) {
                        return;
                    }

                    throw e;
                }

                if ((block && block.typeId.includes('lightning_rod')) || (blockDown && blockDown.typeId.includes('lightning_rod'))) {
                    dime.createExplosion(coords, 3, { allowUnderwater: true, breaksBlocks: true });
                }
            }
        });
    };

    /**
     * Metodo auxiliar con la logica de robo de items cuando una entidad golpea a un jugador en concreto.
     * @param {mc.Player} ply Jugador en concreto. 
     * @param {mc.Entity} entitySteal Entidad que va a robar y golpeo.
     * @author HaJuegos - 23-03-2026
     * @private
     */
    private stealItemsSystem(ply: mc.Player, entitySteal: mc.Entity): void {
        const dime = entitySteal.dimension;
        const otherEntity = entitySteal.getComponent(mc.EntityComponentTypes.Inventory)?.container as mc.Container;
        const invPly = ply.getComponent(mc.EntityComponentTypes.Inventory)?.container;
        const armorPly = ply.getComponent(mc.EntityComponentTypes.Equippable);

        if (!invPly || !armorPly) return;

        const validSlotsEntity = otherEntity ? otherEntity.emptySlotsCount : 0;

        const validInvSlots: number[] = [];
        for (let i = 0; i < invPly.size; i++) {
            if (invPly.getItem(i)) {
                validInvSlots.push(i);
            };
        }

        const armorSlots = [mc.EquipmentSlot.Head, mc.EquipmentSlot.Chest, mc.EquipmentSlot.Legs, mc.EquipmentSlot.Feet, mc.EquipmentSlot.Offhand];

        const validArmorSlots: mc.EquipmentSlot[] = [];
        for (const slot of armorSlots) {
            if (armorPly.getEquipment(slot)) {
                validArmorSlots.push(slot);
            };
        }

        if (validInvSlots.length == 0 && validArmorSlots.length == 0) {
            return;
        }

        let targetInventory = Math.random() < 0.5;
        if (validInvSlots.length == 0) targetInventory = false;
        if (validArmorSlots.length == 0) targetInventory = true;

        if (targetInventory) {
            if (validInvSlots.length > 0) {
                const randomIndex = Math.floor(Math.random() * validInvSlots.length);
                const slotSelect = validInvSlots[randomIndex];
                const item = invPly.getItem(slotSelect) as mc.ItemStack;

                invPly.setItem(slotSelect, undefined);

                if (otherEntity && validSlotsEntity > 0) {
                    const leftover = otherEntity.addItem(item);

                    if (leftover) {
                        dime.spawnItem(leftover, entitySteal.location);
                    }
                } else {
                    dime.spawnItem(item, entitySteal.location);
                }
            }
        } else {
            if (validArmorSlots.length > 0) {
                const randomIndex = Math.floor(Math.random() * validArmorSlots.length);
                const slotSelect = validArmorSlots[randomIndex];
                const item = armorPly.getEquipment(slotSelect) as mc.ItemStack;

                armorPly.setEquipment(slotSelect, undefined);

                if (otherEntity && validSlotsEntity > 0) {
                    const leftover = otherEntity.addItem(item);

                    if (leftover) {
                        dime.spawnItem(leftover, entitySteal.location);
                    }
                } else {
                    dime.spawnItem(item, entitySteal.location);
                }
            }
        }
    }
}

new EntityEventsManager();