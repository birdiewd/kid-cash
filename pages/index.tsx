import Head from 'next/head'
import React, { useMemo, useState } from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import {
	Badge,
	Box,
	Flex,
	Grid,
	GridItem,
	Heading,
	IconButton,
} from '@chakra-ui/react'
import {
	BiAlarm,
	BiChevronLeft,
	BiChevronRight,
	BiPencil,
} from 'react-icons/bi'
import { useContext } from 'react'

import AppContext from '../AppContext'
import Navbar from '../components/Navbar'
import ManageEvent from '../components/ManageEvent'
import moment from 'moment'
import { UserLevels } from '../lib/constants'

const Home = () => {
	const {
		state: { kidData, kidFilter, userLevel, eventConfigs, eventData, user },
		setEditEventId,
	} = useContext(AppContext)

	const {
		isOpen: isEventOpen,
		onOpen: onEventOpen,
		onClose: onEventClose,
	} = useDisclosure()

	const [week, setWeek] = useState(0)

	const weekDays = useMemo(
		() =>
			Array(7)
				.fill(0)
				.map((day, dayIndex) =>
					moment()
						.startOf('week')
						.add(week, 'weeks')
						.add(dayIndex, 'days')
				),
		[week]
	)

	const filteredEvents = useMemo(() => {
		if (user?.id) {
			return eventData.filter((event) => {
				if (userLevel === UserLevels.kid) {
					return event.kid_id === user.id
				}

				if (kidFilter !== null) {
					return event.kid_id === kidFilter
				}

				return true
			})
		} else {
			return []
		}
	}, [eventData, userLevel, kidFilter, user])

	return (
		<Box
			fontSize={{
				base: '14px',
				md: '16px',
			}}
		>
			<Head>
				<title>KidCash Rewards</title>
				<meta name="description" content="Make money money." />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Grid>
				<GridItem>
					<Navbar onEventOpen={onEventOpen} />
				</GridItem>
				<GridItem>
					<Flex gap=".5rem" margin=".5rem" justifyContent={'center'}>
						<IconButton
							aria-label="Go back a week"
							icon={<BiChevronLeft size={'2rem'} />}
							colorScheme="green"
							onClick={() => setWeek(week - 1)}
						/>
						<IconButton
							aria-label="Go to this week"
							icon={<BiAlarm size={'2rem'} />}
							colorScheme="blue"
							disabled={week === 0}
							onClick={() => setWeek(0)}
						/>
						<IconButton
							aria-label="Go back a week"
							icon={<BiChevronRight size={'2rem'} />}
							colorScheme="green"
							disabled={week === 0}
							onClick={() => setWeek(week + 1 > 0 ? 0 : week + 1)}
						/>
					</Flex>
				</GridItem>

				<GridItem>
					<Grid
						gridTemplateColumns={{
							md:
								userLevel === UserLevels.parent
									? '1fr 1fr 2fr 1fr auto'
									: '1fr 1fr 2fr 1fr',
							base: '1fr 1fr',
						}}
						gap={{ base: '.25rem', md: '.5rem' }}
						m={'1rem'}
					>
						{weekDays.map((weekDay) => (
							<React.Fragment key={weekDay.format('YYYY-MM-DD')}>
								<GridItem
									colSpan={{
										base: 2,
										md:
											userLevel === UserLevels.parent
												? 5
												: 4,
									}}
									borderTop="solid transparent 3px"
									borderTopColor={'gray.200'}
									marginTop={'.rem'}
									paddingTop={'.5rem'}
								>
									<Heading size={'md'}>
										{moment(weekDay).format(
											'YYYY-MM-DD - dddd'
										)}
									</Heading>
								</GridItem>

								{filteredEvents
									.filter(
										(event) =>
											event.date ===
											moment(weekDay).format('YYYY-MM-DD')
									)
									.map((event) => (
										<React.Fragment key={event.id}>
											<GridItem
												colSpan={{
													base: 2,
													md:
														userLevel ===
														UserLevels.parent
															? 5
															: 4,
												}}
											>
												<hr />
											</GridItem>
											<GridItem>
												<u>
													{
														kidData.find(
															({ user_id }) =>
																user_id ===
																event.kid_id
														)?.name
													}
												</u>
											</GridItem>
											<GridItem>
												{
													eventConfigs.find(
														({ id }) =>
															id === event.task_id
													)?.name
												}
											</GridItem>
											<GridItem
												colSpan={{ base: 2, md: 1 }}
											>
												{event.description}
											</GridItem>
											<GridItem
												colSpan={{
													base:
														userLevel ===
														UserLevels.parent
															? 1
															: 2,
													md: 1,
												}}
											>
												{eventConfigs.find(
													({ id }) =>
														id === event.task_id
												)?.direction > 0 ? (
													<Badge
														colorScheme={'green'}
														fontSize=".8em"
													>
														Addition
													</Badge>
												) : (
													<Badge
														colorScheme={'red'}
														fontSize=".8em"
													>
														Deduction
													</Badge>
												)}
											</GridItem>
											{userLevel ===
												UserLevels.parent && (
												<GridItem
													color={'blue.500'}
													onClick={() => {
														setEditEventId(event.id)
														onEventClose()
													}}
													justifySelf={'flex-end'}
												>
													<BiPencil size={'1.5rem'} />
												</GridItem>
											)}
										</React.Fragment>
									))}
							</React.Fragment>
						))}
					</Grid>
				</GridItem>
			</Grid>
			<ManageEvent isOpen={isEventOpen} onClose={onEventClose} />
		</Box>
	)
}

export default Home
