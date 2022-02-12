import {
	Alert,
	AlertIcon,
	Box,
	Button,
	chakra,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	List,
	Link,
	UnorderedList,
	ListItem,
	Flex,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { BiArrowBack } from 'react-icons/bi'

const SignIn = () => {
	return (
		<Box padding={'3rem'}>
			<NextLink href={'/'} passHref>
				<Link color={'blue.500'} display="flex">
					<BiArrowBack size="1.6rem" /> Back to KidCash
				</Link>
			</NextLink>
			<Heading as="h2" mt={'1rem'}>
				<span>KidCash Rewards &amp; Responsibilities</span>
			</Heading>
			<Box>
				<span>Base Allowance: $10/week</span>
			</Box>
			<Box>&nbsp;</Box>
			<Box>
				<strong>Earn more money $$$</strong>
			</Box>
			<Box mx={'1rem'}>
				<UnorderedList>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								Properly complete all chores on time every day
								for the week
							</span>{' '}
							<span>+$5</span>
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								Properly complete 3 or more chores on time for
								the week
							</span>{' '}
							<span>+$3</span>
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>Shower every weekday</span> <span>+$5</span>
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								Unload the dishwasher and put away clean dishes
								(5 available per week)
							</span>{' '}
							<span>+$5</span>
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								Wash, dry, and put away your bedsheets; remake
								bed
							</span>{' '}
							<span>+$5</span>
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>Wash, dry, and put away towel laundry</span>{' '}
							<span>+$5</span>
						</Flex>
					</ListItem>
				</UnorderedList>
			</Box>
			<Box>&nbsp;</Box>
			<Box>
				<strong>Be careful not to lose money :(&nbsp;</strong>
			</Box>
			<Box mx={'1rem'}>
				<UnorderedList>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								Up past bedtime on a school night *please see
								bedtime details
							</span>{' '}
							<span>-$2</span>
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>Slamming a door in the house</span>{' '}
							<span>-$5</span>
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								Skipping more than 1 day of showers in a row
							</span>{' '}
							<span>-$2</span>
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								Leaving food on the floor, counter, couch, or
								coffee table **see details
							</span>{' '}
							<span>-$1</span>
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								Leaving personal items in public areas (wallets,
								socks, backpacks, etc.)
							</span>{' '}
							<span>-$1</span>
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>Taking food into your bedroom</span>{' '}
							<span>-$2</span>
						</Flex>
					</ListItem>
				</UnorderedList>
			</Box>
			<Box>&nbsp;</Box>
			<Box>
				<strong>Quarterly bonuses !!!</strong>
			</Box>
			<Box mx={'1rem'}>
				<UnorderedList>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								All A&rsquo;s on a quarterly report card
							</span>{' '}
							<span>+$50</span>
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								All A&rsquo;s and B&rsquo;s on a quarterly
								report card
							</span>{' '}
							<span>+$25</span>
						</Flex>
					</ListItem>
				</UnorderedList>
			</Box>
			<Box>&nbsp;</Box>
			<Box>
				<strong>How much you can earn :)&nbsp;</strong>
			</Box>
			<Box mx={'1rem'}>
				<UnorderedList>
					<ListItem>
						<span>Up to $50 every week!</span>
					</ListItem>
					<ListItem>
						<span>About $215 every month!</span>
					</ListItem>
					<ListItem>
						<span>As much as $2,800 per year!</span>
					</ListItem>
				</UnorderedList>
			</Box>
			<Box>&nbsp;</Box>
			<Box>
				<strong>Details</strong>
			</Box>
			<Box>
				<span>*Bedtime:&nbsp;</span>
			</Box>
			<Box>
				<u>Mara</u>
				<span>
					{' '}
					will place her iPad in the hallway between the hours of 10
					p.m. and 7 a.m. on weekdays to indicate that she is resting.{' '}
				</span>
				<u>Simon</u>
				<span>
					{' '}
					will be off the computer between the hours of 11 p.m. and 7
					a.m. on weekdays to indicate that he is resting. This
					reduces noise at night and respectfully allows others to get
					sleep. Weekdays = Sunday night through Thursday night.
				</span>
			</Box>
			<Box>&nbsp;</Box>
			<Box>
				<span>**Food:</span>
			</Box>
			<Box>
				<span>
					Food should only be eaten in the kitchen and dining room
					areas with the following exceptions that may be eaten in the
					TV room:
				</span>
			</Box>
			<Box mx={'1rem'}>
				<UnorderedList>
					<ListItem>
						<span>Popcorn, chips, nuts in a dish</span>
					</ListItem>
					<ListItem>
						<span>Water, other beverages in closed containers</span>
					</ListItem>
					<ListItem>
						<span>
							Dry snacks in a container (no meals in TV room)
						</span>
					</ListItem>
				</UnorderedList>
			</Box>
			<Box>&nbsp;</Box>
			<Box>
				<strong>
					<em>Welcome to KidCash!</em>
				</strong>
			</Box>
		</Box>
	)
}

export default SignIn
