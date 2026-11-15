import { BPEntityComponents, BPEntityTemplates } from "simplified-mojang-jsons";

export const PhantomEntity = BPEntityTemplates.PhantomTemplate({
    remove: {
        components: [
            "minecraft:burns_in_daylight",
            "minecraft:hurt_on_condition"
        ]
    },
    add: {
        components: [
            new BPEntityComponents.SetFireImmune()
        ]
    }
});