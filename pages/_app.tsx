import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import moment from 'moment'

import AppContext from '../AppContext'
import { supabaseClient } from '../lib/client'
import customTheme from '../lib/theme'

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter()
	const user = supabaseClient.auth.user()

	// const [starData, setStarData] = useState([])
	const [kidData, setKidData] = useState([])
	// const [relationshipData, setRelationshipData] = useState([])

	const getKids = async () => {
		const { data: kids, error } = await supabaseClient
			.from('kids')
			.select('*')
			.is('is_active', true)

		console.log({ kids })

		if (error) {
			console.log('star fetch error', error)
		} else {
			setKidData(kids)
		}
	}

	const unAuthedPathes = ['/signin', '/recover', '/reset', '/signup']

	useEffect(() => {
		if (!user && !unAuthedPathes.includes(router.pathname)) {
			router.push('/signin')
		} else {
			getKids()
		}
	}, [user, router])

	const isAdmin = useMemo(
		() => !kidData.map((kid) => kid.user_id).includes(user?.id),
		[kidData, user]
	)

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

	console.log({ user })

	return (
		<AppContext.Provider
			value={{
				state: {
					// relationshipData,
					// starData,
					isAdmin,
					kidData,
					// user,
				},
			}}
		>
			<ChakraProvider theme={customTheme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</AppContext.Provider>
	)
}

export default MyApp
