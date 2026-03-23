import * as mc from "@minecraft/server";
import * as vanilla from "@minecraft/vanilla-data";

import { TL15DBaseManager } from "../base";
import { afterEventsSimplified } from "simplified-mojang-api";

/**
 * Clase hijo que maneja los eventos principales o mecanicas de las entidades.
 * @extends {TL15DBaseManager}
 * @author HaJuegos - 22-03-2026
 */
class EntityEventsManager extends TL15DBaseManager {
    /**
     * Eventos iniciales de la clase cuando es llamada o inicializada.
     * @constructor
     */
    constructor () {
        super();

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

            if (entity.typeId == vanilla.MinecraftEntityTypes.LightningBolt) {
                const coords = entity.location;
                const dime = entity.dimension;
                const block = dime.getBlock(coords);
                const blockDown = dime.getBlockBelow(coords);

                if ((block && block.typeId.includes(vanilla.MinecraftBlockTypes.LightningRod)) || (blockDown && blockDown.typeId.includes(vanilla.MinecraftBlockTypes.LightningRod))) {
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
        const invPly = ply.getComponent(mc.EntityComponentTypes.Inventory)?.container as mc.Container;
        const armorPly = ply.getComponent(mc.EntityComponentTypes.Equippable) as mc.EntityEquippableComponent;
        const armorSlots = [mc.EquipmentSlot.Head, mc.EquipmentSlot.Chest, mc.EquipmentSlot.Legs, mc.EquipmentSlot.Feet, mc.EquipmentSlot.Offhand];
        const validSlotsEntity = otherEntity.emptySlotsCount;

        const validInvSlots: number[] = [];
        for (let i = 0; i < invPly.size; i++) {
            const item = invPly.getItem(i);

            if (item) {
                validInvSlots.push(i);
            }
        }

        const validArmorSlots: mc.EquipmentSlot[] = [];
        for (const slot of armorSlots) {
            const item = armorPly.getEquipment(slot);

            if (item) {
                validArmorSlots.push(slot);
            }
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

                if (validSlotsEntity > 0) {
                    otherEntity.addItem(item);
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

                if (validSlotsEntity > 0) {
                    otherEntity.addItem(item);
                } else {
                    dime.spawnItem(item, entitySteal.location);
                }

            }
        }
    }
}

new EntityEventsManager();