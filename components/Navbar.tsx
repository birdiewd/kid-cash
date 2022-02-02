import { Box, Button, ButtonGroup, Flex, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { MouseEventHandler, useState } from 'react'
import { useContext } from 'react'

import AppContext from '../AppContext'
import { supabaseClient } from '../lib/client'

const Navbar = ({ onOpen }: { onOpen: CallableFunction }) => {
	const {
		state: { isAdmin, kidData },
	} = useContext(AppContext)

	const router = useRouter()
	const [isLogoutLoading, setIsLogoutLoading] = useState(false)

	const logoutHandler = async () => {
		try {
			setIsLogoutLoading(true)
			await supabaseClient.auth.signOut()
			router.push('/signin')
		} catch (error) {
			router.push('/signin')
		} finally {
			setIsLogoutLoading(false)
		}
	}

	return (
		<Box height="100%" p="5" bg="gray.100">
			<Box maxW="6xl" mx="auto">
				<Flex
					as="nav"
					aria-label="Site navigation"
					align="center"
					justify="space-between"
				>
					<Heading mr="4">KidCash Rewards</Heading>
					<Box>
						<ButtonGroup spacing="4" ml="6">
							{isAdmin && (
								<Button
									colorScheme="blue"
									onClick={
										onOpen as MouseEventHandler<HTMLButtonElement>
									}
								>
									Add Event
								</Button>
							)}
							<Button
								colorScheme="red"
								onClick={logoutHandler}
								isLoading={isLogoutLoading}
							>
								Logout
							</Button>
						</ButtonGroup>
					</Box>
				</Flex>
			</Box>
		</Box>
	)
}

export default Navbar
