import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { UserLevels } from '../lib/constants'

import AppContext from '../AppContext'
import { supabaseClient } from '../lib/client'
import customTheme from '../lib/theme'
import moment from 'moment'

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter()
	const user = supabaseClient.auth.user()

	const [kidData, setKidData] = useState<Record<string, string>[] | null>([])
	const [kidFilter, setKidFilter] = useState<string | null>(null)
	const [eventData, setEventData] = useState<Record<string, string>[] | null>(
		[]
	)
	const [eventConfigs, setEventConfigs] = useState<
		Record<string, string>[] | null
	>([])
	const [userLevel, setUserLevel] = useState<UserLevels | null>()
	const [editEventId, setEditEventId] = useState<number | null>()
	const [week, setWeek] = useState(0)

	const getKids = async () => {
		const { data: kids, error } = await supabaseClient
			.from('kids')
			.select('*')
			.is('is_active', true)

		if (kids?.map(({ user_id }) => user_id).includes(user?.id)) {
			setUserLevel(UserLevels.kid)
		} else {
			setUserLevel(UserLevels.parent)
		}

		if (error) {
			console.log('kids fetch error', error)
		} else {
			setKidData(kids)
		}
	}

	const getEventConfigs = async () => {
		const { data: configs, error } = await supabaseClient
			.from('tasks')
			.select('*')
			.is('is_active', true)
			.order('name')

		if (error) {
			console.log('event configs fetch error', error)
		} else {
			setEventConfigs(configs)
		}
	}

	const getEvents = async () => {
		const { data: events, error } = await supabaseClient
			.from('kid_tasks')
			.select('*')
			.is('is_active', true)
			.gte(
				'date',
				moment().add(week, 'weeks').startOf('week').format('YYYY-MM-DD')
			)
			.lte(
				'date',
				moment().add(week, 'weeks').endOf('week').format('YYYY-MM-DD')
			)
			.order('date')
			.order('kid_id')
			.order('task_id')

		if (error) {
			console.log('kid event fetch error', error)
		} else {
			setEventData(events)
		}
	}

	const getEvent = (eventId: number) =>
		eventData?.find((event) => parseInt(event.id, 10) === eventId)

	const unAuthedPathes = ['/signin', '/recover', '/reset', '/signup']

	useEffect(() => {
		getEvents()
	}, [week])

	useEffect(() => {
		if (!user && !unAuthedPathes.includes(router.pathname)) {
			router.push('/signin')
		} else {
			getKids()
			getEventConfigs()
			getEvents()
		}
	}, [user, router])

	useEffect(() => {
		const { data: authListener } = supabaseClient.auth.onAuthStateChange(
			(event) => {
				if (event === 'PASSWORD_RECOVERY') {
					router.push('/reset')
				}

				if (event === 'SIGNED_OUT') {
					router.push('/signin')
				}

				if (event === 'SIGNED_IN') {
					if (router.pathname !== '/reset') {
						const signedInUser = supabaseClient.auth.user()
						const userId = signedInUser?.id
						supabaseClient
							.from('profiles')
							.upsert({ id: userId })
							.then((_data, error) => {
								if (!error) {
									router.push('/')
								}
							})
					}
				}
			}
		)

		return () => {
			authListener?.unsubscribe()
		}
	}, [router])

	useEffect(() => {
		if (user) {
			if (router.pathname === '/signin') {
				router.push('/')
			}
		}
	}, [router.pathname, user, router])

	return (
		<AppContext.Provider
			value={{
				state: {
					user,
					userLevel,
					kidData,
					kidFilter,
					eventConfigs,
					editEventId,
					eventData,
					week,
				},
				getEvents,
				getEvent,
				setEditEventId,
				setKidFilter,
				setWeek,
			}}
		>
			<ChakraProvider theme={customTheme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</AppContext.Provider>
	)
}

export default MyApp
