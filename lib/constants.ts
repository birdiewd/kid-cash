import moment from 'moment'

export enum UserLevels {
	'parent',
	'kid',
}

export const AdditionIds = {
	Chores: 1,
	Shower: 2,
	Phone: 14,
	Dishwasher: 3,
	Sheets: 4,
	Towels: 11,
	QuarterlyA: 12,
	QuarterlyB: 13,
}

export const DeductionIds = {
	Bedtime: 5,
	DoorSlam: 6,
	PublicFood: 7,
	PublicItems: 8,
	BedroomFood: 9,
	Shower: 10,
	Phone: 15,
}

export const moneyRules = {
	additions: [
		{
			id: AdditionIds.Chores,
			dollar: 5,
			rule: (events): number => {
				if (events.length === 5) {
					return 5
				}
				if (events.length >= 3) {
					return 3
				}

				return 0
			},
		},
		{
			id: AdditionIds.Shower,
			dollar: 5,
			rule: (events): number => {
				if (events.length === 5) {
					return 5
				}

				return 0
			},
		},
		{
			id: AdditionIds.Dishwasher,
			dollar: 5,
			rule: (events): number => {
				return events.length * 5
			},
		},
		{
			id: AdditionIds.Sheets,
			dollar: 5,
			rule: (events): number => {
				return events.length * 5
			},
		},
		{
			id: AdditionIds.Towels,
			dollar: 5,
			rule: (events): number => {
				return events.length * 5
			},
		},
		{
			id: AdditionIds.QuarterlyA,
			dollar: 50,
			rule: (events): number => {
				return events.length * 50
			},
		},
		{
			id: AdditionIds.QuarterlyB,
			dollar: 25,
			rule: (events): number => {
				return events.length * 25
			},
		},
		{
			id: AdditionIds.Phone,
			dollar: 1,
			rule: (events): number => {
				return events.length * 1
			},
		},
	],
	deductions: [
		{
			id: DeductionIds.Bedtime,
			dollar: 2,
			rule: (events): number => {
				return events.length * 2
			},
		},
		{
			id: DeductionIds.DoorSlam,
			dollar: 5,
			rule: (events): number => {
				return events.length * 5
			},
		},
		{
			id: DeductionIds.PublicFood,
			dollar: 1,
			rule: (events): number => {
				return events.length * 1
			},
		},
		{
			id: DeductionIds.PublicItems,
			dollar: 1,
			rule: (events): number => {
				return events.length * 1
			},
		},
		{
			id: DeductionIds.BedroomFood,
			dollar: 2,
			rule: (events): number => {
				return events.length * 2
			},
		},
		{
			id: DeductionIds.Shower,
			dollar: 2,
			rule: (events): number => {
				const consecDays = events.filter((event, index) => {
					if (index === events.length - 1) {
						return false
					}

					return (
						moment(event.date).format('YYYY-MM-DD') ===
						moment(events[index + 1].date)
							.add(-1, 'day')
							.format('YYYY-MM-DD')
					)
				})

				const consecDaysNoDups = consecDays.reduce(
					(noDups, event, index) => {
						if (index === 0) {
							noDups.push(event)
						} else if (
							moment(noDups[noDups.length - 1].date).format(
								'YYYY-MM-DD'
							) !==
							moment(event.date)
								.add(-1, 'day')
								.format('YYYY-MM-DD')
						) {
							noDups.push(event)
						}

						return noDups
					},
					[]
				)

				return consecDaysNoDups.length * 2
			},
		},
		{
			id: DeductionIds.Phone,
			dollar: 1,
			rule: (events): number => {
				return events.length * 1
			},
		},
	],
}
