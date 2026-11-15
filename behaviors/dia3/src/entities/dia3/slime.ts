import { BPEntityComponents, BPEntityTemplates } from "simplified-mojang-jsons";

export const SlimeEntity = BPEntityTemplates.SlimeTemplate({
    add: {
        components: [
            new BPEntityComponents.SetSpellEffects({
                addEffects: [
                    {
                        effect: "jump_boost",
                        duration: "infinite",
                        amplifier: 1,
                        visible: true,
                        ambient: false
                    },
                    {
                        effect: "speed",
                        duration: "infinite",
                        amplifier: 1,
                        visible: true,
                        ambient: false
                    }
                ]
            })
        ]
    }
});