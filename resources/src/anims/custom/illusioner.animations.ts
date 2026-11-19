import { createRPAnimation, MoLang } from "simplified-mojang-jsons";

const time = `${MoLang.lifeTime()}`;

export const IllusionerAnimations = createRPAnimation({
	animations: [
		{
			idAnimation: "illusioner.clones.idle",
			loop: true,
			bones: {
				main: {
					position: [
						`math.sin(${time} * 180) * 0.4`,
						`math.sin(${time} * 240) * 0.6`,
						`math.cos(${time} * 180) * 0.4`,
					]
				}
			}
		},
		{
			idAnimation: "illusioner.riding.legs",
			loop: true,
			bones: {
				leftleg: {
					rotation: [
						`!${MoLang.property('ha:is_minion')} ? (-81.0 - this) : 0`,
						`!${MoLang.property('ha:is_minion')} ? (-18.0 - this) : 0`,
						"-this"
					]
				},
				rightleg: {
					rotation: [
						`!${MoLang.property('ha:is_minion')} ? (-81.0 - this) : 0`,
						`!${MoLang.property('ha:is_minion')} ? (18.0 - this) : 0`,
						"-this"
					]
				}
			}
		}
	]
});