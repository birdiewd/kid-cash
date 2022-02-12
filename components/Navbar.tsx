import {
	Box,
	ButtonGroup,
	Flex,
	Heading,
	IconButton,
	Select,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { MouseEventHandler, useState } from 'react'
import { useContext } from 'react'
import { UserLevels } from '../lib/constants'

import AppContext from '../AppContext'
import { supabaseClient } from '../lib/client'
import { BiLockOpen, BiPlus } from 'react-icons/bi'

const Navbar = ({ onEventOpen }: { onEventOpen: CallableFunction }) => {
	const {
		state: { userLevel, kidData, kidFilter },
		setKidFilter,
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
		<Box height={'5rem'}>
			<Flex
				as="nav"
				aria-label="Site navigation"
				align="center"
				justify="space-between"
				width="100%"
				pos={'fixed'}
				height={'5rem'}
				bg="gray.100"
				padding={'1rem'}
				zIndex="1"
			>
				<Heading
					as="h1"
					fontSize={{
						base: '1.2rem',
						md: '2rem',
					}}
				>
					KidCash Rewards
				</Heading>
				<Box>
					<ButtonGroup spacing=".5rem">
						{userLevel === UserLevels.parent && (
							<>
								<Select
									placeholder="All"
									value={kidFilter}
									onChange={(event) =>
										setKidFilter(
											event.currentTarget.value.length
												? event.currentTarget.value
												: null
										)
									}
								>
									{kidData.map((kid, index) => (
										<option
											key={`select-kid-${index}`}
											value={kid.user_id}
										>
											{kid.name}
										</option>
									))}
								</Select>
								<IconButton
									aria-label="Add an event"
									icon={<BiPlus size={'2rem'} />}
									colorScheme="green"
									onClick={
										onEventOpen as MouseEventHandler<HTMLButtonElement>
									}
								/>
							</>
						)}
						<IconButton
							aria-label="Add an event"
							icon={<BiLockOpen size={'2rem'} />}
							colorScheme="red"
							onClick={logoutHandler}
							isLoading={isLogoutLoading}
						/>
					</ButtonGroup>
				</Box>
			</Flex>
		</Box>
	)
}

export default Navbar
