import {
	Alert,
	AlertIcon,
	Button,
	ButtonGroup,
	FormControl,
	FormHelperText,
	FormLabel,
	Modal,
	ModalBody,
	// ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Text,
	Textarea,
} from '@chakra-ui/react'
import { FormEvent, useEffect, useState } from 'react'
import { useContext } from 'react'
import moment, { weekdays } from 'moment'

import AppContext from '../AppContext'
import { supabaseClient } from '../lib/client'

const ManageEvent = ({
	isOpen,
	onClose,
}: // initialRef,
{
	isOpen: CallableFunction | boolean
	onClose: CallableFunction
}) => {
	const {
		state: { kidData, userLevel, eventConfigs, editEventId, kidFilter },
		getEvents,
		getEvent,
		setEditEventId,
	} = useContext(AppContext)

	const [date, setDate] = useState(
		editEventId ? getEvent(editEventId).date : moment().format('YYYY-MM-DD')
	)
	const [kidId, setKidId] = useState<string | null>(
		editEventId ? getEvent(editEventId).kid_id : kidFilter
	)
	const [eventId, setEventId] = useState<string | null>(
		editEventId ? getEvent(editEventId).task_id : null
	)
	const [description, setDescription] = useState(
		editEventId ? getEvent(editEventId).description : ''
	)

	useEffect(() => {
		if (editEventId) {
			setDate(getEvent(editEventId).date)
			setKidId(getEvent(editEventId).kid_id)
			setEventId(getEvent(editEventId).task_id)
			setDescription(getEvent(editEventId).description)
		}
	}, [editEventId])

	useEffect(() => {
		if (!editEventId) {
			setKidId(kidFilter)
		}
	}, [kidFilter, editEventId])

	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const submitHandler = async (event: FormEvent) => {
		event.preventDefault()
		setErrorMessage('')
		setIsLoading(true)
		const { error } = await supabaseClient.from('kid_tasks').upsert([
			{
				id: editEventId || undefined,
				date: date,
				kid_id: kidId,
				task_id: eventId,
				description,
			},
		])

		setIsLoading(false)

		if (error) {
			setErrorMessage(error.message)
		} else {
			getEvents()
			closeHandler()
		}
	}

	const closeHandler = () => {
		setDate(moment().format('YYYY-MM-DD'))
		setKidId(null)
		setEventId(null)
		setDescription('')
		setEditEventId(null)

		onClose()
	}

	const deleteHandler = async () => {
		setErrorMessage('')
		setIsLoading(true)
		const { error } = await supabaseClient.from('kid_tasks').upsert([
			{
				...getEvent(editEventId),
				is_active: false,
			},
		])

		setIsLoading(false)

		if (error) {
			setErrorMessage(error.message)
		} else {
			getEvents()
			closeHandler()
		}
	}

	const weekDays = Array(7)
		.fill(0)
		.map((day, dayIndex) => moment().startOf('week').add(dayIndex, 'days'))

	return (
		<Modal isOpen={isOpen as boolean} onClose={onClose} isCentered>
			<ModalOverlay />
			<ModalContent>
				<form onSubmit={submitHandler}>
					<ModalHeader>
						{editEventId ? 'Edit' : 'Add'} Event
					</ModalHeader>
					<ModalBody pb={6}>
						{errorMessage && (
							<Alert status="error" borderRadius="lg" mb="6">
								<AlertIcon />
								<Text textAlign="center">{errorMessage}</Text>
							</Alert>
						)}

						<FormControl mt={4} isRequired={true}>
							<FormLabel>Date</FormLabel>
							<Select
								placeholder="Date"
								value={date}
								onChange={(event) =>
									setDate(event.currentTarget.value)
								}
							>
								{weekDays.map((weekDay, index) => (
									<option
										key={`select-weekday-${index}`}
										value={weekDay.format('YYYY-MM-DD')}
									>
										{weekDay.format('YYYY-MM-DD - dddd')}
									</option>
								))}
							</Select>
						</FormControl>

						<FormControl mt={4} isRequired={true}>
							<FormLabel>Kid</FormLabel>
							<Select
								placeholder="Pick a kid..."
								value={kidId}
								onChange={(event) =>
									setKidId(event.currentTarget.value)
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
						</FormControl>

						<FormControl mt={4} isRequired={true}>
							<FormLabel>Event</FormLabel>
							<Select
								placeholder="Pick an event..."
								value={eventId}
								color={'white'}
								bg={
									eventId
										? eventConfigs.find(
												({ id }: { id: string }) =>
													id.toString() ===
													eventId.toString()
										  ).direction > 0
											? '#383'
											: '#c33'
										: undefined
								}
								onChange={(event) =>
									setEventId(event.currentTarget.value)
								}
							>
								<optgroup
									label="Good Stuff"
									style={{
										color: 'white',
										background: '#383',
									}}
								>
									{eventConfigs
										.filter(
											({
												direction,
											}: {
												direction: number
											}) => direction > 0
										)
										.map(
											({
												id,
												name,
											}: {
												id: string
												name: string
											}) => (
												<option
													key={`select-event-good-${id}`}
													value={id}
													style={{
														color: 'white',
														background: '#383',
													}}
												>
													{name}
												</option>
											)
										)}
								</optgroup>
								<optgroup
									label="Not So Good Stuff"
									style={{
										color: 'white',
										background: '#c33',
									}}
								>
									{eventConfigs
										.filter(
											({ direction }) => direction < 0
										)
										.map((config, index) => (
											<option
												key={`select-event-bad-${config.id}`}
												value={config.id}
												style={{
													color: 'white',
													background: '#c33',
												}}
											>
												{config.name}
											</option>
										))}
								</optgroup>
							</Select>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Description</FormLabel>
							<Textarea
								placeholder="Add your description here"
								onChange={(event) =>
									setDescription(event.target.value)
								}
								value={description}
							/>
							<FormHelperText>
								Give us a star then.
							</FormHelperText>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<ButtonGroup spacing="3">
							<Button
								onClick={closeHandler}
								colorScheme="whiteAlpha"
								color={'black'}
								type="button"
								isDisabled={isLoading}
							>
								Cancel
							</Button>
							{editEventId && (
								<Button
									onClick={deleteHandler}
									colorScheme="red"
									type="button"
									isDisabled={isLoading}
								>
									Delete
								</Button>
							)}
							<Button
								colorScheme="blue"
								type="submit"
								isLoading={isLoading}
							>
								Save
							</Button>
						</ButtonGroup>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	)
}

export default ManageEvent
