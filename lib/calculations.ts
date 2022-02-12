import { moneyRules } from './constants'

export const calculateWeek = (events) => {
	const kidIds = events
		.map((event) => event.kid_id)
		.reduce((unique: string[], id: string) => {
			if (!unique.includes(id)) {
				unique.push(id)
			}

			return unique
		}, [])

	const kidMoneys = kidIds.reduce((kidMoney, kidId) => {
		const plus = moneyRules.additions
			.map((rule) => {
				return rule.rule(
					events
						.filter((event) => event.kid_id === kidId)
						.filter((event) => event.task_id === rule.id)
				)
			})
			.reduce((sum, amount) => sum + amount, 0)

		const minus = moneyRules.deductions
			.map((rule) => {
				return rule.rule(
					events
						.filter((event) => event.kid_id === kidId)
						.filter((event) => event.task_id === rule.id)
				)
			})
			.reduce((sum, amount) => sum + amount, 0)

		kidMoney[kidId] = Math.max(10 + plus - minus, 0)

		return kidMoney
	}, {})

	return kidMoneys
}
