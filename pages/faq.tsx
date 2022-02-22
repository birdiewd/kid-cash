import {
	Box,
	Heading,
	Link,
	UnorderedList,
	ListItem,
	Flex,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { BiArrowBack } from 'react-icons/bi'

const Note = ({ children }) => (
	<span style={{ color: 'red', fontWeight: 'bold' }}>{children}</span>
)
const Spread = () => (
	<div
		style={{
			margin: '0 .5rem',
			borderBottom: '1px dashed #aaaaaa',
			flexGrow: 1,
			height: '1.2rem',
		}}
	></div>
)

const SignIn = () => {
	return (
		<Box padding={'3rem'}>
			<NextLink href={'/'} passHref>
				<Link color={'blue.500'} display="flex">
					<BiArrowBack size="1.6rem" /> Back to KidCash
				</Link>
			</NextLink>
			<Heading as="h2" my={'1rem'}>
				KidCash Rewards &amp; Responsibilities
			</Heading>
			<Box>Base Allowance: $10/week</Box>
			<br />
			<Box>
				<strong>Earn more money $$$</strong>
			</Box>
			<Box mx={'1rem'}>
				<UnorderedList>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								Properly complete all chores<Note>*</Note> on
								time every day for the week
							</span>
							<Spread />
							+$5
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								Properly complete 3 or more chores<Note>*</Note>{' '}
								on time for the week
							</span>
							<Spread />
							+$3
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								Shower<Note>**</Note> every weekday
							</span>
							<Spread />
							+$5
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								Unload the dishwasher and put away clean dishes
								(5 available per week)
							</span>
							<Spread />
							+$5
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								Wash, dry, and put away your bedsheets; remake
								bed
							</span>
							<Spread />
							+$5
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>Wash, dry, and put away towel laundry</span>
							<Spread />
							+$5
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								Have phone charged at least 50% and with you at
								school
							</span>
							<Spread />
							+$1
						</Flex>
					</ListItem>
				</UnorderedList>
			</Box>
			<br />
			<Box>
				<strong>Be careful not to lose money :(</strong>
			</Box>
			<Box mx={'1rem'}>
				<UnorderedList>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								Up past bedtime<Note>***</Note> on a school
								night
							</span>
							<Spread />
							-$2
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>Slamming a door in the house</span>
							<Spread />
							-$5
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								Skipping more than 1 day of showers in a row
							</span>
							<Spread />
							-$2
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								Leaving food on the floor, counter, couch, or
								coffee table<Note>****</Note>
							</span>
							<Spread />
							-$1
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								Leaving personal items in public areas (wallets,
								socks, backpacks, etc.)
							</span>
							<Spread />
							-$1
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>Taking food into your bedroom</span>
							<Spread />
							-$2
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								Unable to reach us due to not having your phone
								on your or your phone not being charged
							</span>
							<Spread />
							-$1
						</Flex>
					</ListItem>
				</UnorderedList>
			</Box>
			<br />
			<Box>
				<strong>Quarterly bonuses !!!</strong>
			</Box>
			<Box mx={'1rem'}>
				<UnorderedList>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>All A's on a quarterly report card</span>
							<Spread />
							+$50
						</Flex>
					</ListItem>
					<ListItem>
						<Flex justifyContent={'space-between'}>
							<span>
								All A's and B's on a quarterly report card
							</span>
							<Spread />
							+$25
						</Flex>
					</ListItem>
				</UnorderedList>
			</Box>
			<br />
			<Box>
				<strong>How much you can earn :)</strong>
			</Box>
			<Box mx={'1rem'}>
				<UnorderedList>
					<ListItem>Up to $50 every week!</ListItem>
					<ListItem>About $215 every month!</ListItem>
					<ListItem>As much as $2,800 per year!</ListItem>
				</UnorderedList>
			</Box>
			<br />
			<Box>
				<Heading as="h3" size={'lg'} my={'1rem'}>
					Details
				</Heading>

				<Box mb={'1rem'}>
					<strong>
						<Note>*</Note> Chores:
					</strong>
					<Box mx={'1rem'}>
						Chores are to be completed by 8pm.
						<Box mx={'1rem'}>
							<UnorderedList>
								<ListItem>
									<strong>Monday</strong>
									<Box>
										Counter tops.
										<br />
										<u>Mara</u> has the Ferry and the
										Island.
										<br />
										<u>Simon</u> has the toaster oven,
										stove, and side of the sink.
									</Box>
								</ListItem>
								<ListItem>
									<strong>Tuesday</strong>
									<Box>
										Bedrooms picked up and vacuumed. All
										beds tucked away.
									</Box>
								</ListItem>
								<ListItem>
									<strong>Wednesday</strong>
									<Box>
										Floors swept.
										<br />
										<u>Area 1</u> is the kitchen.
										<br />
										<u>Area 2</u> is the stairs and foyer.
									</Box>
								</ListItem>
								<ListItem>
									<strong>Thursday</strong>
									<Box>
										Bathrooms cleaned.
										<br />
										<u>Bathroom 1</u> is the upstairs
										bathroom.
										<br />
										<u>Bathroom 2</u> is the downstairs
										bathroom.
									</Box>
								</ListItem>
								<ListItem>
									<strong>Friday</strong>
									<Box>
										Laundry is washed, dried, folded, put
										away, and the laundry basket is returned
										to the laundry room.
									</Box>
								</ListItem>
							</UnorderedList>
						</Box>
					</Box>
				</Box>

				<Box mb={'1rem'}>
					<strong>
						<Note>**</Note> Showers:
					</strong>
					<Box mx={'1rem'}>Showers are to be completed by 9pm.</Box>
				</Box>

				<Box mb={'1rem'}>
					<Box>
						<strong>
							<Note>***</Note> Bedtime:
						</strong>
					</Box>
					<Box mx={'1rem'}>
						<UnorderedList>
							<ListItem>
								<u>Mara</u> will place her iPad in the hallway
								between the hours of 10 p.m. and 7 a.m. on
								weekdays to indicate that she is resting.
							</ListItem>
							<ListItem>
								<u>Simon</u> will be off the computer between
								the hours of 11 p.m. and 7 a.m. on weekdays to
								indicate that he is resting. This reduces noise
								at night and respectfully allows others to get
								sleep.
							</ListItem>
							<ListItem>
								Weekdays = Sunday night through Thursday night.
							</ListItem>
						</UnorderedList>
					</Box>
				</Box>

				<Box mb={'1rem'}>
					<strong>
						<Note>****</Note> Food:
					</strong>
					<Box mx={'1rem'}>
						Food should only be eaten in the kitchen and dining room
						areas with the following exceptions that may be eaten in
						the TV room:
						<Box mx={'1rem'}>
							<UnorderedList>
								<ListItem>
									Popcorn, chips, nuts in a dish
								</ListItem>
								<ListItem>
									Water, other beverages in closed containers
								</ListItem>
								<ListItem>
									Dry snacks in a container (no meals in TV
									room)
								</ListItem>
							</UnorderedList>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box>
				<strong>
					<em>Welcome to KidCash!</em>
				</strong>
			</Box>
		</Box>
	)
}

export default SignIn
